import CacheSelector from './__cache-selectors';

const { images } = CacheSelector;

const Methods = {
  init() {
    Methods.mainImages();
    Methods.changeImages();
  },
  mainImages() {
    $(document).on('product.requestDone', (ev) => {
      Methods.createCarousel();
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
        arrows: true,
        dots: false,
        draggable: false,
      });
    Methods.bindOpenBigImages()
  },
  bindOpenBigImages() {
    $('.x-product__img-main-content').click((el) => {
      if ($('#modal-product-images').css('display') == 'flex') {
        return true
      }
      const allImages = $('.x-product__img-content').find('.x-product__img-main-content');

      var imagesTag = ''
      allImages.map((i, el) => {
        const src = $(el).attr('data-src')
        if (!$(el).hasClass('slick-cloned')) {
          imagesTag += `<div><img class='product-big-image-carousel' src='${src}'/></div>`
        }
      })

      const template = `
        <div class='modal__product-images__container' id='modal-product-images'>
          <div id='carousel-big-images'>
            ${imagesTag}
          </div>
          <div id='close-modal-big-product'>X</div>
        </div>
      `

      $('body, html').css('overflow', 'hidden')
      $('body').append(template)

      $('#carousel-big-images').not('.slick-initialized').slick({
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      });

      $('#close-modal-big-product').click(el => {
        $('body, html').css('overflow', 'auto')
        $('#modal-product-images').remove()
      })
    })
  },
};

export default {
  init: Methods.init,
};
