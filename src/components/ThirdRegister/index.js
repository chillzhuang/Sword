import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Col, Form, Input, Modal, Button, Row, message } from 'antd';
import styles from '@/layouts/Sword.less';
import { getCurrentUser, removeAll } from '@/utils/authority';
import { validateNull } from '@/utils/utils';
import { tenantMode } from '@/defaultSettings';
import { getUserInfo, registerGuest } from '@/services/user';
import router from 'umi/router';

const FormItem = Form.Item;

@connect(({ tenant }) => ({
  tenant,
}))
@Form.create()
class ThirdRegister extends PureComponent {
  state = {
    loading: false,
    visible: false,
    user: {},
  };

  componentDidMount() {
    const user = getCurrentUser();
    if (validateNull(user) || validateNull(user.userId) || user.userId < 0) {
      // 第三方注册用户，弹出注册框
      this.setState({ visible: true, user });
    } else {
      // 获取用户信息,也可用于校验当前用户token是否有效
      getUserInfo().then(resp => {
        window.console.log(resp);
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    const user = getCurrentUser();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const password = form.getFieldValue('password');
        const password2 = form.getFieldValue('password2');
        if (password !== password2) {
          message.warning('两次密码输入不一致');
        } else {
          registerGuest(values, user.oauthId).then(resp => {
            if (resp.success) {
              this.setState({ visible: false });
              Modal.success({ content: '注册申请已提交,请耐心等待管理员通过!' });
              removeAll();
              router.push('/user/login');
            }
            form.resetFields();
          });
        }
      }
    });
  };

  render() {
    const {
      form,
    } = this.props;

    const { loading, visible, user } = this.state;

    const { getFieldDecorator } = form;

    const tenantVisible = tenantMode;

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

    return (
      <Modal
        title="第三方系统用户注册"
        width={800}
        visible={visible}
        closable={false}
        footer={[
          <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
            注册
          </Button>,
        ]}
      >
        <Form style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            {tenantVisible ? (
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="租户编号">
                    {getFieldDecorator('tenantId', {
                      rules: [
                        {
                          required: true,
                          message: '请输入租户编号',
                        },
                      ],
                    })(<Input placeholder="请输入租户编号" />)}
                  </FormItem>
                </Col>
              </Row>
            ) : null}
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="用户姓名">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户姓名',
                      },
                    ],
                    initialValue: user.name,
                  })(<Input placeholder="请输入用户姓名" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="账号名称">
                  {getFieldDecorator('account', {
                    rules: [
                      {
                        required: true,
                        message: '请输入账号名称',
                      },
                    ],
                    initialValue: user.account,
                  })(<Input placeholder="请输入账号名称" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="账号密码">
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ],
                  })(<Input placeholder="请输入账号密码" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="账号密码">
                  {getFieldDecorator('password2', {
                    rules: [
                      {
                        required: true,
                        message: '请输入确认密码',
                      },
                    ],
                  })(<Input placeholder="请确认账号密码" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Modal>
    );
  }
}
export default ThirdRegister;
