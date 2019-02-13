import { delay } from 'roadhog-api-doc';

function getFakeList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push({
    id: '1',
    serviceName: 'blade-demo',
    codeName: '通知公告',
    tableName: 'blade_notice',
    tablePrefix: 'blade_',
    pkName: 'id',
    packageName: 'org.springblade.desk',
  });
  json.data = {
    total: 10,
    size: 10,
    current: 1,
    searchCount: true,
    pages: 1,
    records: list,
  };
  return res.json(json);
}

function getFakeDetail(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const detail = {
    id: '1',
    serviceName: 'blade-demo',
    codeName: '通知公告',
    tableName: 'blade_notice',
    pkName: 'id',
    tablePrefix: 'blade_',
    packageName: 'org.springblade.desk',
    apiPath: 'D:\\Develop\\WorkSpace\\Git\\SpringBlade\\blade-ops\\blade-develop',
    webPath: 'D:\\Develop\\WorkSpace\\Git\\Sword',
  };
  json.data = detail;
  return res.json(json);
}

function fakeSuccess(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  return res.json(json);
}

const proxy = {
  'GET /api/blade-develop/code/list': getFakeList,
  'GET /api/blade-develop/code/detail': getFakeDetail,
  'POST /api/blade-develop/code/submit': fakeSuccess,
  'POST /api/blade-develop/code/remove': fakeSuccess,
  'POST /api/blade-develop/code/gen-code': fakeSuccess,
};
export default delay(proxy, 500);
