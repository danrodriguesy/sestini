export default {
  notifyMeSent: false,
  isLoading: true,
  skuJson,
  skuJsonProp: [],
  name: skuJson.name,
  originalName: skuJson.name,
  breadcrumb: skuJson.name,
  shippingCalculatedError: false,
  listPrice: skuJson.available
    ? skuJson.skus.filter((item, i) => item.available === true)[0].listPrice
    : 0,
  bestPrice: skuJson.available
    ? skuJson.skus.filter((item, i) => item.available === true)[0].bestPrice
    : 0,
  salesChannel: skuJson.salesChannel,
  available: skuJson.available,
  installments: skuJson.available
    ? skuJson.skus.filter((item, i) => item.available === true)[0].installments
    : 0,
  installmentsValue: skuJson.available
    ? skuJson.skus.filter((item, i) => item.available === true)[0]
      .installmentsValue
    : 0,
  skuNotAvailable: false,
  mainImgs: [],
  navImgs: [],
  categories: [],
  ean: 0,
  qty: 1,
  productId: 0,
  skuId: false,
  skuQty: 9999,
  skuQtyText: '',
  buyBtn: 'comprar',
  colorsAvailable: [],
  colorSelected: '',
  hasBuyTogether: false,
  buyTogetherProducts: [],
  buyTogetherItems: [],
  productResponse: {},
  isShippingCalculated: false,
  shippingResult: [],
  postalCode: '',
  notifyMeActive: false,
  dimensionsDescription: false,
  featuresDescription: false,
  selfDescription: false,
  specs: [],
  hasSpecs: false,
  size: '',
  buyTogether: {
    products: [],
    hasBuyTogether: false,
    totalBestPrice: 0,
    totalListPrice: 0,
    totalProducts: 0,
  },
};
