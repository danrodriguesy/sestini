import ProductRvMain from './_rv-main';
import ProductSelectActions from './_select-actions';
import ProductBuyTogether from './_buy-together';
import ProductMethods from './_product-methods';

const init = () => {
  ProductRvMain.init();
  ProductSelectActions.init();
  ProductBuyTogether.init();
  ProductMethods.init()

  setTimeout(() => {
    if ($('.x-product__sizes').css('display') == 'none') {
      $('.x-product__label')[1].remove()
    }
  }, 2000);
  document.title = dataLayer[0].pageTitle.split('|')[0] + "| Sestini Oficial"
};

export default {
  init,
};
