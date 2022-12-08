const Methods = {
        init() {
            setTimeout(() => {
                Methods.addBottomBuyBar();
                Methods.bindScrollBottomBuyBar();
            }, 3000);
        },

        bindScrollBottomBuyBar() {
            $(window).scroll(function() {
                const scrollTop = $(window).scrollTop()
                if (scrollTop > 500 && scrollTop <= $('.x-newsletter').offset().top - 1000) {
                    $('.x-product__bottom-buy-bar').fadeIn()
                } else {
                    $('.x-product__bottom-buy-bar').fadeOut()
                }
            })
        },

        addBottomBuyBar() {
            const { productName, productListPriceFrom, productPriceTo, productId } = dataLayer[0]
            const productRef = $('.skuReference').html()
            const productImage = $($('.x-product__img-main-item')[0]).attr('src')
            var installments = parseInt(productPriceTo / 30)
            if (installments > 1) {
                if (installments > 10) {
                    var installments = 10
                    var installmentsValue = parseFloat(productPriceTo / 10).toFixed(2)
                } else {
                    var installmentsValue = parseFloat(productPriceTo / installments, 2).toFixed(2)
                }
            } else {
                installments = 0
            }
            const template = `<div class='x-product__bottom-buy-bar'>
            <div class='x-product__bottom-buy-bar-container'>
                <div class='x-product__bottom-buy-bar__left'>
                    <div class='x-product__bottom-buy-bar__left-img'><img src='${productImage}'/></div>
                    <div class='x-product__bottom-buy-bar__left-name'>
                        <h2>${productName}</h2>
                        <p>Ref: ${productRef}</p>
                    </div>
                </div>
                <div class='x-product__bottom-buy-bar__right'>
                    <div class='x-product__bottom-buy-bar__right-price'>
                        ${productListPriceFrom - productPriceTo != 0 ? `<p class='de'>R$ ${parseFloat(productListPriceFrom).toFixed(2).replace('.', ',')}</p>` : ''}
                        <p class='por'>R$ ${parseFloat(productPriceTo).toFixed(2).replace('.', ',')}</p>
                        ${installments > 0 ? `<p class='installments'>ou em <b>${installments}x</b> de <b>R$ ${installmentsValue}</b> sem juros</p>` : ''}
                    </div>
                    <div class='x-product__bottom-buy-bar__right-buy'>
                        <a href='https://www.sestini.com.br/checkout/cart/add?sku=${productId}&qty=1&seller=1'>Comprar</a>
                    </div>
                </div>
            </div>
        </div>`

        $('body').append(template)
    }
};

export default {
    init: Methods.init,
};