export const REPORT_NAMESPACE = 'report';

export function REPORT_LIST(payload) {
  return {
    type: `${REPORT_NAMESPACE}/fetchList`,
    payload,
  };
}
