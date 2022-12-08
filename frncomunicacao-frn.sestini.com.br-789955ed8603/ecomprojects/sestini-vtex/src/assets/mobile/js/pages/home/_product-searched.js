import CacheSelector from './__cache-selector';

const {
    home: { productSearched },
} = CacheSelector;

const Methods = {
    init() {
        // Methods.createSlider();
    },
    createSlider() {
        $(document).on('shelfCarouselEnd.vtexShelfProperties', (ev) => {
            !productSearched.shelf.classList.contains('slick-initialized') &&
                $(productSearched.shelf)
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
            productSearched.wrapper.classList.remove('has--placeholder');
        });
    },
};

export default {
    init: Methods.init,
};