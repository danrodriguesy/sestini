import CacheSelectors from '../../general/__cache-selectors';
import { objectSearch } from '../../../../../common/js/utils/helpers';
import { getProductPriceInfo } from '../../../../../common/js/utils/vtex-helpers';

const { quickView } = CacheSelectors;

const dispatchEvent = (name) => {
    /* eslint-disable */
    const ev = $.Event(name);
    /* eslint-enable */

    setTimeout(() => {
        $(document).trigger(ev);
    }, 0);
};

export default {
    selectSku(e, model) {
        if (Sestini.globalHelpers.isUndefined(model.color)) {
            return false;
        }

        model.product.isLoading = true;
        dispatchEvent('product.skuSelectedStart');

        const { items } = model.product.productResponse;

        const selectedItem = objectSearch(items, {
            itemId: model.color.itemId,
        });

        const {
            available,
            availableQuantity,
            bestPrice,
            listPrice,
            installmentsValue,
            installments,
        } = getProductPriceInfo(selectedItem);

        const { images } = selectedItem;

        model.product.isUnavailable = available;
        model.product.skuNotAvailable = !available;
        model.product.name = selectedItem.nameComplete;
        model.product.listPrice = available ? listPrice * 100 : 0;
        model.product.bestPrice = available ? bestPrice * 100 : 0;
        model.product.skuId = selectedItem.itemId;
        model.product.skuQty = availableQuantity;
        model.product.installments = installments;
        model.product.installmentsValue = installmentsValue * 100;

        model.product.mainImgs = images;
        model.product.navImgs = images;

        model.product.buyBtn = available ? 'comprar' : 'indisponível';

        // Notify Me Sku Selected
        $('.js--notifyme-input-skuId').attr('data-sku', model.color.sku);

        // Validate Quantity texts
        if (model.product.skuQty >= 15) {
            model.product.skuQtyText = null;
        } else {
            model.product.skuQtyText = _private.validateQtyText(
                model.product.skuQty
            );
        }
        // ===========================================

        dispatchEvent('product.skuSelectedFinish');
        model.product.isLoading = false;

        if (model.product.qty > model.product.skuQty) {
            if (model.product.skuQty === 0) {
                model.product.qty = 1;

                return false;
            }

            model.product.qty = model.product.skuQty;
        }
    },

    calculateShipping(ev, model) {
        ev.preventDefault();
        document.body.classList.add('has--loader');
        Sestini.vtexCatalog.vtexHelpers
            .getShipping(model.product.postalCode, model.product.skuId)
            .then((res) => {
                if (!res.error) {
                    model.product.isShippingCalculated = true;
                    model.product.shippingResult = res.formattedResponse.map(item => ({
                        ...item,
                        shippingText: item.shippingText.replace(/(\sp.*\d$)/gi, ''),
                    }));
                    // Add shipping bar
                    fetch(`https://viacep.com.br/ws/${model.product.postalCode}/json/`)
                        .then(res => res.json())
                        .then(data => {
                            $('.x-product__free-shipping').remove()
                            const price = model.product.bestPrice.toString().slice(0, -2) + '.' + model.product.bestPrice.toString().slice(-2)
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
                            $(`.x-quick-view__shipping-wrapper`).after(template)
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
        const cleanNumber = ev.target.value.replace(/\D/gi, '');
        model.product.postalCode = cleanNumber;
        model.product.isShippingCalculated = false;

        if (cleanNumber >= 8) {
            ev.target.value = cleanNumber.replace(/(\d{5})(\d{3})/gi, '$1-$2');
        } else {
            ev.target.value = cleanNumber;
        }
    },

    enableNotifyMe(ev, model) {
        ev.preventDefault();
        model.product.notifyMeActive = !model.product.notifyMeActive;
    },

    removeItem(e, model) {
        if (model.product.qty > 1) {
            model.product.qty -= 1;
        }
    },

    sendNotifyMe(ev, model) {
        ev.preventDefault();
        document.body.classList.add('has--loader');

        const notifyMeData = {
            name: ev.currentTarget.querySelector('.js--notifyme-input-name').value,
            email: ev.currentTarget.querySelector('.js--notifyme-input-email').value,
            skuId: +ev.currentTarget.querySelector('.js--notifyme-input-skuId')
                .dataset.sku,
        };

        Sestini.vtexUtils.vtexHelpers
            .notifyMe(notifyMeData.name, notifyMeData.email, notifyMeData.skuId)
            .then(console.log)
            .fail((res) => {
                console.log('Erro ao se cadastrar', res);
            })
            .always(() => {
                model.product.notifyMeActive = false;
                document.body.classList.remove('has--loader');
            });
    },

    addItem(e, model) {
        if (model.product.qty >= model.product.skuQty) {
            // window.console.log('MAX QTY ITEMS');
            return false;
        }

        model.product.qty += 1;
    },

    updateQtyValue(ev, model) {
        model.product.qty = +ev.currentTarget.value;
    },

    addToCart(e, model) {
        if (!model.product.skuId) {
            if (!isMobile.any) {
                alert('Selecione o modelo');
            } else {
                $('.x-product__sizes').addClass('is--active');
                $('.js--add-to-cart').fadeOut();
            }
            return false;
        }

        const buyBtnText = model.product.buyBtn;
        const items = [{
            id: model.product.skuId,
            seller: 1,
            quantity: model.product.qty,
        }, ];

        model.product.buyBtn = 'Aguarde...';

        Sestini.closeMenus(true);
        Sestini.vtexHelpers
            .addToCart(items)
            .then((orderForm) => {
                quickView.mainContainer.classList.remove('is--active');
                Sestini.minicart
                    .vtexMinicart('fillCart')
                    .add(Sestini.overlay)
                    .addClass('is--active');
                Sestini.disableScroll();
            })
            .fail(err => window.console.log(err))
            .always(() => (model.product.buyBtn = buyBtnText));
    },
};

const _private = {
    _validateQtyText(qty) {
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