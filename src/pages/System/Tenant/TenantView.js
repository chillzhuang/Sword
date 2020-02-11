import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { TENANT_DETAIL } from '../../../actions/tenant';

const FormItem = Form.Item;

@connect(({ tenant }) => ({
  tenant,
}))
@Form.create()
class TenantView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(TENANT_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/system/tenant/edit/${id}`);
  };

  render() {
    const {
      tenant: { detail },
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
      <Panel title="查看" back="/system/tenant" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="租户ID">
              <span>{detail.tenantId}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="租户名称">
              <span>{detail.tenantName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="联系人">
              <span>{detail.linkman}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="联系电话">
              <span>{detail.contactNumber}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="联系地址">
              <span>{detail.address}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default TenantView;
