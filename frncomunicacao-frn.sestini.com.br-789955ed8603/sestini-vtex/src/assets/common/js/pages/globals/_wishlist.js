const Methods = {
    init() {
        setTimeout(() => {
            Methods.getWishlist()
            Methods.initWishlistMethods();
        }, 2000);
    },
    getUserData(dataLayer) {
        for (let i = 0; i < dataLayer.length; i++) {
            if (dataLayer[i].visitorLoginState) {
                return dataLayer[i]
            }
        }
        return []
    },
    getWishlist() {
        const userData = Methods.getUserData(dataLayer)
        if (userData.visitorLoginState) {
            fetch(`https://sestinidocs.com.br/links/sestini/ecomm-api/get-wishlist.php?email=${userData.visitorContactInfo[0]}`)
                .then(res => res.json())
                .then(data => {
                    const wishlist = data.wishlistProducts.split(',')
                    wishlist.indexOf(``) > -1 && wishlist.splice(wishlist.indexOf(``), 1);
                    Methods.setWishlistActive($('.x-wishlist__add-btn'), wishlist)
                    Methods.setWishlistActive($('.x-product-wishlist__add-btn'), wishlist)
                    window.location.href.indexOf('wishlist') != -1 && Methods.showShelfProducts(wishlist)
                })
        }

    },
    initWishlistMethods() {
        $('.x-wishlist__add-btn').click((e) => Methods.bindClick(e))
        $('.x-product-wishlist__add-btn').click((e) => Methods.bindClick(e))
    },
    bindClick(e) {
        const _this = $(e.currentTarget)
        const userData = Methods.getUserData(dataLayer)
        const productId = _this.attr(`data-wishlist-product-id`)
        if (userData.visitorLoginState) {
            if (_this.hasClass(`is--active`)) {
                Methods.removeProduct(userData.visitorContactInfo[0], productId, _this)
            } else {
                Methods.saveProduct(userData.visitorContactInfo[0], productId, _this)
            }
        } else {
            vtexid.start({
                returnUrl: '/',
                forceReload: false
            });
        }
    },
    saveProduct(email, productId, element) {
        fetch(`https://sestinidocs.com.br/links/sestini/ecomm-api/save-product-wishlist.php?email=${email}&productId=${productId}`)
        element.addClass(`is--active`)
    },
    removeProduct(email, productId, element) {
        fetch(`https://sestinidocs.com.br/links/sestini/ecomm-api/delete-product-wishlist.php?email=${email}&productId=${productId}`)
        element.removeClass(`is--active`)
    },

    setWishlistActive(element, wishlist) {
        element.each((i, e) => {
            wishlist.indexOf($(e).attr('data-wishlist-product-id')) != -1 && $(e).addClass('is--active')
        })
    },
    showShelfProducts(wishlist) {
        if (wishlist.length >= 1) {
            Methods.searchProductsData(wishlist, (data) => {
                data.map(product => {
                    const sku = product.items[0]
                    const template = `
                    <article class="x-wishlist__item" >
                        <div class="x-wishlist__item-img-container">
                            <button class="x-wishlist__add-btn is--active" data-wishlist-product-id='${product.productId}'></button>
                            <a href='${product.link}'><img src='${sku.images[0].imageUrl}'/></a>
                        </div>
                        <div class='x-wishlist__item-product-info'>
                            <div>
                                <a href='${product.link}' class='product-name'>${product.productName}</a>
                                <p class='product-price'>R$ ${parseFloat(sku.sellers[0].commertialOffer.Price).toFixed(2).replace('.', ',')}</p>
                            </div>
                            <a href='${product.link}' class='product-buy-btn'>Comprar</a>
                        </div>
    
                    </article>`
                    $(`.x-wishlist__items`).append(template)
                })
                Methods.initWishlistMethods()
            })
        } else {
            $(`.x-wishlist__items`).append(`<h2 class='x-wishlist__empty-msg'>Sua lista de favoritos está vazia</h2>`)
        }
    },
    searchProductsData(wishlist, callback) {
        $.ajax({
            url: '/api/catalog_system/pub/products/search/?' + Methods.mountProductSearchUrl(wishlist),
            dataType: 'json',
            success: (response) => {
                callback(response);
            },
            error: (error) => {
                console.log(error)
            }
        });
    },

    mountProductSearchUrl(products) {
        let searchUrl = "";
        for (let i = 0; i < products.length; i++) {
            const element = products[i];
            searchUrl += `fq=productId:${element}&`;
        }

        return searchUrl;
    },
};

export default {
    init: Methods.init,
};