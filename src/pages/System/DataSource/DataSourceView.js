import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { DATASOURCE_DETAIL } from '../../../actions/datasource';

const FormItem = Form.Item;

@connect(({ datasource }) => ({
  datasource,
}))
@Form.create()
class DataSourceView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(DATASOURCE_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/tool/datasource/edit/${id}`);
  };

  render() {
    const {
      datasource: { detail },
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
      <Panel title="查看" back="/tool/datasource" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="名称">
              <span>{detail.name}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="驱动类">
              <span>{detail.driverClass}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="连接地址">
              <span>{detail.url}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="用户名">
              <span>{detail.username}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="密码">
              <span>{detail.password}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              <span>{detail.remark}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default DataSourceView;
