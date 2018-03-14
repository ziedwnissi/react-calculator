import React from 'react';
import {shallow} from 'enzyme';
import StarKey from './StarKey';

describe('StarKey', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <StarKey 
        theme={'default'}
        toggleTheme={jest.fn()} 
      />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should render an <svg />', () => {
    expect(wrapper.find('svg').length).toEqual(1);
  });

  it('should have a className reflecting its theme', () => {
    expect(wrapper.find('.star-theme-default').exists()).toBe(true);
  });

  it('should update its className on theme change', () => {
    expect(wrapper.find('.star-theme-default').exists()).toBe(true);
    wrapper.setProps({theme: 'pony'});
    expect(wrapper.find('.star-theme-pony').exists()).toBe(true);
    wrapper.setProps({theme: 'dondi'});
    expect(wrapper.find('.star-theme-dondi').exists()).toBe(true);
  });

  it('should have the correct icon path based on theme', () => {
    const themes = ['default', 'pony', 'dondi'];
    themes.forEach((theme) => {
      const testWrapper = shallow(
        <StarKey 
          theme={theme}
          toggleTheme={jest.fn()} 
        />
      );
      wrapper.setProps({theme});
      const wrapperPath = wrapper.find('path').first().html();
      const testPath = testWrapper.find('path').first().html();
      expect(wrapperPath === testPath).toEqual(true);
    });
  });
});