import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { DICT_LIST } from '../../../actions/dict';

const FormItem = Form.Item;

@connect(({ dict, loading }) => ({
  dict,
  loading: loading.models.dict,
}))
@Form.create()
class Dict extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(DICT_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="字典编号">
            {getFieldDecorator('code')(<Input placeholder="请输入字典编号" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="字典名称">
            {getFieldDecorator('dictValue')(<Input placeholder="请输入字典名称" />)}
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
    const code = 'dict';

    const {
      form,
      loading,
      dict: { data },
    } = this.props;

    const columns = [
      {
        title: '字典名称',
        dataIndex: 'dictValue',
      },
      {
        title: '字典编号',
        dataIndex: 'code',
      },
      {
        title: '字典键值',
        dataIndex: 'dictKey',
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
export default Dict;
