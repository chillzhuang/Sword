import React, { Fragment, PureComponent } from 'react';
import { Button, Card, Col, Divider, Form, Input, message, Modal, Row, Select } from 'antd';
import { connect } from 'dva';
import Grid from '../../../components/Sword/Grid';
import styles from '../../../layouts/Sword.less';
import { submitDataScope, removeDataScope, scopeDataDetail } from '../../../services/menu';
import func from '../../../utils/Func';
import { MENU_LOAD_DATA_SCOPE_DICT, MENU_LOAD_DATA_SCOPE_DRAWER } from '../../../actions/menu';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu,
}))
@Form.create()
class DataScopeCrud extends PureComponent {
  state = {
    stateVisible: false,
    viewMode: false,
    params: {},
    detail: {
      scopeType: 1,
    },
  };

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch(MENU_LOAD_DATA_SCOPE_DICT());
  }

  // ============ 查询 ===============
  handleSearch = params => {
    const {
      dispatch,
      menu: { drawer },
    } = this.props;
    const { menuId } = drawer;
    this.setState({ params });
    const search = { scopeName: params.scopeName, resourceCode: params.resourceCode, menuId};
    dispatch(MENU_LOAD_DATA_SCOPE_DRAWER(search));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="权限名称">
            {getFieldDecorator('scopeName')(<Input placeholder="请输入权限名称" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="权限编号">
            {getFieldDecorator('resourceCode')(<Input placeholder="请输入权限编号" />)}
          </FormItem>
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={onReset}>
              重置
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form,
      menu: { drawer },
    } = this.props;
    const { menuId } = drawer;
    const {
      params,
      detail: { id },
    } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let formData = Object.assign(values, { menuId });
        if (!func.isEmpty(id)) {
          formData = Object.assign(values, { id });
        }
        submitDataScope(formData).then(resp => {
          if (resp.success) {
            message.success(resp.msg);
          } else {
            message.error(resp.msg || '提交失败');
          }
          this.handleSearch(params);
          this.handleStateCancel();
          form.resetFields();
        });
      }
    });
  };

  handleStateCancel = () => {
    this.setState({
      stateVisible: false,
      viewMode: false,
      detail: { id: '' }
    });
  };

  handleClick = (code, record) => {
    const {
      menu: { drawer },
    } = this.props;
    const { menuId, menuCode } = drawer;
    if (code === 'data_scope_add') {
      this.setState({
        stateVisible: true,
        detail: {
          id: '',
          menuId,
          resourceCode: menuCode,
        },
      });
    } else if (code === 'data_scope_edit') {
      const { id } = record;
      scopeDataDetail({ id }).then(resp => {
        if (resp.success) {
          this.setState({ stateVisible: true, viewMode: false, detail: resp.data });
        }
      });
    } else if (code === 'data_scope_view') {
      const { id } = record;
      scopeDataDetail({ id }).then(resp => {
        if (resp.success) {
          this.setState({ stateVisible: true, viewMode: true, detail: resp.data });
        }
      });
    } else if (code === 'data_scope_delete') {
      const { id } = record;
      const { params } = this.state;
      const refresh = this.handleSearch;
      Modal.confirm({
        title: '删除确认',
        content: '确定删除该条记录?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          removeDataScope({ ids: id }).then(resp => {
            if (resp.success) {
              message.success(resp.msg);
              refresh(params);
            } else {
              message.error(resp.msg || '删除失败');
            }
          });
        },
        onCancel() {},
      });
    }
  };

  renderLeftButton = () => (
    <Button icon="plus" type="primary" onClick={() => this.handleClick('data_scope_add')}>
      新增
    </Button>
  );

  render() {
    const {
      form,
      menu: { drawer, dict },
      loading,
    } = this.props;

    const { stateVisible, viewMode, detail } = this.state;

    const { getFieldDecorator } = form;

    const { dataScope } = drawer;
    const { dataScopeType } = dict;

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

    const columns = [
      {
        title: '权限名称',
        dataIndex: 'scopeName',
      },
      {
        title: '权限编号',
        dataIndex: 'resourceCode',
      },
      {
        title: '权限字段',
        dataIndex: 'scopeColumn',
      },
      {
        title: '规则类型',
        dataIndex: 'scopeTypeName',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
          <Fragment>
            <div style={{ textAlign: 'center' }}>
              <Fragment key="edit">
                <a title="修改" onClick={() => this.handleClick('data_scope_edit', record)}>
                  修改
                </a>
              </Fragment>
              <Divider type="vertical" />
              <Fragment key="delete">
                <a title="删除" onClick={() => this.handleClick('data_scope_delete', record)}>
                  删除
                </a>
              </Fragment>
              <Divider type="vertical" />
              <Fragment key="view">
                <a title="查看" onClick={() => this.handleClick('data_scope_view', record)}>
                  查看
                </a>
              </Fragment>
            </div>
          </Fragment>
        ),
      },
    ];

    return (
      <div>
        <Grid
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          renderLeftButton={this.renderLeftButton}
          loading={loading}
          data={dataScope}
          columns={columns}
        />
        <Modal
          title="数据权限配置"
          width={1000}
          visible={stateVisible}
          onOk={this.handleSubmit}
          onCancel={this.handleStateCancel}
        >
          <Form style={{ marginTop: 8 }}>
            <Card className={styles.card} bordered={false}>
              <Row gutter={24}>
                <Col span={10}>
                  <FormItem {...formItemLayout} label="权限名称">
                    {getFieldDecorator('scopeName', {
                      initialValue: detail.scopeName,
                    })(<Input disabled={viewMode} placeholder="请输入权限名称" />)}
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout} label="权限编号">
                    {getFieldDecorator('resourceCode', {
                      initialValue: detail.resourceCode,
                    })(<Input disabled={viewMode} placeholder="请输入权限编号" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={10}>
                  <FormItem {...formItemLayout} label="权限字段">
                    {getFieldDecorator('scopeColumn', {
                      initialValue: detail.scopeColumn,
                    })(<Input disabled={viewMode} placeholder="请输入权限字段" />)}
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout} label="规则类型">
                    {getFieldDecorator('scopeType', {
                      initialValue: detail.scopeType,
                    })(
                      <Select disabled={viewMode} placeholder="请选择规则类型">
                        {dataScopeType.map(d => (
                          <Select.Option key={d.dictKey} value={d.dictKey}>
                            {d.dictValue}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="可见字段">
                    {getFieldDecorator('scopeField', {
                      initialValue: detail.scopeField,
                    })(<Input disabled={viewMode} placeholder="请输入可见字段" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="权限类名">
                    {getFieldDecorator('scopeClass', {
                      initialValue: detail.scopeClass,
                    })(<Input disabled={viewMode} placeholder="请输入权限类名" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="规则值">
                    {getFieldDecorator('scopeValue', {
                      initialValue: detail.scopeValue,
                    })(<TextArea disabled={viewMode} rows={4} placeholder="请输入规则值" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="备注">
                    {getFieldDecorator('remark', {
                      initialValue: detail.remark,
                    })(<TextArea disabled={viewMode} rows={2} placeholder="请输入备注" />)}
                  </FormItem>
                </Col>
              </Row>
            </Card>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default DataScopeCrud;
