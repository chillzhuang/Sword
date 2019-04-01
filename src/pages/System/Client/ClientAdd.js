import React, { PureComponent } from 'react';
import { Form, Input, Card, Button, Row, Col, InputNumber } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { CLIENT_SUBMIT } from '../../../actions/client';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['client/submit'],
}))
@Form.create()
class ClientAdd extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(CLIENT_SUBMIT(values));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;

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
      <Panel title="新增" back="/system/client" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="客户端id">
                  {getFieldDecorator('clientId', {
                    rules: [
                      {
                        required: true,
                        message: '请输入客户端id',
                      },
                    ],
                  })(<Input placeholder="请输入客户端id" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="客户端密钥">
                  {getFieldDecorator('clientSecret', {
                    rules: [
                      {
                        required: true,
                        message: '请输入客户端密钥',
                      },
                    ],
                  })(<Input placeholder="请输入客户端密钥" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="授权类型">
                  {getFieldDecorator('authorizedGrantTypes', {
                    rules: [
                      {
                        required: true,
                        message: '请输入授权类型',
                      },
                    ],
                    initialValue: 'refresh_token,password,authorization_code',
                  })(<Input placeholder="请输入授权类型" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="授权范围">
                  {getFieldDecorator('scope', {
                    rules: [
                      {
                        required: true,
                        message: '请输入授权范围',
                      },
                    ],
                    initialValue: 'all',
                  })(<Input placeholder="请输入授权范围" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="令牌过期秒数">
                  {getFieldDecorator('accessTokenValidity', {
                    rules: [
                      {
                        required: true,
                        message: '请输入令牌过期秒数',
                      },
                    ],
                    initialValue: 3600,
                  })(<InputNumber placeholder="请输入令牌过期秒数" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="刷新令牌过期秒数">
                  {getFieldDecorator('refreshTokenValidity', {
                    rules: [
                      {
                        required: true,
                        message: '请输入刷新令牌过期秒数',
                      },
                    ],
                    initialValue: 604800,
                  })(<InputNumber placeholder="请输入刷新令牌过期秒数" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="回调地址">
                  {getFieldDecorator('webServerRedirectUri', {
                    rules: [
                      {
                        required: true,
                        message: '请输入回调地址',
                      },
                    ],
                  })(<Input placeholder="请输入回调地址" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="资源集合">
                  {getFieldDecorator('resourceIds', {})(<Input placeholder="请输入资源集合" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="权限">
                  {getFieldDecorator('authorities', {})(<Input placeholder="请输入权限" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="自动授权">
                  {getFieldDecorator('autoapprove', {})(<Input placeholder="请输入自动授权" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="附加说明">
                  {getFieldDecorator('additionalInformation', {})(
                    <Input placeholder="请输入附加说明" />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default ClientAdd;
