import React from 'react';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad'

const Calculator = () => {
  return (
    <div className="calculator-container">
      <Display displayValue="" />
      <Keypad 
        numbers={[]}
        operators={[]}
      />
    </div>
  );
}

export default Calculator;