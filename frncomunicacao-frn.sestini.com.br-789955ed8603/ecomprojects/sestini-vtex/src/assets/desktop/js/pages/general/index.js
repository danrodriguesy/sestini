import GeneralHeader from './_general__header';
import GeneralFooterSeo from './_footer__seo';
import GeneralQuickView from '../quickview';
import popupLogin from './_popup-login';
import imageSearch from './_image-search';

const init = () => {
  GeneralHeader.init();
  GeneralFooterSeo.init();
  GeneralQuickView.init();
  popupLogin.init()
  imageSearch.init()
};

export default {
  init,
};
