import React from 'react';
import PropTypes from 'prop-types';

const Key = () => <div className="key-container" />;

Key.propTypes = {
  keyType: PropTypes.string.isRequired, 
  keyValue: PropTypes.string.isRequired,
}

Key.defaultProps = {
  keyType: 'default',
  keyAction: 'default',
}

export default Key;