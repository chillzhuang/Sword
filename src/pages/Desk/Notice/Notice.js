import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Select, DatePicker } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { NOTICE_INIT, NOTICE_LIST } from '../../../actions/notice';
import func from '../../../utils/Func';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ notice, loading }) => ({
  notice,
  loading: loading.models.notice,
}))
@Form.create()
class Notice extends PureComponent {
  // ============ 初始化数据 ===============
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(NOTICE_INIT());
  }

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;

    const { dateRange } = params;

    const payload = {
      ...params,
      begin_date: dateRange ? func.format(dateRange[0], 'YYYY-MM-DD') : null,
      end_date: dateRange ? func.format(dateRange[1], 'YYYY-MM-DD') : null,
    };

    payload.dateRange = null;

    dispatch(NOTICE_LIST(payload));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const {
      form,
      notice: {
        init: { category },
      },
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label={<FormattedMessage id="desk.notice.category" />}>
            {getFieldDecorator('category')(
              <Select placeholder={formatMessage({ id: 'desk.notice.category.placeholder' })}>
                {category.map(d => (
                  <Select.Option key={d.dictKey} value={d.dictKey}>
                    {d.dictValue}
                  </Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label={<FormattedMessage id="desk.notice.title" />}>
            {getFieldDecorator('title')(
              <Input placeholder={formatMessage({ id: 'desk.notice.title.placeholder' })} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label={<FormattedMessage id="desk.notice.date" />}>
            {getFieldDecorator('dateRange')(
              <RangePicker
                placeholder={[
                  formatMessage({ id: 'desk.notice.date.start' }),
                  formatMessage({ id: 'desk.notice.date.end' }),
                ]}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="button.search.name" />
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={onReset}>
              <FormattedMessage id="button.reset.name" />
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const code = 'notice';

    const {
      form,
      loading,
      notice: { data },
    } = this.props;

    const columns = [
      {
        title: formatMessage({ id: 'desk.notice.title' }),
        dataIndex: 'title',
      },
      {
        title: formatMessage({ id: 'desk.notice.category' }),
        dataIndex: 'categoryName',
      },
      {
        title: formatMessage({ id: 'desk.notice.content' }),
        dataIndex: 'content',
      },
      {
        title: formatMessage({ id: 'desk.notice.date' }),
        dataIndex: 'date',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          loading={loading}
          data={data}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default Notice;
