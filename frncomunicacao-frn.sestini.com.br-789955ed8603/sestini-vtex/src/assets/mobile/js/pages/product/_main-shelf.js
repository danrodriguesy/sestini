import CacheSelector from './__cache-selectors';

const { mainShelf } = CacheSelector;

const Methods = {
    init() {
        Methods.createCarousel();
        // setTimeout(() => Methods.bindZoom(), 1500)
    },
    createCarousel() {
        $(document).on('shelfCategoryEnd.vtexShelfProperties', (ev) => {
            $('.js--products-searched-shelf ul')
                .slick({
                    autoplay: false,
                    arrows: true,
                    dots: true,
                    centerMode: false,
                    lazyLoad: Sestini.slickLazyMobile,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                })
                .on('lazyLoaded', (event, slick, image, imageSource) => {
                    $(image)
                        .add($(image).parent())
                        .removeClass('has--placeloader');
                })
                .on('afterChange', ev => Sestini.lazyload.update());
            $('.js--products-searched-shelf').removeClass('has--placeholder');
        });
    },

    bindZoom() {
        $('.x-product__img-main-item').map((i, el) => {
            $(el).attr('data-magnify-src', Methods.replaceImageSize($(el).attr('src'), 1200))
            $(el).magnify()
        })
    },
    replaceImageSize(url, size) {
        return url.replace("-292-292", `-${size}-${size}`).replace("-155-155", `-${size}-${size}`)
    },
};

export default {
    init: Methods.init,
};