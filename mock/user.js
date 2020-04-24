import { delay } from 'roadhog-api-doc';

function getFakeList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      id: '1',
      tenantId: '000000',
      account: 'admin',
      name: '超级管理员',
      realName: '管理员',
      phone: '13888888888',
      email: 'admin@springblade.org',
      roleName: '超级管理员',
      deptName: '刀锋科技',
      statusName: '启用',
    },
    {
      id: '2',
      tenantId: '000001',
      account: 'user',
      name: '系统用户',
      realName: '用户',
      phone: '13666666666',
      email: 'user@springblade.org',
      roleName: '用户',
      deptName: '刀锋科技',
      statusName: '启用',
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
  json.data = {
    id: '1',
    tenantId: '000000',
    account: 'admin',
    code: 'admin',
    name: '超级管理员',
    realName: '管理员',
    phone: '13888888888',
    email: 'admin@springblade.org',
    roleId: 1,
    roleName: '超级管理员',
    deptId: 1,
    deptName: '刀锋科技',
    postId: 1,
    postName: '首席执行官',
    sex: 1,
    sexName: '男',
    birthday: '2018-12-31 23:33:33',
    statusName: '启用',
  };
  return res.json(json);
}
function fakeSuccess(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  return res.json(json);
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /api/blade-user/list': getFakeList,
  'GET /api/blade-user/detail': getFakeDetail,
  'POST /api/blade-user/grant': fakeSuccess,
  'POST /api/blade-user/reset-password': fakeSuccess,
  'POST /api/blade-user/submit': fakeSuccess,
  'POST /api/blade-user/update': fakeSuccess,
  'POST /api/blade-user/remove': fakeSuccess,

  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/blade-auth/token': (req, res) => {
    res.send({
      code: 200,
      success: true,
      data: {
        accessToken:
          'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJyb2xlSWQiOiIxIiwicm9sZU5hbWUiOiJhZG1pbiIsInVzZXJOYW1lIjoi566h55CG5ZGYIiwidXNlcklkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsImV4cCI6MTU0NDEyMjc5OSwibmJmIjoxNTQ0MDkxOTE3fQ.STze1uvHEoDI-FAAoFaOXufML_75MY6A_r6ZIzdYzYk',
        tokenType: 'bearer',
        authority: 'admin',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userName: '管理员',
        account: 'admin',
        license: 'made by blade',
      },
      msg: '操作成功',
    });
  },
  'GET /api/blade-auth/captcha': (req, res) => {
    res.send({
      code: 200,
      success: true,
      data: {
        key: 'blade-captcha',
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      },
      msg: '操作成功',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
export default delay(proxy, 500);
