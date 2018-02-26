import React from 'react';
import './Keypad.css';

import Key from '../Key/Key';

const Keypad = ({operators, callOperator, handleKeyPress, numbers, setOperator, updateDisplay}) => {

  numbers = numbers.map((number, iterator) => {
    return (
      <Key
        handleKeyPress={handleKeyPress}
        key={`${number}${iterator}`}
        keyType="number-key"
        keyValue={number}
        keyAction={updateDisplay}
      />
    );
  });

  operators = operators.map((operator, iterator) => {
    return (
      <Key
        handleKeyPress={handleKeyPress}
        key={`${operator}${iterator}`}
        keyType="operator-key" 
        keyValue={operator}
        keyAction={setOperator}
      />
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
      <div className="submit-container">
        <Key
          handleKeyPress={handleKeyPress} 
          keyType="submit-key"
          keyValue="="
          keyAction={callOperator}
        />
      </div>
    </div>
  );
}

export default Keypad;