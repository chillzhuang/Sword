import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { LOG_API_LIST } from '../../../actions/log';

const FormItem = Form.Item;

@connect(({ log, loading }) => ({
  log,
  loading: loading.models.log,
}))
@Form.create()
class LogApi extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(LOG_API_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="服务id">
            {getFieldDecorator('serviceId')(<Input placeholder="请输入服务id" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="日志名">
            {getFieldDecorator('title')(<Input placeholder="请输入日志名" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="请求接口">
            {getFieldDecorator('requestUri')(<Input placeholder="请输入请求接口" />)}
          </FormItem>
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>{' '}
            <Button style={{ marginLeft: 8 }} onClick={onReset}>
              重置
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const code = 'log_api';

    const {
      form,
      loading,
      log: { apiData },
    } = this.props;

    const columns = [
      {
        title: '服务id',
        dataIndex: 'serviceId',
      },
      {
        title: '服务host',
        dataIndex: 'serverHost',
      },
      {
        title: '服务ip',
        dataIndex: 'serverIp',
      },
      {
        title: '软件环境',
        dataIndex: 'env',
      },
      {
        title: '日志名',
        dataIndex: 'title',
      },
      {
        title: '请求方法',
        dataIndex: 'method',
      },
      {
        title: '请求接口',
        dataIndex: 'requestUri',
      },
      {
        title: '日志时间',
        dataIndex: 'createTime',
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
          data={apiData}
          columns={columns}
          pkField="strId"
        />
      </Panel>
    );
  }
}
export default LogApi;
