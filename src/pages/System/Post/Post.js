import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Tag } from 'antd';
import Panel from '../../../components/Panel';
import { POST_LIST } from '../../../actions/post';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ post, loading }) => ({
  post,
  loading: loading.models.post,
}))
@Form.create()
class Post extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(POST_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="查询名称">
            {getFieldDecorator('name')(<Input placeholder="查询名称" />)}
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
    const code = 'post';

    const {
      form,
      loading,
      post: { data },
    } = this.props;

    const columns = [
      {
        title: '租户ID',
        dataIndex: 'tenantId',
      },
      {
        title: '岗位类型',
        dataIndex: 'categoryName',
        render: categoryName => (
          <span>
            <Tag color="geekblue" key={categoryName}>
              {categoryName}
            </Tag>
          </span>
        ),
      },
      {
        title: '岗位编号',
        dataIndex: 'postCode',
      },
      {
        title: '岗位名称',
        dataIndex: 'postName',
      },
      {
        title: '岗位排序',
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
export default Post;
