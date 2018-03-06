import React from 'react';
import {shallow} from 'enzyme';
import Key from './Key';

describe('Key', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Key keyType="" keyValue="" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <div />', () => {
    const wrapper = shallow(<Key keyType="" keyValue="" />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the value of keyValue to the DOM', () => {
    const wrapper = shallow(<Key keyType="" keyValue="test" />);
    expect(wrapper.text()).toEqual('test');
  });
});