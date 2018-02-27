import React, {Component} from 'react';
import './Calculator.css';

import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operators: ['/', 'x', '-', '+'],
      displayValue: '0',
      numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'],
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

    if (event.key === 'Enter' || event.key === '=') this.callOperator(event);
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
        displayValue = 'Error';
    }

    displayValue = displayValue.toString();
    if (displayValue === 'NaN' || displayValue === 'Infinity') displayValue ='0';
    this.setState({displayValue, storedValue: updateStoredValue});
  }

  setOperator = (event, value) => {
    event.preventDefault();
    let {displayValue, selectedOperator, storedValue} = this.state;

    storedValue = displayValue;
    displayValue = '0';
    selectedOperator = value;
    this.setState({displayValue, selectedOperator, storedValue});
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
    const {displayValue, numbers, operators} = this.state;
    
    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <Keypad 
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