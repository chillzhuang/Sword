import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

// =====================角色===========================

export async function list(params) {
  return request(`/api/blade-system/role/list?${stringify(params)}`);
}

export async function tree(params) {
  return request(`/api/blade-system/role/tree?${stringify(params)}`);
}

export async function grant(params) {
  return request('/api/blade-system/role/grant', {
    method: 'POST',
    body: params,
  });
}

export async function remove(params) {
  return request('/api/blade-system/role/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-system/role/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-system/role/detail?${stringify(params)}`);
}
