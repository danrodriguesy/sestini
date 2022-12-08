const Methods = {
  init() {
    Methods.createCarousel();
  },
  createCarousel() {
    $(document).on('shelfCarouselEnd.vtexShelfProperties', (ev) => {
      $('.js--products-searched-shelf ul')
        .slick({
          autoplay: false,
          arrows: true,
          dots: false,
          centerMode: false,
          lazyLoad: Sestini.slickLazyDesktop,
          slidesToShow: 6,
          slidesToScroll: 1,
        })
        .on('lazyLoaded', (event, slick, image, imageSource) => {
          $(image)
            .add($(image).parent())
            .removeClass('has--placeloader');
        })
        .on('afterChange', ev => Sestini.lazyload.update());
      $('.js--products-searched-shelf').removeClass('has--placeholder');
    });
  },
};

export default {
  init: Methods.init,
};
