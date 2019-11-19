import { delay } from 'roadhog-api-doc';

function getFakeList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      id: '1',
      tenantId: '000000',
      tenantName: '管理组',
      linkman: 'Chill',
      contactNumber: '66666666666',
      address: '管理组地址',
    },
    {
      id: '2',
      tenantId: '000001',
      tenantName: '用户组',
      linkman: 'Bill',
      contactNumber: '23333333333',
      address: '用户组地址',
    }
  );
  json.data = {
    total: 10,
    size: 10,
    current: 2,
    searchCount: true,
    pages: 1,
    records: list,
  };
  return res.json(json);
}

function getFakeDetail(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  json.data = {
    id: '1',
    tenantId: '000000',
    tenantName: '管理组',
    linkman: 'Chill',
    contactNumber: '66666666666',
    address: '管理组地址',
  };
  return res.json(json);
}

function fakeSuccess(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  return res.json(json);
}

function getFakeTenantSelect(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  json.data = [
    {
      tenantId: '000000',
      tenantName: '管理组',
    },
    {
      tenantId: '000001',
      tenantName: '用户组',
    },
  ];
  return res.json(json);
}

const proxy = {
  'GET /api/blade-system/tenant/list': getFakeList,
  'GET /api/blade-system/tenant/select': getFakeTenantSelect,
  'GET /api/blade-system/tenant/detail': getFakeDetail,
  'POST /api/blade-system/tenant/submit': fakeSuccess,
  'POST /api/blade-system/tenant/remove': fakeSuccess,
};
export default delay(proxy, 500);
