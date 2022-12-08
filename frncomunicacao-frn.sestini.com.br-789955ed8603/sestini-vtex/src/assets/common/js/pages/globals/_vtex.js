import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.vtex;
const Methods = {
  init() {
    Methods.vtexIdEvents();
    Methods.closeLoginModal();
    Methods.removeHelperComplement();

    $(document).on('ajaxStop', () => Methods.removeHelperComplement);
  },

  removeHelperComplement() {
    El.helperComplement.remove();
  },

  closeLoginModal() {
    $(document).on('click', '.vtexIdUI-close', ev => Sestini.closeMenus(true));
  },

  vtexIdEvents() {
    $(window).on('started.vtexid', (ev) => {
      Sestini.body.addClass('has--loader');
      Sestini.overlay.addClass('is--active');
    });

    $(window).on('closed.vtexid', ev => Sestini.closeMenus(true));
    $(window).on('rendered.vtexid', ev => Sestini.body.removeClass('has--loader'));
    $(window).on('authenticatedUser.vtexid', (ev) => {});
    $(window).on('guestUser.vtexid', (ev) => {});
  },
};

export default {
  init: Methods.init,
};
