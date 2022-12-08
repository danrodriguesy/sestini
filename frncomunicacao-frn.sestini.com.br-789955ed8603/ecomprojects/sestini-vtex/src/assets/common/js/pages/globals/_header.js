import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.header;
const Methods = {
  init() {
    Methods.stickyMenu();
    if (window.innerWidth <= 768) {
      Methods.bindSearchMobile()
    }
  },

  stickyMenu() {
    const activeHeader = Sestini.globalHelpers.throttle(() => {
      const winTop = $(window).scrollTop();
      if (winTop > 30) {
        El.self.addClass('is--active');
      } else {
        El.self.removeClass('is--active');
      }
      Sestini.closeMenus(true);
    }, 70);

    $(window).on('scroll', activeHeader);
  },

  bindSearchMobile() {
    $('.x-header-menu__search-input').on(`keyup`, (e) => {
      if (e.keyCode == 13) {
        window.location.href = '/' + e.target.value
      }
    })
  }
};

export default {
  init: Methods.init,
};
