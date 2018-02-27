import React from 'react';
import {shallow} from 'enzyme';
import Display from '../components/Display/Display';

it('should render', () => {
  const wrapper = shallow(<Display />);
  expect(wrapper.find('div').length).toEqual(1);
});