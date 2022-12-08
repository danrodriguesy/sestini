import CacheSelectors from './__cache-selectors.js';

const El = CacheSelectors.qtySelector;
const Methods = {
  init() {
    Methods.qtyChange();
  },

  qtyChange() {
    $(document).on('click', '.js--qty-selector-btn', (ev) => {
      ev.preventDefault();

      const $this = $(ev.currentTarget);
      const oldValue = $this
        .parent()
        .find('.js--qty-selector')
        .val();
      let newVal = 1;

      if ($this.data('qty-selector') === '+') {
        newVal = parseFloat(oldValue) + 1;
        El.total.val(parseInt(El.total.val()) + 1);
      } else if (oldValue > 1) {
        newVal = parseInt(oldValue) - 1;
        El.total.val(parseInt(El.total.val()) - 1);
      } else {
        return false;
      }

      $this
        .parent()
        .find('.js--qty-selector')
        .val(newVal);
    });
  },
};

export default {
  init: Methods.init,
};
