import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, message, Modal, Row, Tree } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import {
  ROLE_LIST,
  ROLE_GRANT_TREE,
  ROLE_TREE_KEYS,
  ROLE_SET_TREE_KEYS,
  ROLE_GRANT,
} from '../../../actions/role';
import { MENU_REFRESH_DATA } from '../../../actions/menu';

const FormItem = Form.Item;
const { TreeNode } = Tree;

@connect(({ role, loading }) => ({
  role,
  loading: loading.models.role,
}))
@Form.create()
class Role extends PureComponent {
  state = {
    visible: false,
    confirmLoading: false,
    selectedRows: [],
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(ROLE_GRANT_TREE());
  }

  onSelectRow = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  getSelectKeys = () => {
    const { selectedRows } = this.state;
    return selectedRows.map(row => row.id);
  };

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(ROLE_LIST(params));
  };

  // ========== 权限配置  =============
  handleGrant = () => {
    const {
      role: { roleCheckedTreeKeys },
    } = this.props;

    if (roleCheckedTreeKeys.length === 0) {
      message.warn('权限未变更无需操作');
      return false;
    }

    const keys = this.getSelectKeys();

    this.setState({
      confirmLoading: true,
    });

    const { dispatch } = this.props;
    dispatch(
      ROLE_GRANT({ roleIds: keys[0], menuIds: roleCheckedTreeKeys }, () => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
        message.success('配置成功');
        dispatch(MENU_REFRESH_DATA());
      })
    );
    return true;
  };

  showModal = () => {
    const keys = this.getSelectKeys();
    if (keys.length === 0) {
      message.warn('请先选择一条数据!');
      return;
    }
    if (keys.length > 1) {
      message.warn('只能选择一条数据!');
      return;
    }
    const { dispatch } = this.props;
    dispatch(ROLE_TREE_KEYS({ roleIds: keys[0] }));
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(ROLE_SET_TREE_KEYS({ roleCheckedTreeKeys: [] }));
    this.setState({
      visible: false,
    });
  };

  onCheck = checkedTreeKeys => {
    const { dispatch } = this.props;
    dispatch(ROLE_SET_TREE_KEYS({ roleCheckedTreeKeys: checkedTreeKeys }));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="角色名称">
            {getFieldDecorator('roleName')(<Input placeholder="请输入角色名称" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="角色别名">
            {getFieldDecorator('roleAlias')(<Input placeholder="请输入角色别名" />)}
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

  renderLeftButton = () => (
    <Button icon="user-add" onClick={this.showModal}>
      权限设置
    </Button>
  );

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    const code = 'role';

    const { visible, confirmLoading } = this.state;

    const {
      form,
      loading,
      role: { data, grantTree, roleCheckedTreeKeys },
    } = this.props;

    const columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
      },
      {
        title: '角色别名',
        dataIndex: 'roleAlias',
      },
      {
        title: '排序',
        dataIndex: 'sort',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSelectRow={this.onSelectRow}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          renderLeftButton={this.renderLeftButton}
          loading={loading}
          data={data}
          columns={columns}
        />
        <Modal
          title="权限配置"
          width={350}
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={this.handleGrant}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Tree checkable checkedKeys={roleCheckedTreeKeys} onCheck={this.onCheck}>
            {this.renderTreeNodes(grantTree)}
          </Tree>
        </Modal>
      </Panel>
    );
  }
}
export default Role;
