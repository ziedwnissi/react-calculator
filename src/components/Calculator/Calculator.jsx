import React, {Component} from 'react';
import './Calculator.css';

import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      displayValue: 0,
    }

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay = (event, value) => {
    event.preventDefault();
    
    let {displayValue} = this.state;
    displayValue += value;
    
    this.setState({displayValue});
  }

  render () {
    const {displayValue} = this.state;

    const numbers = ['ce', '0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const actions = ['/', 'x', '-', '+'];

    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <Keypad 
          actions={actions}
          numbers={numbers}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  }
}
 
export default Calculator;