import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.mainMenu;
const Methods = {
  init() {
    Methods.setSubmenuItems();
  },

  setSubmenuItems() {
    El.submenuWrapper.map((indexWrapper, submenuWrapper) => {
      $(submenuWrapper)
        .find('.js--main-menu-submenu-content')
        .map((indexContent, submenuContent) => {
          if ($(submenuContent).children().length > 0 && indexContent === 0) {
            const $submenuWrapper = $(submenuWrapper);

            $submenuWrapper.parent().addClass('has--drop');
            $submenuWrapper
              .parent()
              .children('a')
              .addClass('js--main-menu-drop');
          }
        });
    });
  },
};

export default {
  init: Methods.init,
};
