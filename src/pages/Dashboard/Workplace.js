import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar } from 'antd';

import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Workplace.less';

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

@connect(({ user, project, activities, loading }) => ({
  currentUser: user.currentUser,
  project,
  activities,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      currentUser,
      currentUserLoading,
      project: { notice },
      projectLoading,
      activitiesLoading,
    } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              您好，
              {currentUser.name}
              ，祝您开心每一天！
            </div>
            <div>我们用代码编写梦想，用梦想改变世界。</div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="简介"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>
                  <List.Item key="desc-1">
                    <List.Item.Meta
                      title={
                        <span>
                          <a className={styles.username}>SpringBlade 2.0 </a>
                          <span className={styles.event}>
                            是一个基于 Spring Boot 2 & Spring Cloud Finchley & Mybatis
                            等核心技术，用于快速构建中大型系统的基础框架。
                          </span>
                        </span>
                      }
                    />
                  </List.Item>
                  <List.Item key="desc-2">
                    <List.Item.Meta
                      title={
                        <span>
                          <a className={styles.username}>SpringBlade 企业版系列 </a>
                          <span className={styles.event}>
                            已通过长时间生产环境的考验，现将其拆分出基础模块进行开源，当前版本为：2.0.0。
                          </span>
                        </span>
                      }
                    />
                  </List.Item>
                  <List.Item key="desc-2">
                    <List.Item.Meta
                      title={
                        <span>
                          <a className={styles.username}>SpringBlade </a>
                          <span className={styles.event}>
                            技术交流群号：477853168。欢迎大家加入。
                          </span>
                        </span>
                      }
                    />
                  </List.Item>
                </div>
              </List>
            </Card>

            <Card
              className={styles.projectList}
              title="所使用技术"
              bordered={false}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {notice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to="/">{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  <Col span={12} key="members-item-1">
                    <Link to="/">
                      <Avatar
                        src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                        size="small"
                      />
                      <span className={styles.member}>ChillZhuang</span>
                    </Link>
                  </Col>
                  <Col span={12} key="members-item-2">
                    <Link to="/">
                      <Avatar
                        src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                        size="small"
                      />
                      <span className={styles.member}>DreamLu</span>
                    </Link>
                  </Col>
                  <Col span={12} key="members-item-3">
                    <Link to="/">
                      <Avatar
                        src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                        size="small"
                      />
                      <span className={styles.member}>LengLeng</span>
                    </Link>
                  </Col>
                  <Col span={12} key="members-item-4">
                    <Link to="/">
                      <Avatar
                        src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                        size="small"
                      />
                      <span className={styles.member}>LiXunHuan</span>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
