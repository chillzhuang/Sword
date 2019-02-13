import React, { PureComponent } from 'react';
import { Form, Input, Card, Row, Col, Button, InputNumber, TreeSelect } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import func from '../../../utils/Func';
import { DICT_INIT, DICT_SUBMIT, DICT_DETAIL, DICT_CLEAR_DETAIL } from '../../../actions/dict';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ dict, loading }) => ({
  dict,
  submitting: loading.effects['dict/submit'],
}))
@Form.create()
class DictAdd extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    if (func.notEmpty(id)) {
      dispatch(DICT_DETAIL(id));
    } else {
      dispatch(DICT_CLEAR_DETAIL());
    }
    dispatch(DICT_INIT());
  }

  componentDidMount() {
    // 为字典名称增加焦点
    this.dictValueRef.focus();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        dispatch(DICT_SUBMIT(values));
      }
    });
  };

  onParentIdChange = (value, title) => {
    console.log(value);
    console.log(title);
  };

  render() {
    const {
      form: { getFieldDecorator },
      dict: {
        detail,
        init: { tree },
      },
      submitting,
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
      <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
        提交
      </Button>
    );

    return (
      <Panel title="新增" back="/system/dict" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="字典编号">
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '请选择字典编号',
                      },
                    ],
                    initialValue: detail.code,
                  })(<Input disabled={func.notEmpty(detail.code)} placeholder="请输入字典编号" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="上级字典">
                  {getFieldDecorator('parentId', {
                    initialValue: detail.id,
                  })(
                    <TreeSelect
                      disabled={func.notEmpty(detail.id)}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={tree}
                      placeholder="请选择上级字典"
                      allowClear
                      showSearch
                      treeNodeFilterProp="title"
                      onChange={this.onParentIdChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} className={styles.inputItem} label="字典排序">
                  {getFieldDecorator('sort', {
                    rules: [
                      {
                        required: true,
                        message: '请输入字典排序',
                      },
                    ],
                    initialValue: detail.nextSort,
                  })(<InputNumber placeholder="请输入字典排序" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="字典名称">
                  {getFieldDecorator('dictValue', {
                    rules: [
                      {
                        required: true,
                        message: '请输入字典名称',
                      },
                    ],
                  })(
                    <Input
                      ref={input => {
                        this.dictValueRef = input;
                      }}
                      placeholder="请输入字典名称"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} className={styles.inputItem} label="字典键值">
                  {getFieldDecorator('dictKey', {
                    rules: [
                      {
                        required: true,
                        message: '请输入字典键值',
                      },
                    ],
                    initialValue: detail.nextKey,
                  })(<InputNumber min={-1} placeholder="请输入字典键值" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card title="其他信息" className={styles.card} bordered={false}>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="字典备注">
                  {getFieldDecorator('remark')(<TextArea rows={4} placeholder="请输入字典备注" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default DictAdd;
