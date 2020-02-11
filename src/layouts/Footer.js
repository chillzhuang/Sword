import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 SpringBlade{' '}
          <a
            key="github"
            title="git"
            target="_blank"
            rel="noopener noreferrer"
            href="https://gitee.com/smallc/SpringBlade"
          >
            <Icon type="github" />{' '}
          </a>
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
