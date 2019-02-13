export const ROLE_NAMESPACE = 'role';

export function ROLE_LIST(payload) {
  return {
    type: `${ROLE_NAMESPACE}/fetchList`,
    payload,
  };
}

export function ROLE_INIT() {
  return {
    type: `${ROLE_NAMESPACE}/fetchInit`,
    payload: {},
  };
}

export function ROLE_DETAIL(id) {
  return {
    type: `${ROLE_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function ROLE_CLEAR_DETAIL() {
  return {
    type: `${ROLE_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function ROLE_GRANT_TREE(payload) {
  return {
    type: `${ROLE_NAMESPACE}/grantTree`,
    payload,
  };
}

export function ROLE_TREE_KEYS(payload) {
  return {
    type: `${ROLE_NAMESPACE}/roleTreeKeys`,
    payload,
  };
}

export function ROLE_SET_TREE_KEYS(payload) {
  return {
    type: `${ROLE_NAMESPACE}/setRoleTreeKeys`,
    payload,
  };
}

export function ROLE_GRANT(payload, callback) {
  return {
    type: `${ROLE_NAMESPACE}/grant`,
    payload,
    callback,
  };
}

export function ROLE_SUBMIT(payload) {
  return {
    type: `${ROLE_NAMESPACE}/submit`,
    payload,
  };
}

export function ROLE_REMOVE(payload) {
  return {
    type: `${ROLE_NAMESPACE}/remove`,
    payload,
  };
}
