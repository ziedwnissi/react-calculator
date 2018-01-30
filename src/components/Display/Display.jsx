import React from 'react';
import './Display.css';

const Display = ({displayValue}) => {
  return (
    <div className="display-container">
      <p className="display-value">
        {displayValue}
      </p>
    </div>
  );
}

export default Display;