'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNativeDrawerLayoutPolyfill = require('react-native-drawer-layout-polyfill');

var _reactNativeDrawerLayoutPolyfill2 = _interopRequireDefault(_reactNativeDrawerLayoutPolyfill);

var _addNavigationHelpers = require('../../addNavigationHelpers');

var _addNavigationHelpers2 = _interopRequireDefault(_addNavigationHelpers);

var _DrawerSidebar = require('./DrawerSidebar');

var _DrawerSidebar2 = _interopRequireDefault(_DrawerSidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component that renders the drawer.
 */
var DrawerView = function (_PureComponent) {
  _inherits(DrawerView, _PureComponent);

  function DrawerView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DrawerView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DrawerView.__proto__ || Object.getPrototypeOf(DrawerView)).call.apply(_ref, [this].concat(args))), _this), _this._handleDrawerOpen = function () {
      var navigation = _this.props.navigation;
      var _navigation$state = navigation.state,
          routes = _navigation$state.routes,
          index = _navigation$state.index;

      if (routes[index].routeName !== 'DrawerOpen') {
        _this.props.navigation.navigate('DrawerOpen');
      }
    }, _this._handleDrawerClose = function () {
      var navigation = _this.props.navigation;
      var _navigation$state2 = navigation.state,
          routes = _navigation$state2.routes,
          index = _navigation$state2.index;

      if (routes[index].routeName !== 'DrawerClose') {
        _this.props.navigation.navigate('DrawerClose');
      }
    }, _this._updateScreenNavigation = function (navigation) {
      var navigationState = navigation.state.routes.find(function (route) {
        return route.routeName === 'DrawerClose';
      });
      if (_this._screenNavigationProp && _this._screenNavigationProp.state === navigationState) {
        return;
      }
      _this._screenNavigationProp = (0, _addNavigationHelpers2.default)(_extends({}, navigation, {
        state: navigationState
      }));
    }, _this._getNavigationState = function (navigation) {
      var navigationState = navigation.state.routes.find(function (route) {
        return route.routeName === 'DrawerClose';
      });
      return navigationState;
    }, _this._renderNavigationView = function () {
      return _react2.default.createElement(_DrawerSidebar2.default, {
        screenProps: _this.props.screenProps,
        navigation: _this._screenNavigationProp,
        router: _this.props.router,
        contentComponent: _this.props.contentComponent,
        contentOptions: _this.props.contentOptions,
        style: _this.props.style
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DrawerView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._updateScreenNavigation(this.props.navigation);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.navigation.state.index !== nextProps.navigation.state.index) {
        var _nextProps$navigation = nextProps.navigation.state,
            routes = _nextProps$navigation.routes,
            _index = _nextProps$navigation.index;

        if (routes[_index].routeName === 'DrawerOpen') {
          this._drawer.openDrawer();
        } else if (routes[_index].routeName === 'DrawerToggle') {
          if (this._drawer.state.drawerShown) {
            this.props.navigation.navigate('DrawerClose');
          } else {
            this.props.navigation.navigate('DrawerOpen');
          }
        } else {
          this._drawer.closeDrawer();
        }
      }
      this._updateScreenNavigation(nextProps.navigation);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var DrawerScreen = this.props.router.getComponentForRouteName('DrawerClose');

      var screenNavigation = (0, _addNavigationHelpers2.default)({
        state: this._screenNavigationProp.state,
        dispatch: this._screenNavigationProp.dispatch
      });

      var config = this.props.router.getScreenOptions(screenNavigation, this.props.screenProps);

      return _react2.default.createElement(
        _reactNativeDrawerLayoutPolyfill2.default,
        {
          ref: function ref(c) {
            _this2._drawer = c;
          },
          drawerLockMode: this.props.screenProps && this.props.screenProps.drawerLockMode || config && config.drawerLockMode,
          drawerWidth: this.props.drawerWidth,
          onDrawerOpen: this._handleDrawerOpen,
          onDrawerClose: this._handleDrawerClose,
          useNativeAnimations: this.props.useNativeAnimations,
          renderNavigationView: this._renderNavigationView,
          drawerPosition: this.props.drawerPosition === 'right' ? _reactNativeDrawerLayoutPolyfill2.default.positions.Right : _reactNativeDrawerLayoutPolyfill2.default.positions.Left
        },
        _react2.default.createElement(DrawerScreen, {
          screenProps: this.props.screenProps,
          navigation: this._screenNavigationProp
        })
      );
    }
  }]);

  return DrawerView;
}(_react.PureComponent);

exports.default = DrawerView;