import React from 'react';
import Display from '../Display/Display';

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