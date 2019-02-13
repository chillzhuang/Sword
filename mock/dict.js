import { delay } from 'roadhog-api-doc';

function getFakeDictionary(req, res) {
  const params = req.query;
  const { code } = params;
  const json = { code: 200, success: true, msg: '操作成功' };
  const dict = [];
  if (code === 'notice') {
    dict.push(
      {
        dictKey: '1',
        dictValue: '发布通知',
      },
      {
        dictKey: '2',
        dictValue: '批转通知',
      },
      {
        dictKey: '3',
        dictValue: '转发通知',
      },
      {
        dictKey: '4',
        dictValue: '指示通知',
      },
      {
        dictKey: '5',
        dictValue: '任免通知',
      },
      {
        dictKey: '6',
        dictValue: '事务通知',
      }
    );
    json.data = dict;
  }
  return res.json(json);
}

function getFakeList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const data = [];
  data.push(
    {
      id: '1',
      code: 'sex',
      dictKey: '-1',
      dictValue: '性别',
      sort: '1',
      children: [
        {
          id: '2',
          code: 'sex',
          dictKey: '1',
          dictValue: '男',
          sort: '1',
        },
        {
          id: '3',
          code: 'sex',
          dictKey: '2',
          dictValue: '女',
          sort: '2',
        },
      ],
    },
    {
      id: '4',
      code: 'notice',
      dictKey: '-1',
      dictValue: '通知类型',
      sort: '1',
      children: [
        {
          id: '5',
          code: 'notice',
          dictKey: '1',
          dictValue: '发布通知',
          sort: '1',
        },
        {
          id: '6',
          code: 'notice',
          dictKey: '2',
          dictValue: '批转通知',
          sort: '2',
        },
        {
          id: '7',
          code: 'notice',
          dictKey: '3',
          dictValue: '转发通知',
          sort: '3',
        },
        {
          id: '8',
          code: 'notice',
          dictKey: '4',
          dictValue: '指示通知',
          sort: '4',
        },
        {
          id: '9',
          code: 'notice',
          dictKey: '5',
          dictValue: '任免通知',
          sort: '5',
        },
        {
          id: '10',
          code: 'notice',
          dictKey: '6',
          dictValue: '事务通知',
          sort: '6',
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
    parentName: '性别',
    code: 'sex',
    dictKey: 1,
    dictValue: '男',
    sort: 1,
    remark: '测试备注',
    nextKey: 3,
    nextSort: 3,
  };
  json.data = detail;
  return res.json(json);
}

function getFakeTree(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      title: '性别',
      value: '1',
      key: '1',
      children: [
        {
          title: '男',
          value: '2',
          key: '2',
        },
        {
          title: '女',
          value: '3',
          key: '3',
        },
      ],
    },
    {
      title: '通知类型',
      value: '4',
      key: '4',
      children: [
        {
          title: '发布通知',
          value: '5',
          key: '5',
        },
        {
          title: '批转通知',
          value: '6',
          key: '6',
        },
        {
          title: '转发通知',
          value: '7',
          key: '7',
        },
        {
          title: '指示通知',
          value: '8',
          key: '8',
        },
        {
          title: '任免通知',
          value: '9',
          key: '9',
        },
        {
          title: '事务通知',
          value: '10',
          key: '10',
        },
      ],
    }
  );
  json.data = list;
  return res.json(json);
}

function fakeSuccess(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  return res.json(json);
}

const proxy = {
  'GET /api/blade-system/dict/dictionary': getFakeDictionary,
  'GET /api/blade-system/dict/list': getFakeList,
  'GET /api/blade-system/dict/detail': getFakeDetail,
  'GET /api/blade-system/dict/tree': getFakeTree,
  'POST /api/blade-system/dict/submit': fakeSuccess,
  'POST /api/blade-system/dict/remove': fakeSuccess,
};

export default delay(proxy, 500);
