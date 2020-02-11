import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

// =====================参数===========================

export async function list(params) {
  return request(`/api/blade-system/param/list?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-system/param/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-system/param/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-system/param/detail?${stringify(params)}`);
}
