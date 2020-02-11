import React, { PureComponent } from 'react';
import { Form, Input, Card, Button, Row, Col, InputNumber } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { CLIENT_DETAIL, CLIENT_SUBMIT } from '../../../actions/client';

const FormItem = Form.Item;

@connect(({ client, loading }) => ({
  client,
  submitting: loading.effects['client/submit'],
}))
@Form.create()
class ClientEdit extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(CLIENT_DETAIL(id));
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      match: {
        params: { id },
      },
      form,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          id,
          ...values,
        };
        dispatch(CLIENT_SUBMIT(params));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      client: { detail },
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
      <Panel title="修改" back="/system/client" action={action}>
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
                    initialValue: detail.clientId,
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
                    initialValue: detail.clientSecret,
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
                    initialValue: detail.authorizedGrantTypes,
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
                    initialValue: detail.scope,
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
                    initialValue: detail.accessTokenValidity,
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
                    initialValue: detail.refreshTokenValidity,
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
                    initialValue: detail.webServerRedirectUri,
                  })(<Input placeholder="请输入回调地址" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="资源集合">
                  {getFieldDecorator('resourceIds', {
                    initialValue: detail.resourceIds,
                  })(<Input placeholder="请输入资源集合" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="权限">
                  {getFieldDecorator('authorities', {
                    initialValue: detail.authorities,
                  })(<Input placeholder="请输入权限" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="自动授权">
                  {getFieldDecorator('autoapprove', {
                    initialValue: detail.autoapprove,
                  })(<Input placeholder="请输入自动授权" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="附加说明">
                  {getFieldDecorator('additionalInformation', {
                    initialValue: detail.additionalInformation,
                  })(<Input placeholder="请输入附加说明" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default ClientEdit;
