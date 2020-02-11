import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { PARAM_DETAIL } from '../../../actions/param';

const FormItem = Form.Item;

@connect(({ param }) => ({
  param,
}))
@Form.create()
class ParamView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(PARAM_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/system/param/edit/${id}`);
  };

  render() {
    const {
      param: { detail },
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
      <Panel title="查看" back="/system/param" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="参数名称">
              <span>{detail.paramName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="参数键名">
              <span>{detail.paramKey}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="参数键值">
              <span>{detail.paramValue}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="参数描述">
              <span>{detail.remark}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default ParamView;
