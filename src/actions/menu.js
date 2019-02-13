import { getAuthority } from '../utils/authority';

export const MENU_NAMESPACE = 'menu';

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
