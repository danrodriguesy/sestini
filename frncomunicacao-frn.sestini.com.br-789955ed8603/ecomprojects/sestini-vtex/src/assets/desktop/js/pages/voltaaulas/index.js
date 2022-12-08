const Methods = {
    init() {
        Methods.createMainBannerCarousel()
    },

    createMainBannerCarousel() {
        $('.x-category__banner').slick({
            autoplay: true,
            arrows: true,
            dots: false,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        })
    },
}

export default {
    init: Methods.init,
};
