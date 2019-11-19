import { delay } from 'roadhog-api-doc';

function getFakeList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const data = [];
  data.push(
    {
      id: '1',
      roleName: '超级管理员',
      tenantId: '000000',
      roleAlias: 'administrator',
      sort: '1',
      children: [
        {
          id: '2',
          roleName: '管理员',
          tenantId: '000001',
          roleAlias: 'admin',
          sort: '1',
        },
      ],
    },
    {
      id: '3',
      roleName: '用户',
      tenantId: '000002',
      roleAlias: 'user',
      sort: '2',
      children: [
        {
          id: '4',
          roleName: '普通用户',
          tenantId: '000003',
          roleAlias: 'user',
          sort: '1',
        },
        {
          id: '5',
          roleName: '访客',
          tenantId: '000004',
          roleAlias: 'guest',
          sort: '2',
        },
      ],
    }
  );
  json.data = data;
  return res.json(json);
}

function getFakeDetail(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const detail = {
    id: 2,
    parentId: 1,
    parentName: '超级管理员',
    tenantId: '000000',
    roleName: '用户',
    roleAlias: 'user',
    sort: 1,
    nextSort: 4,
    remark: '测试备注',
  };
  json.data = detail;
  return res.json(json);
}

function getFakeTree(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push({
    title: '超级管理员',
    value: '1',
    key: '1',
    children: [
      {
        title: '用户',
        value: '2',
        key: '2',
      },
      {
        title: '测试',
        value: '3',
        key: '3',
      },
    ],
  });
  json.data = list;
  return res.json(json);
}

function fakeSuccess(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  return res.json(json);
}

const proxy = {
  'GET /api/blade-system/role/list': getFakeList,
  'GET /api/blade-system/role/detail': getFakeDetail,
  'GET /api/blade-system/role/tree': getFakeTree,
  'POST /api/blade-system/role/submit': fakeSuccess,
  'POST /api/blade-system/role/remove': fakeSuccess,
  'POST /api/blade-system/role/grant': fakeSuccess,
};
export default delay(proxy, 500);
