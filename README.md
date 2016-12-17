# redux-create-actiontype [![Build Status](https://travis-ci.org/anvk/redux-create-actiontype.svg?branch=master)](https://travis-ci.org/anvk/redux-create-actiontype)

> Micro library for easy Action Types generation in Redux/React.

## Install

```
$ npm install redux-create-actiontype --save
```

## Usage

### Basic Usage

Basic list of constant action types

```js
import createActionTypes from 'redux-create-actiotype';

const types = createActionTypes()(
  'login',
  'logout',
  'is fetching'
);

/* it is going to generate
const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  IS_FETCHING: 'IS_FETCHING'
};
*/
```

More close to real life example

```js
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

/* it is going to generate
const types = {
  MY_APP_LOGIN: 'MY_APP_LOGIN',
  MY_APP_LOGOUT: 'MY_APP_LOGOUT',
  MY_APP_USERS_FETCH_LOADING: 'MY_APP_USERS_FETCH_LOADING',
  MY_APP_USERS_FETCH_SUCCESS: 'MY_APP_USERS_FETCH_SUCCESS',
  MY_APP_USERS_FETCH_ERROR: 'MY_APP_USERS_FETCH_ERROR',
  MY_APP_USERS_DIALOG_OPEN: 'MY_APP_USERS_DIALOG_OPEN',
  MY_APP_USERS_DIALOG_CLOSE: 'MY_APP_USERS_DIALOG_CLOSE',
  MY_APP_USERS_SEND_EMAIL: 'MY_APP_USERS_SEND_EMAIL',
  MY_APP_USERS_EAT_BORSCHT: 'MY_APP_USERS_EAT_BORSCHT'
};
*/
```

### More Advanced Usage

Default API Action Types

```js
const types = createActionTypes('my app')(
  'login',
  'logout',
  { 'user': { api: true } }
);

/* it is going to generate
const types = {
  MY_APP_LOGIN: 'MY_APP_LOGIN',
  MY_APP_LOGOUT: 'MY_APP_LOGOUT',
  MY_APP_USER_LOADING: 'MY_APP_USER_LOADING',
  MY_APP_USER_SUCCESS: 'MY_APP_USER_SUCCESS',
  MY_APP_USER_ERROR: 'MY_APP_USER_ERROR',
};
*/
```

Set API postfixes for each type

```js
const types = createActionTypes({
  prefix: 'my app',
  apiPostfixes: ['OK', 'BAD']
})(
  'login',
  'logout',
  { 'user': { api: true } },
  { 'items': { api: true } }
);

/* it is going to generate
const types = {
  MY_APP_LOGIN: 'MY_APP_LOGIN',
  MY_APP_LOGOUT: 'MY_APP_LOGOUT',
  MY_APP_USER_OK: 'MY_APP_USER_OK',
  MY_APP_USER_BAD: 'MY_APP_USER_BAD',
  MY_APP_ITEMS_OK: 'MY_APP_ITEMS_OK',
  MY_APP_ITEMS_BAD: 'MY_APP_ITEMS_BAD'
};
*/
```

Custom postfixes

```js
const types = createActionTypes('my app')(
  'login',
  'logout',
  { 'dialog': { postfixes: ['open', 'close'] } }
);

/* it is going to generate
const types = {
  MY_APP_LOGIN: 'MY_APP_LOGIN',
  MY_APP_LOGOUT: 'MY_APP_LOGOUT',
  MY_APP_DIALOG_OPEN: 'MY_APP_DIALOG_OPEN',
  MY_APP_DIALOG_CLOSE: 'MY_APP_DIALOG_CLOSE'
};
*/
```

Set non-uppercase prefixes with /

```js
const types = createActionTypes({
  prefix: 'my app',
  prefixUpperCase: false,
  separator: '/'
})(
  'login',
  'logout'
);

/* it is going to generate
const types = {
  'my_app/LOGIN': 'my_app/LOGIN',
  'my_app/LOGOUT': 'my_app/LOGOUT'
};
*/
```

#### Options

`const types = createActionTypes({
  prefix,     // string prefix for all elements in array of types. default is ''
  separator,  // string character which is separates prefix and each element type. default is '_'
  upperCase,  // bool. it will set to upper case each key if set to true. default is true
  prefixUpperCase // bool. it will set to upper case the prefix if set to true. default is true
})(arrayOfTypes);`

#### Default API Postfixes

```js
const defaultAPIPostfixes = [
  'LOADING',
  'ERROR',
  'SUCCESS'
];
```


## Full list of examples
You can find various examples in my [tests file](./test/redux-create-actiontype-test.js)

## Feedback
For any ideas, suggestion or bugs feel free to nudge me [here](https://github.com/anvk/redux-create-actiontype/issues)

## License

MIT license; see [LICENSE](./LICENSE).
