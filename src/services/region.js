import { stringify } from 'qs';
import request from '../utils/request';
import func from '../utils/Func';

export async function getLazyTree(params) {
  return request(`/api/blade-system/region/lazy-tree?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-system/region/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-system/region/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-system/region/detail?${stringify(params)}`);
}
