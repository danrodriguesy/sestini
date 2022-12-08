const Methods = {
    init() {
        Methods.createSlider();
    },
    createSlider() {
        $(document).on('shelfCarouselEnd.vtexShelfProperties', (ev) => {
            $('.js--category-offers-shelf').each((index, elem) => {
                $(elem).find('ul').slick({
                    autoplay: false,
                    arrows: true,
                    dots: true,
                    centerMode: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                })
            })

            $('.js--category-offers-shelf').each((index, elem) => {
                $(elem).removeClass('has--placeholder');
            })

        });
    },
};

export default {
    init: Methods.init,
};