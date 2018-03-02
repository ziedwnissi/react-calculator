import React, {Component} from 'react';
import './Calculator.css';

import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayValue: '0',
      numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'],
      operators: ['/', 'x', '-', '+'],
      selectedOperator: '',
      storedValue: '',
    }

    this.callOperator = this.callOperator.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setOperator = this.setOperator.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  
  componentWillMount() { 
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  } 

  handleKeyPress = (event) => {
    const {numbers, operators} = this.state;
    
    if (event.key === 'Backspace') this.updateDisplay(event, 'ce');
    if (event.key === 'Enter' || event.key === '=') this.callOperator(event);

    numbers.forEach((number) => {
      if (event.key === number){
        this.updateDisplay(event, number);
      }
    });
    
    operators.forEach((operator) => {
      if (event.key === operator){
        this.setOperator(event, operator);
      }
    });
  }

  callOperator = (event) => {
    event.preventDefault();
    let {displayValue, selectedOperator, storedValue} = this.state;
    const updateStoredValue = displayValue;
    
    displayValue = parseInt(displayValue, 10);
    storedValue = parseInt(storedValue, 10);

    switch(selectedOperator) {
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
        displayValue = '0';
    }

    displayValue = displayValue.toString();
    selectedOperator = '';
    if (displayValue === 'NaN' || displayValue === 'Infinity') displayValue ='0';
    this.setState({displayValue, selectedOperator, storedValue: updateStoredValue});
  }

  setOperator = (event, value) => {
    event.preventDefault();
    let {displayValue, selectedOperator, storedValue} = this.state;

    if (selectedOperator === '') {
      storedValue = displayValue;
      displayValue = '0';
      selectedOperator = value;  
    } else {
      selectedOperator = value;
    }

    this.setState({displayValue, selectedOperator, storedValue});
  }

  updateDisplay = (event, value) => {
    event.preventDefault();
    let {displayValue} = this.state;
    
    // prevent multiple occurences of '.'
    if (value === '.' && displayValue.includes('.')) value = '';
    
    if (value === 'ce') {
      // deletes last char in displayValue
      displayValue = displayValue.substr(0, displayValue.length - 1);
      // set displayValue to '0' if displayValue is empty string
      if (displayValue === '') displayValue = '0';
    } else {
      // replace displayValue with value if displayValue equal to '0'
      // else concatenate displayValue and value
      displayValue === '0' ? displayValue = value : displayValue += value;
    }

    this.setState({displayValue});
  }

  render () {
    const {displayValue, numbers, operators} = this.state;
    
    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <Keypad
          handleKeyPress={this.handleKeyPress} 
          operators={operators}
          callOperator={this.callOperator}
          numbers={numbers}
          onKeyPress={this.handleKeyPress} 
          setOperator={this.setOperator}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  }
}
 
export default Calculator;