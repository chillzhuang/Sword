import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { message } from 'antd';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';
import Authorized from '../utils/Authorized';
import { menu } from '../defaultSettings';
import {
  dynamicRoutes,
  dynamicButtons,
  list,
  submit,
  detail,
  remove,
  tree,
} from '../services/menu';
import { getRoutes, setRoutes, getButtons, setButtons } from '../utils/authority';
import { MENU_NAMESPACE } from '../actions/menu';
import { formatRoutes, formatButtons } from '../utils/utils';

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name
        : formatMessage({ id: locale, defaultMessage: item.name });
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
  namespace: MENU_NAMESPACE,

  state: {
    menuData: [],
    breadcrumbNameMap: {},
    data: {
      list: [],
      pagination: false,
    },
    init: {
      tree: [],
    },
    detail: {},
  },

  effects: {
    *fetchMenuData({ payload }, { call, put }) {
      const { authority } = payload;
      // 设置菜单数据
      let routes = getRoutes();
      if (routes.length === 0) {
        const response = yield call(dynamicRoutes);
        routes = formatRoutes(response.data);
        setRoutes(routes);
      }
      // 设置按钮数据
      let buttons = getButtons();
      if (buttons.length === 0) {
        const response = yield call(dynamicButtons);
        buttons = formatButtons(response.data);
        setButtons(buttons);
      }
      const menuData = filterMenuData(memoizeOneFormatter(routes, authority));
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap },
      });
    },
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
    *selectIcon({ payload }, { put }) {
      yield put({
        type: 'saveIcon',
        payload: {
          detail: payload,
        },
      });
    },
    *submit({ payload }, { call }) {
      const response = yield call(submit, payload);
      if (response.success) {
        message.success('提交成功');
        router.push('/system/menu');
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
    saveIcon(state, action) {
      const newState = state;
      newState.detail.source = action.payload.detail.source;
      return {
        ...newState,
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
