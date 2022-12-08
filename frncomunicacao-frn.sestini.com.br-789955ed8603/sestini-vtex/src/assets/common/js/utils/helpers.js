import Cookies from 'js-cookie';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import { map, reduce } from 'fast.js';

const { hasOwnProperty } = Object.prototype;

export const toTitleCase = (str) => {
  const articles = [
    // EN
    'a',
    'an',
    'the',
    // PT-BR
    'o',
    'a',
    'os',
    'as',
    'um',
    'uma',
    'uns',
    'umas',
    'ao',
    'aos',
    'do',
    'dos',
    'no',
    'nos',
    'pelo',
    'pelos',
    'num',
    'nuns',
    'à',
    'às',
    'da',
    'das',
    'na',
    'nas',
    'pela',
    'pelas',
    'numa',
  ];
  const conjunctions = [
    // EN
    'for',
    'and',
    'nor',
    'but',
    'or',
    'yet',
    'so',
    // PT-BR
    'e',
    'ou',
    'ora',
    'quer',
    'já',
    'que',
    'porque',
    'porquanto',
    'pois',
    'nem',
    'mas',
    'porém',
  ];
  const prepositions = [
    // EN
    'with',
    'at',
    'from',
    'into',
    'upon',
    'of',
    'to',
    'in',
    'for',
    'on',
    'by',
    'like',
    'over',
    'plus',
    'but',
    'up',
    'down',
    'off',
    'near',
    // PT-BR
    'ante',
    'após',
    'até',
    'com',
    'contra',
    'de',
    'desde',
    'em',
    'entre',
    'para',
    'perante',
    'por',
    'per',
    'sem',
    'sob',
    'sobre',
    'trás',
    'afora',
    'como',
    'conforme',
  ];

  // The list of spacial characters can be tweaked here
  // const replaceCharsWithSpace = (str) =>
  //   str.replace(/[^0-9a-z&/\\]/gi, ' ').replace(/(\s\s+)/gi, ' ');
  const capitalizeFirstLetter = strParam => strParam.charAt(0).toUpperCase() + str.substr(1);
  const normalizeStr = strParam => strParam.toLowerCase().trim();
  const shouldCapitalize = (word, fullWordList, posWithinStr) => {
    if (posWithinStr === 0 || posWithinStr === fullWordList.length - 1) {
      return true;
    }

    return !(articles.includes(word) || conjunctions.includes(word) || prepositions.includes(word));
  };

  // str = replaceCharsWithSpace(str);
  str = normalizeStr(str); // eslint-disable-line

  let words = str.split(' ');
  // Strings less than 3 words long should always have first words capitalized
  if (words.length <= 2) {
    words = map(words, word => capitalizeFirstLetter(word));
  } else {
    for (let i = 0, len = words.length; i < len; i += 1) {
      words[i] = shouldCapitalize(words[i], words, i)
        ? capitalizeFirstLetter(words[i], words, i)
        : words[i];
    }
  }

  return words.join(' ');
};

/**
 * Check if value contains in an element
 *
 * @category Global
 * @param {String} value - Value to check
 * @param {String|Array} elem - String or array
 * @return {Boolean} - Return true if element contains a value
 */
export const contains = (value, elem) => {
  if (isArray(elem)) {
    for (let i = 0, len = elem.length; i < len; i += 1) {
      if (elem[i] === value) {
        return true;
      }
    }
  }

  if (isString(elem)) {
    return elem.indexOf(value) >= 0;
  }

  return false;
};

/**
 * Multiple string replace, PHP str_replace clone
 * @param {string|Array} search - The value being searched for, otherwise known as the needle.
 *   An array may be used to designate multiple needles.
 * @param {string|Array} replace - The replacement value that replaces found search values.
 *   An array may be used to designate multiple replacements.
 * @param {string} subject - The subject of the replacement
 * @return {string} The modified string
 * @example
 *   strReplace(['olá', 'mundo'], ['hello', 'world'], 'olá mundo'); // 'hello world'
 *   strReplace(['um', 'dois'], 'olá', 'um dois três'); // Output 'olá olá três'
 */
export const strReplace = (search, replace, subject) => {
  /* eslint-disable no-param-reassign */
  let regex;

  if (isArray(search)) {
    for (let i = 0; i < search.length; i += 1) {
      search[i] = search[i].replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
      regex = new RegExp(search[i], 'g');
      subject = subject.replace(regex, isArray(replace) ? replace[i] : replace);
    }
  } else {
    search = search.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
    regex = new RegExp(search, 'g');
    subject = subject.replace(regex, isArray(replace) ? replace[0] : replace);
  }

  return subject;
};

/**
 * Zero padding number
 *
 * @param  {integer} number     Number to format
 * @param  {integer} [size=2]   Digits limit
 * @return {string}             Formatted num with zero padding
 */
export const pad = (number, size) => {
  let stringNum = String(number);

  while (stringNum.length < (size || 2)) {
    stringNum = `0${stringNum}`;
  }

  return stringNum;
};

/**
 * Resize image by aspect ratio
 *
 * @category Global
 * @param  {String} type          Resize by 'width' or 'height'
 * @param  {Number} newSize       New value to resize
 * @param  {Number} aspectRatio   Image aspect ratio (calculate by (width / height))
 * @return {Object}               Object with new 'width' and 'height'
 */
export const resizeImageByRatio = (type, newSize, aspectRatio, decimal) => {
  if (typeof newSize !== 'number' || typeof aspectRatio !== 'number') {
    newSize = parseFloat(newSize, 10);
    aspectRatio = parseFloat(aspectRatio, 10);
  }

  const dimensions = {};
  decimal = decimal || 4;

  switch (type) {
    case 'width':
      dimensions.width = parseFloat(newSize, 10);
      dimensions.height = parseFloat((newSize / aspectRatio).toFixed(decimal), 10);

      break;

    case 'height':
      dimensions.width = parseFloat((newSize * aspectRatio).toFixed(decimal), 10);
      dimensions.height = parseFloat(newSize, 10);

      break;

    default:
      throw new Error("'type' needs to be 'width' or 'height'");
  }

  return dimensions;
};

/**
 * Search through an object recursively and return the first match of the key:value passed
 * @access public
 * @param {Object} object - The haystack
 * @param {Object} needle - Key value pair that will be searched
 * @param {Boolean} [caseSensitive=false] Enable/disable case sensitive on search
 * @return {Object}
 * @example
 *   const data = [{
 *     id: 0,
 *     name: 'key 0',
 *     children: [{
 *       id: 1,
 *       name: 'key 1',
 *       children: [{
 *         id: 2,
 *         name: 'key 2',
 *         item: [{
 *           id: 3,
 *           name: 'key 3',
 *         }],
 *         item: [{
 *           id: 4,
 *           name: 'key 4',
 *         }],
 *       }],
 *     }],
 *   }];
 *
 *   objectSearch(data, {id: 4}); // { id: 4, name: 'key 4'};
 */
export const objectSearch = (object, needle) => {
  let p;
  let key;
  let val;
  let tRet;

  /* eslint-disable no-restricted-syntax */
  for (p in needle) {
    if (hasOwnProperty.call(needle, p)) {
      key = p;
      val = needle[p];
    }
  }

  for (p in object) {
    if (p === key) {
      if (object[p] === val) {
        return object;
      }
    } else if (object[p] instanceof Object) {
      if (hasOwnProperty.call(object, p)) {
        tRet = objectSearch(object[p], needle);

        if (tRet) {
          return tRet;
        }
      }
    }
  }

  return false;
};

/**
 * A function to take a string written in dot notation style, and use it to
 * find a nested object property inside of an object.
 *
 * @param {Object} obj    The object to search
 * @param {String} path   A dot notation style parameter reference (ie 'a.b.c')
 *
 * @returns the value of the property in question
 */
export const getDescendantProp = (obj, path) => {
  if (!isPlainObject(obj)) {
    throw new TypeError('"obj" param must be an plain object');
  }

  return reduce(path.split('.'), (acc, part) => acc && acc[part], obj);
};

/**
 * Sorting an array of objects by values
 *
 * @param  {Array}   [arr]           An Array of objects
 * @param  {Mix}     [mapValues]     Map to custom order.
 *   If value isn't an array with values, will do natural sort
 * @param  {String}  [key]           Object key to use for sorting (accepts dot notation)
 * @param  {Boolean} [reverse=false] Reverse sorting
 * @returns {Array}                  New object array with sorting values
 * @example
 *   const mapToSort = ['A', 'B', 'C', 'D', 'E']; // Map to sorting
 *
 *   const obj = [{param: 'D'}, {param: 'A'}, {param: 'E'}, {param: 'C'}, {param: 'B'}];
 *   globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'param');
 *   //=> [{param: 'A'}, {param: 'B'}, {param: 'C'}, {param: 'D'}, {param: 'E'}]
 *
 *   // Deep key
 *   const obj = [
 *     {deep: {param: 'D'}},
 *     {deep: {param: 'A'}},
 *     {deep: {param: 'E'}},
 *     {deep: {param: 'C'}},
 *     {deep: {param: 'B'}},
 *   ];
 *   globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'deep.param');
 *   //=> [
 *     {deep: {param: 'A'}},
 *     {deep: {param: 'B'}},
 *     {deep: {param: 'C'}},
 *     {deep: {param: 'D'}},
 *     {deep: {param: 'E'}},
 *   ];
 */
export const objectArraySortByValue = (arr, mapValues, key, reverse = false) => {
  if (!isArray(mapValues) || mapValues.length < 1) {
    const compare = (a, b, n) => getDescendantProp(a, n)
      .toString()
      .localeCompare(getDescendantProp(b, n).toString(), undefined, { numeric: true });

    return arr.slice().sort((a, b) => (reverse ? -compare(a, b, key) : compare(a, b, key)));
  }

  return arr.slice().sort((a, b) => {
    const ordered = mapValues.indexOf(getDescendantProp(a, key).toString())
      - mapValues.indexOf(getDescendantProp(b, key).toString());

    return reverse ? ordered * -1 : ordered;
  });
};

/**
 * Get the percentage of a discount
 *
 * @param  {String|Number}    oldPrice
 * Original price. Can be formatted price or a integer value.
 * @param  {String|Number}    newPrice
 * Price with discount. Can be formatted price or a integer value.
 * @param  {Number}           [length=0]  Number of decimals
 * @returns {Number}
 * @example
 *     getPercentage('R$ 179,90', 'R$ 149,50'); // 17 (17% OFF)
 *     getPercentage(17990, 14900, 2); // 17.18 (17.18% OFF)
 */
export const getPercentage = (oldPrice, newPrice, length = 0) => {
  if (oldPrice < newPrice || oldPrice < 1 || newPrice < 1) {
    return 0;
  }

  const percent = parseFloat((newPrice / oldPrice) * 100 - 100);

  return Math.abs(percent.toFixed(length));
};

/**
 * Get url params from a query string
 *
 * @category Global
 * @param {string} name - Param name
 * @param {string} entryPoint - Full url or query string
 * @return {string} Value query string param
 * @example
 *     // URL: https://site.com?param1=foo&param2=bar
 *     getUrlParameter('param1'); // foo
 *     getUrlParameter('param2'); // bar
 *
 *     // Given entry point
 *     var url = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
 *     getUrlParameter('param3', url); // baz
 */
export const getUrlParameter = (name, entryPoint) => {
  entryPoint = !isString(entryPoint)
    ? window.location.href
    : entryPoint.substring(0, 1) === '?'
      ? entryPoint
      : `?${entryPoint}`;
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'); //eslint-disable-line

  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(entryPoint);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/**
 * Remove accents from a string
 * @param {string} str - The string to remove accents
 * @return {string} The modified string
 * @example
 *     removeAccent('Olá Mündô!'); // 'Ola Mundo!'
 */
export const removeAccent = (str) => {
  const reAccents = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;

  // Prefixed with some char to avoid off-by-one:
  const replacements = '_aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';

  return str.replace(reAccents, match => replacements[reAccents.source.indexOf(match)]);
};

/**
 * Slugify a text, removing/replacing all special characters and spaces with dashes '-'
 * @param {string} str - The string to sanitize
 * @return {string} The modified string
 * @example
 *     slugifyText('Olá Mundo!'); // 'ola-mundo'
 */
export const slugifyText = (str) => {
  str = str.replace(/^\s+|\s+$/g, '') // trim
    .toLowerCase()
    .replace(/\./g, '-') // Replace a dot for a -
    .replace(/\*/g, '-') // Replace a * for a -
    .replace(/\+/g, '-'); // Replace a + for a -

  // Remove accents, swap ñ for n, etc
  const from = 'àáäâãèéëêìíïîòóöôõùúüûýÿñç·/_,:;';
  const to = 'aaaaaeeeeiiiiooooouuuuyync------';

  for (let i = 0, len = from.length; i < len; i += 1) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Collapse whitespace and replace by -
    .replace(/-+/g, '-'); // Collapse dashes

  if (str.charAt(0) === '-') str = str.substr(1);
  if (str.charAt(str.length - 1) === '-') str = str.substr(0, str.length - 1);

  return str;
};

const generateId = () => {
  const time = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (match) => {
    const random = (time + Math.random() * 16) % 16 | 0; // eslint-disable-line

    return (
      Math.floor(time / 16),
      (match === 'x' ? random : (random & 3) | 8).toString(16) // eslint-disable-line
    );
  });
};

export const setChaordicCookies = () => {
  const expires = 12 * 30 * 24 * 60 * 60;

  if (!Cookies.get('chaordic_browserId')) {
    Cookies.set('chaordic_browserId', generateId(), { expires });
  }

  if (!Cookies.get('chaordic_anonymousUserId')) {
    Cookies.set('chaordic_anonymousUserId', `anon-${generateId()}`, { expires });
  }
};
