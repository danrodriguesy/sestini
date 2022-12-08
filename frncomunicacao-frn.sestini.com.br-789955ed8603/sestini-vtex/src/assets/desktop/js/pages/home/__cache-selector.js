export default {
  home: {
    mainBanner: document.querySelector('.js--main-banner'),
    tabbedShelf: {
      buttons: document.querySelectorAll('.js--home-tabbed-shelf'),
      contentsWrapper: document.querySelector(
        '.js--home-tabbed-shelf-contents',
      ),
      contents: document.querySelectorAll('.js--home-tabbed-shelf-content'),
      shelfs: document.querySelectorAll('.js--home-tabbed-content-shelf ul'),
    },
    weekOffer: {
      left: {
        wrapper: document.querySelector('.js--home-week-offer-left'),
        shelf: document.querySelector('.js--home-week-offer-left ul'),
      },
      right: {
        wrapper: document.querySelector('.js--home-week-offer-right'),
        shelf: document.querySelector('.js--home-week-offer-right ul'),
      },
    },
    productSearched: {
      wrapper: document.querySelector('.js--products-searched-shelf'),
      shelf: document.querySelector('.js--products-searched-shelf ul'),
    },
  },
};
