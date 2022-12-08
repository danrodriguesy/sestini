import CacheSelector from '../general/__cache-selectors';
import { getFirstAvailableSku, getProductPriceInfo } from '../../../../common/js/utils/vtex-helpers';

import Controller from './controller';
import Data from './data';

const { quickView } = CacheSelector;

const Methods = {
    init() {
        Methods.showQuickView();
        Methods.bindData();
        Methods.closeQuickview();
        Methods._handleImages();
        // Methods.getRelatedProducts();
    },

    bindAddCartFbEvent(value, productId) {
        $('.js--add-to-cart').click(() => {
            fbq('track', 'AddToCart', { currency: "BRL", value: value, content_type: 'product', content_ids: [productId] });
        })
    },

    selectFirstProduct() {
        const firstSku = document.querySelector('.x-quick-view__select-color');
        Sestini.simulateClick(firstSku);
    },

    showQuickView() {
        document.addEventListener('openQuickview', (ev) => {
            document.body.classList.add('has--loader');

            Sestini.vtexCatalog.searchProduct(ev.detail.productId).then((product) => {
                    Data.productResponse = product;
                    const firstSkuAvailable = getFirstAvailableSku(product.items);
                    const {
                        available,
                        availableQuantity,
                        bestPrice,
                        listPrice,
                        installmentsValue,
                        installments,
                    } = getProductPriceInfo(firstSkuAvailable);

                    if (product.items.length === 1) {
                        Data.skuId = product.items[0].itemId;
                        Data.skuName = product.items[0].skuname;
                    }

                    const itemsFormatted = product.items.map(el => ({
                        ...el,
                        thumbImage: el.images[0].imageUrl,
                    }));

                    Data.items = itemsFormatted;
                    Data.brand = product.brand;
                    Data.name = firstSkuAvailable.nameComplete;
                    Data.productReference = product.productReference;
                    Data.mainImgs = firstSkuAvailable.images;
                    Data.navImgs = firstSkuAvailable.images;

                    Data.imageDescription = firstSkuAvailable.images[0].imageUrl;
                    Data.productId = product.productId;
                    Data.ean = firstSkuAvailable.ean;
                    Data.shortDesc = firstSkuAvailable.complementName;

                    // Information about the product
                    Data.selfDescription = product.description;
                    Data.featuresDescription = product.Diferenciais;
                    Data.dimensionsDescription = product.Dimensões;
                    Data.height = product['Altura (cm)'] + 'cm';
                    Data.width = product['Largura(cm)'] + 'cm';
                    Data.depth = product['Profundidade (cm)'] + 'cm';
                    Data.weight = product['Peso (kg)'] + 'kg';
                    Data.ocasion = product.Ocasião;
                    Data.compartiments = product.Compartimentos;
                    Data.strap = product.Alça;
                    // ProductRvData.capacity = product.Capacidade+Total;
                    // ProductRvData.expandable = product.
                    Data.size = product.Tamanho;
                    Data.color = product.items[0].Cor[0];


                    Data.specs = [];

                    Data.specs = product.Diferenciais ?
                        product.Diferenciais
                        // .filter(x => !specsBlackList.includes('icon-'+Sestini.globalHelpers.slugifyText( x )) )
                        .map(spec => ({
                            name: spec,
                            imageUrl: `/arquivos/icon-${Sestini.globalHelpers.slugifyText(
                spec
              )}.png`
                        })) : [];

                    if (Data.specs.length > 0) {
                        Data.hasSpecs = true;
                    }

                    product.categoriesIds[0].split('/').map((category) => {
                        if (!category == '') {
                            Sestini.vtexHelpers.getCategories(parseInt(category)).then((res) => {
                                Data.categories.push({
                                    link: Sestini.globalHelpers.stripHost(res.url),
                                    name: res.name,
                                });
                            });
                        }
                    });

                    // Price Info
                    Data.skuQty = availableQuantity;
                    Data.listPrice = listPrice * 100;
                    Data.bestPrice = bestPrice * 100;
                    Data.available = available;
                    Data.installments = installments * 1;
                    Data.installmentsValue = installmentsValue * 100;
                    Data.skuNotAvailable = false;
                    Methods.bindAddCartFbEvent(bestPrice, ev.detail.productId)

                    quickView.mainContainer.classList.add('is--active');
                    document.body.classList.remove('has--loader');
                })
                .done((product) => {
                    Methods._requestDoneEvent(product);
                    Methods.selectFirstProduct();
                    Sestini.disableScroll();
                    Methods._handleImages();
                })
                .fail(err => Methods._requestFailEvent(err))
                .always(() => {
                    Methods._requestEndEvent();
                    Data.isLoading = false;
                });
        });
    },

    _handleImages() {

        let navImgs = Data.navImgs.map(el => {
            return `
      <div class="x-quick-view__img-nav-content">
        <img class="x-quick-view__img-nav-item" src="${el.imageUrl}" title="${Data.name}" alt="${Data.name}"/>
      </div>
      `;
        }).join('');

        let mainImgs = Data.mainImgs.map(el => {
            return `
      <div class="x-quick-view__img-main-content js--product-img-main-content">
        <img class="x-quick-view__img-main-item" src="${el.imageUrl}" title="${Data.name}" alt="${Data.name}"/>
      </div>
      `
        }).join('');

        $('.js--quick-view-img-nav').html(navImgs);
        $('.js--quick-view-img-main').html(mainImgs);
    },

    closeQuickview() {

        function resetSlick() {
            setTimeout(function() {
                $('.js--quick-view-img-nav').slick('destroy');
                $('.js--quick-view-img-main').slick('destroy');
            }, 400);
        }


        quickView.closeButton.addEventListener('click', (ev) => {
            ev.preventDefault()
            quickView.mainContainer.classList.remove('is--active')
            Sestini.enableScroll()
            resetSlick()
            Controller.formatPostalCode()
        });

        quickView.mainContainer.addEventListener('click', (ev) => {
            if (ev.currentTarget === ev.target) {
                ev.preventDefault()
                quickView.mainContainer.classList.remove('is--active')
                Sestini.enableScroll()
                resetSlick()
                Controller.formatPostalCode()
            }
        });
    },

    bindData() {
        rivets.bind(quickView.mainContainer, {
            controller: Controller,
            product: Data,
        });

        rivets.formatters.split = val => `${val.split('úteis')[0]}úteis`;
        rivets.formatters.firstItem = (item) => [item[0]];
        rivets.formatters.stripHost = (item) => Sestini.globalHelpers.stripHost(item);
        rivets.formatters.propertyList = (obj) => {
            return (() => {
                const properties = [];
                for (const key in obj) {
                    properties.push({ key: key, value: obj[key] });
                }
                return properties;
            })();
        };

    },

    getRelatedProducts() {
        const ids = [...document.querySelectorAll('.js--shelf-color-product-id')].map(item => item.value);

        searchProductArray(ids).then((products) => {
            const sizes = Sestini.globalHelpers.groupObjectByValue(products, 'Tamanho');
            const currentSize = sizes[ProductRvData.size[0]];

            ProductRvData.sizes = sizes;
            ProductRvData.currentSize = currentSize && currentSize.map((product) => {
                const sku = product.items[0];

                return {
                    link: Sestini.globalHelpers.stripHost(product.link),
                    image: sku.images[0].imageUrl
                };
            });
        });
    },

    /* eslint-disable */
    _formatText(str) {
        const breakLines = Sestini.vtexHelpers
            .replaceBreakLines(str)
            .split('<br />');
        const newLines = breakLines.map(item => Sestini.globalHelpers.normalizeText(item));

        return newLines.join('<br />');
    },

    // Custom Events
    _requestDoneEvent(res) {
        /* eslint-disable */
        const ev = $.Event("product.requestDone");
        /* eslint-enable */

        setTimeout(() => {
            $(document).trigger(ev, [res]);
        }, 0);
    },

    /* eslint-disable */
    _requestFailEvent(err) {
        /* eslint-disable */
        const ev = $.Event("product.requestFail");
        /* eslint-enable */

        setTimeout(() => {
            $(document).trigger(ev, [err]);
        }, 0);
    },

    /* eslint-disable */
    _requestEndEvent() {
        /* eslint-disable */
        const ev = $.Event("product.requestEnd");
        /* eslint-enable */

        setTimeout(() => {
            $(document).trigger(ev);
        }, 0);
    },
};

export default {
    init: Methods.init,
};
