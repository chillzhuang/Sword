import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { stringify } from 'qs';
import { getFakeCaptcha } from '../services/api';
import { accountLogin, socialLogin } from '../services/user';
import { dynamicRoutes, dynamicButtons } from '../services/menu';
import {
  setAuthority,
  setAccessToken,
  setToken,
  setCurrentUser,
  setRoutes,
  setButtons,
  removeAll,
} from '../utils/authority';
import { getPageQuery, formatRoutes, formatButtons } from '../utils/utils';
import { reloadAuthorized } from '../utils/Authorized';
import { getTopUrl } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response.success) {
        const { success, data } = response;
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: success,
            type: 'login',
            data: { ...data },
          },
        });
        const responseRoutes = yield call(dynamicRoutes);
        const responseButtons = yield call(dynamicButtons);
        yield put({
          type: 'saveMenuData',
          payload: {
            routes: responseRoutes.data,
            buttons: responseButtons.data,
          },
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *socialLogin({ payload }, { call, put }) {
      const response = yield call(socialLogin, payload);
      if (response.success) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            type: 'login',
            data: { ...response.data },
          },
        });
        reloadAuthorized();
        const topUrl = getTopUrl();
        const redirectUrl = '/oauth/redirect/';
        // eslint-disable-next-line prefer-destructuring
        window.location.href = topUrl.split(redirectUrl)[0];
        yield put(routerRedux.replace('/'));
      } else {
        notification.error({
          message: response.msg,
        });
      }
    },
    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          type: 'logout',
          data: {
            authority: 'guest',
            logout: true,
          },
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const { status, type } = payload;
      if (status) {
        const {
          data: { tokenType, accessToken, authority, account, userId, oauthId, userName, avatar },
        } = payload;
        const token = `${tokenType} ${accessToken}`;
        setToken(token);
        setAccessToken(accessToken);
        setAuthority(authority);
        setCurrentUser({ avatar, userId, oauthId, account, name: userName, authority });
      } else {
        removeAll();
      }

      return {
        ...state,
        status: type === 'login' ? (status ? 'ok' : 'error') : '',
        type: payload.type,
      };
    },
    saveMenuData(state, { payload }) {
      const { routes, buttons } = payload;
      setRoutes(formatRoutes(routes));
      setButtons(formatButtons(buttons));
      return {
        ...state,
      };
    },
  },
};
