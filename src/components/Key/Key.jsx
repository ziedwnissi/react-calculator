import React from 'react';
import './Key.css';

const Key = ({handleKeyPress, keyAction, keyType, keyValue}) => {
  const keyClass = `key-container ${keyType}`;
  
  return (
    <div 
      className={keyClass}
      onClick={(event) => keyAction(event, keyValue)}
      onKeyPress={(event) => handleKeyPress(event)}
    >
      <p className="key-value">
        {keyValue}
      </p>
    </div>
  );
}

export default Key;