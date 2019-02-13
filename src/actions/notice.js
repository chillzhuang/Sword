export const NOTICE_NAMESPACE = 'notice';

export function NOTICE_LIST(payload) {
  return {
    type: `${NOTICE_NAMESPACE}/fetchList`,
    payload,
  };
}

export function NOTICE_INIT() {
  return {
    type: `${NOTICE_NAMESPACE}/fetchInit`,
    payload: { code: 'notice' },
  };
}

export function NOTICE_DETAIL(id) {
  return {
    type: `${NOTICE_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function NOTICE_SUBMIT(payload) {
  return {
    type: `${NOTICE_NAMESPACE}/submit`,
    payload,
  };
}

export function NOTICE_REMOVE(payload) {
  return {
    type: `${NOTICE_NAMESPACE}/remove`,
    payload,
  };
}
