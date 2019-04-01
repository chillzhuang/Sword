import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import { CLIENT_LIST } from '../../../actions/client';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ client, loading }) => ({
  client,
  loading: loading.models.client,
}))
@Form.create()
class Client extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(CLIENT_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="客户端id">
            {getFieldDecorator('clientId')(<Input placeholder="请输入客户端id" />)}
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
    const code = 'client';

    const {
      form,
      loading,
      client: { data },
    } = this.props;

    const columns = [
      {
        title: '客户端id',
        dataIndex: 'clientId',
      },
      {
        title: '客户端密钥',
        dataIndex: 'clientSecret',
      },
      {
        title: '授权范围',
        dataIndex: 'scope',
      },
      {
        title: '授权类型',
        dataIndex: 'authorizedGrantTypes',
      },
      {
        title: '回调地址',
        dataIndex: 'webServerRedirectUri',
      },
      {
        title: '令牌过期秒数',
        dataIndex: 'accessTokenValidity',
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
export default Client;
