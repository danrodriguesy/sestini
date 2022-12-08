export default {
  preHeader: document.querySelector('.js--pre-header'),
  header: {
    self: document.querySelector('.js--header'),
    buttonMenu: document.querySelector('.js--menu-mobile-btn'),
    closeMenu: document.querySelector('.js--menu-close'),
    menu: document.querySelector('.js--menu-mobile'),
    login: document.querySelector('.js--menu-login'),
  },
  footer: {
    seoButtons: document.querySelectorAll('.js--footer-seo-button'),
    seoContainers: document.querySelectorAll('.js--footer-seo-wrapper'),
  },
  submenu: {
    openSubmenu: document.querySelectorAll('.js--submenu-container'),
    closeSubmenu: document.querySelectorAll('.js--submenu-back'),
    submenuDepartments: document.querySelectorAll('.js--submenu-department'),
    departmentsAccordion: document.querySelectorAll(
      '.js--submenu-accordion-content',
    ),
    departmentsAccordionButton: document.querySelectorAll(
      '.js--submenu-accordion',
    ),
  },
};
