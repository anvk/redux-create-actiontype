import { expect } from 'chai';
import createActionTypes from '../dist/redux-create-actiontype.js';

describe('redux-create-actiontype tests', () => {
  it('empty input', () => {
    const types = createActionTypes()();

    expect(types).to.deep.equal({});
  });

  it('basic input', () => {
    const types = createActionTypes()(
      'LOGIN',
      'LOGOUT'
    );

    expect(types).to.deep.equal({
      'LOGIN': 'LOGIN',
      'LOGOUT': 'LOGOUT'
    });
  });

  it('basic input with lowercases and spaces', () => {
    const types = createActionTypes()(
      'login',
      'logOUT',
      'eat borscht'
    );

    expect(types).to.deep.equal({
      'LOGIN': 'LOGIN',
      'LOGOUT': 'LOGOUT',
      'EAT_BORSCHT': 'EAT_BORSCHT'
    });
  });

  it('basic input with prefix as argument', () => {
    const types = createActionTypes('USERS')(
      'LOGIN',
      'LOGOUT'
    );

    expect(types).to.deep.equal({
      'USERS_LOGIN': 'USERS_LOGIN',
      'USERS_LOGOUT': 'USERS_LOGOUT'
    });
  });

  it('basic input with prefix as part of options', () => {
    const types = createActionTypes({
      prefix: 'USERS'
    })(
      'LOGIN',
      'LOGOUT'
    );

    expect(types).to.deep.equal({
      'USERS_LOGIN': 'USERS_LOGIN',
      'USERS_LOGOUT': 'USERS_LOGOUT'
    });
  });

  it('basic input with prefix and / separator', () => {
    const types = createActionTypes({
      prefix: 'USERS',
      separator: '/'
    })(
      'LOGIN',
      'LOGOUT'
    );

    expect(types).to.deep.equal({
      'USERS/LOGIN': 'USERS/LOGIN',
      'USERS/LOGOUT': 'USERS/LOGOUT'
    });
  });

  it('basic input with lowercase prefix and / separator', () => {
    const types = createActionTypes({
      prefix: 'users',
      separator: '/',
      prefixUpperCase: false
    })(
      'LOGIN',
      'LOGOUT'
    );

    expect(types).to.deep.equal({
      'users/LOGIN': 'users/LOGIN',
      'users/LOGOUT': 'users/LOGOUT'
    });
  });

  it('basic input with lowercase prefix and / separator and no uppercasing', () => {
    const types = createActionTypes({
      prefix: 'users',
      separator: '/',
      upperCase: false,
      prefixUpperCase: false
    })(
      'login',
      'logout user'
    );

    expect(types).to.deep.equal({
      'users/login': 'users/login',
      'users/logout_user': 'users/logout_user'
    });
  });

  it('api example', () => {
    const types = createActionTypes('USERS')(
      'form change',
      { 'login': { api: true } }
    );

    expect(types).to.deep.equal({
      'USERS_FORM_CHANGE': 'USERS_FORM_CHANGE',
      'USERS_LOGIN_FETCHING': 'USERS_LOGIN_FETCHING',
      'USERS_LOGIN_SUCCESS': 'USERS_LOGIN_SUCCESS',
      'USERS_LOGIN_ERROR': 'USERS_LOGIN_ERROR'
    });
  });

  it('custom api postfix', () => {
    const types = createActionTypes({
      prefix: 'USERS',
      apiPostfixes: ['OK', 'BAD']
    })(
      'form change',
      { 'login': { api: true } }
    );

    expect(types).to.deep.equal({
      'USERS_FORM_CHANGE': 'USERS_FORM_CHANGE',
      'USERS_LOGIN_OK': 'USERS_LOGIN_OK',
      'USERS_LOGIN_BAD': 'USERS_LOGIN_BAD'
    });
  });

  it('custom postfix', () => {
    const types = createActionTypes('USERS')(
      'form change',
      { 'dialog': { postfixes: ['close', 'open'] } }
    );

    expect(types).to.deep.equal({
      'USERS_FORM_CHANGE': 'USERS_FORM_CHANGE',
      'USERS_DIALOG_CLOSE': 'USERS_DIALOG_CLOSE',
      'USERS_DIALOG_OPEN': 'USERS_DIALOG_OPEN'
    });
  });

  it('basic input with prefix as argument and compound action types', () => {
    const extraTypes = createActionTypes('DIALOG')(
      'OPEN',
      'CLOSE'
    );

    const types = createActionTypes('USERS')(
      'LOGIN',
      'LOGOUT',
      extraTypes
    );

    expect(types).to.deep.equal({
      'USERS_LOGIN': 'USERS_LOGIN',
      'USERS_LOGOUT': 'USERS_LOGOUT',
      'USERS_DIALOG_CLOSE': 'USERS_DIALOG_CLOSE',
      'USERS_DIALOG_OPEN': 'USERS_DIALOG_OPEN'
    });
  });

  it('basic input with prefix as argument and compound action types passed as argument', () => {
    const types = createActionTypes('USERS')(
      'login',
      'logout',
      createActionTypes('dialog')(
        'open',
        'close',
        createActionTypes('FORM')(
          { 'submit': { api: true } }
        )
      )
    );

    expect(types).to.deep.equal({
      'USERS_LOGIN': 'USERS_LOGIN',
      'USERS_LOGOUT': 'USERS_LOGOUT',
      'USERS_DIALOG_CLOSE': 'USERS_DIALOG_CLOSE',
      'USERS_DIALOG_OPEN': 'USERS_DIALOG_OPEN',
      'USERS_DIALOG_FORM_SUBMIT_ERROR': 'USERS_DIALOG_FORM_SUBMIT_ERROR',
      'USERS_DIALOG_FORM_SUBMIT_FETCHING': 'USERS_DIALOG_FORM_SUBMIT_FETCHING',
      'USERS_DIALOG_FORM_SUBMIT_SUCCESS': 'USERS_DIALOG_FORM_SUBMIT_SUCCESS'
    });
  });

  it('basic input with prefix as argument and compound action types passed as argument', () => {
    const types = createActionTypes('my app')(
      'login',
      'logout',
      createActionTypes('users')(
        { fetch: { api: true } },
        { dialog: { postfixes: ['open', 'close' ]}},
        'send email',
        'eat borscht'
      )
    );

    expect(types).to.deep.equal({
      MY_APP_LOGIN: 'MY_APP_LOGIN',
      MY_APP_LOGOUT: 'MY_APP_LOGOUT',
      MY_APP_USERS_FETCH_FETCHING: 'MY_APP_USERS_FETCH_FETCHING',
      MY_APP_USERS_FETCH_SUCCESS: 'MY_APP_USERS_FETCH_SUCCESS',
      MY_APP_USERS_FETCH_ERROR: 'MY_APP_USERS_FETCH_ERROR',
      MY_APP_USERS_DIALOG_OPEN: 'MY_APP_USERS_DIALOG_OPEN',
      MY_APP_USERS_DIALOG_CLOSE: 'MY_APP_USERS_DIALOG_CLOSE',
      MY_APP_USERS_SEND_EMAIL: 'MY_APP_USERS_SEND_EMAIL',
      MY_APP_USERS_EAT_BORSCHT: 'MY_APP_USERS_EAT_BORSCHT'
    });
  });
});
