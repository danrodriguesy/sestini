import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.category;
const Methods = {
  init() {
    Methods.buildFilterTitles();
    Methods.browserByMenu();
    Methods.buildFilters();
    Methods.insertCustomTag();
    Methods.insertLabel();
    Methods.insertResetButton();
  },

  buildFilterTitles() {
    const names = [];

    if (!Sestini.isSearchPage) {
      $('.search-multiple-navigator h5').map((index, item) => {
        const name = $.trim($(item).text());

        if (name.toLowerCase() !== 'faixa de preço') {
          names.push({
            name,
            classe: `is--${Sestini.globalHelpers.slugifyText(name)}`,
          });
        } else {
          names.push({
            name: 'Preço',
            classe: `is--${Sestini.globalHelpers.slugifyText(name)}`,
          });
        }
      });
    }

    names.unshift({
      name: 'Filtrar por',
      classe: 'is--head',
    });

    names.forEach((filter) => {
      const markup = `
                <div class="x-category__filter-name-wrapper ${filter.classe}">
                    <h6 class="x-category__filter-name js--toggle-filter ${filter.classe}">${filter.name}</h6>
                </div>`;

      El.filterTitle.append(markup);
    });
  },

  // Category Menu
  browserByMenu() {
    let $menus;

    if (Sestini.isSearchPage || vtxctx.departmentyId === vtxctx.categoryId) {
      $menus = $('.search-single-navigator')
        .children()
        .not('h5, h5 + ul, .productClusterSearchableIds, a');
    } else {
      $menus = $('.search-multiple-navigator')
        .children()
        .not('fieldset, a, .productClusterSearchableIds, h3');
    }

    const $container = $(
      '<div class="x-category__filters-dinamics-item is--categories-link js--categories-link js--category-accordion">',
    );
    const $subContainer = $('<div class="x-category__filters-wrapper js--filter-options">');

    $menus.map((index, item) => {
      if($(item).find('a').length === 0){
        return;
      }

      let $item = $('<label/>');
      $item.append($(item).find('a'));

      $subContainer.append($item)
    });
    $('.js--append-filter').append($container.append($subContainer));
  },

  buildFilters() {
    const $filters = $('.search-multiple-navigator fieldset');

    $filters.map((index, item) => {
      let name = $.trim(
        $(item)
          .find('h5')
          .text(),
      );
      let slugName = Sestini.globalHelpers.slugifyText(name);

      if (name.toLowerCase() === 'faixa de preço') {
        name = 'Preço';
        slugName = 'preco';
      }

      const $container = $(
        `<div class="x-category__filters-dinamics-item js--category-accordion is--${slugName}">`,
      );
      const $subContainer = $('<div class="x-category__filters-wrapper js--filter-options">');
      const $containerTitle = $(`
                <div class="x-category__filter-name js--category-filter-name">${name}</div>
            `);

      $container.append($containerTitle);
      $container.append(
        $subContainer.append(
          $(item)
            .find('> div')
            .attr('id', ''),
        ),
      );

      $('.js--append-filter').append($container);
    });
  },

  insertCustomTag() {
    $('.js--append-filter')
      .find('label')
      .map((index, item) => {
        $(item).append('<button class="x-checkbox__complement"></button>');
      });
  },

  insertLabel() {
    $('.js--categories-link').prepend(
      '<h2 class="x-category__filters-label js--category-filter-name">Categorias</h2>',
    );
  },

  insertResetButton() {
    $('.js--append-filter').append(`
            <div class="x-category__btn-wrapper">
                <button class="x-category__clear-btn js--category-clear-btn" title="Limpar">
                    <span class="x-category__clear-btn-text">Limpar filtros</span>
                </button>
            </div>
        `);
  },
};

export default {
  init: Methods.init,
};
