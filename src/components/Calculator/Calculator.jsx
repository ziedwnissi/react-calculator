import React, {Component} from 'react';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayValue: '0',
      numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'],
      operators: ['/', 'x', '-', '+'],
      selectedOperator: '',
      storedValue: '',
      theme: 'default',
    }

    this.callOperator = this.callOperator.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setOperator = this.setOperator.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  
  componentWillMount() { 
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  } 

  callOperator() {
    let {displayValue, selectedOperator, storedValue} = this.state;
    const updateStoredValue = displayValue;

    displayValue = parseInt(displayValue, 10);
    storedValue = parseInt(storedValue, 10);
    // fix, needs test
    // displayValue = parseFloat(displayValue);
    // storedValue = parseFloat(storedValue);
    
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

  handleKeyPress(event) {
    const {numbers, operators} = this.state;
    
    if (event.key === 'Backspace') this.updateDisplay('ce');
    if (event.key === 'Enter' || event.key === '=') this.callOperator();

    numbers.forEach((number) => {
      if (event.key === number) {
        this.updateDisplay(number);
      }
    });
    
    operators.forEach((operator) => {
      if (event.key === operator) {
        this.setOperator(operator);
      }
    });
  }

  setOperator(value) {
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

  toggleTheme() {
    let {theme} = this.state;
    
    switch (theme) {
      case 'default':
        theme = 'pony';
        break;

      case 'pony':
        theme = 'dondi'
        break;

      default:
        theme = 'default';
        break;
    }
    
    this.setState({theme});
  }

  updateDisplay(value) {
    let {displayValue} = this.state;
    
    if (value === '.' && displayValue.includes('.')) value = '';

    if (value === 'ce') {
      displayValue = displayValue.substr(0, displayValue.length - 1);
      if (displayValue === '') displayValue = '0';
    } else {
      displayValue === '0' ? displayValue = value : displayValue += value;
    }

    this.setState({displayValue});
  }

  render () {
    const {theme, displayValue, numbers, operators} = this.state;
    
    return (
      <div className={`calculator-container calculator-theme-${theme}`}>
        <Display 
          theme={theme}
          displayValue={displayValue} 
        />
        <Keypad
          callOperator={this.callOperator}
          theme={theme}
          handleKeyPress={this.handleKeyPress} 
          numbers={numbers}
          operators={operators}
          setOperator={this.setOperator}
          toggleTheme={this.toggleTheme}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  }
}

export default Calculator;