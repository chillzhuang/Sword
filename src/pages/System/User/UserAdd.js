import React, { PureComponent } from 'react';
import { Form, Input, Card, Row, Col, Button, TreeSelect, Select, DatePicker, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { USER_INIT, USER_CHANGE_INIT, USER_SUBMIT } from '../../../actions/user';
import func from '../../../utils/Func';
import { tenantMode } from '../../../defaultSettings';

const FormItem = Form.Item;

@connect(({ user, loading }) => ({
  user,
  submitting: loading.effects['user/submit'],
}))
@Form.create()
class UserAdd extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(USER_INIT());
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const password = form.getFieldValue('password');
        const password2 = form.getFieldValue('password2');
        if (password !== password2) {
          message.warning('两次密码输入不一致');
        } else {
          const params = {
            ...values,
            roleId: func.join(values.roleId),
            deptId: func.join(values.deptId),
            birthday: func.format(values.birthday),
          };
          dispatch(USER_SUBMIT(params));
        }
      }
    });
  };

  handleChange = value => {
    const { dispatch, form } = this.props;
    form.resetFields(['roleId', 'deptId']);
    dispatch(USER_CHANGE_INIT({ tenantCode: value }));
  };

  render() {
    const {
      form: { getFieldDecorator },
      user: {
        init: { roleTree, deptTree, tenantList },
      },
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
      <Panel title="新增" back="/system/user" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="登录账号">
                  {getFieldDecorator('account', {
                    rules: [
                      {
                        required: true,
                        message: '请输入登录账号',
                      },
                    ],
                  })(<Input placeholder="请输入登录账号" />)}
                </FormItem>
              </Col>
            </Row>
            {tenantMode ? (
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="所属租户">
                    {getFieldDecorator('tenantCode', {
                      rules: [
                        {
                          required: true,
                          message: '请选择所属租户',
                        },
                      ],
                    })(
                      <Select
                        showSearch
                        onChange={this.handleChange}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        allowClear
                        placeholder="请选择所属租户"
                      >
                        {tenantList.map(d => (
                          <Select.Option key={d.tenantCode} value={d.tenantCode}>
                            {d.tenantName}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            ) : null}
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="密码">
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ],
                  })(<Input type="password" placeholder="请输入密码" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="确认密码">
                  {getFieldDecorator('password2', {
                    rules: [
                      {
                        required: true,
                        message: '请输入确认密码',
                      },
                    ],
                  })(<Input type="password" placeholder="请输入确认密码" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="用户昵称">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户昵称',
                      },
                    ],
                  })(<Input placeholder="请输入用户昵称" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="用户姓名">
                  {getFieldDecorator('realName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户姓名',
                      },
                    ],
                  })(<Input placeholder="请输入用户姓名" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="所属角色">
                  {getFieldDecorator('roleId', {
                    rules: [
                      {
                        required: true,
                        message: '请选择所属角色',
                      },
                    ],
                  })(
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={roleTree}
                      allowClear
                      showSearch
                      treeNodeFilterProp="title"
                      multiple
                      placeholder="请选择所属角色"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="所属部门">
                  {getFieldDecorator('deptId', {
                    rules: [
                      {
                        required: true,
                        message: '请选择所属部门',
                      },
                    ],
                  })(
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={deptTree}
                      allowClear
                      showSearch
                      treeNodeFilterProp="title"
                      multiple
                      placeholder="请选择所属部门"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="手机号码">
                  {getFieldDecorator('phone')(<Input placeholder="请输入手机号码" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="电子邮箱">
                  {getFieldDecorator('email')(<Input placeholder="请输入电子邮箱" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="用户性别">
                  {getFieldDecorator('sex')(
                    <Select placeholder="请选择用户性别">
                      <Select.Option key={1} value={1}>
                        男
                      </Select.Option>
                      <Select.Option key={2} value={2}>
                        女
                      </Select.Option>
                      <Select.Option key={3} value={3}>
                        未知
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="用户生日">
                  {getFieldDecorator('birthday')(
                    <DatePicker
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                      placeholder="请选择用户生日"
                    />
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

export default UserAdd;
