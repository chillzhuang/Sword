import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { CODE_LIST } from '../../../actions/code';
import { genCodes } from '../../../services/code';

const FormItem = Form.Item;

@connect(({ code, loading }) => ({
  code,
  loading: loading.models.code,
}))
@Form.create()
class Code extends PureComponent {
  state = {
    selectedRows: [],
  };

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(CODE_LIST(params));
  };

  onSelectRow = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  getSelectKeys = () => {
    const { selectedRows } = this.state;
    return selectedRows.map(row => row.id);
  };

  // ============ 代码生成 ===============
  genCode = () => {
    const keys = this.getSelectKeys();
    if (keys.length === 0) {
      message.warn('请先选择一条数据!');
      return;
    }
    Modal.confirm({
      title: '代码生成确认',
      content: '是否生成选中模块的代码?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const response = await genCodes({ ids: keys });
        if (response.success) {
          message.success(response.msg);
        } else {
          message.error(response.msg || '生成失败');
        }
      },
      onCancel() {},
    });
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="模块名">
            {getFieldDecorator('codeName')(<Input placeholder="请输入模块名" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="表名">
            {getFieldDecorator('tableName')(<Input placeholder="请输入表名" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="表前缀名">
            {getFieldDecorator('tablePrefix')(<Input placeholder="请输入表前缀名" />)}
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
    <Button icon="tool" onClick={this.genCode}>
      代码生成
    </Button>
  );

  render() {
    const code = 'code';

    const {
      form,
      loading,
      code: { data },
    } = this.props;

    const columns = [
      {
        title: '模块名',
        dataIndex: 'codeName',
      },
      {
        title: '服务名',
        dataIndex: 'serviceName',
      },
      {
        title: '表名',
        dataIndex: 'tableName',
      },
      {
        title: '表前缀',
        dataIndex: 'tablePrefix',
      },
      {
        title: '主键名',
        dataIndex: 'pkName',
      },
      {
        title: '包名',
        dataIndex: 'packageName',
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
      </Panel>
    );
  }
}
export default Code;
