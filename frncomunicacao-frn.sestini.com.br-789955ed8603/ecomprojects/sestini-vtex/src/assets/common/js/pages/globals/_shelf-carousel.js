import ShelfImg from '../../utils/shelf-img.js';

const Methods = {
  init() {
    Methods.shelfCarousel();
  },

  shelfCarousel() {
    Sestini.shelfCarousel = new Sestini.VtexShelfProperties(
      Sestini.vtexUtils,
      Sestini.vtexCatalog,
      Methods.shelfCarouselProp,
    );

    Sestini.shelfCarousel.setEventName('shelfCarouselEnd');
    Sestini.shelfCarousel.setShelfContainer('.js--shelf-carousel');
  },

  shelfCarouselProp($el, product) {
    const mainWrapper = $el.closest('.js--shelf-item').get(0);
    const buyLink = mainWrapper.querySelector('.x-shelf__buy');
    const productId = mainWrapper.querySelector('.js--shelf-product-id').value;

    if (buyLink && !isMobile.any) {
      Methods.openQuickview(buyLink, productId);
    }

    const imageWidth = parseInt($el.data('imageWidth'));
    const imageRatio = parseFloat($el.data('imageRatio'));
    // const imageLabelName = $el.data('imageLabel');
    const markup = ShelfImg.setImage(
      product,
      imageWidth,
      imageRatio,
      false,
      true,
    );

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
