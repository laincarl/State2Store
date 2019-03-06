import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip, Checkbox } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ResultCode.less';

const CheckboxGroup = Checkbox.Group;
const propTypes = {
  value: PropTypes.string.isRequired,
  style: PropTypes.object,
  allOptions: PropTypes.array.isRequired,
  defaultOptions: PropTypes.array.isRequired,
  onClear: PropTypes.func.isRequired,
};

class ResultCode extends Component {
  state = {
    copyed: false,
  }

  handleCheckChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    this.props.onOptionChange(checkedValues);
  }

  handleCopy = () => {
    this.setState({
      copyed: true,
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        copyed: false,
      });
    }, 3000);
  }

  render() {
    const {
      value, style, allOptions, defaultOptions, onClear,
    } = this.props;
    const { copyed } = this.state;
    return (
      <div style={style} className="ResultCode">
        <div className="ResultCode-header">
          <CheckboxGroup
            options={allOptions}
            defaultValue={defaultOptions}
            onChange={this.handleCheckChange}
          />
          <div className="flex-space" />
          <div>
            <Tooltip title="清空">
              <Icon className="ResultCode-icon" type="delete" onClick={onClear} />
            </Tooltip>
            <CopyToClipboard
              text={value}
              onCopy={this.handleCopy}
            >
              <Tooltip title={copyed ? '复制成功' : '复制代码'}>
                <Icon className="ResultCode-icon" type={copyed ? 'check' : 'copy'} style={{ color: copyed && 'rgb(82, 196, 26)' }} />
              </Tooltip>
            </CopyToClipboard>
          </div>
        </div>
        <div className="ResultCode-content">{value}</div>
      </div>
    );
  }
}

ResultCode.propTypes = propTypes;
export default ResultCode;
