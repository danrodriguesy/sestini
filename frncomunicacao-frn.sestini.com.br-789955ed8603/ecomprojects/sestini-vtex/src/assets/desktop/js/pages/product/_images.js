import CacheSelector from './__cache-selectors';

const { images } = CacheSelector;

const Methods = {
  init() {
    Methods.mainImages();
    Methods.changeImages();
  },
  mainImages() {
    $(document).on('product.requestDone', (ev) => {
      if ($(images.nav).find('.slick-slide').length >= 6) {
        Methods.createCarousel();
      }
    });
  },
  changeImages() {
    $(document).on('product.skuSelectedStart', (ev) => {
      $(images.main).slick('unslick');
      $(images.nav).slick('unslick');
    });

    $(document).on('product.skuSelectedFinish', (ev) => {
      Methods.createCarousel();
    });
  },
  createCarousel() {
    !images.main.classList.contains('slick-initialized')
      && $(images.main).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: false,
        dots: false,
        asNavFor: '.js--product-img-nav',
      });
    !images.nav.classList.contains('slick-initialized')
      && $(images.nav).slick({
        arrows: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        centerMode: true,
        vertical: true,
        verticalSwiping: true,
        asNavFor: '.js--product-img-main',
      });
    setTimeout(() => {
      $('.x-product__img-main-item').map((i, el) => {
        $(el).attr('data-magnify-src', Methods.replaceImageSize($(el).attr('src'), 1200))
        $(el).magnify()
      })
    }, 100);
    Methods.bindOpenBigImages()
  },

  replaceImageSize(url, size) {
    return url.replace("-292-292", `-${size}-${size}`).replace("-155-155", `-${size}-${size}`)
  },

  bindOpenBigImages() {
    $('.x-product__img-main-content').click((el) => {
      const element = $(el.currentTarget)
      const currentImage = element.attr('data-src');
      const allImages = $('.x-product__img-nav-content').find('.x-product__img-nav-item');

      var imagesTag = ''
      allImages.map((i, el) => {
        const src = $(el).attr('src')

        if (!$(el).parent().hasClass('slick-cloned')) {
          imagesTag += `<img class='product-big-image-carousel ${src == currentImage && 'active'}' src='${src}'/>`
        }
      })

      const template = `
        <div class='modal__product-images__container' id='modal-product-images'>
          <div class='left'>
            <img src='${currentImage}' data-magnify-src='${Methods.replaceImageSize(currentImage, 1200)}' alt='Product Image' id='main-big-product-carousel-image'/>
          </div>
          <div class='right' id='carousel-big-images'>
            ${imagesTag}
          </div>
          <div id='modal-big-product-carouser-close-btn'>X</div>
        </div>
      `

      $('body, html').css('overflow', 'hidden')
      $('body').append(template)
      $('.product-big-image-carousel').click(el => {
        $('.product-big-image-carousel').removeClass('active')
        const image = $(el.currentTarget).attr('src')
        $(el.currentTarget).addClass('active')
        $('#main-big-product-carousel-image').attr('src', image)
        $('#main-big-product-carousel-image').attr('data-magnify-src', Methods.replaceImageSize(image, 1200))
        $('#main-big-product-carousel-image').magnify()
      })
      
      $('#modal-big-product-carouser-close-btn').click(el => {
        $('body, html').css('overflow', 'auto')
        $('#modal-product-images').remove()
      })
      $('#main-big-product-carousel-image').magnify()
    })

  }
};

export default {
  init: Methods.init,
};
