import ShelfImg from '../../utils/shelf-img.js';

const Methods = {
  init() {
    Methods.shelfCategory();
  },

  shelfCategory() {
    Sestini.shelfCategory = new Sestini.VtexShelfProperties(
      Sestini.vtexUtils,
      Sestini.vtexCatalog,
      Methods.shelfCategoryProp,
    );

    Sestini.shelfCategory.setEventName('shelfCategoryEnd');
    Sestini.shelfCategory.setShelfContainer('.js--shelf-category');
  },

  shelfCategoryProp($el, product) {
    const mainWrapper = $el.closest('.js--shelf-item').get(0);
    const buyLink = mainWrapper.querySelector('.x-shelf__buy');
    const productId = mainWrapper.querySelector('.js--shelf-product-id').value;

    if (buyLink && !isMobile.any) {
      Methods.openQuickview(buyLink, productId);
    }

    const imageWidth = parseInt($el.data('imageWidth'));
    const imageRatio = parseFloat($el.data('imageRatio'));

    const markup = ShelfImg.setImage(
      product,
      imageWidth,
      imageRatio,
      false,
      false,
    );
    $el.removeClass('has--placeloader');
    $el.empty().append(markup);

    Sestini.lazyload.update();
  },

  openQuickview(elem, id) {
    elem.addEventListener('click', (ev) => {
      ev.preventDefault();
      Methods.sendEvent(id);
    });
  },

  sendEvent(productId) {
    const newEvent = new CustomEvent('openQuickview', { detail: { productId } });
    document.dispatchEvent(newEvent);
  },
};

export default {
  init: Methods.init,
};
