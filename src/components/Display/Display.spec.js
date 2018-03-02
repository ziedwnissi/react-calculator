import React from 'react';
import {mount, shallow} from 'enzyme';
import Display from './Display';

describe('Display', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Display />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should render a <div />', () => {
    const wrapper = shallow(<Display />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('has default prop displayValue', () => {
    const wrapper = mount(<Display />);
    expect(wrapper.prop('displayValue')).toEqual('default');
  });

  it('has settable prop displayValue', () => {
    const wrapper = mount(<Display />);
    wrapper.setProps({displayValue: 'new value'});
    expect(wrapper.prop('displayValue')).toEqual('new value');
  });

  it('renders the value of displayValue to the DOM', () => {
    const wrapper = mount(<Display />);
    expect(wrapper.text()).toEqual('default');
    wrapper.setProps({displayValue: 'new value'});
    expect(wrapper.text()).toEqual('new value');
  });
});