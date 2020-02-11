export const TENANT_NAMESPACE = 'tenant';

export function TENANT_LIST(payload) {
  return {
    type: `${TENANT_NAMESPACE}/fetchList`,
    payload,
  };
}

export function TENANT_DETAIL(id) {
  return {
    type: `${TENANT_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function TENANT_CLEAR_DETAIL() {
  return {
    type: `${TENANT_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function TENANT_SUBMIT(payload) {
  return {
    type: `${TENANT_NAMESPACE}/submit`,
    payload,
  };
}

export function TENANT_REMOVE(payload) {
  return {
    type: `${TENANT_NAMESPACE}/remove`,
    payload,
  };
}
