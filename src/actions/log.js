export const LOG_NAMESPACE = 'log';

export function LOG_USUAL_LIST(payload) {
  return {
    type: `${LOG_NAMESPACE}/fetchUsualList`,
    payload,
  };
}

export function LOG_USUAL_DETAIL(id) {
  return {
    type: `${LOG_NAMESPACE}/fetchUsualDetail`,
    payload: { id },
  };
}

export function LOG_API_LIST(payload) {
  return {
    type: `${LOG_NAMESPACE}/fetchApiList`,
    payload,
  };
}

export function LOG_API_DETAIL(id) {
  return {
    type: `${LOG_NAMESPACE}/fetchApiDetail`,
    payload: { id },
  };
}

export function LOG_ERROR_LIST(payload) {
  return {
    type: `${LOG_NAMESPACE}/fetchErrorList`,
    payload,
  };
}

export function LOG_ERROR_DETAIL(id) {
  return {
    type: `${LOG_NAMESPACE}/fetchErrorDetail`,
    payload: { id },
  };
}
