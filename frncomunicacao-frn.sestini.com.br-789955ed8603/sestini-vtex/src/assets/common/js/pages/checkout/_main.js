import { method } from "lodash";
import { product } from "ramda";
import { methods } from "underscore";

const Methods = {
        init() {
            Methods.changeImageResolution();
            Methods.changeAddGiftText();
            setTimeout(() => {
                Methods.mainTitle();
                Methods.addFavicon();
                Methods.removeZoom();
                Methods.removeVirtusPay();
            }, 1000);
            Methods.changeTitle();
            Methods.onFinishOrder();
            Methods.handleUrlChange()
            Methods.setCurrentLayout()
           
        },
        removeVirtusPay() {
            const value = dataLayer[3].orderFormTotal.toString()
            const valueFormatted = `${value.slice(0, -2)}.${value.slice(-2)}`
            console.log(valueFormatted)
            if (parseFloat(valueFormatted) < 150) {
                setTimeout(() => {
                    $('#payment-group-VirtusPayPaymentGroup').css(`opacity`, 0.3)
                    $('#payment-group-VirtusPayPaymentGroup').attr("onclick", "").unbind("click");
                }, 1000);
            } else {
                $('#payment-group-VirtusPayPaymentGroup').click(Methods.setInstallmentsVirtusPay)
            }
        },
        getUserData(dataLayer) {
            for (let i = 0; i < dataLayer.length; i++) {
                if (dataLayer[i].visitorContactInfo) {
                    if (dataLayer[i].visitorContactInfo.length > 0) {
                        return dataLayer[i]
                    }
                }
            }
            return []
        },
        setInstallmentsVirtusPay() {
            setTimeout(() => {
                const value = dataLayer[dataLayer.length - 2].orderFormTotal
                const formattedValue = parseFloat(value.toString().slice(0, -2) + `.` + value.toString().slice(-2))
                const email = Methods.getUserData(dataLayer)[0]
                fetch(`https://sestinidocs.com.br/links/sestini/ecomm-api/get-installments-vp.php?email=${email}&value=${formattedValue}`)
                    .then(res => res.json())
                    .then(data => {
                        const template = `<select class='select-vp'></select>`
                        $(`.virtuspay-list`).after(template)
                        if (Object.keys(data.installments).length > 0) {
                            Object.keys(data.installments)
                                .map(installment => {
                                    $('.select-vp').append(`<option>${data.installments[installment]}</option>`)
                                })
                        } else {
                            $('.select-vp').remove()
                        }
                    })
            }, 2000);
        },
        removeZoom() {
            $("[name='viewport']").remove()
            $(`head`).append(`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>`)
        },
        addCheckbox() {
            $('#client-profile-data > div > div.accordion-body.collapse.in > div > div > form > div > p.newsletter').prepend(`
      <div id='termos-container'>
      <input type="checkbox" required id="termos" name="termos">
      <label>Declaro que li e aceito os <a href='https://www.sestini.com.br/institucional/termos-de-uso' target='_blank'>termos de uso</a> e <a href='https://www.sestini.com.br/institucional/privacidade-e-seguranca' target='_blank'>Privacidade</a> </label>`)
        },

        removeCheckBox() {
            $('#termos-container').remove()
        },

        removeLayoutAdds() {
            $('.also-bought').remove()
            $('.progress-bar').remove()
            $('.progress-bar-checkout').remove()
            $('.cart-title').remove()
            Methods.removeCheckBox()
        },

        findSkuForAlsoBought() {
            let returnValue = 0
            dataLayer.map(item => {
                if (item.ecommerce) {
                    const products = item.ecommerce.checkout.products
                    returnValue == 0 && (returnValue = products[products.length - 1].id)
                }
            })
            return returnValue
        },

        addAlsoBought() {
            const searchSkuId = Methods.findSkuForAlsoBought()
            fetch(`https://sestinidocs.com.br/links/sestini/ecomm-api/get-who-bought-also-bought.php?id=${searchSkuId}`)
                .then(res => res.json())
                .then(data => {
                        let items = ``
                        let counter = 0;
                        data.map((item) => {
                                    let skuId = item.items[0].itemId
                                    let productName = item.productName
                                    let image = item.items[0].images[0].imageUrl
                                    let { AvailableQuantity, ListPrice, Price } = item.items[0].sellers[0].commertialOffer
                                    if (counter < 5 && AvailableQuantity > 0) {
                                        items += `<div class='also-bought-items-item'>
                            <img src="${image}"/>
                            <p class='also-bought-items-item-title'>${productName}</p>
                            ${ListPrice > Price ? `<p class='also-bought-items-item-de'>De: R$ ${parseFloat(ListPrice, 2).toFixed(2).toString().replace('.', ',')}</p>` : ''}
                            <p class='also-bought-items-item-por'>Por: R$ ${parseFloat(Price, 2).toFixed(2).toString().replace('.', ',')}</p>
                            <a class='also-bought-items-item-buybtn' productId='${skuId}'>Adicionar ao Carrinho</a>
                        </div>`
                        counter++
                    }
                })
                $('.progress-bar').after(`<div class='also-bought'>
                    <h2 class='also-bought-title'>Aproveite e leve também!</h2>
                    <div class='also-bought-items'>
                        ${items}
                    </div>
                </div>`)
                $('.also-bought-items-item-buybtn').click((e) => {
                    e.preventDefault()
                    const skuId = $(e.target).attr('productId')
                    ga('send', 'event', 'Cross Selling - Checkout', 'click');
                    window.location.href = `https://www.sestini.com.br/checkout/cart/add?sc=1&sku=${skuId}&qty=1&seller=1`
                })
            })
    },

    setActiveProgressBarCheckout(active) {
        $('.progress-bar-item').each((index, elem) => $(elem).removeClass('active'))
        $('#cart-item').addClass('active')
        switch (active) {
            case 'profile':
                $('#profile-item').addClass('active')
                break;
            case 'payment':
                $('#profile-item').addClass('active')
                $('#payment-item').addClass('active')
                break;
            default:
                break;
        }
    },

    setCurrentLayout() {
        const currentPage = window.location.hash.replace('#/', '');
        switch (currentPage) {
            case 'cart':
                setTimeout(() => {
                    Methods.removeLayoutAdds()
                    Methods.addProgressbar()
                    Methods.changeLayoutCart()
                    window.innerWidth > 768 && Methods.addAlsoBought()
                }, 2500);
                break;
            case 'email':
                Methods.removeLayoutAdds()
                break;
            case 'profile':
                Methods.removeLayoutAdds()
                Methods.addProgressbarCheckout()
                Methods.setActiveProgressBarCheckout('profile')
                Methods.addCheckbox()
                break;
            case 'shipping':
                Methods.removeLayoutAdds()
                Methods.addProgressbarCheckout()
                Methods.setActiveProgressBarCheckout('profile')
                break;
            case 'payment':
                Methods.removeLayoutAdds()
                Methods.addProgressbarCheckout()
                Methods.setActiveProgressBarCheckout('payment')
                Methods.removeVirtusPay()
                Methods.setInstallmentsVirtusPay()
                $('#show-gift-card-group').html('+ vale-presente / vale-troca')
                break;
            default:
                break;
        }
    },

    handleUrlChange() {
        window.addEventListener('hashchange', () => {
            const currentPage = window.location.hash.replace('#/', '');
            switch (currentPage) {
                case 'cart':
                    setTimeout(() => {
                        Methods.removeLayoutAdds()
                        Methods.addProgressbar()
                        window.innerWidth > 768 && Methods.addAlsoBought()
                        Methods.changeLayoutCart()
                    }, 1500);
                    break;
                case 'email':
                    Methods.removeLayoutAdds()
                    break;
                case 'profile':
                    Methods.removeLayoutAdds()
                    Methods.addProgressbarCheckout()
                    Methods.setActiveProgressBarCheckout('profile')
                    Methods.addCheckbox()
                    break;
                case 'shipping':
                    Methods.removeLayoutAdds()
                    Methods.addProgressbarCheckout()
                    Methods.setActiveProgressBarCheckout('profile')
                    break;
                case 'payment':
                    Methods.removeLayoutAdds()
                    Methods.addProgressbarCheckout()
                    Methods.setActiveProgressBarCheckout('payment')
                    Methods.removeVirtusPay()
                    Methods.setInstallmentsVirtusPay()
                    $('#show-gift-card-group').html('+ vale-presente / vale-troca')
                    break;
                default:
                    break;
            }
        });
    },

    addProgressbarCheckout() {
        $('body > div.container.container-main.container-order-form > div.checkout-container.row-fluid.orderform-active > div.row-fluid.orderform-template.span12.active').prepend(`
      <div class='progress-bar-checkout'>
        <div id='cart-item' class='progress-bar-item'>
          <span>1</span>
          <p>Carrinho</p>
        </div>
        <div id='profile-item' class='progress-bar-item active'>
          <span>2</span>
          <p>Identificação</p>
        </div>
        <div id='payment-item' class='progress-bar-item'>
          <span>3</span>
          <p>Pagamento</p>
        </div>
        <div class='progress-bar-item'>
          <span>4</span>
          <p>Confirmação</p>
        </div>
      </div>
    `)
    },
    addProgressbar() {
        $('.cart-template').prepend(`
      <div class='progress-bar'>
        <div class='progress-bar-item active'>
          <span>1</span>
          <p>Carrinho</p>
        </div>
        <div class='progress-bar-item'>
          <span>2</span>
          <p>Identificação</p>
        </div>
        <div class='progress-bar-item'>
          <span>3</span>
          <p>Pagamento</p>
        </div>
        <div class='progress-bar-item'>
          <span>4</span>
          <p>Confirmação</p>
        </div>
      </div>
    `)
    },
    changeLayoutCart() {
        var buttons = $("body > div.container.container-main.container-cart > div.checkout-container.row-fluid.cart-active > div.cart-template.full-cart.span12.active > div.clearfix.pull-right.cart-links.cart-links-bottom.hide").html()
        $("body > div.container.container-main.container-cart > div.checkout-container.row-fluid.cart-active > div.cart-template.full-cart.span12.active > div.clearfix.pull-right.cart-links.cart-links-bottom.hide").remove()
        $('body > div.container.container-main.container-cart > div.checkout-container.row-fluid.cart-active > div.cart-template.full-cart.span12.active > div.summary-template-holder > div > div.span5.totalizers.summary-totalizers.cart-totalizers.pull-right').append(buttons)

        $('#shipping-preview-container > div > h2').html('Calcule o frete e o prazo de entrega')
        $('#shipping-calculate-link').click()

        // Change text buy btn
        $('#cart-to-orderform').html('Finalizar compra')

        // Add cart title
        $('#cartLoadedDiv > div.cart').prepend('<h2 class="cart-title">meu carrinho</h2>')
    },

    changeAddGiftText() {
        $(window).on('orderFormUpdated.vtex', () => {
            $('.add-service.btn').each((i, el) => {
                let $this = $(el);

                let name = $this.text();
                name = name.replace('Adicionar', '+');
                name = name.substr(0, name.indexOf(':'));

                $this.html(name);
            })

            $('.item-service').each((i, el) => {
                let $serviceName = $(el).find('.bundle-item-name span');
                let $servicePrice = $(el).find('.bundle-quantity-price span');

                let price = $servicePrice.text();

                let name = $serviceName.text();
                name = `&check; ${name}: ${price.replace('R$ ', 'R$')}`;

                $serviceName.html(name);
            })

            window.location.hash.replace('#/', '') == 'cart' ? Methods.addShippingBar() : $('.x-product__free-shipping').remove()
        })
    },

    getProductsValue() {
        const filteredDataLayer = dataLayer.filter(item => item.orderFormId)
        if (filteredDataLayer.length > 0) {
            let totalPrice = 0
            filteredDataLayer[filteredDataLayer.length - 1].ecommerce.checkout.products.map(product => {
                totalPrice += product.price * product.quantity
            })
            return parseFloat(totalPrice)
        } else {
            return 0
        }
    },

    addShippingBar() {
        $('.x-product__free-shipping').remove()
        setTimeout(() => {
            const cep = $('.srp-address-title').html()
            if (cep == undefined) return false
            // Add shipping bar
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => res.json())
                .then(data => {
                    $('.x-product__free-shipping').remove()
                    const price = Methods.getProductsValue()
                    const l = data.localidade
                    const uf = data.uf

                    if (l == 'Rio Branco' || l == 'Maceió' || l == 'Macapá' || l == 'Manaus' || l == 'Salvador' || l == 'Fortaleza' ||
                        l == 'Brasília' || l == 'Vitória' || l == 'Goiânia' || l == 'São Luís' || l == 'Cuiabá' || l == 'Campo Grande' ||
                        l == 'Belo Horizonte' || l == 'Belém' || l == 'João Pessoa' || l == 'Curitiba' || l == 'Recife' ||
                        l == 'Teresina' || l == 'Rio de Janeiro' || l == 'Natal' || l == 'Porto Alegre' || l == 'Porto Velho' ||
                        l == 'Boa Vista' || l == 'Florianópolis' || l == 'São Paulo' || l == 'Aracaju' || l == 'Palmas') {
                        var limit = 199.99
                    } else if (uf == 'PR' || uf == 'RS' || uf == 'SC' || uf == 'ES' || uf == 'MG' || uf == 'RJ' || uf == 'SP') {
                        if (limit != 199.99) var limit = 249.00
                    } else {
                        var limit = 369.00
                    }

                    var width = (price * 100) / limit
                    var message;

                    if (width >= 100) {
                        message = 'Você ganhou <span>frete grátis!</span>'
                        width = 100
                    } else {
                        const lackMoney = (limit - price).toFixed(2).replace('.', `,`)
                        message = `Faltam <span>R$${lackMoney}</span> para ganhar <span>frete grátis!</span>`
                    }

                    const template = `
                                <div class='x-product__free-shipping'>
                                  <p class='x-product__free-shipping-title'>${message}</p>
                                  <div class='x-product__free-shipping-bar'>
                                    <div class='x-product__free-shipping-bar-complete' style='width: ${width}%'></div>
                                  </div>
                                </div>`
                    $(`.srp-delivery-select-container`).after(template)

                    width == 100 && $('.x-product__free-shipping-bar').css('width', '94%')
                })
        }, 2000);
    },


    changeImageResolution() {
        $(window).on('load orderFormUpdated.vtex', () => {

            let changeResolution = function (index, el) {
                $(el).find('img').parent().addClass('is--hd');

                const imageUp = $(el)
                    .find("img")
                    .attr("src")
                    .replace("-55-55", "-105-125");

                $(el)
                    .find("img")
                    .attr("src", imageUp);
            }

            $('.body-cart .product-image a:not(.is--hd), .summary-cart-template-holder .cart .cart-items a:not(.is--hd)').delay().each(changeResolution);

        });
    },

    addFavicon() {
        var link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.href = 'https://sestini.vteximg.com.br/arquivos/favicon-sestini.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
    },

    mainTitle() {
        const currentPage = window.location.hash.replace('#/', '');

        switch (currentPage) {
            case 'shipping':
            case 'payment':
            case 'profile':
                document.title = 'Sestini - Finalizar pedido';
                break;
            case 'email':
                document.title = 'Sestini - Identificação';
                break;
            default:
                document.title = 'Sestini - Meu carrinho';
                break;
        }
    },

    changeTitle() {
        window.addEventListener('hashchange', Methods.mainTitle);
    },

    onFinishOrder() {
        $(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
            if (orderForm.orderGroup) {

                try {
                    let advcake_content = {
                        pageType: 6,
                        user: {
                            type: orderForm.userProfileId === null ? "new" : "old"
                        },
                        basketProducts: orderForm.items.map(item => {
                            let productCategories = Object.entries(item.productCategories);
                            return {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                quantity: item.quantity,
                                categoryId: productCategories[productCategories.length - 1][0],
                                categoryName: productCategories[productCategories.length - 1][1]
                            };
                        }),
                        orderInfo: {
                            id: orderForm.orderGroup,
                            totalPrice: orderForm.value,
                            coupon: orderForm.marketingData.coupon || ''
                        }
                    };

                    window.advcake_data = window.advcake_data || [];
                    window.advcake_data.push(advcake_content);

                } catch (error) {
                    console.error(error)
                }

            }
        });

    },

    updateAddServiceText() {
        $(window).on('orderFormUpdated.vtex', () => {
            let text = $(
                ".product-item .add-service-container .add-service.btn"
            ).text().replace('Adicionar', '+');

            $(".product-item .add-service-container .add-service.btn").text(text);
        });
    },
};

export default {
    init: Methods.init,
};
