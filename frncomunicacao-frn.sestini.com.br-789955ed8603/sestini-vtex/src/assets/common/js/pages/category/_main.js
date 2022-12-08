import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.category;
const Methods = {
  init() {
    Methods.banner();
    Methods.changeGrid();
    Methods.resetButtonAction();
    Methods.newInCategory();
    Methods.bgColorFilter();
    Methods.mainSeo();
    Methods.closeMenusCategory();
    Methods.colorTitlePage();
    Methods.scrollTopOnFilter();
    Methods.scrollTopOnPageChange();
    setInterval(() => {
      Methods.setDiscountFlag();
      Methods.bindChangePage();
      // Correcao temporaria para alterar os banners de acessorios, infantil, juvenil e executivo
      Methods.fixBannersBug();
    }, 1000);
  },

  fixBannersBug() {
    const location = window.location.href.split(`/`)[3]
    const banner = $(`.x-category__banner`).find(`img`)
    location.indexOf(`acessorios`) > -1 && banner.attr(`src`, `/arquivos/banner-menu-acessorio.png`).attr('title', 'Acessórios')
    location.indexOf(`infantil`) > -1 && banner.attr(`src`, `/arquivos/banner-menu-infantil.png`).attr('title', 'Infantil')
    location.indexOf(`juvenil`) > -1 && banner.attr(`src`, `/arquivos/banner-menu-juvenil.png`).attr('title', 'Juvenil')
    location.indexOf(`executivo`) > -1 && banner.attr(`src`, `/arquivos/banner-menu-executivo.png`).attr('title', 'Executivo')
    $(`.x-category__banner`).css(`display`, `block`)
  },

  bindChangePage() {
    window.addEventListener('hashchange', () => {
      Methods.setDiscountFlag()
    })
  },

  setDiscountFlag() {
    $('.shelf-product-flag__discount').each((item, elem) => {
      const oldPrice = $(elem).parent().find('.x-shelf__content').find('.x-shelf__old-price').html() != undefined ? $(elem).parent().find('.x-shelf__content').find('.x-shelf__old-price').html().replace('R$', '') : 0
      const bestPrice = $(elem).parent().find('.x-shelf__content').find('.x-shelf__best-price').html() != undefined ? $(elem).parent().find('.x-shelf__content').find('.x-shelf__best-price').html().replace('R$', '') : 0
      if (parseFloat(bestPrice) < parseFloat(oldPrice)) {
        const discountPercentage = 100 - ((parseFloat(bestPrice) * 100) / parseFloat(oldPrice))
        $(elem).html(`<span>${parseInt(discountPercentage)}% OFF</span>`)
      } else {
        $(elem).remove()
      }
    })
  },

  closeMenusCategory() {
    if (!isMobile.any) {
      Sestini.closeMenus(true);
      setTimeout(() => {
        $('.helperComplement').remove();
      }, 1000);
    }
  },

  banner() {
    const mapParam = Sestini.globalHelpers.getUrlParameter('map');
    if (mapParam.length < 1) {
      if (El.banner.find('img').length < 1) {
        El.banner.parent().addClass('has--no-banner');
      }

      Methods.setSubBanners();
    }
  },

  setFilterBanner(mapParam) {
    const nameFirst = Sestini.globalHelpers.slugifyText(Sestini.pathname);
    const nameSecond = Sestini.globalHelpers.strReplace('c,', '', mapParam);
    let fullName = `${nameFirst}-${nameSecond}`;
    fullName = SestiniisCANALile ? `${fullName}-CANALile` : fullName;

    const markup = `
            <div class="vve-image__container">
                <img class="vve-image__single title="" alt="" src="/arquivos/${fullName}.jpg" />
            </div>`;

    El.banner.append(markup);
  },

  setSubBanners() {
    const tshirts = Sestini.globalHelpers.contains(
      't-shirts',
      Sestini.pathname,
    );
    const regatas = Sestini.globalHelpers.contains('regatas', Sestini.pathname);
    if (tshirts || regatas) {
      El.banner
        .find('img')
        .eq(0)
        .hide();
    }
  },

  changeGrid() {
    $('.js--change-grid').on('click', (ev) => {
      const $this = $(ev.currentTarget);
      const col = $this.data('value') || 3;

      $('.js--change-grid').removeClass('is--active');
      $this.addClass('is--active');

      $('.x-category__products').attr('data-col', col);
    });
  },

  resetButtonAction() {
    $(document).on('click', '.js--category-clear-btn', (ev) => {
      $('body').addClass('has--loader');
      Methods._removeHash();

      if (isMobile.any) {
        Sestini.closeMenus(true);
        Sestini.closeCategoryFilters();
      }
      setTimeout(() => {
        // Reload the page from its cache if param is 'false'
        window.location.reload(false);
      }, 300);
    });
  },

  newInCategory() {
    if (vtxctx.searchTerm === 'novidades') {
      $('.js--append-filter-titles').css({
        opacity: '0',
      });

      $('.bread-crumb ul').append(`
                <li class="last"><strong><a title="Novidades" href="https://canal.vtexcommercestable.com.br/novidades">Novidades</a></strong></li>
            `);
    }
  },

  bgColorFilter() {
    $('.x-category .is--cor label').each(function () {
      const nameColor = $(this)
        .find('input')
        .attr('name')
        .replace('+', '-')
        .replace('/', '-')
        .replace(' ', '-');
      const lowerCaseColor = nameColor.toLowerCase();
      $(this).css(
        'background',
        `url(/arquivos/${lowerCaseColor}.jpg) center no-repeat`,
      );
    });
  },

  colorTitlePage() {
    const titlePage = $.trim($('.js--category-text h1').text());
    if (titlePage == 'Outlet') {
      $('.js--category-text h1').addClass('x-red');
    }
  },

  mainSeo() {
    const moretext = 'Ler mais';
    const lesstext = 'Ocultar';

    $('.morelink')
      .eq(0)
      .on('click', (ev) => {
        const $this = $(ev.currentTarget);

        if (!$this.hasClass('more')) {
          $this
            .parent()
            .find('.x-more')
            .addClass('scroll');

          $this
            .parent()
            .find('.moreellipses')
            .hide();
          $this
            .parent()
            .find('.morecontent')
            .fadeIn();

          $this.addClass('more');
          $this.text(lesstext);
        } else {
          $this
            .parent()
            .find('.morecontent')
            .fadeOut();
          $this
            .parent()
            .find('.moreellipses')
            .show();

          setTimeout(() => {
            $this
              .parent()
              .find('.x-more')
              .removeClass('scroll');
          }, 300);

          $this.removeClass('more');
          $this.text(moretext);
        }
        return false;
      });

    const btnOpen = $('.x-open__images');
    const btnClose = $('.x-close__images');
    const images = $('.x-box__images');
    const introBottom = $('.x-intro-bottom');

    btnOpen.on('click', (ev) => {
      const $this = ev.currentTarget;
      images.fadeIn();
      btnOpen.addClass('is--active');
      btnClose.addClass('is--active');

      if (!$(this).hasClass('more')) {
        introBottom.find('.moreellipses').hide();
        introBottom.find('.morecontent').fadeIn();

        $($this).addClass('more');
      }
    });

    btnClose.on('click', (ev) => {
      const $this = ev.currentTarget;
      images.fadeOut();

      $($this).removeClass('is--active');
      btnOpen.fadeIn();
      btnOpen.removeClass('is--active');

      introBottom.find('.morecontent').fadeOut();
      introBottom.find('.moreellipses').show();

      $($this).removeClass('more');
    });
  },

  scrollTopOnFilter() {
    $(document).on('beforeFilter.vtexCategoryFilter', () => {
      Sestini.smoothScrollTo(0, 0, 1000);
      Methods.setDiscountFlag()
    });
  },

  scrollTopOnPageChange() {
    $(document).on('beforeChangePage.vtexCategoryFilter', () => {
      Sestini.smoothScrollTo(0, 0, 1000);
      Methods.setDiscountFlag()
    });
  },

  _removeHash() {
    let scrollV;
    let scrollH;
    const {
      location
    } = window;

    if ('pushState' in history) {
      history.pushState(
        '',
        document.title,
        location.pathname + location.search,
      );
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      scrollV = document.body.scrollTop;
      scrollH = document.body.scrollLeft;

      location.hash = '';

      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scrollV;
      document.body.scrollLeft = scrollH;
    }
  },
};

export default {
  init: Methods.init,
};
