import React, { PureComponent } from 'react';
import { Form, Card, Row, Col } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import { LOG_API_DETAIL } from '../../../actions/log';
import styles from '../../../layouts/Sword.less';

const FormItem = Form.Item;

@connect(({ log }) => ({
  log,
}))
@Form.create()
class LogApiView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(LOG_API_DETAIL(id));
  }

  render() {
    const {
      log: { apiDetail },
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
      <Panel title="查看" back="/monitor/log/api">
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务id">
                  <span>{apiDetail.serviceId}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="软件环境">
                  <span>{apiDetail.env}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务host">
                  <span>{apiDetail.serverHost}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务ip">
                  <span>{apiDetail.serverIp}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="日志名">
                  <span>{apiDetail.title}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="客户ip">
                  <span>{apiDetail.remoteIp}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求方法">
                  <span>{apiDetail.method}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求地址">
                  <span>{apiDetail.requestUri}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="方法类">
                  <span>{apiDetail.methodClass}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="方法名">
                  <span>{apiDetail.methodName}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求人">
                  <span>{apiDetail.createBy}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求时间">
                  <span>{apiDetail.createTime}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="用户代理">
                  <span>{apiDetail.userAgent}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="请求数据">
                  <span>{apiDetail.params}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="请求耗时">
                  <span>{apiDetail.time}ms</span>
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default LogApiView;
