import CacheSelector from '../general/__cache-selectors';

const { quickView: { images } } = CacheSelector;

const Methods = {
  init() {
    Methods.mainImages();
    Methods.changeImages();
  },

  mainImages() {
    $(document).on('product.requestDone', () => {
      Methods.createCarousel();
    });
  },

  changeImages() {
    $(document).on('product.skuSelectedStart', () => {
      $(images.main).slick('unslick');
      $(images.nav).slick('unslick');
    });

    $(document).on('product.skuSelectedFinish', () => {
      Methods.createCarousel();
    });
  },

  createCarousel() {
    if (!images.main.classList.contains('slick-initialized')) {
      $(images.main).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: false,
        dots: false,
        // asNavFor: '.js--product-img-nav',
      });
    }

    if (!images.nav.classList.contains('slick-initialized')) {
      $(images.nav).slick({
        arrows: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        centerMode: true,
        vertical: true,
        verticalSwiping: true,
        asNavFor: ".js--quick-view-img-main"
      });
    }

    $(images.nav).slick("slickPause");
    $(images.main).slick("slickPause");

    setTimeout(() => {
      $('.x-quick-view__img-main-item').map((i, el) => {
        $(el).attr('data-magnify-src', Methods.replaceImageSize($(el).attr('src'), 1200))
        $(el).magnify()
      })
    }, 100);
  },
  replaceImageSize(url, size) {
    return url.replace("-292-292", `-${size}-${size}`).replace("-155-155", `-${size}-${size}`)
  },
};

export default {
  init: Methods.init,
};
