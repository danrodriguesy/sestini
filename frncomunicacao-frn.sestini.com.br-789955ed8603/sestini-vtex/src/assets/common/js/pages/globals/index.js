import '../../utils/outline';

import GlobalsInit from './_init';
import GlobalsVtex from './_vtex';

import GlobalsShelfCarousel from './_shelf-carousel';
import GlobalsShelfCategory from './_shelf-category';
import GlobalShelfProductColors from './_shelf-colors';
import GlobalsShareButtons from './_share-buttons';

import GlobalsMainMenu from './_main-menu';
import GlobalsQtySelector from './_qty-selector';
import GlobalsHeader from './_header';

import GlobalsSearchActions from './_search-actions';
import GlobalsSearch from './_search';
import GlobalsLogin from './_login';

import GlobalsOverlay from './_overlay';
import GlobalsMinicart from './_minicart';
import GlobalsWishlist from './_wishlist';
import GlobalsNewsletter from './_newsletter';
import GlobalsFooterNewsletter from './_footer-newsletter';

import GlobalLayoutConfig from './_layout-config';

import cookiesPolice from './_cookies-police'
import popUpLead from './_popup-lead'

const init = () => {
  GlobalsInit.init();
  GlobalsVtex.init();

  GlobalsShelfCarousel.init();
  GlobalsShelfCategory.init();
  GlobalShelfProductColors.init();
  GlobalsShareButtons.init();

  setTimeout(() => {
    GlobalsMainMenu.init();
    GlobalsQtySelector.init();
    GlobalsHeader.init();
  }, 100);

  setTimeout(() => {
    GlobalsSearchActions.init();
    GlobalsSearch.init();
    GlobalsLogin.init();
  }, 150);

  setTimeout(() => {
    GlobalsOverlay.init();
    GlobalsMinicart.init();
    GlobalsWishlist.init();
    GlobalsNewsletter.init();
    GlobalsFooterNewsletter.init();
    Sestini.lazyload.update();
  }, 200);

  

  cookiesPolice.init()
  popUpLead.init()
  GlobalLayoutConfig.init()

};

export default {
  init,
};
