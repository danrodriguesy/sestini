import CacheSelectors from './__cache-selectors';

const { orderBy, filter } = CacheSelectors.category;

const Methods = {
  init() {
    Methods.orderByChange();
    Methods.orderByActions();
    Methods.toggleFilterNav();
    Methods.selectedsFilters();
    Methods.filterSelectedAction();
    Methods.filterSeeMore();
    Methods.closeFilter();
    Methods.filterAccordion();
  },

  toggleFilterNav() {
    if(isMobile.any){
      filter.openButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (filter.openButton.classList.contains('is--active')) {
          Sestini.searchOverlay.removeClass('is--active');
          filter.openButton.classList.remove('is--active');
          filter.mainContainer.classList.remove('is--active');
        } else {
          Sestini.closeMenus(true);
          filter.openButton.classList.add('is--active');
          filter.mainContainer.classList.add('is--active');
          if (isMobile.any) {
            Sestini.searchOverlay.addClass('is--active');
          }
        }
      });
    }
  },

  orderByChange() {
    $('.js--order-by').on('change', () => {
      const val = $('.js--order-by:checked').val();

      Sestini.closeCategoryOrderBy();

      $('.orderBy select')
        .eq(0)
        .val(val)
        .trigger('change');

      $('.js--order-text').text($('.orderBy select option[value="' + val + '"]').eq(0).text());
    });

  },

  orderByActions() {
    orderBy.orderText.addEventListener('click', (ev) => {
      ev.preventDefault();

      if (orderBy.orderText.classList.contains('is--active')) {
        Sestini.closeCategoryOrderBy();
      } else {
        Sestini.closeCategoryOrderBy();
        orderBy.orderText.classList.add('is--active');
        orderBy.orderDrop.classList.add('is--active');
      }
    });
  },

  selectedsFilters() {
    function build() {
      $('.js--filter-selected').remove();

      $('.js--append-filter > div').each((index, elem) => {
        const $elem = $(elem);
        const $selecteds = $elem.find('label.filter--active');

        $selecteds.each((i, el) => {
          const $el = $(el);
          const classe = $el.attr('class');
          const name = $.trim($el.text());

          $elem
            .find('> div')
            .prepend(
              `<button data-filter="${classe}" class="x-category__filter-selected js--filter-selected">${name}</button>`,
            );
        });
      });
    }

    $(document).on(
      'change',
      '.js--append-filter .multi-search-checkbox',
      () => {
        $('.js--fixed-filter').removeClass('is--active');
        build();
      },
    );
  },

  filterSelectedAction() {
    $(document).on('click', '.js--filter-selected', (ev) => {
      const $this = $(ev.currentTarget);
      let filter = $this.data('filter');
      if (filter) {
        filter = filter.split(/\s/gim);
        filter = `.js--append-filter label.${filter.join('.')}`;

        $(filter).trigger('click');
      }
    });
  },

  filterAccordion() {
    const accordionButton = [...document.getElementsByClassName('js--category-filter-name')];
    const accordionWrapper = [...document.getElementsByClassName('js--category-accordion')];
    const filterOption = [...document.getElementsByClassName('js--filter-options')];

    accordionButton.map((item, index) => {
      item.addEventListener('click', (ev) => {
        ev.preventDefault();

        if(!ev.currentTarget.classList.contains('is--opened')){
          ev.currentTarget.classList.add("is--opened");
          accordionWrapper[index].classList.add("is--opened");
          filterOption[index].classList.add("is--opened");

        } else {
          ev.currentTarget.classList.remove("is--opened");
          accordionWrapper[index].classList.remove('is--opened');
          filterOption[index].classList.remove('is--opened');
        }

      });
    });
  },

  resetElements() {
    const accordionButton = [...document.getElementsByClassName('js--category-filter-name')];
    const accordionWrapper = [...document.getElementsByClassName('js--category-accordion')];
    const filterOption = [...document.getElementsByClassName('js--filter-options')];
    [...accordionWrapper, ...accordionButton, ...filterOption].map(el => el.classList.remove('is--opened'));
  },

  filterSeeMore() {
    const itemsWrapper = $('.x-category__filters-dinamics-item');

    itemsWrapper.each(function () {
      const $this = $(this);
      const qtdItems = $this.find('.x-category__filters-wrapper label').length;
      if (qtdItems > 7) {
        $this.append(
          '<div class="x-category__filters-dinamics-item--more js--seemore">+ ver mais</div>',
        );
      }
    });

    const seeMoreButton = $('.js--seemore');
    $(document).on('click', '.js--seemore', (ev) => {
      const $this = $(ev.currentTarget);
      $this.toggleClass('is--active');
      $this.prev('.x-category__filters-wrapper').toggleClass('is--opened');
      const filterOption = [...document.getElementsByClassName('js--filter-options')];
      if ($this.hasClass('is--active')) {
        [...filterOption].map(el => el.classList.remove('is--opened'));
        $this.html('- ver menos');
      } else {
        $this.html('+ ver mais');
      }
    });
  },

  closeFilter() {
    if(isMobile.any){
      filter.closeButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        Sestini.closeCategoryFilters();
        Sestini.closeMenus(true);
      });
    }
  },
};

export default {
  init: Methods.init,
};
