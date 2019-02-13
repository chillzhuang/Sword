export const PARAM_NAMESPACE = 'param';

export function PARAM_LIST(payload) {
  return {
    type: `${PARAM_NAMESPACE}/fetchList`,
    payload,
  };
}

export function PARAM_DETAIL(id) {
  return {
    type: `${PARAM_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function PARAM_CLEAR_DETAIL() {
  return {
    type: `${PARAM_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function PARAM_SUBMIT(payload) {
  return {
    type: `${PARAM_NAMESPACE}/submit`,
    payload,
  };
}

export function PARAM_REMOVE(payload) {
  return {
    type: `${PARAM_NAMESPACE}/remove`,
    payload,
  };
}
