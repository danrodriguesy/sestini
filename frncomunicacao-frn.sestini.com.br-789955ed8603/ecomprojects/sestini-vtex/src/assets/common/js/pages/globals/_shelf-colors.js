const Methods = {
  init() {
    Methods.shelfProductColors();
  },

  shelfProductColors() {
    Sestini.shelfProductColors = new Sestini.VtexShelfProperties(
      Sestini.vtexUtils,
      Sestini.vtexCatalog,
      Methods.shelfProductColorsProp,
    );

    Sestini.shelfProductColors.setEventName('shelfProductColorsEnd');
    Sestini.shelfProductColors.setShelfContainer('.js--product-colors-id');
  },

  shelfProductColorsProp($el, product) {
    const markup = `<div class="x-product__select-color is--available js--product-select-color" data-url="${
      product.link
    }">${product['Cor real']}</div>`;

    $('.js--product-color-container').append(markup);
  },
};

export default {
  init: Methods.init,
};
