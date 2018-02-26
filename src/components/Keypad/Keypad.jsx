import React from 'react';
import './Keypad.css';

import Key from '../Key/Key';

const Keypad = ({actions, callOperator, numbers, setOperator, updateDisplay}) => {

  numbers = numbers.map((number, iterator) => {
    return (
      <Key
        key={`${number}${iterator}`}
        keyType="number-key" 
        keyValue={number}
        keyAction={updateDisplay}
      />
    );
  });

  actions = actions.map((action, iterator) => {
    return (
      <Key
        key={`${action}${iterator}`}
        keyType="action-key" 
        keyValue={action}
        keyAction={setOperator}
      />
    );
  });

  return (
    <div className="keypad-container">
      <div className="numbers-container">
        {numbers}
      </div>
      <div className="actions-container">
        {actions}
      </div>
      <div className="submit-container">
        <Key 
          keyType="submit-key"
          keyValue="="
          keyAction={callOperator}
        />
      </div>
    </div>
  );
}

export default Keypad;