import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { CLIENT_DETAIL } from '../../../actions/client';

const FormItem = Form.Item;

@connect(({ client }) => ({
  client,
}))
@Form.create()
class ClientView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(CLIENT_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/system/client/edit/${id}`);
  };

  render() {
    const {
      client: { detail },
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
      <Panel title="查看" back="/system/client" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="客户端id">
              <span>{detail.clientId}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="客户端密钥">
              <span>{detail.clientSecret}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="资源集合">
              <span>{detail.resourceIds}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="授权范围">
              <span>{detail.scope}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="授权类型">
              <span>{detail.authorizedGrantTypes}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="令牌过期秒数">
              <span>{detail.accessTokenValidity}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="刷新令牌过期秒数">
              <span>{detail.refreshTokenValidity}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="回调地址">
              <span>{detail.webServerRedirectUri}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="权限">
              <span>{detail.authorities}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="附加说明">
              <span>{detail.additionalInformation}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="自动授权">
              <span>{detail.autoapprove}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default ClientView;
