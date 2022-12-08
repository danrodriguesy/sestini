export default {
    product: {
        self: $('.js--product'),
        imgMain: $('.js--product-img-main'),
        imgNav: $('.js--product-img-nav'),
        sizeSelect: $('.js--product-size-select'),
        similars: {
            productsId: document.querySelectorAll('.js--shelf-color-product-id'),
            productsSizesId: document.querySelectorAll('.js--product-sizes-id'),

        },
        details: {
            button: document.querySelector('.js--see-more'),
            container: document.querySelector('.js--product-description'),
        },
        buyButton: $('.js--add-to-cart'),
        selectors: $('.x-product__selectors'),
        zoomButtons: $('.js--product-img-main-content svg'),
        description: {
            linksParent: $('.js--product-tabs-description'),
            items: $('.js--product-description-tabs-contents-item'),
        },
        notifyme: {
            content: $('.x-product__notifyme'),
            subtitle: $('.x-product__notifyme-subtitle'),
            form: $('.x-product__notifyme-form'),
            formName: $('.js--notifyme-input-name'),
            formEmail: $('.js--notifyme-input-name'),
            skuId: $('.js--notifyme-input-skuId'),
        },
        buyTogether: {
            ids: document.querySelectorAll(
                '.js--shelf-item-buy-together .js--shelf-buy-together-product-id',
            ),
        },
        colorSelector: '.x-product__select-color',
        expansivel: $('.js--expansivel'),
        capacidadeExpansivel: $('.js--capacidade-expansivel'),
        capacidadeTotal: $('.js--capacidade-total'),
        material: $('.js--material'),
    },
};