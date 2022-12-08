import '../../vendor/vtex-search-autocomplete.js';

import CacheSelectors from './__cache-selectors.js';

const { input, result, resultList } = CacheSelectors.search;
const Methods = {
  init() {
    Methods.autocomplete();
    if (window.innerWidth >= 768) {
    } else {
      // $('.x-header-menu__search-input').on('focus', (e) => Methods.getMobileAutocompleteResult(e.target.value))
      // $('.x-header-menu__search-input').on('keyup', (e) => Methods.getMobileAutocompleteResult(e.target.value))
      // $('.x-header-menu__search-input').on('focusout', (e) => $('.search-autocomplete-container').hide())
      // $('.x-header-menu__search-group').append(`
      //   <div class='search-autocomplete-container'> 
      //   </div>
      // `)
      // $('.search-autocomplete-container').hide()
    }
  },
  getMobileAutocompleteResult(searchTerm) {
    $.ajax({
      url: '/buscaautocomplete',
      type: 'get',
      data: {
        maxRows: 5,
        productNameContains: searchTerm
      }
    }).then(response => {
      const categories = response && response.itemsReturned.filter(item => !item.items.length);
      const products = response && response.itemsReturned.filter(item => item.items.length);
      if(response.itemsReturned.length == 0) return false
      
      $('.search-autocomplete-container').empty()
      $('.search-autocomplete-container').append('<h2>Categorias similares</h2>')
      categories.map(item => {
        $('.search-autocomplete-container').show()
        const href = item.href
        const categoryName = item.name.charAt(0).toUpperCase() + item.name.slice(1)
        $('.search-autocomplete-container').append(`<a href='${href}'>${categoryName}</a>`)
      })
      $('.search-autocomplete-container').append('<h2>Produtos similares</h2>')
      products.map(product => {
        const {items, name, href} = product
        $('.search-autocomplete-container').append(`<a href='${href}' class='product-search-item'><img src='${items[0].imageUrl}'/>${name}</a>`)
      })

    })
  },
  autocomplete() {
    const $paragraph = $('<p />', {
      class: 'x-search__not-found-text',
      text: 'Não encontramos nenhum resultado',
    });

    const $notFound = $('<div />', {
      class: 'x-search__not-found',
      append: $paragraph,
    });

    input.vtexSearchAutocomplete({
      shelfId: 'a36d5fb9-67e0-4a5b-ac23-c32b8f0bff1a',
      appendTo: resultList,
      limit: isMobile.any ? 3 : 4,
      bodyClass: 'has--search-loader',
      notFound() {
        return $notFound;
      },
    });

    input.on('keyup focus', (e) => {
      result.addClass('is--active');

      if ($(e.currentTarget).val().length === 0) {
        result.removeClass("is--active");
      }

    });
  },
};

export default {
  init: Methods.init,
};
