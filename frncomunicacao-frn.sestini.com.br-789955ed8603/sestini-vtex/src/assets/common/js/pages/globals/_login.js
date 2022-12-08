import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.login;
const Methods = {
  init() {
    Methods.setMenuLogin();
    Methods.setAjaxMenuLogin();
  },

  setAjaxMenuLogin() {
    $(window).on('closed.vtexid', (ev) => {
      Methods.setMenuLogin();
    });
  },

  setMenuLogin() {
    Sestini.vtexHelpers.checkLogin().then((user) => {
      if (user.IsUserDefined) {
        if (user.FirstName) {
          El.label.html(`<strong>Olá</strong> ${user.FirstName}`);
        } else {
          El.label.html('<strong>Olá</strong> Cliente');
        }

        El.btn.parent().addClass('is--logged');
      }
    });
  },
};

export default {
  init: Methods.init,
};
