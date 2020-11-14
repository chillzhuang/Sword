import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

export async function list(params) {
  return request(`/api/blade-report/report/rest/list?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-report/report/rest/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}
