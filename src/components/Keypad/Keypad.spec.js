import React from 'react';
import {mount, shallow} from 'enzyme';
import Keypad from './Keypad';
import Key from '../Key/Key';

describe('Keypad', () => {
  it('should render 3 <div>\'s', () => {
    const wrapper = shallow(<Keypad />);
    expect(wrapper.find('div').length).toEqual(3);
  });

  it('has default props numbers and operators', () => {
    const wrapper = mount(<Keypad />);
    expect(wrapper.prop('numbers')).toEqual([]);
    expect(wrapper.prop('operators')).toEqual([]);
  });

  it('has settable props numbers and operators', () => {
    const wrapper = mount(<Keypad />);
    wrapper.setProps({numbers: ['test']});
    expect(wrapper.prop('numbers')).toEqual(['test']);
    wrapper.setProps({operators: ['test']});
    expect(wrapper.prop('operators')).toEqual(['test']);
  });

  it('renders the values of numbers to the DOM', () => {
    const wrapper = mount(<Keypad />);
    expect(wrapper.text()).toEqual('');
    wrapper.setProps({numbers: ['0', '1', '2']});
    expect(wrapper.text()).toEqual('012');
  });

  it('renders the values of operators to the DOM', () => {
    const wrapper = mount(<Keypad />);
    expect(wrapper.text()).toEqual('');
    wrapper.setProps({operators: ['+', '-']});
    expect(wrapper.text()).toEqual('+-');
  });

  it('should render the Key component', () => {
    const wrapper = shallow(<Keypad />);
    expect(wrapper.containsAllMatchingElements([
      <Key />
    ])).toEqual(true);
  });
});