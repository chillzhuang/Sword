import { connect } from 'dva';
import { Card, Col, Icon, Row, Tabs } from 'antd';
import React, { PureComponent } from 'react';
import styles from '../../layouts/Sword.less';
import { iconData } from './IconData';
import { MENU_SELECT_ICON } from '../../actions/menu';

const { TabPane } = Tabs;

@connect(({ menu }) => ({
  menu,
}))
class IconPreview extends PureComponent {
  handelClick = type => {
    const { onCancel, dispatch } = this.props;
    dispatch(MENU_SELECT_ICON(type.icon));
    onCancel();
  };

  render() {
    return (
      <Tabs defaultActiveKey="direction">
        {iconData.map(data => (
          <TabPane tab={data.description} key={data.category}>
            <Card className={styles.card} bordered={false}>
              <Row gutter={24} className={styles.iconPreview}>
                {data.icons.map(icon => (
                  <Col span={4} key={icon}>
                    <Icon
                      type={icon}
                      onClick={() => {
                        this.handelClick({ icon });
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Card>
          </TabPane>
        ))}
      </Tabs>
    );
  }
}
export default IconPreview;
