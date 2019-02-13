import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { PARAM_DETAIL, PARAM_SUBMIT } from '../../../actions/param';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ param, loading }) => ({
  param,
  submitting: loading.effects['param/submit'],
}))
@Form.create()
class ParamAdd extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(PARAM_DETAIL(id));
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
        dispatch(PARAM_SUBMIT(params));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      param: { detail },
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
      <Panel title="修改" back="/system/param" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="参数名称">
              {getFieldDecorator('paramName', {
                rules: [
                  {
                    required: true,
                    message: '请输入参数名称',
                  },
                ],
                initialValue: detail.paramName,
              })(<Input placeholder="请输入参数名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数键名">
              {getFieldDecorator('paramKey', {
                rules: [
                  {
                    required: true,
                    message: '请输入参数键名',
                  },
                ],
                initialValue: detail.paramKey,
              })(<Input placeholder="请输入参数键名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数键值">
              {getFieldDecorator('paramValue', {
                rules: [
                  {
                    required: true,
                    message: '请输入参数键值',
                  },
                ],
                initialValue: detail.paramValue,
              })(<Input placeholder="请输入参数键值" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数描述">
              {getFieldDecorator('remark', { initialValue: detail.paramValue })(
                <TextArea placeholder="请输入参数描述" />
              )}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default ParamAdd;
