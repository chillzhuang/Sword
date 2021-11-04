import { stringify } from 'qs';
import request from '../utils/request';
import func from '../utils/Func';

// =====================菜单===========================

export async function dynamicRoutes() {
  return request('/api/blade-system/menu/routes');
}

export async function dynamicButtons() {
  return request('/api/blade-system/menu/buttons');
}

export async function list(params) {
  return request(`/api/blade-system/menu/list?${stringify(params)}`);
}

export async function parentList(params) {
  return request(`/api/blade-system/menu/menu-list?${stringify(params)}`);
}

export async function tree(params) {
  return request(`/api/blade-system/menu/tree?${stringify(params)}`);
}

export async function grantTree(params) {
  return request(`/api/blade-system/menu/grant-tree?${stringify(params)}`);
}

export async function roleTreeKeys(params) {
  return request(`/api/blade-system/menu/role-tree-keys?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-system/menu/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-system/menu/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-system/menu/detail?${stringify(params)}`);
}

export async function routesAuthority() {
  return request('/api/blade-system/menu/auth-routes');
}

export async function dataScopeList(params) {
  return request(`/api/blade-system/data-scope/list?${stringify(params)}`);
}

export async function removeDataScope(params) {
  return request('/api/blade-system/data-scope/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submitDataScope(params) {
  return request('/api/blade-system/data-scope/submit', {
    method: 'POST',
    body: params,
  });
}

export async function scopeDataDetail(params) {
  return request(`/api/blade-system/data-scope/detail?${stringify(params)}`);
}

export async function apiScopeList(params) {
  return request(`/api/blade-system/api-scope/list?${stringify(params)}`);
}
