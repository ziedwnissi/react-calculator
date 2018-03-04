<<<<<<< HEAD
=======
import React from 'react';
import PropTypes from 'prop-types';

const Key = ({keyType, keyValue}) => {
  return (
    <div className="key-container">
      <p className="key-value">
        {keyValue}
      </p>
    </div>
  );
}

Key.propTypes = {
  keyType: PropTypes.string.isRequired, 
  keyValue: PropTypes.string.isRequired,
}

export default Key;
>>>>>>> initial-tests
