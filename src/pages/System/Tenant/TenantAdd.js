import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { TENANT_SUBMIT } from '../../../actions/tenant';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['tenant/submit'],
}))
@Form.create()
class TenantAdd extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(TENANT_SUBMIT(values));
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
      <Panel title="新增" back="/system/tenant" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="租户名称">
              {getFieldDecorator('tenantName', {
                rules: [
                  {
                    required: true,
                    message: '请输入租户名称',
                  },
                ],
              })(<Input placeholder="请输入租户名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="联系人">
              {getFieldDecorator('linkman', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系人',
                  },
                ],
              })(<Input placeholder="请输入联系人" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="联系电话">
              {getFieldDecorator('contactNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系电话',
                  },
                ],
              })(<Input placeholder="请输入联系电话" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="联系地址">
              {getFieldDecorator('address')(
                <TextArea style={{ minHeight: 32 }} rows={3} placeholder="请输入联系地址" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="绑定域名">
              {getFieldDecorator('domain')(<Input placeholder="请输入绑定域名" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default TenantAdd;
