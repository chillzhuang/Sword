import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { formatMessage } from 'umi/locale';
import omit from 'omit.js';
import styles from './index.less';
import ItemMap from './map';
import LoginContext from './loginContext';
import { getCaptchaImage } from '../../services/user';
import { setCaptchaKey } from '../../utils/authority';

const FormItem = Form.Item;

class WrapFormItem extends Component {
  static defaultProps = {
    getCaptchaButtonText: 'captcha',
    getCaptchaSecondText: 'second',
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      // 默认白色背景
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    };
  }

  componentWillMount() {
    const { mode, type } = this.props;
    if (type === 'Captcha' && mode === 'image') {
      this.refreshCaptcha();
    }
  }

  componentDidMount() {
    const { updateActive, name } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    // 清除计数器
    clearInterval(this.interval);
  }

  refreshCaptcha = () => {
    // 获取验证码
    getCaptchaImage().then(resp => {
      const {data} = resp;
      if (data.key) {
        this.setState({ image: data.image });
        setCaptchaKey(data.key);
      }
    });
  };

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  getFormItemOptions = ({ onChange, defaultValue, customprops, rules }) => {
    const options = {
      rules: rules || customprops.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    const { count, image } = this.state;

    const {
      form: { getFieldDecorator },
    } = this.props;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      mode,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const otherProps = restProps || {};
    if (type === 'Captcha') {
      if (mode === 'mobile') {
        const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
        return (
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator(name, options)(<Input {...customprops} {...inputProps} />)}
              </Col>
              <Col span={8}>
                <Button
                  disabled={count}
                  className={styles.getCaptcha}
                  size="large"
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
                </Button>
              </Col>
            </Row>
          </FormItem>
        );
      }
      if (mode === 'image') {
        return (
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator(name, options)(
                  <Input
                    {...customprops}
                    placeholder={`${formatMessage({ id: 'validation.captcha.required' })}`}
                  />
                )}
              </Col>
              <Col span={8}>
                <img
                  alt="captcha"
                  src={image}
                  className={styles.getImgCaptcha}
                  onClick={this.refreshCaptcha}
                />
              </Col>
            </Row>
          </FormItem>
        );
      }
    }
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...customprops} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem;
