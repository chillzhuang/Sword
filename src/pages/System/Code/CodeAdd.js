import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { CODE_SUBMIT } from '../../../actions/code';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['code/submit'],
}))
@Form.create()
class CodeAdd extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(CODE_SUBMIT(values));
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
      <Panel title="新增" back="/tool/code" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="模块名">
              {getFieldDecorator('codeName', {
                rules: [
                  {
                    required: true,
                    message: '请输入模块名',
                  },
                ],
              })(<Input placeholder="请输入模块名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="服务名">
              {getFieldDecorator('serviceName', {
                rules: [
                  {
                    required: true,
                    message: '请输入服务名',
                  },
                ],
              })(<Input placeholder="请输入服务名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="表名">
              {getFieldDecorator('tableName', {
                rules: [
                  {
                    required: true,
                    message: '请输入表名',
                  },
                ],
              })(<Input placeholder="请输入表名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="表前缀名">
              {getFieldDecorator('tablePrefix', {
                rules: [
                  {
                    required: true,
                    message: '请输入表前缀名',
                  },
                ],
              })(<Input placeholder="请输入表前缀名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="主键名">
              {getFieldDecorator('pkName', {
                rules: [
                  {
                    required: true,
                    message: '请输入主键名',
                  },
                ],
              })(<Input placeholder="请输入主键名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="包名">
              {getFieldDecorator('packageName', {
                rules: [
                  {
                    required: true,
                    message: '请输入包名',
                  },
                ],
              })(<Input placeholder="请输入包名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="后端生成路径">
              {getFieldDecorator('apiPath', {
                rules: [
                  {
                    required: true,
                    message: '请输入后端生成路径',
                  },
                ],
              })(<Input placeholder="请输入后端生成路径" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="前端生成路径">
              {getFieldDecorator('webPath', {
                rules: [
                  {
                    required: true,
                    message: '请输入前端生成路径',
                  },
                ],
              })(<Input placeholder="请输入前端生成路径" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default CodeAdd;
