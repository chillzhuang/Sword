import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Drawer, Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import {
  MENU_PARENT_LIST,
  MENU_LOAD_DATA_SCOPE_DRAWER,
  MENU_SHOW_DRAWER,
} from '../../../actions/menu';
import DataScopeCrud from './DataScopeCrud';
import func from '../../../utils/Func';

const FormItem = Form.Item;

@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu,
}))
@Form.create()
class DataScope extends PureComponent {
  showDrawer = (menuId, menuName, menuCode) => {
    const { dispatch } = this.props;
    dispatch(
      MENU_SHOW_DRAWER({
        visible: true,
        menuId,
        menuName,
        menuCode,
      })
    ).then(() => {
      dispatch(MENU_LOAD_DATA_SCOPE_DRAWER({ menuId }));
    });
  };

  onClose = () => {
    const { dispatch } = this.props;
    dispatch(
      MENU_SHOW_DRAWER({
        visible: false,
      })
    );
  };

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(MENU_PARENT_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="菜单编号">
            {getFieldDecorator('code')(<Input placeholder="请输入菜单编号" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="菜单名称">
            {getFieldDecorator('name')(<Input placeholder="请输入菜单名称" />)}
          </FormItem>
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={onReset}>
              重置
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  // ============ 处理按钮点击回调事件 ===============
  handleBtnCallBack = payload => {
    const { btn, keys, rows } = payload;

    if (btn.code === 'data_scope_setting') {
      this.showDrawer(keys[0], rows[0].name, rows[0].code);
    }
  };

  render() {
    const code = 'data_scope';

    const {
      form,
      loading,
      menu: { data, drawer },
    } = this.props;

    const { visible, menuName } = drawer;

    const drawerTitle = func.isEmpty(menuName) ? '' : `[${menuName}]`;

    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'name',
      },
      {
        title: '菜单编号',
        dataIndex: 'code',
        width: 150,
      },
      {
        title: '菜单别名',
        dataIndex: 'alias',
        width: 150,
      },
      {
        title: '路由地址',
        dataIndex: 'path',
      },
      {
        title: '排序',
        dataIndex: 'sort',
        width: 60,
        align: 'right',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          btnCallBack={this.handleBtnCallBack}
          loading={loading}
          data={data}
          columns={columns}
          actionColumnWidth={100}
        />
        <Drawer
          title={`${drawerTitle} 数据权限配置`}
          placement="right"
          width={1000}
          closable={false}
          onClose={this.onClose}
          visible={visible}
        >
          <DataScopeCrud />
        </Drawer>
      </Panel>
    );
  }
}
export default DataScope;
