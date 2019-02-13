export const CODE_NAMESPACE = 'code';

export function CODE_LIST(payload) {
  return {
    type: `${CODE_NAMESPACE}/fetchList`,
    payload,
  };
}

export function CODE_DETAIL(id) {
  return {
    type: `${CODE_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function CODE_CLEAR_DETAIL() {
  return {
    type: `${CODE_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function CODE_SUBMIT(payload) {
  return {
    type: `${CODE_NAMESPACE}/submit`,
    payload,
  };
}

export function CODE_REMOVE(payload) {
  return {
    type: `${CODE_NAMESPACE}/remove`,
    payload,
  };
}
