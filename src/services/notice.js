import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

// =====================通知公告===========================

export async function queryProjectNotice(params = {}) {
  return request(`/api/blade-desk/dashboard/notices?${stringify(params)}`, { cryptoToken: true });
}

export async function list(params) {
  return request(`/api/blade-desk/notice/list?${stringify(params)}`, { cryptoToken: true });
}

export async function remove(params) {
  return request('/api/blade-desk/notice/remove', {
    method: 'POST',
    body: func.toFormData(params),
    cryptoToken: true,
  });
}

export async function submit(params) {
  return request('/api/blade-desk/notice/submit', {
    method: 'POST',
    body: params,
    cryptoToken: true,
  });
}

export async function detail(params) {
  return request(`/api/blade-desk/notice/detail?${stringify(params)}`, { cryptoToken: true });
}
