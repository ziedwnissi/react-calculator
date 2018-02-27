import React from 'react';
import {shallow} from 'enzyme';
import Keypad from '../components/Keypad/Keypad';

it('should render', () => {
  const wrapper = shallow(<Keypad numbers={[]} operators={[]} />);
  expect(wrapper.find('div').length).toEqual(4);
});