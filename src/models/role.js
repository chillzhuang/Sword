import { message } from 'antd';
import router from 'umi/router';
import { ROLE_NAMESPACE } from '../actions/role';
import { list, submit, detail, remove, tree, grant } from '../services/role';
import { grantTree, roleTreeKeys, dynamicRoutes, dynamicButtons } from '../services/menu';
import { setButtons, setRoutes } from '../utils/authority';
import { formatButtons, formatRoutes } from '../utils/utils';

export default {
  namespace: ROLE_NAMESPACE,
  state: {
    data: {
      list: [],
      pagination: false,
    },
    init: {
      tree: [],
    },
    detail: {},
    grantTree: [],
    roleCheckedTreeKeys: [],
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(list, payload);
      if (response.success) {
        yield put({
          type: 'saveList',
          payload: {
            list: response.data,
            pagination: false,
          },
        });
      }
    },
    *fetchInit({ payload }, { call, put }) {
      const response = yield call(tree, payload);
      if (response.success) {
        yield put({
          type: 'saveInit',
          payload: {
            tree: response.data,
          },
        });
      }
    },
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'saveDetail',
          payload: {
            detail: response.data,
          },
        });
      }
    },
    *clearDetail({ payload }, { put }) {
      yield put({
        type: 'removeDetail',
        payload: { payload },
      });
    },
    *grantTree({ payload }, { call, put }) {
      const response = yield call(grantTree, payload);
      yield put({
        type: 'save',
        payload: {
          grantTree: response.data,
        },
      });
    },
    *roleTreeKeys({ payload }, { call, put }) {
      const response = yield call(roleTreeKeys, payload);
      yield put({
        type: 'save',
        payload: {
          roleCheckedTreeKeys: response.data,
        },
      });
    },
    *setRoleTreeKeys({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          roleCheckedTreeKeys: payload.roleCheckedTreeKeys,
        },
      });
    },
    *grant({ payload, callback }, { call }) {
      const response = yield call(grant, payload);
      if (response.success) {
        const routes = yield call(dynamicRoutes);
        const buttons = yield call(dynamicButtons);
        setRoutes(formatRoutes(routes.data));
        setButtons(formatButtons(buttons.data));
        if (callback) {
          callback();
        }
      }
    },
    *submit({ payload }, { call }) {
      const response = yield call(submit, payload);
      if (response.success) {
        message.success('提交成功');
        router.push('/system/role');
      }
    },
    *remove({ payload }, { call }) {
      const {
        data: { keys },
        success,
      } = payload;
      const response = yield call(remove, { ids: keys });
      if (response.success) {
        success();
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveInit(state, action) {
      return {
        ...state,
        init: action.payload,
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        detail: action.payload.detail,
      };
    },
    removeDetail(state) {
      return {
        ...state,
        detail: {},
      };
    },
  },
};
