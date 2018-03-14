import React from 'react';
import PropTypes from 'prop-types';
import './Key.css';

const Key = ({theme, keyAction, keyType, keyValue}) => {
  let keyClassName = `key-container ${keyType} ${keyType}-theme-${theme}`
  
  if (keyValue === '/' && theme !== 'default') keyClassName = `${keyClassName} first-operator`;
  if (keyValue === '+' && theme !== 'default') keyClassName = `${keyClassName} last-operator`;
  
  return (
    <div 
      className={keyClassName}
      onClick={() => {keyAction(keyValue)}}
    >
      <p className={`key-value key-theme-${theme}`}>
        {keyValue}
      </p>
    </div>
  );
}

Key.propTypes = {
  keyAction: PropTypes.func.isRequired,
  keyType: PropTypes.string.isRequired,
  keyValue: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
}

export default Key;