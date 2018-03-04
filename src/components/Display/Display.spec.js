import React from 'react';
import {mount, shallow} from 'enzyme';
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
    const wrapper = mount(<Display displayValue="test" />);
    // wrapper.setProps({displayValue: 'new value'});
    expect(wrapper.text()).toEqual('test');
  });
});