/**
 * TextareaFormField Component for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

const FormField = require('uxcore-form-field');
const Constants = require('uxcore-const');
const assign = require('object-assign');
const autosize = require('autosize');
const React = require('react');
const classnames = require('classnames');

const trim = str => str.replace(/(^\s+|\s+$)/g, '');

const FormCount = props => <div className="kuma-uxform-textarea-count">{`${props.length}/${props.total}`}</div>;

FormCount.displayName = 'FormCount';
FormCount.propTypes = {
  length: React.PropTypes.number,
  total: React.PropTypes.number,
};

class TextAreaFormField extends FormField {

  componentDidMount() {
    const me = this;
    if (!me.props.standalone) {
      me.props.attachFormField(me);
      me.props.handleDataChange(me, {
        value: me.props.value,
        pass: true,
      }, true);
    }
    if (me.props.autosize) {
      autosize(me.root);
    }
  }

  componentWillUnmount() {
    const me = this;
    if (!me.props.standalone) {
      this.props.detachFormField(this);
    }
    if (me.props.autosize) {
      autosize.destroy(me.root);
    }
  }

  componentDidUpdate(prevProps) {
    const me = this;
    const mode = me.props.jsxmode || me.props.mode;
    const prevMode = prevProps.jsxmode || prevProps.mode;
    if (me.props.autosize) {
      if (prevProps.value !== me.props.value) {
        autosize.update(me.root);
      }
      if (prevMode === Constants.MODE.VIEW && mode === Constants.MODE.EDIT) {
        autosize(me.root);
      } else if (prevMode === Constants.MODE.EDIT && mode === Constants.MODE.MODE) {
        autosize.destroy(me.root);
      }
    }
  }

  saveRef(refName) {
    const me = this;
    return (c) => {
      me[refName] = c;
    };
  }

  handleChange(e) {
    const me = this;
    const { autoTrim } = me.props;
    let value = e.currentTarget.value;
    if (autoTrim) {
      value = trim(value);
    }
    me.handleDataChange(value);
  }

  addSpecificClass() {
    const me = this;
    if (me.props.jsxprefixCls === 'kuma-uxform-field') {
      return `${me.props.jsxprefixCls} kuma-textarea-uxform-field`;
    }
    return me.props.jsxprefixCls;
  }

  handleFocus(e) {
    this.props.onFocus(e);
  }

  handleBlur(e) {
    const me = this;
    let pass = true;
    if (me.props.validateOnBlur) {
      pass = me.doValidate();
    }
    me.props.onBlur(e, pass);
  }

  handleKeyDown(e) {
    const me = this;
    me.props.onKeyDown(e);
  }

  getCount() {
    const me = this;
    const children = me.props.children;
    let element;
    React.Children.map(children, (child) => {
      if (child && typeof child.type === 'function' && child.type.displayName === 'FormCount') {
        element = child;
      }
    });
    if (element) {
      const Count = React.cloneElement(element, {
        length: me.state.value ? me.state.value.length : 0,
        key: 'count',
      });

      return Count;
    }
    return null;
  }


  renderField() {
    const me = this;
    const mode = me.props.jsxmode || me.props.mode;
    const count = me.getCount();
    if (mode === Constants.MODE.EDIT) {
      return (
        <div
          style={{
            positon: 'relative',
          }}
          className={classnames({
            'has-count': !!count,
          })}
        >
          <textarea
            disabled={me.props.jsxdisabled}
            placeholder={me.props.jsxplaceholder}
            className="kuma-textarea"
            ref={me.saveRef('root')}
            value={me.state.value || ''}
            onChange={me.handleChange.bind(me)}
            onFocus={me.handleFocus.bind(me)}
            onBlur={me.handleBlur.bind(me)}
            onKeyDown={me.handleKeyDown.bind(me)}
          />
          {count}
        </div>
      );
    }
    return (
      <span
        style={{
          whiteSpace: 'pre-wrap',
        }}
        className="view-mode"
      >{me.state.value}</span>
    );
  }

}

TextAreaFormField.displayName = 'TextAreaFormField';
TextAreaFormField.TextAreaCount = FormCount;

TextAreaFormField.propTypes = assign({}, FormField.propTypes, {
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  validateOnBlur: React.PropTypes.bool,
  autoTrim: React.PropTypes.bool,
  autosize: React.PropTypes.bool,
});

TextAreaFormField.defaultProps = assign({}, FormField.defaultProps, {
  onBlur: () => { },
  onFocus: () => { },
  onKeyDown: () => { },
  validateOnBlur: false,
  autosize: true,
});

module.exports = TextAreaFormField;
