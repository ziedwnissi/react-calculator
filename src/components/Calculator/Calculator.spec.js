import React from 'react';
import {shallow} from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

describe('Calculator', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the Display and Keypad Components', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.containsAllMatchingElements([
      <Display />,
      <Keypad />
    ])).toEqual(true);
  });
});