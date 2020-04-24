import React, { PureComponent } from 'react';
import { Form, Input, Card, Button, InputNumber, Col, Row, Select } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { POST_INIT, POST_SUBMIT } from '../../../actions/post';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ post, loading }) => ({
  post,
  submitting: loading.effects['post/submit'],
}))
@Form.create()
class PostAdd extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(POST_INIT());
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(POST_SUBMIT(values));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      post: { init },
      submitting,
    } = this.props;

    const { category } = init;

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const formAllItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };

    const action = (
      <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
        提交
      </Button>
    );

    return (
      <Panel title="新增" back="/system/post" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="岗位类型">
                  {getFieldDecorator('category', {
                    rules: [
                      {
                        required: true,
                        message: '请选择岗位类型',
                      },
                    ],
                  })(
                    <Select placeholder="请选择机构类型">
                      {category.map(d => (
                        <Select.Option key={d.dictKey} value={d.dictKey}>
                          {d.dictValue}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="岗位编号">
                  {getFieldDecorator('postCode', {
                    rules: [
                      {
                        required: true,
                        message: '请输入岗位编号',
                      },
                    ],
                  })(<Input placeholder="请输入岗位编号" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="岗位名称">
                  {getFieldDecorator('postName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入岗位名称',
                      },
                    ],
                  })(<Input placeholder="请输入岗位名称" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} className={styles.inputItem} label="岗位排序">
                  {getFieldDecorator('sort', {
                    rules: [
                      {
                        required: true,
                        message: '请输入岗位排序',
                      },
                    ],
                  })(<InputNumber placeholder="请输入岗位排序" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card title="其他信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="岗位描述">
                  {getFieldDecorator('remark', {
                    rules: [
                      {
                        required: true,
                        message: '请输入岗位描述',
                      },
                    ],
                  })(<TextArea rows={4} placeholder="请输入岗位描述" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default PostAdd;
