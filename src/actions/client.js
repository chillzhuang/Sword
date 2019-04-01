export const CLIENT_NAMESPACE = 'client';

export function CLIENT_LIST(payload) {
  return {
    type: `${CLIENT_NAMESPACE}/fetchList`,
    payload,
  };
}

export function CLIENT_DETAIL(id) {
  return {
    type: `${CLIENT_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function CLIENT_CLEAR_DETAIL() {
  return {
    type: `${CLIENT_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function CLIENT_SUBMIT(payload) {
  return {
    type: `${CLIENT_NAMESPACE}/submit`,
    payload,
  };
}

export function CLIENT_REMOVE(payload) {
  return {
    type: `${CLIENT_NAMESPACE}/remove`,
    payload,
  };
}
