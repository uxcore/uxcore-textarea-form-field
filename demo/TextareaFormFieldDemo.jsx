/**
 * TextareaFormField Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

import Form from 'uxcore-form/build/Form';
import Validators from 'uxcore-validator';
import React from 'react';
import Const from 'uxcore-const';
import Button from 'uxcore-button';
import TextAreaFormField from '../src';

const { TextAreaCount } = TextAreaFormField;

// const defaultValue = '我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据我是很长很长的数据';

const defaultValue = undefined;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: Const.MODE.EDIT,
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      value: defaultValue,
    });
  }

  handleTextAreaBlur(e, pass) {
    // console.log(e, pass);
  }

  handleModeChange() {
    const me = this;
    me.setState({
      mode: me.state.mode === Const.MODE.EDIT ? Const.MODE.VIEW : Const.MODE.EDIT,
    });
  }

  handleChange(value, name) {
    console.log(value[name]);
    this.setState({
      value: value[name],
    });
  }

  render() {
    const me = this;
    return (
      <div>
        <Form
          className="demo"
          jsxmode={me.state.mode}
          jsxvalues={{
            textArea: me.state.value,
          }}
          jsxonChange={me.handleChange.bind(me)}
        >
          <TextAreaFormField
            jsxname="textArea"
            jsxlabel="多行文本框"
            className="textarea"
            jsxrules={{
              validator: Validators.isNotEmpty,
              errMsg: '不能为空',
            }}
            jsxplaceholder="测试"
            validateOnBlur={false}
            onBlur={me.handleTextAreaBlur.bind(me)}
          >
            <TextAreaCount total={200} />
          </TextAreaFormField>
        </Form>
        <Button onClick={me.handleModeChange.bind(me)}>转变模式</Button>
      </div>
    );
  }
}


export default Demo;
