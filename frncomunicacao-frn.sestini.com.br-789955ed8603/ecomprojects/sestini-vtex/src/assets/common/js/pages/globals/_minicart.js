import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.minicart;
const Methods = {
  init() {
    Methods.minicart();
    Methods.actions();
    Methods.events();
    Methods._updateCart();
    Methods.handleDiscount();
  },

  minicart() {
    Sestini.minicart.vtexMinicart({
      vtexUtils: Sestini.vtexUtils,
      vtexCatalog: Sestini.VtexCatalog,
      debug: true,
      cache: Sestini.setCache,
      zeroPadding: true,
      bodyClass: 'has--loader',
    });
  },

  actions() {
    El.open.on('click', (ev) => {
      ev.preventDefault();
      Sestini.closeMenus();
      Methods._openCart();
      Methods.setInstallmentsValue()
    });

    El.close.on('click', (ev) => {
      ev.preventDefault();
      Sestini.closeMenus(true);
      Methods.setInstallmentsValue()
      $('.js--overlay').removeClass('is--active')
    });

    $('.js--overlay').click(() => $('.js--overlay').removeClass('is--active'))
  },

  _updateCoupon(orderForm, error) {

    let value = orderForm.marketingData && orderForm.marketingData.coupon ? orderForm.marketingData.coupon : null;

    rivets.bind(El.gift.self, {
      coupon: {
        value,
        error
      }
    });
    setTimeout(() => {
      Methods.setInstallmentsValue()
    }, 1000);
  },

  handleDiscount() {
    $(document).on("update.vtexMinicart", function (ev, of) {
      Methods._updateCoupon(of, null);
    });


    El.gift.self.find("form").submit(function () {
      let code = El.gift.input.val();
      let error = null;

      vtexjs.checkout
        .getOrderForm()
        .then(function (orderForm) {
          Methods._updateCoupon(orderForm, null);
          return vtexjs.checkout.clearMessages();
        })
        .then(function (orderForm) {
          return vtexjs.checkout.addDiscountCoupon(code);
        })
        .then(function (orderForm) {
          console.log(code, orderForm.marketingData.coupon)
          if (code === '' || code !== orderForm.marketingData.coupon) {
            error = true;
          }

          console.log(error)
          Methods._updateCoupon(orderForm, error);
        })


      return false;
    });

    El.gift.self.find(".x-minicart__gift-list-button").click(function () {
      vtexjs.checkout
        .getOrderForm()
        .then(function (orderForm) {
          return vtexjs.checkout.removeDiscountCoupon();
        })
        .then(function (orderForm) {
          Methods._updateCoupon(orderForm, null);
        });
    });



  },

  events() {
    $(document).on('delete.vtexMinicart', (ev, orderForm) => {
      if (orderForm.items.length < 1) {
        Sestini.closeMenus(true);
      }
    });
  },

  _openCart() {

    vtexjs.checkout.getOrderForm().done(function (orderForm) {
      Methods._updateCoupon(orderForm, null);
    })


    Sestini.minicart.add(Sestini.overlay).addClass('is--active');
    Sestini.disableScroll();
    Methods.setInstallmentsValue()
  },

  setInstallmentsValue() {
    let total = parseFloat($('.x-minicart__subtotal-price').html().replace('R$ ', '').replace('.', '').replace(',', '.'), 2)
    let installments = parseInt(total / 30)
    if (installments > 1) {
      if (installments > 10) {
        let installmentsValue = parseFloat(total / 10).toFixed(2)
        $('.x-minicart__installments').show()
        $('#minicart-installments').html('10')
        $('#minicart-installments-value').html(installmentsValue.toString().replace('.', ','))
      } else {
        let installmentsValue = parseFloat(total / installments, 2).toFixed(2)
        $('.x-minicart__installments').show()
        $('#minicart-installments').html(installments)
        $('#minicart-installments-value').html(installmentsValue.toString().replace('.', ','))
      }
    } else {
      $('.x-minicart__installments').hide()
    }

  },

  _updateCart() {
    const qntCart = $('.js--minicart .x-minicart__amount').text();
    $('.x-header__right--cart-ammount').text(qntCart);
    Methods.setInstallmentsValue()
  },
};

export default {
  init: Methods.init,
};
