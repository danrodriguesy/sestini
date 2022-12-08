import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.product;
const Notify = El.notifyme;

const Methods = {
  init() {
    Methods.openSelects();
    Methods.setSizeText();
  },

  openSelects() {
    $(El.sizeSelect).on('click', (ev) => {
      ev.preventDefault();

      const $this = $(ev.currentTarget);
      $this.toggleClass('is--active');
      $this.next().addClass('is--active');
    });
  },

  setSizeText() {
    const $selectSize = $('.j-product__select-size');

    $selectSize.on('click', (ev) => {
      const $this = $(ev.currentTarget);

      $this
        .toggleClass('is--active')
        .siblings()
        .removeClass('is--active');

      if ($this.hasClass('is--available')) {
        El.buyButton.show();
        El.selectors.show();
        Notify.content.hide();
      } else {
        El.buyButton.hide();
        El.selectors.hide();
        Notify.content.show();
      }
    });
  },
};

export default {
  init: Methods.init,
};
