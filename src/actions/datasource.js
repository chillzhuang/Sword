export const DATASOURCE_NAMESPACE = 'datasource';

export function DATASOURCE_LIST(payload) {
  return {
    type: `${DATASOURCE_NAMESPACE}/fetchList`,
    payload,
  };
}

export function DATASOURCE_DETAIL(id) {
  return {
    type: `${DATASOURCE_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function DATASOURCE_CLEAR_DETAIL() {
  return {
    type: `${DATASOURCE_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function DATASOURCE_SUBMIT(payload) {
  return {
    type: `${DATASOURCE_NAMESPACE}/submit`,
    payload,
  };
}

export function DATASOURCE_REMOVE(payload) {
  return {
    type: `${DATASOURCE_NAMESPACE}/remove`,
    payload,
  };
}
