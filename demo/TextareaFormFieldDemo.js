/**
 * TextareaFormField Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

let classnames = require('classnames');

let TextAreaFormField = require('../src');
let Form = require('uxcore-form/build/Form');
let Validators = require('uxcore-validator');
let Const = require('uxcore-const');
let Button = require('uxcore-button');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: Const.MODE.EDIT
        }
    }

    handleTextAreaBlur(e, pass) {
        // console.log(e, pass);
    }

    handleModeChange() {
        let me = this;
        me.setState({
            mode: me.state.mode == Const.MODE.EDIT ? Const.MODE.VIEW : Const.MODE.EDIT
        })
    }

    render() {
        let me = this;
        return (
            <div>
                <Form className="demo" jsxmode={me.state.mode}>
                    <TextAreaFormField jsxname="textArea" jsxlabel="多行文本框" className="textarea" jsxrules={{ validator: Validators.isNotEmpty, errMsg: "不能为空" }} jsxplaceholder="测试" validateOnBlur={false}
                  onBlur={me.handleTextAreaBlur.bind(me)} />
                    <TextAreaFormField jsxname="textArea2" jsxlabel="多行文本框" className="textarea2" jsxrules={{ validator: Validators.isNotEmpty, errMsg: "不能为空" }} jsxplaceholder="测试" validateOnBlur={false}
                  onBlur={me.handleTextAreaBlur.bind(me)} />
                </Form>
                <Button onClick={me.handleModeChange.bind(me)}>转变模式</Button>
            </div>
        );
    }
}
;

module.exports = Demo;
