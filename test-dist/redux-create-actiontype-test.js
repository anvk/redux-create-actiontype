'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distReduxCreateActiontypeJs = require('../dist/redux-create-actiontype.js');

var _distReduxCreateActiontypeJs2 = _interopRequireDefault(_distReduxCreateActiontypeJs);

describe('redux-create-actiontype tests', function () {
  it('empty input', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])()();

    (0, _chai.expect)(types).to.deep.equal({});
  });

  it('basic input', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])()('LOGIN', 'LOGOUT');

    (0, _chai.expect)(types).to.deep.equal({
      'LOGIN': 'LOGIN',
      'LOGOUT': 'LOGOUT'
    });
  });

  it('basic input with lowercases and spaces', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])()('login', 'logOUT', 'eat borscht');

    (0, _chai.expect)(types).to.deep.equal({
      'LOGIN': 'LOGIN',
      'LOGOUT': 'LOGOUT',
      'EAT_BORSCHT': 'EAT_BORSCHT'
    });
  });

  it('basic input with prefix as argument', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])('USERS')('LOGIN', 'LOGOUT');

    (0, _chai.expect)(types).to.deep.equal({
      'USERS_LOGIN': 'USERS_LOGIN',
      'USERS_LOGOUT': 'USERS_LOGOUT'
    });
  });

  it('basic input with prefix as part of options', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])({
      prefix: 'USERS'
    })('LOGIN', 'LOGOUT');

    (0, _chai.expect)(types).to.deep.equal({
      'USERS_LOGIN': 'USERS_LOGIN',
      'USERS_LOGOUT': 'USERS_LOGOUT'
    });
  });

  it('basic input with prefix and / separator', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])({
      prefix: 'USERS',
      separator: '/'
    })('LOGIN', 'LOGOUT');

    (0, _chai.expect)(types).to.deep.equal({
      'USERS/LOGIN': 'USERS/LOGIN',
      'USERS/LOGOUT': 'USERS/LOGOUT'
    });
  });

  it('basic input with lowercase prefix and / separator', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])({
      prefix: 'users',
      separator: '/',
      prefixUpperCase: false
    })('LOGIN', 'LOGOUT');

    (0, _chai.expect)(types).to.deep.equal({
      'users/LOGIN': 'users/LOGIN',
      'users/LOGOUT': 'users/LOGOUT'
    });
  });

  it('basic input with lowercase prefix and / separator and no uppercasing', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])({
      prefix: 'users',
      separator: '/',
      upperCase: false,
      prefixUpperCase: false
    })('login', 'logout user');

    (0, _chai.expect)(types).to.deep.equal({
      'users/login': 'users/login',
      'users/logout_user': 'users/logout_user'
    });
  });

  it('api example', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])('USERS')('form change', { 'login': { api: true } });

    (0, _chai.expect)(types).to.deep.equal({
      'USERS_FORM_CHANGE': 'USERS_FORM_CHANGE',
      'USERS_LOGIN_LOADING': 'USERS_LOGIN_LOADING',
      'USERS_LOGIN_SUCCESS': 'USERS_LOGIN_SUCCESS',
      'USERS_LOGIN_ERROR': 'USERS_LOGIN_ERROR'
    });
  });

  it('custom api postfix', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])({
      prefix: 'USERS',
      apiPostfixes: ['OK', 'BAD']
    })('form change', { 'login': { api: true } });

    (0, _chai.expect)(types).to.deep.equal({
      'USERS_FORM_CHANGE': 'USERS_FORM_CHANGE',
      'USERS_LOGIN_OK': 'USERS_LOGIN_OK',
      'USERS_LOGIN_BAD': 'USERS_LOGIN_BAD'
    });
  });

  it('custom postfix', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])('USERS')('form change', { 'dialog': { postfixes: ['close', 'open'] } });

    (0, _chai.expect)(types).to.deep.equal({
      'USERS_FORM_CHANGE': 'USERS_FORM_CHANGE',
      'USERS_DIALOG_CLOSE': 'USERS_DIALOG_CLOSE',
      'USERS_DIALOG_OPEN': 'USERS_DIALOG_OPEN'
    });
  });

  it('basic input with prefix as argument and compound action types', function () {
    var extraTypes = (0, _distReduxCreateActiontypeJs2['default'])('DIALOG')('OPEN', 'CLOSE');

    var types = (0, _distReduxCreateActiontypeJs2['default'])('USERS')('LOGIN', 'LOGOUT', extraTypes);

    (0, _chai.expect)(types).to.deep.equal({
      'USERS_LOGIN': 'USERS_LOGIN',
      'USERS_LOGOUT': 'USERS_LOGOUT',
      'USERS_DIALOG_CLOSE': 'USERS_DIALOG_CLOSE',
      'USERS_DIALOG_OPEN': 'USERS_DIALOG_OPEN'
    });
  });

  it('basic input with prefix as argument and compound action types passed as argument', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])('USERS')('login', 'logout', (0, _distReduxCreateActiontypeJs2['default'])('dialog')('open', 'close', (0, _distReduxCreateActiontypeJs2['default'])('FORM')({ 'submit': { api: true } })));

    (0, _chai.expect)(types).to.deep.equal({
      'USERS_LOGIN': 'USERS_LOGIN',
      'USERS_LOGOUT': 'USERS_LOGOUT',
      'USERS_DIALOG_CLOSE': 'USERS_DIALOG_CLOSE',
      'USERS_DIALOG_OPEN': 'USERS_DIALOG_OPEN',
      'USERS_DIALOG_FORM_SUBMIT_ERROR': 'USERS_DIALOG_FORM_SUBMIT_ERROR',
      'USERS_DIALOG_FORM_SUBMIT_LOADING': 'USERS_DIALOG_FORM_SUBMIT_LOADING',
      'USERS_DIALOG_FORM_SUBMIT_SUCCESS': 'USERS_DIALOG_FORM_SUBMIT_SUCCESS'
    });
  });

  it('basic input with prefix as argument and compound action types passed as argument', function () {
    var types = (0, _distReduxCreateActiontypeJs2['default'])('my app')('login', 'logout', (0, _distReduxCreateActiontypeJs2['default'])('users')({ fetch: { api: true } }, { dialog: { postfixes: ['open', 'close'] } }, 'send email', 'eat borscht'));

    (0, _chai.expect)(types).to.deep.equal({
      MY_APP_LOGIN: 'MY_APP_LOGIN',
      MY_APP_LOGOUT: 'MY_APP_LOGOUT',
      MY_APP_USERS_FETCH_LOADING: 'MY_APP_USERS_FETCH_LOADING',
      MY_APP_USERS_FETCH_SUCCESS: 'MY_APP_USERS_FETCH_SUCCESS',
      MY_APP_USERS_FETCH_ERROR: 'MY_APP_USERS_FETCH_ERROR',
      MY_APP_USERS_DIALOG_OPEN: 'MY_APP_USERS_DIALOG_OPEN',
      MY_APP_USERS_DIALOG_CLOSE: 'MY_APP_USERS_DIALOG_CLOSE',
      MY_APP_USERS_SEND_EMAIL: 'MY_APP_USERS_SEND_EMAIL',
      MY_APP_USERS_EAT_BORSCHT: 'MY_APP_USERS_EAT_BORSCHT'
    });
  });
});