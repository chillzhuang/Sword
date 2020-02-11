import React, { PureComponent } from 'react';
import { Form, Input, Card, Button, Select } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { DATASOURCE_SUBMIT } from '../../../actions/datasource';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['datasource/submit'],
}))
@Form.create()
class DataSourceAdd extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(DATASOURCE_SUBMIT(values));
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
      <Panel title="新增" back="/tool/datasource" action={action}>
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
              })(<Input placeholder="请输入备注" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default DataSourceAdd;
