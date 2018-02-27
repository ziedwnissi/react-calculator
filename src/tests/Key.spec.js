import React from 'react';
import {shallow} from 'enzyme';
import Key from '../components/Key/Key';

it('should render', () => {
  const wrapper = shallow(<Key />);
  expect(wrapper.find('div').length).toEqual(1);
});