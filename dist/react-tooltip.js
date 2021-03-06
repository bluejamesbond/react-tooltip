'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var ReactTooltip = _react2['default'].createClass({

  displayName: 'ReactTooltip',

  propTypes: {
    place: _react2['default'].PropTypes.string,
    type: _react2['default'].PropTypes.string,
    effect: _react2['default'].PropTypes.string,
    positon: _react2['default'].PropTypes.object
  },

  _updatePosition: function _updatePosition() {
    var tipWidth = document.querySelector('[data-id=\'tooltip\']') ? document.querySelector('[data-id=\'tooltip\']').clientWidth : 0;
    var tipHeight = document.querySelector('[data-id=\'tooltip\']') ? document.querySelector('[data-id=\'tooltip\']').clientHeight : 0;
    var offset = { x: 0, y: 0 };
    var effect = this.state.effect;

    if (effect === 'float') {
      if (this.state.place === 'top') {
        offset.x = -(tipWidth / 2);
        offset.y = -50;
      } else if (this.state.place === 'bottom') {
        offset.x = -(tipWidth / 2);
        offset.y = 30;
      } else if (this.state.place === 'left') {
        offset.x = -(tipWidth + 15);
        offset.y = -(tipHeight / 2);
      } else if (this.state.place === 'right') {
        offset.x = 10;
        offset.y = -(tipHeight / 2);
      }
    }
    var xPosition = 0;var yPosition = 0;var position = this.state.position;

    if (Object.prototype.toString.apply(position) === '[object String]') {
      position = JSON.parse(position);
    }
    for (var key in position) {
      if (key === 'top') {
        yPosition -= parseInt(position[key]);
      } else if (key === 'bottom') {
        yPosition += parseInt(position[key]);
      } else if (key === 'left') {
        xPosition -= parseInt(position[key]);
      } else if (key === 'right') {
        xPosition += parseInt(position[key]);
      }
    }

    var node = _react2['default'].findDOMNode(this);

    node.style.left = this.state.x + offset.x + xPosition + 'px';
    node.style.top = this.state.y + offset.y + yPosition + 'px';
  },

  getInitialState: function getInitialState() {
    return {
      show: false,
      placeholder: '',
      x: 'NONE',
      y: 'NONE',
      place: '',
      type: '',
      effect: '',
      position: {}
    };
  },

  componentDidMount: function componentDidMount() {

    this._updatePosition();

    var targetArray = document.querySelectorAll('[data-tip]');
    for (var i = 0; i < targetArray.length; i++) {
      targetArray[i].addEventListener('mouseenter', this.showTooltip, false);
      targetArray[i].addEventListener('mousemove', this.updateTooltip, false);
      targetArray[i].addEventListener('mouseleave', this.hideTooltip, false);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    var targetArray = document.querySelectorAll('[data-tip]');
    for (var i = 0; i < targetArray.length; i++) {
      targetArray[i].removeEventListener('mouseenter', this.showTooltip);
      targetArray[i].removeEventListener('mousemove', this.updateTooltip);
      targetArray[i].removeEventListener('mouseleave', this.hideTooltip);
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    this._updatePosition();
  },

  showTooltip: function showTooltip(e) {
    this.setState({
      placeholder: e.target.getAttribute('data-tip'),
      place: e.target.getAttribute('data-place') ? e.target.getAttribute('data-place') : this.props.place ? this.props.place : 'top',
      type: e.target.getAttribute('data-type') ? e.target.getAttribute('data-type') : this.props.type ? this.props.type : 'dark',
      effect: e.target.getAttribute('data-effect') ? e.target.getAttribute('data-effect') : this.props.effect ? this.props.effect : 'float',
      position: e.target.getAttribute('data-position') ? e.target.getAttribute('data-position') : this.props.position ? this.props.position : {}
    });
    this.updateTooltip(e);
  },

  updateTooltip: function updateTooltip(e) {
    if (this.trim(this.state.placeholder).length > 0) {
      if (this.state.effect === 'float') {
        this.setState({
          show: true,
          x: e.clientX,
          y: e.clientY
        });
      } else if (this.state.effect === 'solid') {
        var targetTop = e.target.getBoundingClientRect().top;
        var targetLeft = e.target.getBoundingClientRect().left;
        var tipWidth = document.querySelector('[data-id=\'tooltip\']') ? document.querySelector('[data-id=\'tooltip\']').clientWidth : 0;
        var tipHeight = document.querySelector('[data-id=\'tooltip\']') ? document.querySelector('[data-id=\'tooltip\']').clientHeight : 0;
        var targetWidth = e.target.clientWidth;
        var targetHeight = e.target.clientHeight;
        var place = this.state.place;

        var x = undefined,
            y = undefined;
        if (place === 'top') {
          x = targetLeft - tipWidth / 2 + targetWidth / 2;
          y = targetTop - tipHeight - 8;
        } else if (place === 'bottom') {
          x = targetLeft - tipWidth / 2 + targetWidth / 2;
          y = targetTop + targetHeight + 8;
        } else if (place === 'left') {
          x = targetLeft - tipWidth - 6;
          y = targetTop + targetHeight / 2 - tipHeight / 2;
        } else if (place === 'right') {
          x = targetLeft + targetWidth + 6;
          y = targetTop + targetHeight / 2 - tipHeight / 2;
        }
        this.setState({
          show: true,
          x: this.state.x === 'NONE' ? x : this.state.x,
          y: this.state.y === 'NONE' ? y : this.state.y
        });
      }
    }
  },

  hideTooltip: function hideTooltip(e) {
    this.setState({
      show: false,
      x: 'NONE',
      y: 'NONE'
    });
  },

  trim: function trim(string) {
    var newString = string.split('');
    var firstCount = 0,
        lastCount = 0;
    for (var i = 0; i < string.length; i++) {
      if (string[i] !== ' ') {
        break;
      }
      firstCount++;
    }
    for (var i = string.length - 1; i >= 0; i--) {
      if (string[i] !== ' ') {
        break;
      }
      lastCount++;
    }
    newString.splice(0, firstCount);
    newString.splice(-lastCount, lastCount);
    return newString.join('');
  },

  render: function render() {

    var tooltipClass = (0, _classnames2['default'])('reactTooltip', { 'show': this.state.show }, { 'place-top': this.state.place === 'top' }, { 'place-bottom': this.state.place === 'bottom' }, { 'place-left': this.state.place === 'left' }, { 'place-right': this.state.place === 'right' }, { 'type-dark': this.state.type === 'dark' }, { 'type-success': this.state.type === 'success' }, { 'type-warning': this.state.type === 'warning' }, { 'type-error': this.state.type === 'error' }, { 'type-info': this.state.type === 'info' }, { 'type-light': this.state.type === 'light' });

    return _react2['default'].createElement(
      'span',
      { className: tooltipClass, 'data-id': 'tooltip' },
      this.state.placeholder
    );
  }
});

exports['default'] = ReactTooltip;
module.exports = exports['default'];
