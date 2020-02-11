import React, { PureComponent } from 'react';
import { Form, Input, Card, Select, Button, DatePicker } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import moment from 'moment';
import Panel from '../../../components/Panel';
import { NOTICE_INIT, NOTICE_SUBMIT } from '../../../actions/notice';
import func from '../../../utils/Func';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ notice, loading }) => ({
  notice,
  submitting: loading.effects['notice/submit'],
}))
@Form.create()
class NoticeAdd extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(NOTICE_INIT());
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;

      const params = {
        ...values,
        releaseTime: func.format(values.releaseTime),
      };

      dispatch(NOTICE_SUBMIT(params));
    });
  };

  disabledDate = current =>
    // Can not select days before today
    current && current < moment().endOf('day');

  render() {
    const {
      form: { getFieldDecorator },
      notice: { init },
      submitting,
    } = this.props;

    const { category } = init;

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
        <FormattedMessage id="button.submit.name" />
      </Button>
    );

    return (
      <Panel title={<FormattedMessage id="button.add.name" />} back="/desk/notice" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card bordered={false}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.title" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.title.validation' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.category" />}>
              {getFieldDecorator('category', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.category.validation' }),
                  },
                ],
              })(
                <Select placeholder={formatMessage({ id: 'desk.notice.category.placeholder' })}>
                  {category.map(d => (
                    <Select.Option key={d.dictKey} value={d.dictKey}>
                      {d.dictValue}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.date" />}>
              {getFieldDecorator('releaseTime', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.date.validation' }),
                  },
                ],
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={this.disabledDate}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="desk.notice.content" />}>
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'desk.notice.content.validation' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'desk.notice.content.placeholder' })}
                  rows={10}
                />
              )}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default NoticeAdd;
