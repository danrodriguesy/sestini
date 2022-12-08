import { methods } from "underscore";

const dispatchEvent = (name) => {
    /* eslint-disable */
    const ev = $.Event(name);
    /* eslint-enable */

    setTimeout(() => {
        $(document).trigger(ev);
    }, 0);
};

const pvt = {
    validateQtyText(qty) {
        let qtyText;

        if (qty > 1) {
            qtyText = `Apenas mais ${qty} unidades disponíveis`;
        }

        if (qty === 1) {
            qtyText = 'Apenas 1 unidade em estoque';
        }

        if (qty === 0) {
            qtyText = 'Produto indisponível';
        }

        return qtyText;
    },
};

export default {
    selectSku(e, model) {
        if (Sestini.globalHelpers.isUndefined(model.color)) {
            return false;
        }

        const { color, product } = model;
        if (color.link) {
            document.body.classList.add('has--loader');
            window.location.href = color.link;
        } else {
            product.isLoading = true;
            dispatchEvent('product.skuSelectedStart');
            Sestini.vtexCatalog.searchProduct(product.skuId).then((_product) => {
                const { items } = product.productResponse;
                const { images } = Sestini.globalHelpers.objectSearch(items, {
                    itemId: color.sku.toString(),
                });


                product.isUnavailable = color.available;
                product.skuNotAvailable = !color.available;
                product.name = color.skuname;
                product.listPrice = color.available ? color.listPrice : 0;
                product.bestPrice = color.available ? color.bestPrice : 0;
                product.skuId = color.sku;
                product.skuQty = color.availablequantity;
                product.installments = color.installments;
                product.installmentsValue = color.installmentsValue;
                product.productReference = _product && _product.items[0].referenceId[0].Value;

                product.mainImgs = images;
                product.navImgs = images;

                product.buyBtn = color.available ? 'comprar' : 'indisponível';

                // Notify Me Sku Selected
                $('.js--notifyme-input-skuId').attr('data-sku', color.sku);

                // Validate Quantity texts
                if (_product && _product.items[0].sellers[0].commertialOffer.AvailableQuantity >= 15) {
                    product.skuQtyText = null;
                } else if (_product) {
                    product.skuQtyText = pvt.validateQtyText(
                        _product.items[0].sellers[0].commertialOffer.AvailableQuantity
                    );
                }
                // ===========================================

                dispatchEvent('product.skuSelectedFinish');
                product.isLoading = false;

                if (product.qty > product.skuQty) {
                    if (product.skuQty === 0) {
                        product.qty = 1;

                        return false;
                    }

                    product.qty = product.skuQty;
                }
            }).done(() => {
                return true;
            })


        }
    },

    calculateShipping(ev, model) {
        ev.preventDefault();
        document.body.classList.add('has--loader');
        Sestini.vtexCatalog.vtexHelpers
            .getShipping(model.product.postalCode)
            .then((res) => {
                if (!res.error) {
                    const { product } = model;
                    product.isShippingCalculated = true;
                    product.shippingResult = res.formattedResponse.map(item => ({
                        ...item,
                        shippingText: item.shippingText.replace(/(\sp.*\d$)/gi, ''),
                    }));
                    product.shippingCalculatedError = false;
                    // Add shipping bar
                    fetch(`https://viacep.com.br/ws/${model.product.postalCode}/json/`)
                        .then(res => res.json())
                        .then(data => {
                            $('.x-product__free-shipping').remove()
                            const price = product.productResponse.items[0].sellers[0].commertialOffer.Price
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
                                <div class='x-product__free-shipping-bar-complete' style='width: ${width}%'>
                                </div>
                              </div>
                            </div>`
                            $(`.x-product__shipping-wrapper`).after(template)

                            width == 100 && $('.x-product__free-shipping-bar').css('width', '94%')
                        })
                } else {
                    model.product.shippingCalculatedError = true;
                    $('.x-product__free-shipping').remove()
                }
            })
            .always(() => document.body.classList.remove('has--loader'));
    },
    formatPostalCode(ev, model) {
        $('.x-product__free-shipping').remove()
        const { product } = model;
        const { target } = ev;
        const cleanNumber = ev.target.value.replace(/\D/gi, '');
        product.postalCode = cleanNumber;
        product.isShippingCalculated = false;

        if (cleanNumber >= 8) {
            target.value = cleanNumber.replace(/(\d{5})(\d{3})/gi, '$1-$2');
        } else {
            target.value = cleanNumber;
        }
    },

    enableNotifyMe(ev, model) {
        ev.preventDefault();
        const { product } = model;
        product.notifyMeActive = !model.product.notifyMeActive;
    },

    removeItem(e, model) {
        const { product } = model;
        if (product.qty > 1) {
            product.qty -= 1;
        }
    },

    sendNotifyMe(ev, model) {
        ev.preventDefault();
        const { product } = model;
        document.body.classList.add('has--loader');

        const notifyMeData = {
            name: ev.currentTarget.querySelector('.js--notifyme-input-name').value,
            email: ev.currentTarget.querySelector('.js--notifyme-input-email').value,
            skuId: +ev.currentTarget.querySelector('.js--notifyme-input-skuId')
                .dataset.sku,
        };

        Sestini.vtexUtils.vtexHelpers
            .notifyMe(notifyMeData.name, notifyMeData.email, notifyMeData.skuId)
            .then(function(...response) {
                product.notifyMeSent = true;
            })
            .fail((res) => {
                console.log('Erro ao se cadastrar', res);
            })
            .always(() => {
                document.body.classList.remove('has--loader');
            });
    },

    addItem(e, model) {
        const { product } = model;
        if (product.qty >= product.skuQty) {
            // window.console.log('MAX QTY ITEMS');
            return false;
        }

        product.qty += 1;

        return true;
    },

    updateQtyValue(ev, model) {
        const { product } = model;
        product.qty = +ev.currentTarget.value;
    },

    addToCart(e, model) {
        const { product } = model;
        if (!product.skuId) {
            if (!isMobile.any) {
                alert('Selecione o modelo');
            } else {
                $('.x-product__sizes').addClass('is--active');
                $('.js--add-to-cart').fadeOut();
            }
            return false;
        }

        const buyBtnText = product.buyBtn;
        const items = [{
            id: product.skuId,
            seller: 1,
            quantity: product.qty,
        }, ];

        product.buyBtn = 'Aguarde...';

        Sestini.closeMenus(true);
        return Sestini.vtexHelpers
            .addToCart(items)
            .then(() => {
                Sestini.minicart
                    .vtexMinicart('fillCart')
                    .add(Sestini.overlay)
                    .addClass('is--active');
                Sestini.disableScroll();
            })
            .fail(err => window.console.log(err))
            .always(() => {
                product.buyBtn = buyBtnText;
                return true;
            });
    },

    addToCartBuyTogether(e, model) {
        const { product } = model;
        document.body.classList.add('has--loader');

        const items = product.buyTogether.products.map(productItem => ({
            id: productItem.skuId,
            seller: 1,
            quantity: 1,
        }));

        Sestini.closeMenus(true);
        return Sestini.vtexHelpers
            .addToCart(items)
            .then(() => {
                Sestini.minicart
                    .vtexMinicart('fillCart')
                    .add(Sestini.overlay)
                    .addClass('is--active');
                Sestini.disableScroll();
            })
            .fail(err => window.console.log(err))
            .always(() => {
                document.body.classList.remove('has--loader');
                return true;
            });
    },
};
