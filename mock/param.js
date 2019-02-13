import { delay } from 'roadhog-api-doc';

function getFakeList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      id: '1',
      paramName: '是否开启注册功能',
      paramKey: 'account.registerUser',
      paramValue: 'true',
      remark: '描述',
    },
    {
      id: '2',
      paramName: '账号初始密码',
      paramKey: 'account.initPassword',
      paramValue: '123456',
      remark: '描述',
    }
  );
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
    paramName: '是否开启注册功能',
    paramKey: 'account.registerUser',
    paramValue: 'true',
    remark: '描述',
  };
  json.data = detail;
  return res.json(json);
}

function fakeSuccess(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  return res.json(json);
}

const proxy = {
  'GET /api/blade-system/param/list': getFakeList,
  'GET /api/blade-system/param/detail': getFakeDetail,
  'POST /api/blade-system/param/submit': fakeSuccess,
  'POST /api/blade-system/param/remove': fakeSuccess,
};
export default delay(proxy, 500);
