// import CacheSelectors from "../../common/js/pages/account/__cache-selectors";

// const El = CacheSelectors.account;
const Methods = {
    init() {
        // Orders
        Methods.changeOrdersImg();
        Methods.hideCancelLink();
    },

    hideCancelLink() {
        if (window.location.hash.match(/orders/)) {
            const interval = setInterval(() => {
                const cancelButton = document.querySelectorAll('.vtex-account__page-body .myo-cancel-btn');
                if (cancelButton) {
                    [...cancelButton].map(button => button.remove());
                    clearInterval(interval);
                }
            }, 50);
        }


        // orders page
        window.addEventListener('hashchange', () => {
            if (window.location.hash.match(/orders/)) {
                console.log('foo');
                const cancelButton = document.querySelectorAll('.vtex-account__page-body .myo-cancel-btn');
                [...cancelButton].map(button => button.remove());
            }
        });

        //orders detail
        if (window.location.hash.match(/\d$/)) {
            const interval = setInterval(() => {
                const cancelButton = document.querySelectorAll('.vtex-account__page-body ul li a.no-underline');
                if (cancelButton) {
                    cancelButton.remove();
                    clearInterval(interval);
                }
            }, 50);
        }

        //orders details
        window.addEventListener('hashchange', () => {
            if (window.location.hash.match(/\d$/)) {
                const cancelButton = document.querySelectorAll('.vtex-account__page-body .myo-cancel-btn');
                [...cancelButton].map(button => button.remove());
            }
        });
    },

    // Orders
    changeOrdersImg() {
        const resizeImg = (context = false) => {
            const self = !context ? $(".myo-order-card") : context;
            self.find("img").map((i, item) => {
                const $this = $(item);
                const imgSrc = $this.attr("src");
                if (Sestini.globalHelpers.contains("/arquivos", imgSrc)) {
                    var resizedImg = $this.attr("src").replace("-50-50", "-100-100");
                    $this.attr("src", resizedImg);
                }
            });
        };

        // setTimeout(() => resizeImg(), 5000);
        let oldXHROpen = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function(
            method,
            url,
            async,
            user,
            password
        ) {
            // do something with the method, url and etc.
            this.addEventListener("load", function(ev) {
                resizeImg();
            });

            return oldXHROpen.apply(this, arguments);
        };

        $(document).on("click", ".myo-details-btn", ev => {
            const $this = $(".myo-product-info");

            setTimeout(() => resizeImg($this), 500);
        });
    }
};

export default {
    init: Methods.init
};