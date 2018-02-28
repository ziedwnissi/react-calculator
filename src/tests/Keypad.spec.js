import React from 'react';
import {shallow} from 'enzyme';
import Keypad from '../components/Keypad/Keypad';
import Key from '../components/Key/Key';

it('should render', () => {
  const wrapper = shallow(<Keypad />);
  expect(wrapper.containsAllMatchingElements([
      <Key />
    ])).toEqual(true);
});