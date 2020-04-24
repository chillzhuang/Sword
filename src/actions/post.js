export const POST_NAMESPACE = 'post';

export function POST_INIT() {
  return {
    type: `${POST_NAMESPACE}/fetchInit`,
    payload: { code: 'post_category' },
  };
}

export function POST_LIST(payload) {
  return {
    type: `${POST_NAMESPACE}/fetchList`,
    payload,
  };
}

export function POST_DETAIL(id) {
  return {
    type: `${POST_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function POST_CLEAR_DETAIL() {
  return {
    type: `${POST_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function POST_SUBMIT(payload) {
  return {
    type: `${POST_NAMESPACE}/submit`,
    payload,
  };
}

export function POST_REMOVE(payload) {
  return {
    type: `${POST_NAMESPACE}/remove`,
    payload,
  };
}
