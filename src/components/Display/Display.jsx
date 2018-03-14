import React from 'react';
import PropTypes from 'prop-types';
import './Display.css';

const Display = ({theme, displayValue}) => {
  return (
    <div className={`display-container display-theme-${theme}`}>
      <p className={`display-value display-${theme}`}>
        {displayValue}
      </p>
    </div>
  );
}

Display.propTypes = {
  displayValue: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Display;