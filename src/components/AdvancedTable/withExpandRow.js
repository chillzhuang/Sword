import React from 'react';

export default ({
  expendAll = false,
  expandedRowRender,
  updateExpandRowKeys,
  initExpandedRowKeys,
}) => {
  return WrappedComponent => {
    return class extends React.PureComponent {
      constructor(props) {
        super(props);

        this.state = {
          expandedRowKeys: initExpandedRowKeys || [],
          expandRowByClick: false,
        };
      }

      componentDidMount() {
        if (initExpandedRowKeys) {
          this.onExpandedRowsChange(initExpandedRowKeys);
        }
      }

      onExpandedRowsChange = rows => {
        if (updateExpandRowKeys) updateExpandRowKeys(rows);
        this.setState({
          expandedRowKeys: rows,
        });
      };

      expandRow = row => {
        this.setState({
          expandedRowKeys: row ? [row] : [],
        });
      };

      render() {
        const { expandedRowKeys } = this.state;
        // const expandRowByClick = true;
        return (
          <WrappedComponent
            expandedRowRender={expandedRowRender}
            defaultExpandAllRows={expendAll}
            expandedRowKeys={expandedRowKeys}
            onExpandedRowsChange={this.onExpandedRowsChange}
            expandRow={this.expandRow}
          />
        );
      }
    };
  };
};
