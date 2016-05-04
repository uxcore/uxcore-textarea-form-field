/**
 * TextareaFormField Component for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

let FormField = require('uxcore-form-field');
let Constants = require("uxcore-const");
let assign = require('object-assign');
let autosize = require('autosize');

class TextAreaFormField extends FormField {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let me = this;
        if (!me.props.standalone) {
          me.props.attachFormField(me);
          me.props.handleDataChange(me, {
              value: me.props.value,
              pass: true
          }, true);
        }
        me.props.autosize && autosize(me.refs.root);
    }

    componentWillUnmount() {
        let me = this;
        if (!me.props.standalone) {
            this.props.detachFormField(this);
        }
        me.props.autosize && autosize.destory(me.refs.root);
    }

    componentDidUpdate(prevProps, prevState) {
        let me = this;
        let mode = me.props.jsxmode || me.props.mode;
        let prevMode = prevProps.jsxmode || prevProps.mode;
        if (prevMode == Constants.MODE.VIEW && mode == Constants.MODE.EDIT) {
            autosize(me.refs.root);
        }
        else if (prevMode == Constants.MODE.EDIT && mode == Constants.MODE.MODE) {
            autosize.destory(me.refs.root);
        }
    }

    handleChange(e) {
        let me = this;
        let {autoTrim} = me.props;
        let value = e.currentTarget.value;
        if (autoTrim) {
            value = me.trim(value);
        }
        me.handleDataChange(value);
    }

    trim(str) {
        return str.replace(/(^\s+|\s+$)/g, "");
    }

    addSpecificClass() {
        let me = this;
        if (me.props.jsxprefixCls == "kuma-uxform-field") {
            return me.props.jsxprefixCls + " kuma-textarea-uxform-field" ;
        }
        else {
            return me.props.jsxprefixCls
        }
    }

    handleFocus(e) {
        this.props.onFocus(e);
    }

    handleBlur(e) {
        let me = this;
        let pass = true
        if (me.props.validateOnBlur) {
            pass = me.doValidate();
        }
        me.props.onBlur(e, pass);
    }

    handleKeyDown(e) {
        let me = this;
        me.props.onKeyDown(e);
    }


    renderField() {
        let me = this;
        let mode = me.props.jsxmode || me.props.mode;
        if (mode == Constants.MODE.EDIT) {
            return  <textarea
                     disabled={me.props.jsxdisabled}
                     placeholder={me.props.jsxplaceholder}
                     className="kuma-textarea"
                     ref="root"
                     value={me.state.value || ""}
                     onChange={me.handleChange.bind(me)}
                     onFocus={me.handleFocus.bind(me)}
                     onBlur={me.handleBlur.bind(me)}
                     onKeyDown={me.handleKeyDown.bind(me)}/>
        }
        else if (mode == Constants.MODE.VIEW) {
            return <span>{me.state.value}</span>
        }
    }
}

TextAreaFormField.displayName = "TextAreaFormField";

TextAreaFormField.propTypes = assign({}, FormField.propTypes, {
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    validateOnBlur: React.PropTypes.bool,
    autoTrim: React.PropTypes.bool,
    autosize: React.PropTypes.bool
});

TextAreaFormField.defaultProps = assign({}, FormField.defaultProps, {
    onBlur: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    validateOnBlur: false,
    autosize: true
});

module.exports = TextAreaFormField;
