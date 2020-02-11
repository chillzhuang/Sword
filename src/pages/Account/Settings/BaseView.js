import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { Form, Input, Upload, Button, message, Icon, Card } from 'antd';
import Panel from '../../../components/Panel';
import { getUserInfo, update } from '../../../services/user';
import { getToken } from '../../../utils/authority';

const FormItem = Form.Item;

@Form.create()
class BaseView extends Component {
  state = {
    userId: '',
    avatar: '',
    loading: false,
  };

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { form } = this.props;
    getUserInfo().then(resp => {
      if (resp.success) {
        const userInfo = resp.data;
        Object.keys(form.getFieldsValue()).forEach(key => {
          const obj = {};
          obj[key] = userInfo[key] || null;
          form.setFieldsValue(obj);
        });
        this.setState({ userId: userInfo.id, avatar: userInfo.avatar });
      } else {
        message.error(resp.msg || '获取数据失败');
      }
    });
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ loading: false, avatar: info.file.response.data.link });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    const { userId, avatar } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          id: userId,
          ...values,
          avatar,
        };
        update(params).then(resp => {
          if (resp.success) {
            message.success(resp.msg);
          } else {
            message.error(resp.msg || '提交失败');
          }
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { avatar, loading } = this.state;

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

    const uploadProp = {
      action: '/api/blade-resource/oss/endpoint/put-file',
      headers: {
        'Blade-Auth': getToken(),
      },
    };

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );

    const action = (
      <Button type="primary" onClick={this.handleSubmit}>
        提交
      </Button>
    );

    return (
      <Panel title="个人设置" back="/" action={action}>
        <Form style={{ marginTop: 8 }} hideRequiredMark>
          <Card title="基本信息" bordered={false}>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'app.settings.basic.avatar' })}
            >
              {getFieldDecorator('avatar', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.avatar' }, {}),
                  },
                ],
              })(
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                  {...uploadProp}
                >
                  {avatar ? (
                    <img src={avatar} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'app.settings.basic.nickname' })}
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.nickname-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'app.settings.basic.realname' })}
            >
              {getFieldDecorator('realName', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.realname-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default BaseView;
