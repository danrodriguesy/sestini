import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.search;
const Methods = {
  init() {
    Methods.sendForm();
    Methods.openSearch();
  },

  sendForm() {
    El.form.on('submit', () => {
      const term = El.input.val();
      window.location.href = `/${term}`;
      return false;
    });

    $(document).on('click', '[data-search-show-more]', () => {
      El.form.submit();
    });

    // Mobile Header
    if (isMobile.any) {
      El.mobileHeaderForm.on('submit', () => {
        const term = El.mobileHeaderInput.value;

        window.location.href = `/${term}`;
        return false;
      });
    }
  },

  openSearch() {
    El.input.on('focus', (ev) => {
      ev.currentTarget.classList.add('is--focused');
      Sestini.closeMenus(true);
    });
  },
};

export default {
  init: Methods.init,
};
