import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Divider, Form, Input, message, Modal, Row, Tag } from 'antd';
import Panel from '../../components/Panel';
import { REPORT_LIST } from '../../actions/report';
import Grid from '../../components/Sword/Grid';
import { reportUrl } from '../../defaultSettings';
import { remove } from '../../services/report';

const FormItem = Form.Item;

@connect(({ report, loading }) => ({
  report,
  loading: loading.models.report,
}))
@Form.create()
class Report extends PureComponent {
  state = {
    params: {},
  };

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    this.setState({ params });
    dispatch(REPORT_LIST(params));
  };

  handleRemove = id => {
    const { params } = this.state;
    const refresh = this.handleSearch;
    Modal.confirm({
      title: '删除确认',
      content: '确定删除该条记录?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        remove({ ids: id }).then(resp => {
          if (resp.success) {
            message.success(resp.msg);
            refresh(params);
          } else {
            message.error(resp.msg || '删除失败');
          }
        });
      },
      onCancel() {},
    });
  };

  handleDesign = name => {
    window.open(`${reportUrl}/designer?_u=blade-${name}`);
  };

  handlePreview = name => {
    window.open(`${reportUrl}/preview?_u=blade-${name}`);
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="查询文件名">
            {getFieldDecorator('name')(<Input placeholder="查询文件名" />)}
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

  renderActionButton = (keys, rows) => (
    <Fragment key="copy">
      <a
        onClick={() => {
          this.handleRemove(keys[0]);
        }}
      >
        删除
      </a>
      <Divider type="vertical" />
      <a
        onClick={() => {
          this.handleDesign(rows[0].name);
        }}
      >
        设计
      </a>
      <Divider type="vertical" />
      <a
        onClick={() => {
          this.handlePreview(rows[0].name);
        }}
      >
        预览
      </a>
    </Fragment>
  );

  render() {
    const code = 'report';

    const {
      form,
      loading,
      report: { data },
    } = this.props;

    const columns = [
      {
        title: '文件名',
        dataIndex: 'name',
        render: name => (
          <span>
            <Tag color="geekblue" key={name}>
              v{name}
            </Tag>
          </span>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          renderActionButton={this.renderActionButton}
          loading={loading}
          data={data}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default Report;
