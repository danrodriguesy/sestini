export default {
  wishlist: {
    amount: document.querySelector(".js--wishlist-amount")
  },
  minicart: {
    open: $(".js--minicart-open"),
    close: $(".js--minicart-close"),
    gift: {
      self: $(".js--minicart-gift"),
      input: $(".js--minicart-gift-input"),
      button: $(".js--minicart-gift-button"),
    }
  },
  addToCart: {
    self: $(".js--add-to-cart")
  },
  login: {
    btn: $(".js--login-btn"),
    label: $(".js--login-label")
  },
  search: {
    form: $(".js--search-form"),
    formDrop: $(".js--search-form-drop"),
    input: $(".js--search-input"),
    inputDrop: $(".js--search-input-drop"),
    close: $(".js--search-close"),
    result: $(".js--search-result"),
    resultDrop: $(".js--search-result-drop"),
    resultList: $(".js--search-result-list"),
    resultListDrop: $(".js--search-result-list-drop"),
    resultLabel: $(".js--search-result-label"),
    mobileHeaderForm: $(".js--header-menu-search-form"),
    mobileHeaderInput: $(".js--header-menu-search-input")
  },
  header: {
    self: $(".js--header")
  },
  shelf: {
    imgContainer: $(".js--shelf-img-container")
  },
  mainMenu: {
    submenuWrapper: $(".js--main-menu-submenu-wrapper")
  },
  newsletter: {
    form: document.querySelector(".js--newsletter"),
    message: document.querySelector(".js--newsletter-message")
  },
  footerNewsletter: {
    title: $(".js--footer-newsletter-title"),
    form: $(".js--footer-newsletter-form"),
    loading: $(".js--footer-newsletter-loading"),
    error: $(".js--footer-newsletter-error"),
    errorBtn: $(".js--footer-newsletter-error-btn"),
    success: $(".js--footer-newsletter-success")
  },
  vtex: {
    helperComplement: $(".helperComplement")
  },
  category: {
    orderBy: {
      orderText: document.querySelector(".js--order-text"),
      orderDrop: document.querySelector(".js--order-drop")
    },
    filter: {
      openButton: document.querySelector(".js--open-category"),
      mainContainer: document.querySelector(".js--filter-content")
    }
  }
};
