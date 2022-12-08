const Methods = {
    init() {
        Methods.initCarousel()
    },
    initCarousel() {
        $('.x-category__benefit').slick({
            autoplay: true,
            arrows: false,
            dots: false,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        })
    },
};

export default {
    init: Methods.init
};