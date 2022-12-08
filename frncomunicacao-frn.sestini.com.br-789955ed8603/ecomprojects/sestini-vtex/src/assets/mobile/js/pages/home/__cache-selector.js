export default {
  home: {
    mainBanner: document.querySelector('.js--main-banner'),
    benefits: document.querySelector('.js--benefits'),
    tabbedShelf: {
      buttons: document.querySelectorAll('.js--home-tabbed-shelf'),
      contentsWrapper: document.querySelector(
        '.js--home-tabbed-shelf-contents',
      ),
      titles: document.querySelectorAll('.js--home-tabbed-shelf-titles'),
      contents: document.querySelectorAll('.js--home-tabbed-shelf-content'),
      shelfs: document.querySelectorAll('.js--home-tabbed-content-shelf ul'),
    },
    categoryOffers: {
      wrapper: document.querySelector('.js--category-offers-shelf'),
      shelf: document.querySelector('.js--category-offers-shelf ul'),
    },
    weekOffer: {
      wrapper: document.querySelector('.js--home-week-offer'),
      shelf: document.querySelector('.js--home-week-offer ul'),
    },
    productSearched: {
      wrapper: document.querySelector('.js--products-searched-shelf'),
      shelf: document.querySelector('.js--products-searched-shelf ul'),
    },
  },
};
