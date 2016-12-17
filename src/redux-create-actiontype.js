const UNDERSCORE = '_';

const API_KEY = 'api';
const POSTFIXES_KEY = 'postfixes';

const defaultOptions = {
  prefix: undefined,
  separator: UNDERSCORE,
  upperCase: true,
  prefixUpperCase: true
};

const defaultAPIPostfixes = [
  'LOADING',
  'ERROR',
  'SUCCESS'
];

function normalizeString(str, options = {}) {
  const { upperCase, prefixUpperCase, separator } = options;
  let { prefix = '' } = options;

  let type = str.replace(' ', UNDERSCORE);
  prefix = prefix.replace(' ', UNDERSCORE);
  type = upperCase ? type.toUpperCase() : type;
  prefix = prefixUpperCase ? prefix.toUpperCase() : prefix;

  type = prefix && prefix.length > 0
    ? `${prefix}${separator}${type}`
    : type;

  return type;
}

export default function createActionTypes(userOptions = {}) {
  const options = (typeof userOptions === 'string')
    ? { ...defaultOptions, prefix: userOptions }
    : { ...defaultOptions, ...userOptions };

  const {
    upperCase,
    apiPostfixes = defaultAPIPostfixes
  } = options;

  return function(...args) {
    return args.reduce((result, argument) => {
      if (typeof argument !== 'string' && typeof argument !== 'object') {
        throw 'Redux Create ActionType: -> Action Type has to be a string or an object';
      }

      let newActionType;

      if (typeof argument === 'string') {
        newActionType = normalizeString(argument, options);
        return { ...result, [newActionType]: newActionType };
      }

      // this is an object then

      // no empty objects are allowed
      if (!Object.keys(argument).length) {
        throw 'Redux Create ActionType: -> Action Type cannot be an empty object';
      }

      // get the first key
      const [key] = Object.keys(argument);

      // this is no api node or not postfixes one
      if (!argument[key][POSTFIXES_KEY] && !argument[key][API_KEY]) {
        const newActionTypes = Object.keys(argument).reduce((subResult, key) => {
          newActionType = normalizeString(key, options);
          return { ...subResult, [newActionType]: newActionType };
        }, {});

        return { ...result, ...newActionTypes };
      }

      let postfixes = [];
      if (argument[key][API_KEY]) {
        postfixes = apiPostfixes;
      } else if (argument[key][POSTFIXES_KEY]) {
        postfixes = argument[key][POSTFIXES_KEY];
      }

      newActionType = normalizeString(key, options);
      const newActionTypes = postfixes.reduce((subResult, postfix) => {
        const _postfix = upperCase ? postfix.toUpperCase() : postfix;
        return {
          ...subResult,
          [`${newActionType}${UNDERSCORE}${_postfix}`]: `${newActionType}${UNDERSCORE}${_postfix}`
        };
      }, {});

      return { ...result, ...newActionTypes };
    }, {});
  };
}
