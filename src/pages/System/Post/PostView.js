import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { POST_DETAIL } from '../../../actions/post';

const FormItem = Form.Item;

@connect(({ post }) => ({
  post,
}))
@Form.create()
class PostView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(POST_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/system/post/edit/${id}`);
  };

  render() {
    const {
      post: { detail },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const action = (
      <Button type="primary" onClick={this.handleEdit}>
        修改
      </Button>
    );

    return (
      <Panel title="查看" back="/system/post" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="岗位类型">
              <span>{detail.categoryName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="岗位编号">
              <span>{detail.postCode}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="岗位名称">
              <span>{detail.postName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="岗位排序">
              <span>{detail.sort}</span>
            </FormItem>
          </Card>
          <Card title="其他信息" className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="岗位描述">
              <span>{detail.remark}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default PostView;
