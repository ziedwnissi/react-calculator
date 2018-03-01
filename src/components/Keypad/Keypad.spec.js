import React from 'react';
import {shallow} from 'enzyme';
import Keypad from './Keypad';
import Key from '../Key/Key';

describe('Keypad', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Keypad />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the Key component', () => {
  const wrapper = shallow(<Keypad />);
  expect(wrapper.containsAllMatchingElements([
      <Key />
    ])).toEqual(true);
  });
});