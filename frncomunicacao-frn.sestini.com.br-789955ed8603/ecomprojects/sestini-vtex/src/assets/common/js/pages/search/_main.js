import CacheSelector from './__cache-selectors';

const { searchedResultsNum, searchedText } = CacheSelector;

const Methods = {
  init() {
    Methods.insertSearchInfo();
    Methods.scrollToTop();

    setInterval(() => {
      Methods.setDiscountFlag();
      Methods.bindChangePage();
    }, 1000);
    const searchTerm = vtxctx.searchTerm.charAt(0).toUpperCase() + vtxctx.searchTerm.slice(1)
    document.title = searchTerm   + " | Sestini Oficial"
  },

  bindChangePage() {
    window.addEventListener('hashchange', () => {
      Methods.setDiscountFlag()
    })
  },

  setDiscountFlag() {
    $('.shelf-product-flag__discount').each((item, elem) => {
      const oldPrice = $(elem).parent().find('.x-shelf__content').find('.x-shelf__old-price').html() != undefined ? $(elem).parent().find('.x-shelf__content').find('.x-shelf__old-price').html().replace('R$', '') : 0
      const bestPrice = $(elem).parent().find('.x-shelf__content').find('.x-shelf__best-price').html() != undefined ? $(elem).parent().find('.x-shelf__content').find('.x-shelf__best-price').html().replace('R$', '') : 0
      if (parseFloat(bestPrice) < parseFloat(oldPrice)) {
        const discountPercentage = 100 - ((parseFloat(bestPrice) * 100) / parseFloat(oldPrice))
        $(elem).html(`<span>${parseInt(discountPercentage)}% OFF</span>`)
      } else {
        $(elem).remove()
      }
    })
  },

  insertSearchInfo() {
    const term = vtxctx.searchTerm || '';
    const num = document.querySelector(
      '.searchResultsTime .resultado-busca-numero .value',
    ).innerHTML;

    [...searchedResultsNum].map((el) => {
      el.innerHTML = num;
    });

    [...searchedText].map((el) => {
      el.innerHTML = term;
    });
  },
  scrollToTop() {
    $(document).on('beforeChangePage.vtexCategoryFilter', () => {
      Sestini.smoothScrollTo(0, 0, 1000);
      Methods.setDiscountFlag()
    });
  }
};

export default {
  init: Methods.init,
};
