import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './SwordPage.less';

export default class ToolBar extends PureComponent {
  render() {
    const { buttons, renderLeftButton, renderRightButton, onClick } = this.props;
    return (
      <div className={styles.operator}>
        <div>
          {buttons
            .filter(button => button.action === 1 || button.action === 3)
            .map(button => (
              <Button
                key={button.code}
                icon={button.source}
                type={
                  button.alias === 'delete'
                    ? 'danger'
                    : button.alias === 'add'
                    ? 'primary'
                    : 'default'
                }
                onClick={() => {
                  onClick(button);
                }}
              >
                <FormattedMessage id={`button.${button.alias}.name`} />
              </Button>
            ))}
          {renderLeftButton ? renderLeftButton() : null}
          {renderRightButton ? <div style={{ float: 'right' }}>{renderRightButton()}</div> : null}
        </div>
      </div>
    );
  }
}
