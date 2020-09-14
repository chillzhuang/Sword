import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Checkbox, Alert, Icon, Row, Col, Card } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';
import { tenantMode, captchaMode, authUrl } from '../../defaultSettings';
import { getQueryString, getTopUrl, validateNull } from '@/utils/utils';

const { Tab, TenantId, UserName, Password, Captcha, Submit } = Login;

@connect(({ login, tenant, loading }) => ({
  login,
  tenant,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  componentDidMount() {
    const domain = getTopUrl();
    const redirectUrl = '/oauth/redirect/';
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;

    let source = getQueryString('source');
    const code = getQueryString('code');
    const state = getQueryString('state');
    if (validateNull(source) && domain.includes(redirectUrl)) {
      // eslint-disable-next-line prefer-destructuring
      source = domain.split('?')[0];
      // eslint-disable-next-line prefer-destructuring
      source = source.split(redirectUrl)[1];
    }
    if (!validateNull(source) && !validateNull(code) && !validateNull(state)) {
      dispatch({
        type: 'login/socialLogin',
        payload: { source, code, state, tenantId: '000000' },
      });
    } else {
      dispatch({
        type: 'menu/fetchMenuData',
        payload: { routes, authority },
      });
      dispatch({
        type: 'tenant/fetchInfo',
        payload: { domain },
      });
    }
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
      const { dispatch,
        tenant: { info } } = this.props;
      const { tenantId } = info;
      dispatch({
        type: 'login/login',
        payload: {
          tenantId,
          ...values,
          type,
        },
      });
    }
  };

  handleClick = source => {
    window.location.href = `${authUrl}/${source}`;
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
    const {
      login,
      submitting,
      tenant: { info },
    } = this.props;
    const { type, autoLogin } = this.state;
    const { tenantId } = info;
    const tenantVisible = tenantMode && tenantId === '000000';
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
            {tenantVisible ? (
              <TenantId
                name="tenantId"
                defaultValue={`${tenantId}`}
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
            {captchaMode ? <Captcha name="code" mode="image" /> : null}
          </Tab>
          <Tab key="social" tab={formatMessage({ id: 'app.login.tab-login-social' })}>
            <Card className={styles.card} bordered={false}>
              <Row gutter={24} className={styles.iconPreview}>
                <Col span={4} key="github">
                  <Icon
                    type="github"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('github');
                    }}
                  />
                </Col>
                <Col span={4} key="gitee">
                  <Icon
                    type="google-circle"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('gitee');
                    }}
                  />
                </Col>
                <Col span={4} key="wechat">
                  <Icon
                    type="wechat"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('wechat_open');
                    }}
                  />
                </Col>
                <Col span={4} key="dingtalk">
                  <Icon
                    type="dingtalk-circle"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('dingtalk');
                    }}
                  />
                </Col>
                <Col span={4} key="alipay">
                  <Icon
                    type="alipay-circle"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('alipay');
                    }}
                  />
                </Col>
                <Col span={4} key="taobao">
                  <Icon
                    type="taobao-circle"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('taobao');
                    }}
                  />
                </Col>
              </Row>
            </Card>
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
