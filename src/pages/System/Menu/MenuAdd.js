import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Card,
  Row,
  Col,
  Button,
  InputNumber,
  TreeSelect,
  Radio,
  Icon,
  Modal,
} from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import func from '../../../utils/Func';
import { MENU_INIT, MENU_SUBMIT, MENU_DETAIL, MENU_CLEAR_DETAIL } from '../../../actions/menu';
import IconPreview from '../../../components/IconPreview';

const FormItem = Form.Item;
const { TextArea, Search } = Input;
const RadioGroup = Radio.Group;

@connect(({ menu, loading }) => ({
  menu,
  submitting: loading.effects['menu/submit'],
}))
@Form.create()
class MenuAdd extends PureComponent {
  state = { visible: false };

  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    if (func.notEmpty(id)) {
      dispatch(MENU_DETAIL(id));
    } else {
      dispatch(MENU_CLEAR_DETAIL());
    }
    dispatch(MENU_INIT());
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        dispatch(MENU_SUBMIT(values));
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      menu: {
        detail,
        init: { tree },
      },
      submitting,
    } = this.props;

    const { visible } = this.state;

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
      <Panel title="新增" back="/system/menu" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="菜单名称">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入菜单名称',
                      },
                    ],
                  })(<Input placeholder="请输入菜单名称" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="路由地址">
                  {getFieldDecorator('path', {
                    rules: [
                      {
                        required: true,
                        message: '请输入路由地址',
                      },
                    ],
                  })(<Input min={0} placeholder="请输入路由地址" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="上级菜单">
                  {getFieldDecorator('parentId', {
                    initialValue: detail.category === 2 ? detail.parentId : detail.id,
                  })(
                    <TreeSelect
                      disabled={func.notEmpty(detail.id)}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={tree}
                      allowClear
                      showSearch
                      treeNodeFilterProp="title"
                      placeholder="请选择上级菜单"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="菜单图标">
                  {getFieldDecorator('source', {
                    initialValue: detail.source,
                  })(
                    <Search
                      prefix={
                        <Icon type={func.isEmpty(detail.source) ? 'setting' : detail.source} />
                      }
                      placeholder="请选择菜单图标"
                      onSearch={this.showModal}
                      enterButton
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="菜单编号">
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '请输入菜单编号',
                      },
                    ],
                    initialValue: detail.nextSort,
                  })(<Input placeholder="请输入菜单编号" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="菜单类型">
                  {getFieldDecorator('category', {
                    rules: [
                      {
                        required: true,
                        message: '请选择菜单类型',
                      },
                    ],
                    initialValue: 1,
                  })(
                    <RadioGroup name="category">
                      <Radio value={1}>菜单</Radio>
                      <Radio value={2}>按钮</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="菜单别名">
                  {getFieldDecorator('alias', {
                    rules: [
                      {
                        required: true,
                        message: '请选择菜单别名',
                      },
                    ],
                    initialValue: detail.nextSort,
                  })(<Input placeholder="请选择菜单别名" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="按钮功能">
                  {getFieldDecorator('action', {
                    rules: [
                      {
                        required: true,
                        message: '请选择按钮功能',
                      },
                    ],
                    initialValue: 1,
                  })(
                    <RadioGroup name="action">
                      <Radio value={1}>工具栏</Radio>
                      <Radio value={2}>操作栏</Radio>
                      <Radio value={3}>工具操作栏</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} className={styles.inputItem} label="菜单排序">
                  {getFieldDecorator('sort', {
                    rules: [
                      {
                        required: true,
                        message: '请输入菜单排序',
                      },
                    ],
                    initialValue: detail.nextSort,
                  })(<InputNumber placeholder="请输入菜单排序" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="新窗口打开">
                  {getFieldDecorator('isOpen', {
                    rules: [
                      {
                        required: true,
                        message: '请选择是否新窗口打开',
                      },
                    ],
                    initialValue: 1,
                  })(
                    <RadioGroup name="isOpen">
                      <Radio value={1}>否</Radio>
                      <Radio value={2}>是</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card title="其他信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="菜单备注">
                  {getFieldDecorator('remark')(<TextArea rows={4} placeholder="请输入菜单备注" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
        <Modal width={900} visible={visible} onCancel={this.handleCancel} footer={null}>
          <IconPreview onCancel={this.handleCancel} />
        </Modal>
      </Panel>
    );
  }
}

export default MenuAdd;
