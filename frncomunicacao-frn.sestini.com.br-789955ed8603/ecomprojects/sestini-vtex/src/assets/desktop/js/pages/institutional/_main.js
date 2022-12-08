import CacheSelector from './__cache-selector';

const institutionalMenu = CacheSelector;

const Methods = {
  init() {
    if (!document.body.classList.contains('is--store-locator')) {
      Methods.enableMenuOption();
    }
  },
  enableMenuOption() {
    const indexToActive = +institutionalMenu.optionMenu.innerHTML;
    institutionalMenu.allMenuOptions[indexToActive].classList.add('is--active');
  },
};

export default {
  init: Methods.init,
};
