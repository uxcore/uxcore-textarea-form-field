/**
 * TextareaFormField Component for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

import FormField from 'uxcore-form-field';
import Constants from 'uxcore-const';
import assign from 'object-assign';
import autosize from 'autosize';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getIEVer } from 'uxcore-utils';

const trim = str => str.replace(/(^\s+|\s+$)/g, '');

const FormCount = props => (
  <div
    className={classnames('kuma-uxform-textarea-count', {
      [`${props.prefixCls}-has-error`]: parseInt(props.length, 10) > parseInt(props.total, 10),
    })}
  >
    <span
      className={classnames({
        [`${props.prefixCls}-actual`]: true,
        [`${props.prefixCls}-overflow`]: parseInt(props.length, 10) > parseInt(props.total, 10),
      })}
    >{props.length}</span>
    <span className={`${props.prefixCls}-slash`}>/</span>
    <span className={`${props.prefixCls}-max`}>{props.total}</span>
  </div>
);

FormCount.displayName = 'FormCount';
FormCount.propTypes = {
  prefixCls: PropTypes.string,
  length: PropTypes.number,
  total: PropTypes.number,
};

FormCount.defaultProps = {
  prefixCls: 'kuma-uxform-count',
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

  componentDidUpdate(prevProps, prevState) {
    const me = this;
    const mode = me.props.jsxmode || me.props.mode;
    const prevMode = prevProps.jsxmode || prevProps.mode;
    if (me.props.autosize) {
      if (prevProps.value !== me.props.value || prevState.value !== me.state.value) {
        autosize.update(me.root);
      }
      if (prevMode === Constants.MODE.VIEW && mode === Constants.MODE.EDIT) {
        autosize(me.root);
      } else if (prevMode === Constants.MODE.EDIT && mode === Constants.MODE.VIEW) {
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
    const IEver = getIEVer();
    const placeholder = (IEver >= 10 && me.props.IECompatible) ? '' : me.props.jsxplaceholder;
    if (mode === Constants.MODE.EDIT) {
      return (
        <div
          className={classnames({
            'has-count': !!count,
          })}
        >
          <textarea
            disabled={me.props.jsxdisabled}
            placeholder={placeholder}
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
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  validateOnBlur: PropTypes.bool,
  autoTrim: PropTypes.bool,
  autosize: PropTypes.bool,
  IECompatible: PropTypes.bool,
});

TextAreaFormField.defaultProps = assign({}, FormField.defaultProps, {
  onBlur: () => { },
  onFocus: () => { },
  onKeyDown: () => { },
  validateOnBlur: false,
  autosize: true,
  IECompatible: true,
});

export default TextAreaFormField;
