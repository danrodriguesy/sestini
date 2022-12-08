import CacheSelector from './__cache-selector';

const { home } = CacheSelector;

const Methods = {
  init() {
    Methods.createSlider();
    Methods.initLazy()
  },
  initLazy() {
    lozad('.lozad', {
      loaded: function (el) {
        el.classList.add('loaded');
      
      }
    }
    ).observe()
  },
  createSlider() {
    $(home.mainBanner)
      .slick({
        autoplay: true,
        arrows: true,
        dots: true,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      })
  },
};

export default {
  init: Methods.init,
};
