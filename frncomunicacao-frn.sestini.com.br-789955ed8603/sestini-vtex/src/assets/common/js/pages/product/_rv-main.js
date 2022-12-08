import CacheSelectors from "./__cache-selectors";
import ProductRvData from "./_rv-data";
import ProductRvController from "./_rv-controller";
import { searchProductArray } from '../../utils/vtex-api-catalog';

const El = CacheSelectors.product;
const Methods = {
    init() {
        Methods.getData();
        Methods.bindData();
    },

    selectFirstProduct() {
        const firstSku = document.querySelector(El.colorSelector);
        Sestini.simulateClick(firstSku);
    },

    getData() {
        skuJson.isCamelized = true;

        Sestini.vtexCatalog
            .searchProduct(skuJson.productId)
            .then(product => {
                ProductRvData.productResponse = product;

                if (product.items.length == 1) {
                    ProductRvData.skuId = product.items[0].itemId;
                    ProductRvData.skuName = product.items[0].skuname;
                    $(El.sizeSelect).text(product.items[0].skuname);
                }

                ProductRvData.brand = product.brand;
                ProductRvData.productReference = product.productReference;
                ProductRvData.mainImgs = product.items[0].images;
                ProductRvData.navImgs = product.items[0].images;
                ProductRvData.imageDescription = product.items[0].images[0].imageUrl;
                ProductRvData.productId = product.productId;
                ProductRvData.ean = product.items[0].ean;
                ProductRvData.shortDesc = product.items[0].complementName;
                ProductRvData.size = product.Tamanho;
                ProductRvData.categoryId = vtxctx.categoryId;
                // Information about the product
                ProductRvData.selfDescription = product.description;
                ProductRvData.featuresDescription = product.Diferenciais;
                ProductRvData.dimensionsDescription = product.Dimensões;
                ProductRvData.height = product['Altura (cm)'] + 'cm';
                ProductRvData.width = product['Largura(cm)'] + 'cm';
                ProductRvData.depth = product['Profundidade (cm)'] + 'cm';
                ProductRvData.weight = product['Peso (kg)'] + 'kg';
                product['Capacidade Total (L)'] != undefined ? ProductRvData.totalcap = product['Capacidade Total (L)'] + 'L' : El.capacidadeTotal.remove()
                product['Capacidade Expansível (L)'] != undefined ? ProductRvData.totalexp = product['Capacidade Expansível (L)'] + 'L' : El.capacidadeExpansivel.remove()
                product['Expansível (cm)'] != undefined ? ProductRvData.exp = product['Expansível (cm)'] + 'cm' : El.expansivel.remove()

                const prdMaterial = product['Material']
                if (prdMaterial != undefined) {
                    var materialString = '';
                    prdMaterial.map((material, i) => {
                        materialString += material
                        if (i + 1 != product['Material'].length) materialString += ', '
                    })
                    ProductRvData.material = materialString
                } else {
                    El.material.remove()
                }

                const availableQty = product.items[0].sellers[0].commertialOffer.AvailableQuantity
                availableQty > 15 ?
                    $('#stock-value').remove() :
                    $('#stock-value').html(`Compre agora! Restam apenas <span style='color: #ff0000'>${availableQty} unidades</span>`)


                ProductRvData.ocasion = product.Ocasião;
                ProductRvData.compartiments = product.Compartimentos;
                ProductRvData.strap = product.Alça;
                ProductRvData.size = product.Tamanho;
                ProductRvData.color = product.skuSpecifications && product.skuSpecifications[0] && product.skuSpecifications[0].values && product.skuSpecifications[0].values[0].name || product.Cor;

                // Specifications
                fetch('https://sestinidocs.com.br/links/sestini/ecomm-api/get-differentials.php')
                    .then(res => res.json())
                    .then(data => {
                        var finalDifferentials = []
                        if (product.Diferenciais) {
                            product.Diferenciais.map(spec => {
                                var filter = data.filter(e => e.description.toLowerCase() == spec.toLowerCase())[0]
                                filter != undefined && finalDifferentials.push(filter)
                            })
                            ProductRvData.specs = finalDifferentials.map(differential => ({
                                name: `<h2>${differential.description}</h2><p>${differential.name}</p>`,
                                imageUrl: `/arquivos/icon-${Sestini.globalHelpers.slugifyText(differential.description)}.png`
                            }))
                        }

                        if (ProductRvData.specs.length > 0) {
                            ProductRvData.hasSpecs = true;
                        }
                    })

                product.categoriesIds[0]
                    .split("/")
                    .filter(category => !!category)
                    .map(category => {
                        Sestini.vtexHelpers.getCategories(+category).then(res => {
                            ProductRvData.categories.push({
                                link: Sestini.globalHelpers.stripHost(res.url),
                                name: res.name
                            });
                        });
                    });
            })
            .done(product => {
                Methods.requestDoneEvent(product);
                Methods.selectFirstProduct();
                Methods.getRelatedIds(ProductRvData.skuId);
            })
            .fail(err => Methods.requestFailEvent(err))
            .always(() => {
                Methods.requestEndEvent();
                ProductRvData.isLoading = false;
            });
    },

    bindData() {
        rivets.formatters.length = val => !(val.length > 0);
        rivets.formatters.split = val => `${val.split("úteis")[0]}úteis`;
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

        window.appSestini = rivets.bind(El.self, {
            controller: ProductRvController,
            product: ProductRvData
        });
    },

    getRelatedIds(skuId) {
        var urlFetch = `http://sestinidocs.com.br/links/sestini/ecomm-api/similar-products.php?skuId=${skuId}`
        fetch(urlFetch)
            .then(res => res.json())
            .then(data => {
                var ids = []
                data.map(item => ids.push(item.productId))
                Methods.getRelatedProducts(ids)
            })
    },

    getRelatedProducts(ids) {
        const currentProductName = $('.x-product__name').html()
        const currentProductNameArray = currentProductName.split(' ')
        const currentProductColor = currentProductNameArray[currentProductNameArray.length - 1]
        const currentProductSize = currentProductNameArray[1]
        const isUnavailable = $('.x-product__notifyme').css('display') == 'flex'
        const currentSizeTemplate = `
      <div class="x-product__select-sizes active ${isUnavailable && 'is--unavailable'}">
        <a title="${currentProductSize}">${currentProductSize}</a>
      </div>
    `

        if (!ids.length) {
            $('.x-product__sizes-content').prepend(currentSizeTemplate)
            return false
        }

        searchProductArray(ids).then((products) => {
            // --------------- SIZES --------------- //
            const sizes = Sestini.globalHelpers.groupObjectByValue(products, 'Tamanho');

            const bordo = sizes.Bordo != undefined ? sizes.Bordo.filter(item => {
                const productNameArray = item.productName.split(' ')
                const productColor = productNameArray[productNameArray.length - 1]
                if (productColor == currentProductColor) return true
            }) : []

            const pequeno = sizes.Pequeno != undefined ? sizes.Pequeno.filter(item => {
                const productNameArray = item.productName.split(' ')
                const productColor = productNameArray[productNameArray.length - 1]
                if (productColor == currentProductColor) return true
            }) : []

            const medio = sizes.Médio != undefined ? sizes.Médio.filter(item => {
                const productNameArray = item.productName.split(' ')
                const productColor = productNameArray[productNameArray.length - 1]
                if (productColor == currentProductColor) return true
            }) : []

            const grande = sizes.Grande != undefined ? sizes.Grande.filter(item => {
                const productNameArray = item.productName.split(' ')
                const productColor = productNameArray[productNameArray.length - 1]
                if (productColor == currentProductColor) return true
            }) : []

            const finalSizes = {}
            if (bordo.length > 0) { finalSizes["Bordo"] = bordo; var hasBordo = true }
            if (pequeno.length > 0) { finalSizes["Pequeno"] = pequeno; var hasPequeno = true }
            if (medio.length > 0) { finalSizes["Médio"] = medio; var hasMedio = true }
            if (grande.length > 0) { finalSizes["Grande"] = grande; }

            ProductRvData.sizes = finalSizes
            setTimeout(() => {
                switch (currentProductSize.toLowerCase()) {
                    case 'bordo':
                        $('.x-product__sizes-content').prepend(currentSizeTemplate)
                        break;
                    case 'pequena':
                        hasBordo ?
                            $('.x-product__sizes-content > div:nth-child(1)').after(currentSizeTemplate) :
                            $('.x-product__sizes-content').prepend(currentSizeTemplate)
                        break;
                    case 'média':
                        if (hasBordo && hasPequeno) {
                            $('.x-product__sizes-content > div:nth-child(2)').after(currentSizeTemplate)
                            hasMedio && $('.x-product__sizes-content > div:nth-child(4)').remove()
                        } else {
                            if (hasBordo || hasPequeno) {
                                $('.x-product__sizes-content > div:nth-child(1)').after(currentSizeTemplate)
                                hasMedio && $('.x-product__sizes-content > div:nth-child(3)').remove()
                            } else {
                                $('.x-product__sizes-content').prepend(currentSizeTemplate)
                                hasMedio && $('.x-product__sizes-content > div:nth-child(2)').remove()
                            }
                        }
                        break;
                    case 'grande':
                        $('.x-product__sizes-content').append(currentSizeTemplate)
                        break;
                    default:
                        break;
                }
            }, 1000);

            Object.keys(finalSizes).forEach(key => {
                const availableQuantity = finalSizes[key][0].items[0].sellers[0].commertialOffer.AvailableQuantity
                $('.x-product__select-sizes').each((i, el) => {
                    if ($(el).find('a').html() == key) {
                        availableQuantity == 0 && $(el).addClass('is--unavailable')
                    }
                })
            })


            const dataUrl = window.dataLayer[0].pageUrl;
            const dataProd = window.dataLayer[0].productName;
            const dataId = window.dataLayer[0].productId;
            const referenceId = window.dataLayer[0].productReferenceId;
            const CategoryNameProduct = window.dataLayer[0].productCategoryName
            const categoryName = window.dataLayer[0].productDepartmentName

            console.log(referenceId)

            let tamanhos = [];

            if (sizes.Grande != undefined ){

            sizes.Grande.map(item =>{
              if(item.productReference == referenceId)
              tamanhos.push(item)
            })
            }

            if (sizes.Médio != undefined ){
            sizes.Médio.map(item =>{
              if(item.productReference == referenceId )
              tamanhos.push(item)
            })
            }

            if (sizes.Pequeno != undefined ){
            sizes.Pequeno.map(item =>{
              if(item.productReference == referenceId )
              tamanhos.push(item)
            })
          }
          
            if(sizes.Bordo != undefined){
            sizes.Bordo.map(item =>{
              if(item.productReference == referenceId )
              tamanhos.push(item)
            })
          }

            console.log(tamanhos)

            

            // --------------- COLORS --------------- //
            const colors = Sestini.globalHelpers.groupObjectByValue(products, 'Cor');
            var lastLink = ''
            var i = 0

            if(tamanhos[0].Ocasião == "Viagem" ){
                
                tamanhos.forEach(key => {
                const item = tamanhos[i]
                const itemLink = item.link
                const itemColor = item.items[0].Cor ? item.items[0].Cor : '' 
                const itemName = item.productName
                const itemImage = item.items[0].images[0].imageUrl
                const itemAvailableQuantity = item.items[0].sellers[0].commertialOffer.AvailableQuantity > 0 ? '' : 'is--unavailable'
                i++;
                if (lastLink != itemLink) {
                    $($('.js--product-color-container')[1]).append(`
                        <div class="x-product__select-color ${itemAvailableQuantity}">
                            <a title="${itemColor}" href="${itemLink}">
                            <img src="${itemImage}" alt="${itemName}">
                            </a>
                        </div>`)
                    lastLink = itemLink
                }
            })
        }
        else{
                Object.keys(colors).forEach(key => {
                const item = colors[key][0]
                const itemLink = item.link
                const itemColor = item.items[0].Cor ? item.items[0].Cor : '' 
                const itemName = item.productName
                const itemImage = item.items[0].images[0].imageUrl
                const itemAvailableQuantity = item.items[0].sellers[0].commertialOffer.AvailableQuantity > 0 ? '' : 'is--unavailable'
                i++;
                if (lastLink != itemLink) {
                    $($('.js--product-color-container')[1]).append(`
                        <div class="x-product__select-color ${itemAvailableQuantity}">
                            <a title="${itemColor}" href="${itemLink}">
                            <img src="${itemImage}" alt="${itemName}">
                            </a>
                        </div>`)
                    lastLink = itemLink
                }
            })
        }

            window.innerWidth >= 768 && Methods.bindHoverImages()

            $(".x-product__right > section > div.x-product__colors-wrapper > div:nth-child(1) > div > div").remove()
            $('.x-product__colors-content').find('.x-product__select-color').each((i, el) => {
                if ($(el).attr('data-sku') == ProductRvData.skuId) {
                    $(el).addClass('is--active')
                    $('.x-product__notifyme').css('display') == 'flex' && $(el).addClass('is--unavailable-main')
                }
            })
        });
    },

    bindHoverImages() {
        $(El.colorSelector).hover((e) => {
            const $this = $(e.currentTarget)
            const isAvailable = !$($this).hasClass('is--available')
            const previewUrl = $this.find('img').attr('src')
            const template = `<img class='x-product__img-main-item previewImage' src='${previewUrl}'/>`
            isAvailable && $(El.imgMain).append(template)
        }, () => $('.previewImage').remove())
    },

    // Custom Events
    requestDoneEvent(res) {
        const ev = $.Event("product.requestDone");
        setTimeout(() => $(document).trigger(ev, [res]), 0);
    },

    requestFailEvent(err) {
        const ev = $.Event("product.requestFail");
        setTimeout(() => $(document).trigger(ev, [err]), 0);
    },

    requestEndEvent() {
        const ev = $.Event("product.requestEnd");
        setTimeout(() => $(document).trigger(ev), 0);
    }
};

export default {
    init: Methods.init
};