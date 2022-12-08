import './vtex-category-filter.js';
import GlobalsWishlist from '../pages/globals/_wishlist.js';

$('.resultItemsWrapper div[id^="ResultItems"]').vtexCategoryFilter({
    // Elements
    $resultItemsWrapper: $('.resultItemsWrapper'),
    $script: $('.resultItemsWrapper').children('script'),
    $totalItems: $('.searchResultsTime:first .resultado-busca-numero .value'),
    $selectOrder: $('#O'),
    $filters: $('.search-multiple-navigator label'),

    // Classes
    classShelfLoader: 'has--shelf-loader',
    classFilterActive: 'is--filter-active',
    classItemPreLoad: 'is--shelf-item-preload',
    classLoadBtnHide: 'is--load-btn-hide',
    classLoadLess: 'cf-load-less',
    classLoadMore: 'cf-load-more',
    classPagination: 'cf-pagination',
    classBackToTop: 'cf-back-to-top',

    // Texts
    textLoadLess: 'Carregar anteriores',
    textLoadMore: 'Carregar mais',
    textPaginationFirst: 'Primeira',
    textPaginationPrev: 'Anterior',
    textPaginationNext: 'Próxima',
    textPaginationLast: 'Última',
    textEmptyResult: 'Esta combinação de filtros não retornou nenhum resultado!',
    textBackToTop: '',

    // Pagination
    pagination: !isMobile.any,
    paginationRangeButtons: 3,

    // Others
    cookieName: '_vcf_search_query',
    defaultParams: {
        query: {
            O: 'OrderByReleaseDateDESC',
        },
    },
    attempts: 1,
});

$(document).on(
    'beforeChangeOrder.vtexCategoryFilter',
    (event, options, request) => {
        Sestini.closeCategoryFilters();
        Sestini.filtersContentMobile.removeClass('is--active');
    },
);

$(document).on('beforeFilter.vtexCategoryFilter', (event, options, request) => {
    Sestini.closeCategoryFilters();
    Sestini.filtersContentMobile.removeClass('is--active');
});

// Renderings
$(document).on('afterSearch.vtexCategoryFilter', (event, options, request) => {
    Sestini.shelfCategoryFullUpdate();
    setTimeout(() => GlobalsWishlist.init(), 100);
});

$(document).on(
    'afterShowItems.vtexCategoryFilter',
    (event, options, request) => {
        Sestini.shelfCategoryFullUpdate();
        setTimeout(() => GlobalsWishlist.init(), 100);
    },
);

$(document).on('ajaxStop', () => Sestini.shelfCategoryFullUpdate());

// $(document).on('init.vtexCategoryFilter', (event, options, request) => window.console.log('init.vtexCategoryFilter'));
// $(document).on('initWithCookie.vtexCategoryFilter', (event, options, request) => window.console.log('initWithCookie.vtexCategoryFilter'));
// $(document).on('beforeSearch.vtexCategoryFilter', (event, options, request) => window.console.log('beforeSearch.vtexCategoryFilter'));
// $(document).on('afterSearch.vtexCategoryFilter', ( event, options, request) => window.console.log('afterSearch.vtexCategoryFilter'));
// $(document).on('beforeChangeOrder.vtexCategoryFilter', (vent, options, request, element) => window.console.log('beforeChangeOrder.vtexCategoryFilter'));
// $(document).on('afterChangeOrder.vtexCategoryFilter', (event, options, request, element) => window.console.log('afterChangeOrder.vtexCategoryFilter'));
// $(document).on('beforeFilter.vtexCategoryFilter', (event, options, request, element) => window.console.log('beforeFilter.vtexCategoryFilter'));
// $(document).on('afterFilter.vtexCategoryFilter', ( event, options, request, element) => window.console.log('afterFilter.vtexCategoryFilter'));
// $(document).on('beforeChangePage.vtexCategoryFilter', (event, options, request) => window.console.log('beforeChangePage.vtexCategoryFilter'));
// $(document).on('afterChangePage.vtexCategoryFilter', ( event, options, request) => window.console.log('afterChangePage.vtexCategoryFilter'));
// $(document).on('beforeShowItems.vtexCategoryFilter', ( event, options, request, page) => window.console.log('beforeShowItems.vtexCategoryFilter'));
// $(document).on('afterShowItems.vtexCategoryFilter', (event, options, request, page) => window.console.log('afterShowItems.vtexCategoryFilter'));