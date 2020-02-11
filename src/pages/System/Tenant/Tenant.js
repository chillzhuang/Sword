import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import { TENANT_LIST } from '../../../actions/tenant';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ tenant, loading }) => ({
  tenant,
  loading: loading.models.tenant,
}))
@Form.create()
class Tenant extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(TENANT_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="租户ID">
            {getFieldDecorator('tenantId')(<Input placeholder="请输入租户ID" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="租户名称">
            {getFieldDecorator('tenantName')(<Input placeholder="请输入租户名称" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="联系电话">
            {getFieldDecorator('contactNumber')(<Input placeholder="请输入联系电话" />)}
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

  render() {
    const code = 'tenant';

    const {
      form,
      loading,
      tenant: { data },
    } = this.props;

    const columns = [
      {
        title: '租户ID',
        dataIndex: 'tenantId',
      },
      {
        title: '租户名称',
        dataIndex: 'tenantName',
      },
      {
        title: '联系人',
        dataIndex: 'linkman',
      },
      {
        title: '联系电话',
        dataIndex: 'contactNumber',
      },
      {
        title: '联系地址',
        dataIndex: 'address',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          loading={loading}
          data={data}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default Tenant;
