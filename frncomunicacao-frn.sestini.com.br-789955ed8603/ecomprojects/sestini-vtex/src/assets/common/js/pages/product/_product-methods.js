const Methods = {
  init() {
    Methods.bindSeeMore();
    Methods.setDiscountFlag();
    Methods.setBordoFlag();
    Methods.setblackFlag();
    Methods.addWhatsappIcon()
    Methods.bindHoverTooltip();
    Methods.bindAddCartFbEvent();
    if (window.innerWidth <= 768) {
      Methods.bindScrollBuyButton()
    }
    setTimeout(() => {
      Methods.bindContentViewFbEvent()
    }, 1500)
  },

  bindContentViewFbEvent() {
    fbq('track', 'ViewContent');
  },

  bindAddCartFbEvent() {
    $('.js--add-to-cart').click(() => {
      fbq('track', 'AddToCart', {
        currency: "BRL",
        value: dataLayer[0].productListPriceTo,
        content_type: 'product',
        content_ids: [dataLayer[0].productId]
      });
    })
  },
  bindHoverTooltip() {
    setTimeout(() => {
      const shippingInput = $(`.x-product__shipping-input`)
      const tooltipText = $(`#tooltip-product-text`)
      shippingInput.hover(() => {
        tooltipText.css({
          'visibility': 'visible',
          'opacity': 1
        })
      }, () => {
        !shippingInput.is(`:focus`) && tooltipText.css({
          'visibility': 'hidden',
          'opacity': 0
        })
      })
      shippingInput.focus(() => {
        tooltipText.css({
          'visibility': 'visible',
          'opacity': 1
        })
      })
      shippingInput.blur(() => {
        tooltipText.css({
          'visibility': 'hidden',
          'opacity': 0
        })
      })
      shippingInput.is(`:focus`) && tooltipText.css({
        'visibility': 'visible',
        'opacity': 1
      })
    }, 500)
  },

  addWhatsappIcon() {
    const message = window.location.href.split('?')[0] + "\r\n\r\n" + "Sestini - Com você pro que der e vier!";
    const template = `
            <a target='_blank' id='whatsapp-share-link' href='https://wa.me/?text=${window.encodeURIComponent(message)}'>
            <div class='whatsapp-icon'></div>
            Compartilhar no WhatsApp
            </a>
        `
    window.innerWidth <= 768 ? $('.x-product__buy-btn-wrapper-normal').append(template) : $('.x-product__buy-btn-wrapper').append(template)
  },

  setBordoFlag() {
    if ($('.x-product__name').html().toLowerCase().indexOf('bordo') > -1) {
      window.innerWidth >= 768 ?
        $('.x-product__img-right').append(`<div class="flag-bordo"></div>`) :
        $('.x-product__img-content').append(`<div class="flag-bordo"></div>`)
      $('.x-product-wishlist__add-btn').css('left', '55px')
    }
  },

  setblackFlag() {
    if ($('.x-product__name').html().toLowerCase().indexOf('blackfriday') > -1) {
      window.innerWidth >= 768 ?
        $('.x-product__img-right').append(`<div class="flag-blackfriday"></div>`) :
        $('.x-product__img-content').append(`<div class="flag-blackfriday"></div>`)
      $('.x-product-wishlist__add-btn').css('left', '55px')
    }
  },

  bindSeeMore() {
    $('.x-product__pre-description-seemore').click(() => {
      $("body, html").animate({
        scrollTop: $('.x-product__specifications-description').offset().top - 280
      }, 500);
    })
  },

  setDiscountFlag() {
    let listPriceElem = $(".x-product__price-wrapper > del > span").html()
    let bestPriceElem = $(".x-product__price-wrapper > ins > span").html()

    let listPrice = listPriceElem != undefined ? listPriceElem.replace('R$', '').replace(',', '.') : 0
    let bestPrice = bestPriceElem != undefined ? bestPriceElem.replace('R$', '').replace(',', '.') : 0
    let discountPercentage = 100 - ((bestPrice * 100) / listPrice)

    discountPercentage.toFixed(0) > 0 && discountPercentage != 'Infinity' ?
      $('.x-product__discount-tag > span').html(discountPercentage.toFixed(0) + '% OFF') : $('.x-product__discount-tag').remove()
    discountPercentage.toFixed(0) > 0 && discountPercentage != 'Infinity' ?
      $('#buy-together-discount-flag').html(discountPercentage.toFixed(0) + '% OFF') : $('#buy-together-discount-flag').remove()
  },

  bindScrollBuyButton() {
    $(window).on('scroll', () => {
      const fixedButton = $('.x-product__fixed')
      fixedButton.offset().top > 1000 ? fixedButton.fadeIn() : $('.x-product__fixed').fadeOut()
    })
  },
}
export default {
  init: Methods.init,
};
