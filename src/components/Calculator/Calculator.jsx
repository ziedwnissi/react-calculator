import React, {Component} from 'react';
import './Calculator.css';

import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      actions: ['/', 'x', '-', '+'],
      displayValue: '0',
      numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'],
      operator: '',
      storedValue: '',
    }

    this.callOperator = this.callOperator.bind(this);
    this.setOperator = this.setOperator.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  callOperator = (event) => {
    event.preventDefault();
    let {displayValue, operator, storedValue} = this.state;

    displayValue = parseInt(displayValue, 10);
    storedValue = parseInt(storedValue, 10);

    switch(operator) {
      case '+':
        displayValue = storedValue + displayValue;
        break;
      case '-':
        displayValue = storedValue - displayValue;
        break;
      case 'x':
        displayValue = storedValue * displayValue;
        break;
      case '/':
        displayValue = storedValue / displayValue;
        break;
      default:
        console.log('Application Error');
    }

    displayValue = displayValue.toString();
    
    this.setState({displayValue});
  }

  setOperator = (event, value) => {
    event.preventDefault();
    let {displayValue, operator, storedValue} = this.state;

    storedValue = displayValue;
    displayValue = '0';
    operator = value;
    this.setState({displayValue, operator, storedValue});
  }

  updateDisplay = (event, value) => {
    event.preventDefault();
    let {displayValue} = this.state;

    if (value === 'ce') {
      displayValue = displayValue.substr(0, displayValue.length - 1);
    } else {
      displayValue === '0' ? displayValue = value : displayValue += value;
    }
    
    if (displayValue === '') displayValue = '0';

    this.setState({displayValue});
  }

  render () {
    const {displayValue, numbers, actions} = this.state;
    
    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <Keypad 
          actions={actions}
          numbers={numbers}
          callOperator={this.callOperator}
          setOperator={this.setOperator}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  }
}
 
export default Calculator;