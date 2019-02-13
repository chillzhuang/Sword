export const DEPT_NAMESPACE = 'dept';

export function DEPT_LIST(payload) {
  return {
    type: `${DEPT_NAMESPACE}/fetchList`,
    payload,
  };
}

export function DEPT_INIT() {
  return {
    type: `${DEPT_NAMESPACE}/fetchInit`,
    payload: {},
  };
}

export function DEPT_DETAIL(id) {
  return {
    type: `${DEPT_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function DEPT_CLEAR_DETAIL() {
  return {
    type: `${DEPT_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function DEPT_SUBMIT(payload) {
  return {
    type: `${DEPT_NAMESPACE}/submit`,
    payload,
  };
}

export function DEPT_REMOVE(payload) {
  return {
    type: `${DEPT_NAMESPACE}/remove`,
    payload,
  };
}
