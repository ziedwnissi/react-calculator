import React from 'react';
import Calculator from '../components/Calculator/Calculator';
import { shallow } from 'enzyme';

it('Calculator Component should render', () => {
  const wrapper = shallow(<Calculator />);
  expect(wrapper.find('div').length).toEqual(1);
});