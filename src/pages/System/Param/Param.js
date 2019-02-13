import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import { PARAM_LIST } from '../../../actions/param';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ param, loading }) => ({
  param,
  loading: loading.models.param,
}))
@Form.create()
class Param extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(PARAM_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="参数名称">
            {getFieldDecorator('paramName')(<Input placeholder="请输入参数名称" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="参数键名">
            {getFieldDecorator('paramKey')(<Input placeholder="请输入参数键名" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="参数键值">
            {getFieldDecorator('paramValue')(<Input placeholder="请输入参数键值" />)}
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
    const code = 'param';

    const {
      form,
      loading,
      param: { data },
    } = this.props;

    const columns = [
      {
        title: '参数名称',
        dataIndex: 'paramName',
      },
      {
        title: '参数键名',
        dataIndex: 'paramKey',
      },
      {
        title: '参数键值',
        dataIndex: 'paramValue',
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
export default Param;
