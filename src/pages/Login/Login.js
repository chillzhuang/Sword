import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Checkbox, Alert, notification, Icon } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';
import { tenantMode } from '../../defaultSettings';

const { Tab, TenantId, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  componentWillMount() {
    notification.config({
      placement: 'bottomRight',
    });
    notification.destroy();
    notification.open({
      message: '手册信息',
      description: (
        <div>
          <p>Sword开发手册：<a target="_blank" href="https://www.kancloud.cn/smallchill/sword">点击查看</a></p>
          <p>SpringBlade开发手册：<a target="_blank" href="https://www.kancloud.cn/smallchill/blade">点击查看</a></p>
        </div>
      ),
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      duration: 0,
    });
    setTimeout(() => {
      notification.open({
        message: '授权信息',
        description: (
          <div>
            <p>欢迎使用Sword!</p>
            <p>该系统可用BladeX增强开发，</p>
            <p>若要商用强烈推荐高度定制的商业化框架，具体授权信息请访问如下地址。</p>
            <p>
              BladeX 授权地址：
              <a target="_blank" href="https://bladex.vip/#/vip">
                点击授权
              </a>
            </p>
          </div>
        ),
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        duration: 0,
      });
    }, 500);
  }

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            {tenantMode ? (
              <TenantId
                name="tenantId"
                defaultValue="000000"
                placeholder={`${formatMessage({ id: 'app.login.tenantId' })}: 000000`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.tenantId.required' }),
                  },
                ]}
              />
            ) : null}
            <UserName
              name="account"
              defaultValue="admin"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}: admin`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              defaultValue="admin"
              placeholder={`${formatMessage({ id: 'app.login.password' })}: admin`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
