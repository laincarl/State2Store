import React from 'react';
import PropTypes from 'prop-types';
import './SourceCodeInput.scss';

const propTypes = {
  value: PropTypes.string.isRequired,
  style: PropTypes.object, 
  onChange: PropTypes.func.isRequired,
};
const SourceCodeInput = ({
  value,
  onChange,
  style,
}) => (
  <div className="SourceCodeInput" style={style}>
    <textarea spellCheck="false" value={value} onChange={onChange} />
  </div>
);
SourceCodeInput.propTypes = propTypes;
export default SourceCodeInput;
