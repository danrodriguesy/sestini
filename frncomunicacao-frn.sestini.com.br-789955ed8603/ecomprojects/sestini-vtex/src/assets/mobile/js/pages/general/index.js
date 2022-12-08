import GeneralHeader from './_header';
import GeneralSubmenu from './_submenu';
import GeneralFooter from './_footer';
import popupLogin from './_popup-login';
import imageSearch from './_image-search';

const init = () => {
  GeneralHeader.init();
  GeneralSubmenu.init();
  GeneralFooter.init();
  popupLogin.init();
  imageSearch.init();
};

export default {
  init,
};
