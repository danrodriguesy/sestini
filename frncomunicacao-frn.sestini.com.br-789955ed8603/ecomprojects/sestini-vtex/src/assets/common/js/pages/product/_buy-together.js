const Methods = {
    init() {
        Methods.validateProducts();
    },
    validateProducts() {
        if ($('.x-shelf-bt > ul > li').length > 1) {
            setTimeout(() => {
                Methods.setMainProduct()
                Methods.bindAddRemoveButtons()
                Methods.setTotalizers()
            }, 1000);
        } else {
            $('.x-product__buy-together').remove()
        }
    },

    setMainProduct() {
        const name = $('.x-product__name').html()
        const image = $('.x-product__select-color').find('img').attr('src')
        const listPrice = $('.x-product__old-price > span').html()
        const bestPrice = $('.x-product__best-price > span').html()
        const installments = `Em até <strong>${$('.x-product__installments-wrapper > span:nth-child(1)').html()}</strong> de <strong>${$('.x-product__installments-wrapper > span:nth-child(2)').html()}x</strong> sem juros`

        // Product name
        $('#buy-together-name').html(name)
            // Product image
        $('#buy-together-image').attr('alt', name)
        $('#buy-together-image').attr('src', image)
            // Product price
        $('#buy-together-old-price').html(listPrice)
        $('#buy-together-best-price').html(bestPrice)
        $('#buy-together-installments').html(installments)
    },

    bindAddRemoveButtons() {
        $('.bt-remove-product').html('Remover')
        $('.bt-add-product').html('Adicionar')
        $('.bt-remove-product').click((ev) => {
            $(ev.currentTarget).parent().parent().addClass('disabled')
            $(ev.currentTarget).addClass('disabled')
            $(ev.currentTarget).parent().find('.bt-add-product').removeClass('disabled')
            Methods.setTotalizers()
        })

        $('.bt-add-product').click((ev) => {
            $(ev.currentTarget).parent().parent().removeClass('disabled')
            $(ev.currentTarget).addClass('disabled')
            $(ev.currentTarget).parent().find('.bt-remove-product').removeClass('disabled')
            Methods.setTotalizers()
        })

    },

    formatNumber(str) {
        return parseFloat(str.replace('R$', '').replace('.', '').replace(',', '.'), 2)
    },

    setTotalizers() {
        var totalPrice = 0
        var totalProducts = 1
        var totalEconomy = 0
        var idsForCartLink = []

        $('.bt-product').each((i, el) => {
            if (!$(el).hasClass('disabled')) {
                // Count total price
                const priceProduct = Methods.formatNumber($(el).find('.x-shelf-bt__best-price').html())
                totalPrice += priceProduct
                    // Count total economy
                if ($(el).find('.x-shelf-bt__old-price').html() != undefined) {
                    const oldPrice = Methods.formatNumber($(el).find('.x-shelf-bt__old-price').html())
                    totalEconomy = totalEconomy + (oldPrice - priceProduct)
                }
                // Count total produts
                totalProducts++
                // Set link
                const productId = $(el).attr('data-product-id')
                idsForCartLink.push({ id: productId, quantity: 1, seller: '1' })
            }
        })

        const priceMainProduct = Methods.formatNumber($('#buy-together-best-price').html())
        if ($('#buy-together-old-price').html() != undefined) {
            const oldPriceMainProduct = Methods.formatNumber($('#buy-together-old-price').html())
            totalEconomy = totalEconomy + (oldPriceMainProduct - priceMainProduct)
        }

        const mainProductId = dataLayer[0].productId
        idsForCartLink.push({ id: mainProductId, quantity: 1, seller: '1' })

        totalPrice += priceMainProduct

        $('#bt-qnt-products').html(totalProducts)
        $('#bt-total').html(parseFloat(totalPrice).toFixed(2).toString().replace('.', ','))

        if (totalEconomy <= 0 || isNaN(totalEconomy) || totalEconomy == undefined) {
            $('.product-advantage').hide()
        } else {
            $('.product-advantage').show()
            $('#bt-economy').html(totalEconomy.toFixed(2).toString().replace('.', ','))
        }

        $('.bt-buy-btn').click((e) => {
            ga('send', 'event', 'Buy Togheter - PDP', 'click');
            e.preventDefault()
            Sestini.vtexHelpers
                .addToCart(idsForCartLink)
                .then((orderForm) => true)
                .fail(err => window.console.log(err))
                .always(() => {
                    window.location.href = '/checkout/#/cart'
                });
        })
    }

};

export default {
    init: Methods.init,
};