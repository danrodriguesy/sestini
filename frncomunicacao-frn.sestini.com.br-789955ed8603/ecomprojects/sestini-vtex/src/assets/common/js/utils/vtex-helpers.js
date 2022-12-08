import unescape from 'lodash/unescape';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import { map, filter, indexOf } from 'fast.js';
import { head, pathOr } from 'ramda';

import {
  contains,
  strReplace,
  resizeImageByRatio,
  objectSearch,
} from './helpers';


export const getVtexBannerImg = (id) => {
  const noscript = document.getElementById(id);
  const noscriptTxt = noscript.textContent || noscript.innerHTML;
  const getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;
  const banners = getNodes(unescape(noscriptTxt));

  return map([...banners], (banner) => {
    const $img = banner.getElementsByTagName('img')[0];
    const $a = banner.getElementsByTagName('a')[0];

    return {
      href: $a.getAttribute('href') || '',
      src: $img.getAttribute('src'),
      alt: $img.getAttribute('alt'),
    };
  });
};

export const getVtexBannerText = (id) => {
  const $content = document.getElementById(id);

  return $content.innerText;
};

export const getProductShelfInfo = (el) => {
  const $container = document.getElementById(el);
  const $items = [].slice.call($container.querySelectorAll('.js--shelf-item'));

  const shelfTitle = $container.getElementsByTagName('h2')[0].innerText;
  const productsId = map($items, $el => $el.getAttribute('data-product-id'));

  return {
    shelfTitle,
    productsId,
  };
};

export const getVtexData = () => {
  let vtexEvents;
  const bodyScripts = [].slice.call(document.body.querySelectorAll('script'));

  for (let i = 0, len = bodyScripts.length; i < len; i += 1) {
    const scriptContent = bodyScripts[i].innerText;
    const currScript = contains('vtex.events.addData', scriptContent);

    if (currScript) {
      vtexEvents = JSON.parse(
        strReplace(['vtex.events.addData(', ');'], '', scriptContent),
      );
      break;
    }
  }

  return vtexEvents;
};

export const formatSlas = (obj) => {
  if (isPlainObject(obj)) {
    throw new Error('Response must be an Object');
  }

  const [{ slas }] = obj.logisticsInfo;
  const pickupStores = filter(slas, sla => includes('retira', sla.name.toLowerCase()));
  const shippings = filter(slas, sla => indexOf(pickupStores, sla) === -1);

  return {
    full: obj,
    shippings,
    pickupStores,
  };
};

/**
 * Formats price from Vtex API `/api/catalog_system/pub/products/search/`
 * to a correct `formatPrice` method
 *
 * @param  {Number} val Value to convert
 * @return {Integer}
 */
export const fixProductSearchPrice = (val) => {
  val = val * 1; // eslint-disable-line
  return val.toFixed(2).split('.').join('') * 1;
};

/**
 * Formats Vtex price
 *
 * @param {integer}             number              The number to format
 * @param {string}              [thousands = '.']   The thousands delimiter
 * @param {string}              [decimals = ',']    The decimal delimiter
 * @param {integer}             [length = 2]        The length of decimal
 * @param {string}              [currency = 'R$ ']  Set currency
 * @return {string} The formatted price
 */
export const formatPrice = (number, thousands, decimals, length, currency) => {
  /* eslint-disable */
  currency = (typeof currency === 'string') ? currency : 'R$ ';
  length = !(typeof length === 'number') ? 2 : length;
  number = fixProductSearchPrice(number);

  const re = '\\d(?=(\\d{' + (3) + '})+' + (length > 0 ? '\\D' : '$') + ')';
  number = number / 100;
  number = (number * 1).toFixed(Math.max(0, ~~length));

  return currency + number.replace('.', (decimals || ',')).replace(new RegExp(re, 'g'), '$&' + (thousands || '.'));
  /* eslint-enable */
};

/**
 * Change the width & height from a given VTEX image source
 *
 * @param {string}      [src]       The source of the image
 * @param {int|string}  [width]     The new image with
 * @param {int|string}  [height]    The new image height
 * @return {string} The resized image source
 * @example
 *   getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png', 500, 600);
 *   //=> http://domain.vteximg.com.br/arquivos/ids/155242-500-600/image.png
 *
 *   getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242/image.png', 100, 100);
 *   //=> http://domain.vteximg.com.br/arquivos/ids/155242-100-100/image.png
 */
export const getResizedImage = (src, width, height = 'auto') => {
  if (!width || !height || typeof src !== 'string') {
    return src;
  }

  /* eslint-disable */
  width = Math.round(width);

  src = src.replace(/(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//, (match, matchedWidth, matchedHeight) => {
    return match.replace('-' + matchedWidth + '-' + matchedHeight, '-' + width + '-' + height);
  });

  return src.replace(/(ids\/[0-9]+)\//, '$1-' + width + '-' + height + '/');
  /* eslint-enable */
};

/**
 * Resize proportionally an VTEX image by aspect ratio
 *
 * @param {string}      [src]               The source of the image
 * @param {String}      [type]              Type to resize (width or height)
 * @param {Number}      [newSize]           New size to redimensioning
 * @param  {Number}     [aspectRatio]       Image aspect ratio (calculate by (width / height))
 * @return {string}                         The resized image source
 * @example
 *   const imgSrc = 'http://domain.vteximg.com.br/arquivos/ids/155242/image.png';
 *   getResizedImageByRatio(imgSrc, 'width', 150, (10 / 15));
 *   //=> http://domain.vteximg.com.br/arquivos/ids/155242-150-225/image.png
 *
 *   getResizedImageByRatio(imgSrc, 'height', 150, (10 / 15));
 *   //=> http://domain.vteximg.com.br/arquivos/ids/155242-99-150/image.png
 */
export const getResizedImageByRatio = (src, type, newSize, aspectRatio) => {
  const newValue = resizeImageByRatio(type, newSize, aspectRatio);

  return getResizedImage(src, newValue.width, newValue.height);
};

export const getProductSellerInfo = (productSku, sellerId = false) => {
  const seller = sellerId || true;
  const sellerKey = sellerId ? 'sellerId' : 'sellerDefault';

  return objectSearch(productSku, { [sellerKey]: seller })
    || objectSearch(productSku, { sellerId: '1' });
};

export const getProductInstallments = (productSku, sellerId = false) => {
  const { commertialOffer } = getProductSellerInfo(productSku, sellerId);

  if (!commertialOffer) {
    return false;
  }

  // Get by min price value
  return commertialOffer.Installments.reduce(
    (prev, current) => (prev.value < current.value ? prev : current),
    {},
  );
};

export const getProductPriceInfo = (productSku) => {
  const sellerInfo = getProductSellerInfo(productSku);
  const { commertialOffer: co } = sellerInfo;
  const installments = getProductInstallments(sellerInfo);
  const isInstallments = !isEmpty(installments);
  const qty = co.AvailableQuantity;
  const noListPrice = co.Price === co.ListPrice;
  const format = formatPrice;

  return {
    available: !!qty,
    availableQuantity: qty,

    sellerName: sellerInfo.sellerName,
    sellerId: sellerInfo.sellerId,

    bestPrice: qty ? co.Price : 0,
    listPrice: qty ? (noListPrice ? false : co.ListPrice) : 0,

    installments: (qty && isInstallments) ? installments.NumberOfInstallments : 0,
    installmentsInsterestRate: (qty && isInstallments) ? installments.InterestRate : null,
    installmentsValue: (qty && isInstallments) ? installments.Value : 0,

    bestPriceFormatted: qty ? format(co.Price) : format(0),
    listPriceFormatted: qty
      ? (noListPrice ? false : format(co.ListPrice))
      : (noListPrice ? false : format(0)),
    installmentsValueFormatted: (qty && isInstallments) ? format(installments.Value) : format(0),
  };
};

/**
 * Get first available SKU from Vtex API `/api/catalog_system/` end point
 *
 * @param  {Object}  product     Product full data
 * @return {Object|Boolean}      An available SKU data or false
 */
export const getFirstAvailableSku = (items) => {
  const newArr = []; // eslint-disable-line

  items.some((item, index, oldArr) => {
    if (pathOr(false, ['sellers', '0', 'commertialOffer', 'AvailableQuantity'], item)) {
      newArr.push(oldArr[index]);
      return true;
    }

    items.some((i) => {
      if (i.sellers['0'].commertialOffer.AvailableQuantity > 0) {
        newArr.push(i);
        return true;
      }
    });

    newArr.push(items[0]);
    return false;
  });

  if (newArr.length > 0) {
    return head(newArr);
  }

  return false;
};

const newUnavailableItem = () => {
  const item = {
    images: [
      {
        imgUrl: '',
        imageTag: '',
        __typename: 'Image',
      },
    ],
    itemId: '0',
    name: '',
    referenceId: [],
    sellers: [
      {
        0: {
          commertialOffer: {
            AvailableQuantity: 0,
            Installments: [],
            ListPrice: 0,
            Price: 0,
            giftSkuIds: [],

          },
          sellerDefault: true,
          sellerId: '1',
          __typename: 'Seller',
        },
      },
    ],
    __typename: 'SKU',
  };

  return item;
};

export const __getFirstAvailableSku = (items) => {
  const newArr = []; // eslint-disable-line

  items.some((item, index, oldArr) => {
    const isAvailable = pathOr(item, 'sellers', '0', 'commertialOffer', 'AvailableQuantity', false);

    if (isAvailable && isAvailable.sellers[0].commertialOffer.AvailableQuantity > 0) {
      return newArr.push(oldArr[index]);
    }

    return false;
  });

  if (newArr.length > 0) {
    return head(newArr);
  }

  newArr.push(newUnavailableItem());
  return head(newArr);
};

/**
 * Take the value of the installment with min price and max installments given
 *
 * @param {String|Number} price             Price to get installments. Can be formatted price or a integer value
 * @param {String|Number} minPrice          Min price for each installment. Can be formatted price or a integer value
 * @param {Number}        maxInstallments   Max installments
 * @param {Number}        [interest=0]      Interest rate
 * @returns {Object}
 * @example
 *     setInstallment('R$ 3.499,00', 'R$ 430,00', 10) // {installments: 8, installmentValue: 43737, interest: 0}
 *     setInstallment(349900, 43000, 10) // {installments: 8, installmentValue: 43737, interest: 0}
*/

export const setInstallment = (price, minPrice, maxInstallments, interest = 0) => {
  price = fixProductSearchPrice(price);
  minPrice = (minPrice < 1) ? 1 : fixProductSearchPrice(minPrice);
  /* eslint-disable operator-assignment */
  /* eslint-disable no-restricted-properties */

  maxInstallments = maxInstallments * 1;
  interest = interest * 1;

  let installments = parseInt(price / minPrice, 10);

  if (installments > maxInstallments) {
    installments = maxInstallments;
  }

  let installmentValue = price / installments;

  if (interest > 0) {
    installmentValue = (price * Math.pow((1 + (interest / 100)), installments)) / installments;
  }

  installmentValue = Math.floor(installmentValue);

  if (installments > 0) {
    return {
      installments,
      installmentValue,
      interest,
    };
  }

  return false;
};
