export default {
  category: {
    orderBy: {
      orderText: document.querySelector('.js--order-text'),
      orderDrop: document.querySelector('.js--order-drop'),
    },
    filter: {
      openButton: document.querySelector('.js--open-category'),
      mainContainer: document.querySelector('.js--filter-content'),
      accordions: document.querySelectorAll('.js--category-accordion'),
      closeButton: document.querySelector('.js--filter-close-button'),
      accordionWrapper: document.querySelectorAll('.js--category-accordion'),
      accordionButton: $('.js--category-filter-name'),
    },
    banner: $('.js--category-banner'),
    filterTitle: $('.js--append-filter-titles'),
    categoryFiltersOpenMobile: $('.js--category-filters-open'),
    categoryFiltersCloseMobile: $('.js--category-filters-close'),
    categoryWrapperFilter: $('.js--filters-content-mobile'),
    
  },
};
