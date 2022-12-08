import CacheSelector from './__cache-selector';

const {
  home: { productSearched },
} = CacheSelector;

const Methods = {
  init() {
    Methods.createSlider();
  },
  createSlider() {
    $(document).on('shelfCarouselEnd.vtexShelfProperties', (ev) => {
      $(productSearched.shelf)
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
    });
  },
};

export default {
  init: Methods.init,
};
