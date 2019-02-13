import React, { PureComponent } from 'react';
import { Form } from 'antd';
import styles from './SwordPage.less';

export default class SearchBox extends PureComponent {
  render() {
    const { onSubmit, children } = this.props;
    return (
      <div className={styles.form}>
        <Form onSubmit={onSubmit} layout="inline">
          {children}
        </Form>
      </div>
    );
  }
}
