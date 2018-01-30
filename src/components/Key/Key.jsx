import React from 'react';
import './Key.css';

const Key = ({keyAction, keyType, keyValue}) => {
  const keyClass = `key-container ${keyType}`;
  
  return (
    <div 
      className={keyClass}
      onClick={(event) => keyAction(event, keyValue)}
    >
      <p className="key-value">
        {keyValue}
      </p>
    </div>
  );
}

export default Key;