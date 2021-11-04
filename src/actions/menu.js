import { getAuthority } from '../utils/authority';

export const MENU_NAMESPACE = 'menu';

export function MENU_REFRESH_ROUTE(topMenuId, callback) {
  return {
    type: `${MENU_NAMESPACE}/refreshMenuData`,
    payload: {
      topMenuId,
    },
    callback,
  };
}

export function MENU_REFRESH_DATA() {
  return {
    type: `${MENU_NAMESPACE}/fetchMenuData`,
    payload: { authority: getAuthority() },
  };
}

export function MENU_LIST(payload) {
  return {
    type: `${MENU_NAMESPACE}/fetchList`,
    payload,
  };
}

export function MENU_PARENT_LIST(payload) {
  return {
    type: `${MENU_NAMESPACE}/fetchParentList`,
    payload,
  };
}

export function MENU_INIT() {
  return {
    type: `${MENU_NAMESPACE}/fetchInit`,
    payload: {},
  };
}

export function MENU_DETAIL(id) {
  return {
    type: `${MENU_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function MENU_CLEAR_DETAIL() {
  return {
    type: `${MENU_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function MENU_SUBMIT(payload) {
  return {
    type: `${MENU_NAMESPACE}/submit`,
    payload,
  };
}

export function MENU_REMOVE(payload) {
  return {
    type: `${MENU_NAMESPACE}/remove`,
    payload,
  };
}

export function MENU_SELECT_ICON(icon) {
  return {
    type: `${MENU_NAMESPACE}/selectIcon`,
    payload: {
      source: icon,
    },
  };
}

export function MENU_SHOW_DRAWER(payload) {
  return {
    type: `${MENU_NAMESPACE}/showDrawer`,
    payload,
  };
}

export function MENU_LOAD_DATA_SCOPE_DRAWER(payload) {
  return {
    type: `${MENU_NAMESPACE}/loadDataScopeDrawer`,
    payload,
  };
}

export function MENU_LOAD_DATA_SCOPE_DICT() {
  return {
    type: `${MENU_NAMESPACE}/loadDataScopeDict`,
    payload: { code: 'data_scope_type' },
  };
}
