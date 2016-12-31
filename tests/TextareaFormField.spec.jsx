import expect from 'expect.js';
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import TextareaFormField from '../src';

const Count = TextareaFormField.TextAreaCount;

sinon.spy(TextareaFormField.prototype, 'handleFocus');
sinon.spy(TextareaFormField.prototype, 'handleBlur');
sinon.spy(TextareaFormField.prototype, 'handleKeyDown');


describe('TextareaFormField', () => {
  let instance;

  it('autoTrim', () => {
    instance = mount(
      <TextareaFormField autoTrim standalone />,
    );
    instance.find('.kuma-textarea').node.value = 'test ';
    instance.find('.kuma-textarea').simulate('change');
    expect(instance.find('.kuma-textarea').node.value).to.be('test');
  });

  it('default jsxmode', () => {
    instance = mount(
      <TextareaFormField standalone />,
    );
    expect(instance.props().jsxmode).to.equal('edit');
  });


  it('default mode', () => {
    instance = mount(
      <TextareaFormField standalone />,
    );
    expect(instance.props().mode).to.equal('edit');
  });

  it('set standalone false', () => {
    instance = mount(
      <TextareaFormField standalone={false} />,
    );
    expect(instance.props().standalone).to.equal(false);
  });


  it('jsxprefixCls', () => {
    instance = mount(
      <TextareaFormField jsxprefixCls="test_bbb" autoTrim standalone />,
    );
    expect(instance.find('.test_bbb')).to.have.length(1);
  });


  it('componentDidMount', () => {
    sinon.spy(TextareaFormField.prototype, 'componentDidMount');
    instance = mount(<TextareaFormField standalone />);
    expect(TextareaFormField.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('componentWillUnmount', () => {
    sinon.spy(TextareaFormField.prototype, 'componentWillUnmount');
    instance = mount(<TextareaFormField standalone />);
    instance.unmount();
    expect(TextareaFormField.prototype.componentWillUnmount.calledOnce).to.equal(true);
  });

  it('componentDidUpdate model:view to edit', () => {
    sinon.spy(TextareaFormField.prototype, 'componentDidUpdate');
    instance = mount(<TextareaFormField autosize={false} standalone />);
    instance.setProps({ autosize: true, value: 'test' });
    expect(TextareaFormField.prototype.componentDidUpdate.callCount).to.equal(1);
  });


  it('attachFormField props is a function', () => {
    instance = mount(<TextareaFormField standalone />);
    expect(typeof instance.props().attachFormField).to.equal('function');
  });

  it('handleDataChange props is a function', () => {
    instance = mount(<TextareaFormField standalone />);
    expect(typeof instance.props().handleDataChange).to.equal('function');
  });


  it('handleFocus method', () => {
    instance = mount(<TextareaFormField standalone />);
    instance.find('.kuma-textarea').simulate('focus');
    expect(TextareaFormField.prototype.handleFocus.calledOnce).to.equal(true);
  });

  it('handleBlur method', () => {
    instance = mount(<TextareaFormField validateOnBlur standalone />);
    instance.find('.kuma-textarea').simulate('blur');
    expect(TextareaFormField.prototype.handleBlur.calledOnce).to.equal(true);
  });

  it('handleKeyDown method', () => {
    instance = mount(<TextareaFormField standalone />);
    instance.find('.kuma-textarea').simulate('keyDown');
    expect(TextareaFormField.prototype.handleKeyDown.calledOnce).to.equal(true);
  });


  it('FormCount', () => {
    instance = mount(<TextareaFormField standalone>
      <Count total={20} />
    </TextareaFormField>);
    instance.setProps({ value: 'test' });
    expect(instance.find('.kuma-uxform-textarea-count')).to.have.length(1);
    expect(instance.find('.kuma-uxform-count-max').text()).to.be('20');
  });

  it('jsxmode view', () => {
    instance = mount(<TextareaFormField standalone jsxmode="view" value="test" />);
    expect(instance.find('.kuma-uxform-field-content span .view-mode').text()).to.be('test');
  });
});
