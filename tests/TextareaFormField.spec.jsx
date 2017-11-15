import expect from 'expect.js';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Constants from 'uxcore-const';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import TextareaFormField from '../src';

const Count = TextareaFormField.TextAreaCount;

Enzyme.configure({ adapter: new Adapter() });

sinon.spy(TextareaFormField.prototype, 'handleFocus');
sinon.spy(TextareaFormField.prototype, 'handleBlur');
sinon.spy(TextareaFormField.prototype, 'handleKeyDown');

describe('TextareaFormField', () => {
  let instance;

  it('autoTrim', () => {
    instance = mount(<TextareaFormField autoTrim standalone />);
    instance.find('.kuma-textarea').instance().value = 'test ';
    instance.find('.kuma-textarea').simulate('change');
    expect(instance.find('.kuma-textarea').instance().value).to.be('test');
  });

  // jsxmode 无默认值
  it('default jsxmode', () => {
    instance = mount(<TextareaFormField jsxmode={Constants.MODE.EDIT} standalone />);
    expect(instance.props().jsxmode).to.equal(Constants.MODE.EDIT);
  });

  it('default mode', () => {
    instance = mount(
      <TextareaFormField standalone />);
    expect(instance.props().mode).to.equal(Constants.MODE.EDIT);
  });

  it('set standalone false', () => {
    const spy = sinon.spy();

    instance = mount(
      <TextareaFormField attachFormField={spy} handleDataChange={spy} standalone={false} />,
    );
    expect(instance.props().standalone).to.equal(false);
  });


  it('jsxprefixCls', () => {
    instance = mount(<TextareaFormField jsxprefixCls="test_bbb" autoTrim standalone />);
    expect(instance.find('.test_bbb')).to.have.length(1);
  });

  it('componentDidMount', () => {
    const spy = sinon.spy(TextareaFormField.prototype, 'componentDidMount');
    instance = mount(<TextareaFormField standalone />);
    expect(TextareaFormField.prototype.componentDidMount.calledOnce).to.equal(true);
    spy.restore();
  });

  it('componentWillUnmount', () => {
    const spy = sinon.spy();
    sinon.spy(TextareaFormField.prototype, 'componentWillUnmount');
    instance = mount(<TextareaFormField
      detachFormField={spy}
      attachFormField={spy} handleDataChange={spy} standalone={false}
    />);
    instance.unmount();
    expect(TextareaFormField.prototype.componentWillUnmount.calledOnce).to.equal(true);
  });

  it('componentDidUpdate model:view to edit', () => {
    const spy = sinon.spy(TextareaFormField.prototype, 'componentDidUpdate');
    instance = mount(<TextareaFormField
      mode={Constants.MODE.VIEW}
      jsxmode={Constants.MODE.VIEW} autosize={false} standalone
    />);
    instance.setProps({ autosize: true, mode: Constants.MODE.EDIT, jsxmode: Constants.MODE.EDIT, value: 'test' });
    expect(TextareaFormField.prototype.componentDidUpdate.callCount).to.equal(1);
    spy.restore();
  });

  it('componentDidUpdate model:edit to view', () => {
    const spy = sinon.spy(TextareaFormField.prototype, 'componentDidUpdate');
    instance = mount(<TextareaFormField
      mode={Constants.MODE.EDIT}
      jsxmode={Constants.MODE.EDIT} autosize={false} standalone
    />);
    instance.setProps({ autosize: true, mode: Constants.MODE.VIEW, jsxmode: Constants.MODE.VIEW, value: 'test' });
    expect(TextareaFormField.prototype.componentDidUpdate.callCount).to.equal(1);
    spy.restore();
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
    instance = mount(<TextareaFormField standalone jsxmode={Constants.MODE.VIEW} value="test" />);
    expect(instance.find('.kuma-uxform-field-content span .view-mode').text()).to.be('test');
  });
});
