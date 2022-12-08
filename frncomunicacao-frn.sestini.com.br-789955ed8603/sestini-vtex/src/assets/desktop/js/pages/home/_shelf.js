const Methods = {
    init() {
        Methods.setCarouselImages();
    },
    setCarouselImages() {
        $(".x-home__shelf-prateleira > div > ul > li").each((index, elem) => {
            let imgLazyFront = $(elem).find('.x-shelf__img-front').attr('data-lazy')
            let imgLazyBack = $(elem).find('.x-shelf__img-back').attr('data-lazy')
            $(elem).find('.x-shelf__img-front').attr('src', imgLazyFront)
            $(elem).find('.x-shelf__img-front').removeClass('has--placeloader')
            $(elem).find('.x-shelf__img-back').attr('src', imgLazyBack)
            $(elem).find('.x-shelf__img-back').removeClass('has--placeloader')
            $(elem).find('.x-shelf__placeloader').removeClass('has--placeloader')
            if (imgLazyFront == undefined) {
                setTimeout(() => {
                    Methods.setCarouselImages()
                }, 1000);
            }
        })
    }
};

export default {
    init: Methods.init,
};
