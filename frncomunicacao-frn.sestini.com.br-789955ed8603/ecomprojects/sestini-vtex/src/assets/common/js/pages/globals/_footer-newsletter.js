import CacheSelectors from './__cache-selectors';
import NewsletterSubmit from '../../utils/newsletter-submit.js';

const El = CacheSelectors.footerNewsletter;
const Methods = {
    init() {
        Methods.setSubmit();
        // Methods.bindScrollNewsletter();
    },

    setSubmit() {
        NewsletterSubmit.newsletterValidate(El);
        NewsletterSubmit.backToForm(El);
    },

    bindScrollNewsletter() {
        const fixedNewsletter = $('.x-newsletter-fixed')
        if ($(window).width() > 992) {
            $(window).scroll(function() {
                if (!$('.js--quick-view').hasClass('is--active')) {
                    const scrollTop = $(window).scrollTop()
                    if (!closed && scrollTop > 450 && scrollTop <= $('.x-newsletter').offset().top - 1000 && $('body').hasClass('is--home')) {
                        fixedNewsletter.fadeIn()
                    } else {
                        fixedNewsletter.hide()
                    }
                }
            });
        } else {
            fixedNewsletter.remove()
        }

        $('#close-newsletter').click(() => {
            fixedNewsletter.remove()
        })
    }
};

export default {
    init: Methods.init,
};