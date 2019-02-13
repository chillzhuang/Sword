import React, { PureComponent } from 'react';
import { Form, Card, Row, Col } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import { LOG_USUAL_DETAIL } from '../../../actions/log';
import styles from '../../../layouts/Sword.less';

const FormItem = Form.Item;

@connect(({ log }) => ({
  log,
}))
@Form.create()
class LogUsualView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(LOG_USUAL_DETAIL(id));
  }

  render() {
    const {
      log: { usualDetail },
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
      <Panel title="查看" back="/monitor/log/usual">
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务id">
                  <span>{usualDetail.serviceId}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="软件环境">
                  <span>{usualDetail.env}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务host">
                  <span>{usualDetail.serverHost}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务ip">
                  <span>{usualDetail.serverIp}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="日志级别">
                  <span>{usualDetail.logLevel}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="日志id">
                  <span>{usualDetail.logId}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求方法">
                  <span>{usualDetail.method}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求地址">
                  <span>{usualDetail.requestUri}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求人">
                  <span>{usualDetail.createBy}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="请求时间">
                  <span>{usualDetail.createTime}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="用户代理">
                  <span>{usualDetail.userAgent}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="请求数据">
                  <span>{usualDetail.params}</span>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="日志数据">
                  <span>{usualDetail.logData}</span>
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default LogUsualView;
