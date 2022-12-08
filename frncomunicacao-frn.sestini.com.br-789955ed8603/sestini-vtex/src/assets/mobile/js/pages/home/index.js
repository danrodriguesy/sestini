import MainBanner from './_main-banner';
import Benefits from './_benefits';
import CategoryOffers from './_category-offer';
import WeekOffers from './_week-offers';
import ProductSearched from './_product-searched';
import Instagram from './_instagram';

const init = () => {
  MainBanner.init();
  Benefits.init();
  CategoryOffers.init();
  WeekOffers.init();
  ProductSearched.init();
  Instagram.init()
};

export default {
  init,
};
