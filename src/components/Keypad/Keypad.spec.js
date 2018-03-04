import React from 'react';
import {mount, shallow} from 'enzyme';
import Keypad from './Keypad';
import Key from '../Key/Key';

describe('Keypad', () => {
  it('should render 4 <div>\'s', () => {
    const wrapper = shallow(<Keypad numbers={[]} operators={[]} />);
    expect(wrapper.find('div').length).toEqual(4);
  });

  it('renders the values of numbers to the DOM', () => {
    const wrapper = mount(<Keypad numbers={[]} operators={[]} />);
    wrapper.setProps({numbers: ['0', '1', '2']});
    expect(wrapper.text()).toEqual('012=');
  });

  it('renders the values of operators to the DOM', () => {
    const wrapper = mount(<Keypad numbers={[]} operators={[]} />);
    wrapper.setProps({operators: ['+', '-', '*', '/']});
    expect(wrapper.text()).toEqual('+-*/=');
  });

  it('should render the Key component', () => {
    const wrapper = mount(<Keypad numbers={[]} operators={[]} />);
    expect(wrapper.containsMatchingElement([
      <Key keyType="" keyValue="" />
    ])).toEqual(true);
  });

  it('should render the Key component for each index of numbers, operators, and the submit Key', () => {
    const numbers = ['0', '1'];
    const operators = ['+', '-'];
    const submit = 1;
    const keyTotal = numbers.length + operators.length + submit;
    const wrapper = shallow(<Keypad numbers={numbers} operators={operators} />);
    expect(wrapper.find('Key').length).toEqual(keyTotal);
  });
});