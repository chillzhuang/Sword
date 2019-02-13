import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
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
      <Button type="primary" onClick={this.handleEdit}>
        修改
      </Button>
    );

    return (
      <Panel title="查看" back="/tool/code" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="模块名">
              <span>{detail.codeName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="服务名">
              <span>{detail.serviceName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="表名">
              <span>{detail.tableName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="表前缀名">
              <span>{detail.tablePrefix}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="主键名">
              <span>{detail.pkName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="包名">
              <span>{detail.packageName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="后端生成路径">
              <span>{detail.apiPath}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="前端生成路径">
              <span>{detail.webPath}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default CodeView;
