import CacheSelector from './__cache-selector';

const { home } = CacheSelector;

const Methods = {
  init() {
    Methods.createSlider();
  },
  createSlider() {
    $(home.benefits)
      .slick({
        slide: 'li',
        autoplay: true,
        centerMode: true,
        arrows: false,
        dots: false,
        centerMode: false,
        lazyLoad: Sestini.slickLazyMobile,
        slidesToShow: 2,
        slidesToScroll: 2,
      })
      .on('lazyLoaded', (event, slick, image, imageSource) => $(image).removeClass('has--placeloader'))
      .on('afterChange', ev => Sestini.lazyload.update());
  },
};

export default {
  init: Methods.init,
};
