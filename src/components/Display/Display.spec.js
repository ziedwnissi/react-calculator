import React from 'react';
import {mount, shallow} from 'enzyme';
import Display from './Display';

describe('Display', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Display 
        displayValue={''} 
        theme={'default'}
        toggleTheme={jest.fn()}
      />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders the value of displayValue', () => {
    wrapper.setProps({displayValue: 'test'});
    expect(wrapper.find('.display-value').text()).toEqual('test');;
  });
    
  it('should have a className reflecting its theme', () => {
    expect(wrapper.find('.display-theme-default').exists()).toBe(true);
  });

  it('should update its className on theme change', () => {
    expect(wrapper.find('.display-theme-default').exists()).toBe(true);
    wrapper.setProps({theme: 'pony'});
    expect(wrapper.find('.display-theme-pony').exists()).toBe(true);
  });
});