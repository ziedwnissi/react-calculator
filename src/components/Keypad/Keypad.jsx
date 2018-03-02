import React from 'react';
import PropTypes from 'prop-types';
import Key from '../Key/Key';

const Keypad = ({numbers, operators}) => {

  numbers = numbers.map(number => {
    return (
      <p key={number}>{number}</p>
    );
  });

  operators = operators.map(operator => {
    return (
      <p key={operator}>{operator}</p>
    );
  });

  return (
    <div className="keypad-container">
      <div className="numbers-container">
        {numbers}
      </div>
      <div className="operators-container">
        {operators}
      </div>
      <Key 
        keyType="none"
        keyValue="none"
      />
    </div>
  );
}

Keypad.propTypes = {
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired,
}

Keypad.defaultProps = {
  numbers: [],
  operators: [],
}

export default Keypad;