import React, { PureComponent } from 'react';
import { Form, Card, Row, Col } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import { LOG_ERROR_DETAIL } from '../../../actions/log';
import styles from '../../../layouts/Sword.less';

const FormItem = Form.Item;

@connect(({ log }) => ({
  log,
}))
@Form.create()
class LogErrorView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(LOG_ERROR_DETAIL(id));
  }

  render() {
    const {
      log: { errorDetail },
    } = this.props;

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

    return (
      <Panel title="查看" back="/monitor/log/error">
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务id">
                  <span>{errorDetail.serviceId}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="软件环境">
                  <span>{errorDetail.env}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务host">
                  <span>{errorDetail.serverHost}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务ip">
                  <span>{errorDetail.serverIp}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求方法">
                  <span>{errorDetail.method}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求地址">
                  <span>{errorDetail.requestUri}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求人">
                  <span>{errorDetail.createBy}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求时间">
                  <span>{errorDetail.createTime}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="用户代理">
                  <span>{errorDetail.userAgent}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="请求数据">
                  <span>{errorDetail.params}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="异常名">
                  <span>{errorDetail.exceptionName}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="异常消息">
                  <span>{errorDetail.message}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="异常类">
                  <span>{errorDetail.methodClass}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="文件名">
                  <span>{errorDetail.fileName}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="方法名">
                  <span>{errorDetail.methodName}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="异常行数">
                  <span>{errorDetail.lineNumber}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="异常栈">
                  <span>{errorDetail.stackTrace}</span>
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default LogErrorView;
