import React from 'react';
import {shallow, mount} from 'enzyme';
import Key from './Key';

describe('Key', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Key />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should set props keyType and keyValue', () => {
    const wrapper = mount(<Key keyType="testType" keyValue="testValue" />);
    expect(wrapper.prop('keyType')).toEqual('testType');
    expect(wrapper.prop('keyValue')).toEqual('testValue');
    wrapper.setProps({keyType: 'newType'});
    expect(wrapper.prop('keyType')).toEqual('newType');
    wrapper.setProps({keyValue: 'newValue'});
    expect(wrapper.prop('keyValue')).toEqual('newValue');
  });
});