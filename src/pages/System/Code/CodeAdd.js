import React, { PureComponent } from 'react';
import { Form, Input, Card, Button, Row, Col, Radio, Select } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { CODE_INIT, CODE_SUBMIT } from '../../../actions/code';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect(({ code, loading }) => ({
  code,
  submitting: loading.effects['code/submit'],
}))
@Form.create()
class CodeAdd extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(CODE_INIT());
  }

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
      code: { init },
      submitting,
    } = this.props;

    const { source, category } = init;

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const formAllItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };

    const action = (
      <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
        提交
      </Button>
    );

    return (
      <Panel title="新增" back="/tool/code" action={action}>
        <Form style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="数据源">
                  {getFieldDecorator('datasourceId', {
                    rules: [
                      {
                        required: true,
                        message: '请选择数据源',
                      },
                    ],
                  })(
                    <Select placeholder="请选择数据源">
                      {source.map(d => (
                        <Select.Option key={d.id} value={d.id}>
                          {d.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
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
              </Col>
              <Col span={10}>
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
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
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
              </Col>
              <Col span={10}>
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
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
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
              </Col>
              <Col span={10}>
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
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="基础业务">
                  {getFieldDecorator('baseMode', {
                    rules: [
                      {
                        required: true,
                        message: '请配置基础业务',
                      },
                    ],
                  })(
                    <RadioGroup name="baseMode">
                      {category.map(d => (
                        <Radio key={d.dictKey} value={d.dictKey}>
                          {d.dictValue}
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="包装器">
                  {getFieldDecorator('wrapMode', {
                    rules: [
                      {
                        required: true,
                        message: '请配置包装器',
                      },
                    ],
                  })(
                    <RadioGroup name="wrapMode">
                      {category.map(d => (
                        <Radio key={d.dictKey} value={d.dictKey}>
                          {d.dictValue}
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="后端生成路径">
                  {getFieldDecorator('apiPath', {
                    rules: [
                      {
                        required: true,
                        message: '请输入后端生成路径',
                      },
                    ],
                  })(<Input placeholder="请输入后端生成路径" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="前端生成路径">
                  {getFieldDecorator('webPath', {
                    rules: [
                      {
                        required: true,
                        message: '请输入前端生成路径',
                      },
                    ],
                  })(<Input placeholder="请输入前端生成路径" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default CodeAdd;
