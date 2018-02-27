import React from 'react';
import {shallow} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Calculator from '../components/Calculator/Calculator';

describe('Calculator', () => {
  it('should render', () => {
    const wrapper = shallow(<Calculator />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should contain the Display and Keypad Components', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.containsAllMatchingElements([
      <Display />,
      <Keypad />
    ])).to.equal(true);
  });
});



