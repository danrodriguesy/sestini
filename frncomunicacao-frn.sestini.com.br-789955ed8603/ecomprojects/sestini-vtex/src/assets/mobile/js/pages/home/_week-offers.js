import CacheSelector from './__cache-selector';

const {
  home: { weekOffer },
} = CacheSelector;

const Methods = {
  init() {
    Methods.createCarousel();
  },
  createCarousel() {
    $(document).on('shelfCarouselEnd.vtexShelfProperties', (ev) => {
      !weekOffer.shelf.classList.contains('slick-initialized')
        && $(weekOffer.shelf)
          .slick({
            autoplay: false,
            arrows: true,
            dots: false,
            centerMode: false,
            lazyLoad: Sestini.slickLazyMobile,
            slidesToShow: 1,
            slidesToScroll: 1,
          })
          .on('lazyLoaded', (event, slick, image, imageSource) => {
            $(image)
              .add($(image).parent())
              .removeClass('has--placeloader');
          })
          .on('afterChange', ev => Sestini.lazyload.update());
      weekOffer.wrapper.classList.remove('has--placeholder');
    });
  },
};

export default {
  init: Methods.init,
};
