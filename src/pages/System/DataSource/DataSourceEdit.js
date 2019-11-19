import React, { PureComponent } from 'react';
import { Form, Input, Card, Button, Select } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { DATASOURCE_DETAIL, DATASOURCE_SUBMIT } from '../../../actions/datasource';

const FormItem = Form.Item;

@connect(({ datasource, loading }) => ({
  datasource,
  submitting: loading.effects['datasource/submit'],
}))
@Form.create()
class DataSourceEdit extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(DATASOURCE_DETAIL(id));
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
        console.log(params);
        dispatch(DATASOURCE_SUBMIT(params));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      datasource: { detail },
      submitting,
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
      <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
        提交
      </Button>
    );

    return (
      <Panel title="修改" back="/tool/datasource" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
                initialValue: detail.name,
              })(<Input placeholder="请输入名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="驱动类">
              {getFieldDecorator('driverClass', {
                rules: [
                  {
                    required: true,
                    message: '请输入驱动类',
                  },
                ],
                initialValue: detail.driverClass,
              })(
                <Select placeholder="请选择驱动类">
                  <Select.Option key={1} value="com.mysql.cj.jdbc.Driver">
                    com.mysql.cj.jdbc.Driver
                  </Select.Option>
                  <Select.Option key={2} value="org.postgresql.Driver">
                    org.postgresql.Driver
                  </Select.Option>
                  <Select.Option key={3} value="oracle.jdbc.OracleDriver">
                    oracle.jdbc.OracleDriver
                  </Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="连接地址">
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: true,
                    message: '请输入连接地址',
                  },
                ],
                initialValue: detail.url,
              })(<Input placeholder="请输入连接地址" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
                initialValue: detail.username,
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ],
                initialValue: detail.password,
              })(<Input placeholder="请输入密码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                rules: [
                  {
                    required: true,
                    message: '请输入备注',
                  },
                ],
                initialValue: detail.remark,
              })(<Input placeholder="请输入备注" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default DataSourceEdit;
