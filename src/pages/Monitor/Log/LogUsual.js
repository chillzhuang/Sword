import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import { LOG_USUAL_LIST } from '../../../actions/log';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ log, loading }) => ({
  log,
  loading: loading.models.log,
}))
@Form.create()
class LogUsual extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(LOG_USUAL_LIST(params));
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
          <FormItem label="日志id">
            {getFieldDecorator('logId')(<Input placeholder="请输入日志id" />)}
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
    const code = 'log_usual';

    const {
      form,
      loading,
      log: { usualData },
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
        title: '日志级别',
        dataIndex: 'logLevel',
      },
      {
        title: '日志id',
        dataIndex: 'logId',
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
          data={usualData}
          columns={columns}
          pkField="strId"
        />
      </Panel>
    );
  }
}
export default LogUsual;
