import React from 'react';
import {shallow} from 'enzyme';
import Display from './Display';

describe('Display', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Display displayValue="" />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should render a <div />', () => {
    const wrapper = shallow(<Display displayValue="" />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders the value of displayValue to the DOM', () => {
    const wrapper = shallow(<Display displayValue="test" />);
    expect(wrapper.text()).toEqual('test');
  });
});