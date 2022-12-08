import MainBanner from './_main-banner';
import Shelf from './_shelf';
import WeekOffer from './_week-offer';
import ProductSearched from './_product-searched';
import Instagram from './_instagram';

const init = () => {
  MainBanner.init();
  WeekOffer.init();
  ProductSearched.init();
  Shelf.init();
  Instagram.init();
};

export default {
  init,
};
