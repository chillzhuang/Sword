import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { CODE_DETAIL } from '../../../actions/code';

const FormItem = Form.Item;

@connect(({ code }) => ({
  code,
}))
@Form.create()
class CodeView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(CODE_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/tool/code/edit/${id}`);
  };

  render() {
    const {
      code: { detail },
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

    const action = (
      <Button type="primary" onClick={this.handleEdit}>
        修改
      </Button>
    );

    return (
      <Panel title="查看" back="/tool/code" action={action}>
        <Form style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="模块名">
                  <span>{detail.codeName}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="服务名">
                  <span>{detail.serviceName}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="表名">
                  <span>{detail.tableName}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="表前缀名">
                  <span>{detail.tablePrefix}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="主键名">
                  <span>{detail.pkName}</span>
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="包名">
                  <span>{detail.packageName}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="后端生成路径">
                  <span>{detail.apiPath}</span>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="前端生成路径">
                  <span>{detail.webPath}</span>
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default CodeView;
