import CacheSelector from './__cache-selector';

const {
  home: {
    weekOffer: { left, right },
  },
} = CacheSelector;

const Methods = {
  init() {
    Methods.createLeftCarousel();
    Methods.createRightCarousel();
  },
  createRightCarousel() {
    $(document).on('shelfCarouselEnd.vtexShelfProperties', (ev) => {
      !right.shelf.classList.contains('slick-initialized')
        && $(right.shelf)
          .slick({
            autoplay: false,
            arrows: true,
            dots: false,
            centerMode: false,
            lazyLoad: Sestini.slickLazyDesktop,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.js--home-week-offer-left ul',
          })
          .on('lazyLoaded', (event, slick, image, imageSource) => {
            $(image)
              .add($(image).parent())
              .removeClass('has--placeloader');
          })
          .on('afterChange', ev => Sestini.lazyload.update());
      right.wrapper.classList.remove('has--placeholder');
    });
  },
  createLeftCarousel() {
    $(document).on('shelfCarouselEnd.vtexShelfProperties', (ev) => {
      !left.shelf.classList.contains('slick-initialized')
        && $(left.shelf)
          .slick({
            autoplay: false,
            arrows: false,
            dots: false,
            centerMode: false,
            lazyLoad: Sestini.slickLazyDesktop,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.js--home-week-offer-right ul',
          })
          .on('lazyLoaded', (event, slick, image, imageSource) => {
            $(image)
              .add($(image).parent())
              .removeClass('has--placeloader');
          })
          .on('afterChange', ev => Sestini.lazyload.update());
      left.wrapper.classList.remove('has--placeholder');
    });
  },
};

export default {
  init: Methods.init,
};
