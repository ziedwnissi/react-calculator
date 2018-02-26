import React from 'react';
import {shallow} from 'enzyme';
import Calculator from '../components/Calculator/Calculator';

it('should render', () => {
  const wrapper = shallow(<Calculator />);
  expect(wrapper.find('div').length).toEqual(1);
});