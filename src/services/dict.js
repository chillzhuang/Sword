import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

// =====================字典===========================

export async function dict(params) {
  return request(`/api/blade-system/dict/dictionary?${stringify(params)}`);
}

export async function list(params) {
  return request(`/api/blade-system/dict/list?${stringify(params)}`);
}

export async function tree(params) {
  return request(`/api/blade-system/dict/tree?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-system/dict/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-system/dict/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-system/dict/detail?${stringify(params)}`);
}
