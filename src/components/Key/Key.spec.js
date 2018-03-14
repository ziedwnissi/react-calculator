import React from 'react';
import {shallow} from 'enzyme';
import Key from './Key';

describe('Key', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Key
        keyAction={jest.fn()}
        keyType={''}
        keyValue={''}
        theme={''}
      />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the value of keyValue', () => {
    wrapper.setProps({keyValue: 'test'});
    expect(wrapper.text()).toEqual('test');
  });
  
  it('should have themed classNames reflecting its theme and button type', () => {
    const keyTypes = ['number-key', 'operator-key', 'submit-key'];
    const themes = ['default', 'pony', 'dondi'];
    keyTypes.forEach((keyType) => {
      themes.forEach((theme) => {
        wrapper.setProps({keyType, theme});
        // wrapper div
        expect(wrapper.find(`.${keyType}-theme-${theme}`).exists()).toBe(true);
        // key text
        expect(wrapper.find(`.key-theme-${theme}`).exists()).toBe(true);    
      });
    });
  });
});