import CacheSelector from './__cache-selectors';

const { orderBy } = CacheSelector;

const Methods = {
  init() {
    Methods.orderByActions();
    Methods.orderByChange();
  },

  orderByActions() {
    orderBy.orderText.addEventListener('click', (ev) => {
      ev.preventDefault();

      if (orderBy.orderText.classList.contains('is--active')) {
        Sestini.closeCategoryOrderBy();
      } else {
        Sestini.closeCategoryOrderBy();
        orderBy.orderText.classList.add('is--active');
        orderBy.orderDrop.classList.add('is--active');
      }
    });
  },

  orderByChange() {
    $('.js--order-by').on('change', () => {
      const val = $('.js--order-by:checked').val();

      Sestini.closeCategoryOrderBy();
      $('.orderBy select')
        .eq(0)
        .val(val)
        .trigger('change');
    });
  },
};

export default {
  init: Methods.init,
};
