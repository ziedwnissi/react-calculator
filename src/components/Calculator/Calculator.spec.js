import React from 'react';
import {mount, shallow} from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

describe('Calculator', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Calculator />);
  });
  
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the Display and Keypad Components', () => {
    expect(wrapper.containsAllMatchingElements([
      <Display displayValue={'0'} />,
      <Keypad 
        callOperator={wrapper.instance().callOperator}
        numbers={['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce']}
        operators={['/', 'x', '-', '+']}
        setOperator={wrapper.instance().setOperator}
        updateDisplay={wrapper.instance().updateDisplay}
      />
    ])).toEqual(true);
  });
});

describe('updateDisplay', () => {
  let wrapper, event;
  beforeEach(() => {
    wrapper = shallow(<Calculator />);
    event = {preventDefault: jest.fn()}
  });

  it('updates displayValue', () => {
    wrapper.instance().updateDisplay(event,'5');
    expect(wrapper.state('displayValue')).toEqual('5');
  });
    
  it('concatenates displayValue', () => {
    wrapper.instance().updateDisplay(event,'5');
    wrapper.instance().updateDisplay(event,'0');
    expect(wrapper.state('displayValue')).toEqual('50');
  });

  it('removes leading "0" from displayValue', () => {
    wrapper.instance().updateDisplay(event,'0');
    expect(wrapper.state('displayValue')).toEqual('0');
    wrapper.instance().updateDisplay(event,'5');
    expect(wrapper.state('displayValue')).toEqual('5');
  });

  it('prevents multiple leading "0"s from displayValue', () => {
    wrapper.instance().updateDisplay(event,'0');
    wrapper.instance().updateDisplay(event,'0');
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('removes last char of displayValue', () => {
    wrapper.instance().updateDisplay(event,'5');
    wrapper.instance().updateDisplay(event,'0');
    wrapper.instance().updateDisplay(event,'ce');
    expect(wrapper.state('displayValue')).toEqual('5');
  });

  it('prevents multiple instances of "." in displayValue', () => {
    wrapper.instance().updateDisplay(event,'.');
    wrapper.instance().updateDisplay(event,'.');
    expect(wrapper.state('displayValue')).toEqual('.');
  });

  it('will set displayValue to "0" if displayValue is equal to an empty string', () => {
    wrapper.instance().updateDisplay(event,'ce');
    expect(wrapper.state('displayValue')).toEqual('0');
  });
});

describe('setOperator', () => {
  let wrapper, event;
  beforeEach(() => {
    wrapper = shallow(<Calculator />);
    event = {preventDefault: jest.fn()}
  });

  it('updates the value of selectedOperator', () => {
    wrapper.instance().setOperator(event, '+');
    expect(wrapper.state('selectedOperator')).toEqual('+');
    wrapper.instance().setOperator(event, '/');
    expect(wrapper.state('selectedOperator')).toEqual('/');
  });

  it('updates the value of storedValue to the value of displayValue', () => {
    wrapper.setState({displayValue: '5'});
    wrapper.instance().setOperator(event, '+');
    expect(wrapper.state('storedValue')).toEqual('5');
  });

  it('updates the value of displayValue to "0"', () => {
    wrapper.setState({displayValue: '5'});
    wrapper.instance().setOperator(event, '+');
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('selectedOperator is not an empty string, does not update storedValue', () => {
    wrapper.setState({displayValue: '5'});
    wrapper.instance().setOperator(event, '+');
    expect(wrapper.state('storedValue')).toEqual('5');
    wrapper.instance().setOperator(event, '-');
    expect(wrapper.state('storedValue')).toEqual('5');
  });
});

describe('callOperator', () => {
  let wrapper, event;
  beforeEach(() => {
    wrapper = shallow(<Calculator />);
    event = {preventDefault: jest.fn()}
  });

  it('updates displayValue to the sum of storedValue and displayValue', () => {
    wrapper.setState({storedValue: '3'});
    wrapper.setState({displayValue: '2'});
    wrapper.setState({selectedOperator: '+'});
    wrapper.instance().callOperator(event);
    expect(wrapper.state('displayValue')).toEqual('5');
  });

  it('updates displayValue to the difference of storedValue and displayValue', () => {
    wrapper.setState({storedValue: '3'});
    wrapper.setState({displayValue: '2'});
    wrapper.setState({selectedOperator: '-'});
    wrapper.instance().callOperator(event);
    expect(wrapper.state('displayValue')).toEqual('1');
  });

  it('updates displayValue to the product of storedValue and displayValue', () => {
    wrapper.setState({storedValue: '3'});
    wrapper.setState({displayValue: '2'});
    wrapper.setState({selectedOperator: 'x'});
    wrapper.instance().callOperator(event);
    expect(wrapper.state('displayValue')).toEqual('6');
  });

  it('updates displayValue to the quotient of storedValue and displayValue', () => {
    wrapper.setState({storedValue: '3'});
    wrapper.setState({displayValue: '2'});
    wrapper.setState({selectedOperator: '/'});
    wrapper.instance().callOperator(event);
    expect(wrapper.state('displayValue')).toEqual('1.5');
  });

  it('updates displayValue to "0" if operation results in "NaN"', () => {
    wrapper.setState({storedValue: '3'});
    wrapper.setState({displayValue: 'string'});
    wrapper.setState({selectedOperator: '/'});
    wrapper.instance().callOperator(event);
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('updates displayValue to "0" if operation results in "Infinity"', () => {
    wrapper.setState({storedValue: '7'});
    wrapper.setState({displayValue: '0'});
    wrapper.setState({selectedOperator: '/'});
    wrapper.instance().callOperator(event);
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('updates displayValue to "0" if selectedOperator does not match cases', () => {
    wrapper.setState({storedValue: '7'});
    wrapper.setState({displayValue: '10'});
    wrapper.setState({selectedOperator: 'string'});
    wrapper.instance().callOperator(event);
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('updates displayValue to "0" if called with no value for storedValue or selectedOperator', () => {
    wrapper.setState({storedValue: ''});
    wrapper.setState({displayValue: '10'});
    wrapper.setState({selectedOperator: ''});
    wrapper.instance().callOperator(event);
    expect(wrapper.state('displayValue')).toEqual('0');
  });
});