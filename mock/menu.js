import { delay } from 'roadhog-api-doc';

function getFakeRoutes(req, res) {
  const json = {
    code: 200,
    success: true,
    data: [
      {
        path: '/desk',
        code: 'desk',
        source: 'desktop',
        children: [
          {
            path: '/desk/notice',
            code: 'notice',
          },
        ],
      },
      {
        path: '/system',
        code: 'system',
        source: 'setting',
        children: [
          {
            path: '/system/user',
            code: 'user',
          },
          {
            path: '/system/dept',
            code: 'dept',
          },
          {
            path: '/system/dict',
            code: 'dict',
          },
          {
            path: '/system/menu',
            code: 'menu',
          },
          {
            path: '/system/role',
            code: 'role',
          },
          {
            path: '/system/param',
            code: 'param',
          },
        ],
      },
      {
        path: '/monitor',
        code: 'monitor',
        source: 'fund',
        children: [
          {
            path: 'http://localhost/doc.html',
            target: '_blank',
            code: 'doc',
          },
          {
            path: 'http://localhost:7002',
            target: '_blank',
            code: 'admin',
          },
          {
            path: '/monitor/log',
            code: 'log',
            children: [
              {
                path: '/monitor/log/usual',
                code: 'log_usual',
              },
              {
                path: '/monitor/log/api',
                code: 'log_api',
              },
              {
                path: '/monitor/log/error',
                code: 'log_error',
              },
            ],
          },
        ],
      },
      {
        path: '/tool',
        code: 'tool',
        source: 'tool',
        children: [
          {
            path: '/tool/code',
            code: 'code',
          },
        ],
      },
    ],
    msg: '操作成功',
  };
  return res.json(json);
}

function getFakeButtons(req, res) {
  const json = {
    code: 200,
    success: true,
    data: [
      {
        code: 'notice',
        children: [
          {
            code: 'notice_add',
            name: '新增',
            path: '/desk/notice/add',
            source: 'plus',
            action: 1,
            alias: 'add',
          },
          {
            code: 'notice_edit',
            name: '修改',
            path: '/desk/notice/edit',
            source: 'form',
            action: 2,
            alias: 'edit',
          },
          {
            code: 'notice_delete',
            name: '删除',
            path: '/api/blade-system/dept/remove',
            source: 'delete',
            action: 3,
            alias: 'delete',
          },
          {
            code: 'notice_view',
            name: '查看',
            path: '/desk/notice/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'user',
        children: [
          {
            code: 'user_add',
            name: '新增',
            path: '/system/user/add',
            source: 'plus',
            action: 1,
            alias: 'add',
          },
          {
            code: 'user_edit',
            name: '修改',
            path: '/system/user/edit',
            source: 'form',
            action: 2,
            alias: 'edit',
          },
          {
            code: 'user_delete',
            name: '删除',
            path: '/api/blade-system/user/remove',
            source: 'delete',
            action: 3,
            alias: 'delete',
          },
          {
            code: 'user_role',
            name: '角色配置',
            path: '',
            source: 'user-add',
            action: 1,
            alias: 'role',
          },
          {
            code: 'user_reset',
            name: '密码重置',
            path: '/api/blade-system/user/reset-password',
            source: 'retweet',
            action: 1,
            alias: 'reset-password',
          },
          {
            code: 'user_view',
            name: '查看',
            path: '/system/user/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'dept',
        children: [
          {
            code: 'dept_add',
            name: '新增',
            path: '/system/dept/add',
            source: 'plus',
            action: 1,
            alias: 'add',
          },
          {
            code: 'dept_edit',
            name: '修改',
            path: '/system/dept/edit',
            source: 'form',
            action: 2,
            alias: 'edit',
          },
          {
            code: 'dept_delete',
            name: '删除',
            path: '/api/blade-system/dept/remove',
            source: 'delete',
            action: 3,
            alias: 'delete',
          },
          {
            code: 'dept_view',
            name: '查看',
            path: '/system/dept/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'dict',
        children: [
          {
            code: 'dict_add',
            name: '新增',
            path: '/system/dict/add',
            source: 'plus',
            action: 1,
            alias: 'add',
          },
          {
            code: 'dict_edit',
            name: '修改',
            path: '/system/dict/edit',
            source: 'form',
            action: 2,
            alias: 'edit',
          },
          {
            code: 'dict_delete',
            name: '删除',
            path: '/api/blade-system/dict/remove',
            source: 'delete',
            action: 3,
            alias: 'delete',
          },
          {
            code: 'dict_view',
            name: '查看',
            path: '/system/dict/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'menu',
        children: [
          {
            code: 'menu_add',
            name: '新增',
            path: '/system/menu/add',
            source: 'plus',
            action: 1,
            alias: 'add',
          },
          {
            code: 'menu_edit',
            name: '修改',
            path: '/system/menu/edit',
            source: 'form',
            action: 2,
            alias: 'edit',
          },
          {
            code: 'menu_delete',
            name: '删除',
            path: '/api/blade-system/menu/remove',
            source: 'delete',
            action: 3,
            alias: 'delete',
          },
          {
            code: 'menu_view',
            name: '查看',
            path: '/system/menu/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'role',
        children: [
          {
            code: 'role_add',
            name: '新增',
            path: '/system/role/add',
            source: 'plus',
            action: 1,
            alias: 'add',
          },
          {
            code: 'role_edit',
            name: '修改',
            path: '/system/role/edit',
            source: 'form',
            action: 2,
            alias: 'edit',
          },
          {
            code: 'role_delete',
            name: '删除',
            path: '/api/blade-system/role/remove',
            source: 'delete',
            action: 3,
            alias: 'delete',
          },
          {
            code: 'role_view',
            name: '查看',
            path: '/system/role/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'param',
        children: [
          {
            code: 'param_add',
            name: '新增',
            path: '/system/param/add',
            source: 'plus',
            action: 1,
            alias: 'add',
          },
          {
            code: 'param_edit',
            name: '修改',
            path: '/system/param/edit',
            source: 'form',
            action: 2,
            alias: 'edit',
          },
          {
            code: 'param_delete',
            name: '删除',
            path: '/api/blade-system/param/remove',
            source: 'delete',
            action: 3,
            alias: 'delete',
          },
          {
            code: 'param_view',
            name: '查看',
            path: '/system/param/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'log_usual',
        children: [
          {
            code: 'log_usual_view',
            name: '查看',
            path: '/monitor/log/usual/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'log_error',
        children: [
          {
            code: 'log_error_view',
            name: '查看',
            path: '/monitor/log/error/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'log_api',
        children: [
          {
            code: 'log_api_view',
            name: '查看',
            path: '/monitor/log/api/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
      {
        code: 'code',
        children: [
          {
            code: 'code_add',
            name: '新增',
            path: '/tool/code/add',
            source: 'plus',
            action: 1,
            alias: 'add',
          },
          {
            code: 'code_edit',
            name: '修改',
            path: '/tool/code/edit',
            source: 'form',
            action: 2,
            alias: 'edit',
          },
          {
            code: 'code_delete',
            name: '删除',
            path: '/api/blade-develop/code/remove',
            source: 'delete',
            action: 3,
            alias: 'delete',
          },
          {
            code: 'code_view',
            name: '查看',
            path: '/tool/code/view',
            source: 'file-text',
            action: 2,
            alias: 'view',
          },
        ],
      },
    ],
    msg: '操作成功',
  };
  return res.json(json);
}

function getFakeList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const data = [];
  data.push(
    {
      id: '1',
      code: 'desk',
      parentId: '',
      name: '工作台',
      path: '/desk',
      source: 'desktop',
      category: '1',
      categoryName: '菜单',
      sort: '1',
      children: [
        {
          id: '2',
          code: 'notice',
          parentId: 'desk',
          name: '通知公告',
          path: '/desk/notice',
          source: 'desktop',
          category: '1',
          categoryName: '菜单',
          sort: '2',
        },
      ],
    },
    {
      id: '3',
      code: 'system',
      parentId: '',
      name: '系统管理',
      path: '/system',
      source: 'setting',
      category: '1',
      categoryName: '菜单',
      sort: '3',
      children: [
        {
          id: '4',
          code: 'user',
          parentId: 'system',
          name: '用户管理',
          path: '/system/user',
          source: 'setting',
          category: '1',
          categoryName: '菜单',
          sort: '4',
        },
        {
          id: '5',
          code: 'dept',
          parentId: 'system',
          name: '部门管理',
          path: '/system/dept',
          source: 'setting',
          category: '1',
          categoryName: '菜单',
          sort: '5',
        },
        {
          id: '6',
          code: 'dict',
          parentId: 'system',
          name: '字典管理',
          path: '/system/dict',
          source: 'setting',
          category: '1',
          categoryName: '菜单',
          sort: '6',
        },
        {
          id: '7',
          code: 'menu',
          parentId: 'system',
          name: '菜单管理',
          path: '/system/menu',
          source: 'setting',
          category: '1',
          categoryName: '菜单',
          sort: '7',
        },
        {
          id: '8',
          code: 'role',
          parentId: 'system',
          name: '角色管理',
          path: '/system/role',
          source: 'setting',
          category: '1',
          categoryName: '菜单',
          sort: '8',
        },
        {
          id: '9',
          code: 'parameter',
          parentId: 'system',
          name: '参数管理',
          path: '/system/param',
          source: 'setting',
          category: '1',
          categoryName: '菜单',
          sort: '9',
        },
        {
          id: '10',
          code: 'log',
          parentId: 'system',
          name: '日志管理',
          path: '/system/log',
          source: 'setting',
          category: '1',
          categoryName: '菜单',
          sort: '10',
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
    id: '2',
    code: 'notice',
    parentId: 'desk',
    parentName: '顶级',
    name: '通知公告',
    alias: 'menu',
    path: '/desk/notice',
    source: 'desktop',
    category: '1',
    categoryName: '菜单',
    action: 1,
    actionName: '否',
    isOpen: 1,
    isOpenName: '否',
    sort: '2',
  };
  json.data = detail;
  return res.json(json);
}

function getFakeTree(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      value: 'desk',
      key: 'desk',
      title: '工作台',
      children: [
        {
          value: 'notice',
          key: 'notice',
          title: '通知公告',
        },
      ],
    },
    {
      value: 'system',
      key: 'system',
      title: '系统管理',
      children: [
        {
          value: 'user',
          key: 'user',
          title: '用户管理',
        },
        {
          value: 'dept',
          key: 'dept',
          title: '部门管理',
        },
        {
          value: 'dict',
          key: 'dict',
          title: '字典管理',
        },
        {
          value: 'menu',
          key: 'menu',
          title: '菜单管理',
        },
        {
          value: 'role',
          key: 'role',
          title: '角色管理',
        },
        {
          value: 'param',
          key: 'param',
          title: '参数管理',
        },
        {
          value: 'log',
          key: 'log',
          title: '日志管理',
        },
      ],
    }
  );
  json.data = list;
  return res.json(json);
}

function getFakeGrantTree(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      key: 'desk',
      title: '工作台',
      children: [
        {
          key: 'notice',
          title: '通知公告',
          children: [
            {
              key: 'notice_add',
              title: '新增',
            },
            {
              key: 'notice_edit',
              title: '修改',
            },
            {
              key: 'notice_delete',
              title: '删除',
            },
            {
              key: 'notice_view',
              title: '查看',
            },
          ],
        },
      ],
    },
    {
      key: 'system',
      title: '系统管理',
      children: [
        {
          key: 'user',
          title: '用户管理',
          children: [
            {
              key: 'user_add',
              title: '新增',
            },
            {
              key: 'user_edit',
              title: '修改',
            },
            {
              key: 'user_delete',
              title: '删除',
            },
            {
              key: 'user_view',
              title: '查看',
            },
          ],
        },
        {
          key: 'dept',
          title: '部门管理',
          children: [
            {
              key: 'dept_add',
              title: '新增',
            },
            {
              key: 'dept_edit',
              title: '修改',
            },
            {
              key: 'dept_delete',
              title: '删除',
            },
            {
              key: 'dept_view',
              title: '查看',
            },
          ],
        },
        {
          key: 'dict',
          title: '字典管理',
          children: [
            {
              key: 'dict_add',
              title: '新增',
            },
            {
              key: 'dict_edit',
              title: '修改',
            },
            {
              key: 'dict_delete',
              title: '删除',
            },
            {
              key: 'dict_view',
              title: '查看',
            },
          ],
        },
        {
          key: 'menu',
          title: '菜单管理',
          children: [
            {
              key: 'menu_add',
              title: '新增',
            },
            {
              key: 'menu_edit',
              title: '修改',
            },
            {
              key: 'menu_delete',
              title: '删除',
            },
            {
              key: 'menu_view',
              title: '查看',
            },
          ],
        },
        {
          key: 'role',
          title: '角色管理',
          children: [
            {
              key: 'role_add',
              title: '新增',
            },
            {
              key: 'role_edit',
              title: '修改',
            },
            {
              key: 'role_delete',
              title: '删除',
            },
            {
              key: 'role_view',
              title: '查看',
            },
          ],
        },
        {
          key: 'param',
          title: '参数管理',
          children: [
            {
              key: 'param_add',
              title: '新增',
            },
            {
              key: 'param_edit',
              title: '修改',
            },
            {
              key: 'param_delete',
              title: '删除',
            },
            {
              key: 'param_view',
              title: '查看',
            },
          ],
        },
      ],
    }
  );
  json.data = list;
  return res.json(json);
}

function getFakeAuthRoutes(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  json.data = {
    '/form/advanced-form': { authority: ['admin', 'user'] },
  };
  return res.json(json);
}

function fakeSuccess(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  return res.json(json);
}

function getFakeRoleTreeKeys(req, res) {
  const json = { code: 200, success: true, data: ['1'], msg: '操作成功' };
  return res.json(json);
}

const proxy = {
  'GET /api/blade-system/menu/routes': getFakeRoutes,
  'GET /api/blade-system/menu/buttons': getFakeButtons,
  'GET /api/blade-system/menu/list': getFakeList,
  'GET /api/blade-system/menu/detail': getFakeDetail,
  'GET /api/blade-system/menu/tree': getFakeTree,
  'GET /api/blade-system/menu/grant-tree': getFakeGrantTree,
  'GET /api/blade-system/menu/role-tree-keys': getFakeRoleTreeKeys,
  'GET /api/blade-system/menu/auth-routes': getFakeAuthRoutes,
  'POST /api/blade-system/menu/submit': fakeSuccess,
  'POST /api/blade-system/menu/remove': fakeSuccess,
};
export default delay(proxy, 500);
