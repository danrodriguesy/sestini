import VtexUtils from 'vtex-utils';
import VtexCatalog from 'vtex-catalog';
import VtexMasterdata from 'vtex-masterdata';
import VtexShelfProperties from 'vtex-shelf-properties';

import RivetsUtilify from 'rivets-utilify';
import '../../utils/rivets-helpers.js';

import CacheSelector from './__cache-selectors';

const {
    category: { orderBy, filter },
} = CacheSelector;

const Methods = {
    init() {
        // Methods.fontsLoad();

        Methods.setGlobals();
        Methods.setLazy();
        Methods.closeMenus();
        Methods.closeCategoryMenus();

        Methods.shelvesFullUpdate();

        Methods.scrollActions();

        Methods.jQueryExtends();
        Methods.jQueryValidate();
    },

    fontsLoad() {
        const OpenSans = new FontFaceObserver('Open+Sans', { weight: 300 });
        const OpenSans400 = new FontFaceObserver('Open+Sans', { weight: 400 });
        const OpenSans600 = new FontFaceObserver('Open+Sans', { weight: 600 });
        const OpenSans700 = new FontFaceObserver('Open+Sans', { weight: 700 });
        const OpenSans800 = new FontFaceObserver('Open+Sans', { weight: 800 });

        Promise.all([
            OpenSans.load(),
            OpenSans400.load(),
            OpenSans600.load(),
            OpenSans700.load(),
            OpenSans800.load(),
        ]);
    },

    setGlobals() {
        // Cache Elements
        Sestini.body = $('body');
        Sestini.overlay = $('.js--overlay');
        Sestini.menuOverlay = $('.js--menu-overlay');
        Sestini.searchOverlay = $('.js--search-overlay');
        Sestini.minicart = $('.js--minicart');
        Sestini.searchBtnOpen = $('.js--search-btn-open');
        Sestini.searchBtnClose = $('.js--search-btn-close');
        Sestini.searchInput = $('.js--search-input');
        Sestini.searchDrop = $('.js--search-drop');
        Sestini.searchResult = $('.js--search-result');
        Sestini.searchResultList = $('.js--search-result-list');
        Sestini.searchResultListDrop = $('.js--search-result-list-drop');
        Sestini.newsletter = $('.js--newsletter');

        // Header Main Menu
        Sestini.mainMenuSubmenuWrapper = $('.js--main-menu-submenu-wrapper');

        // Mobile
        Sestini.menuMobile = $('.js--menu-mobile');

        Sestini.sideNewsletterBarContainer = $(
            '.js--side-newsletter-bar-container',
        );
        Sestini.sideNewsletterBarBtn = $('.js--side-newsletter-bar-btn');

        // Product
        Sestini.popupHowToCare = $('.js--product-how-to-care');
        Sestini.popupSizeChart = $('.js--product-size-chart');

        // Category
        Sestini.filtersContentMobile = $('.js--filters-content-mobile');

        // Category/Departament/Search templates
        Sestini.isHome = Sestini.body.hasClass('is--home');
        Sestini.isProduct = Sestini.body.hasClass('is--product');
        Sestini.isCategory = Sestini.body.hasClass('is--category') ||
            Sestini.body.hasClass('is--departament') ||
            Sestini.body.hasClass('is--search-result');
        Sestini.isSearchPage = Sestini.body.hasClass('is--search-result');

        // External Plugins
        Sestini.isMobile = isMobile.any;

        // Plugins
        Sestini.VtexShelfProperties = VtexShelfProperties;
        Sestini.VtexCatalog = VtexCatalog;

        // Plugins Instances
        Sestini.vtexUtils = new VtexUtils();
        Sestini.vtexCatalog = new Sestini.VtexCatalog(
            Sestini.vtexUtils,
            Sestini.setCache,
        );
        Sestini.vtexMasterdata = new VtexMasterdata(Sestini.vtexUtils);

        Sestini.vtexHelpers = Sestini.vtexUtils.vtexHelpers;
        Sestini.globalHelpers = Sestini.vtexUtils.globalHelpers;
        Sestini.locationHelpers = Sestini.vtexUtils.locationHelpers;

        Sestini.vtexUtils.setRivetsUtilify(RivetsUtilify);

        // Custom Methods
        Sestini.smoothScrollTo = Methods.smoothScrollTo;
        Sestini.simulateClick = Methods.simulateClick;
    },

    simulateClick(elem) {
        // Criando o evento
        const evt = new MouseEvent('click', {
            bubbles: false,
            cancelable: true,
            view: window,
        });
        // Se cancelado, não dispara o evento
        /* eslint-disable */
        let canceled = !elem.dispatchEvent(evt);
        /* eslint-enable */
    },

    /**
     * Smooth scroll animation
     * @param {int} endX: destination x coordinate
     * @param {int} endY: destination y coordinate
     * @param {int} duration: animation duration in ms
     */
    smoothScrollTo(endX, endY, duration) {
        const startX = window.scrollX || window.pageXOffset;
        const startY = window.scrollY || window.pageYOffset;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();

        duration = typeof duration !== 'undefined' ? duration : 400;

        // Easing function
        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1) {
                return (distance / 2) * time * time * time * time + from;
            }
            return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime;
            const newX = easeInOutQuart(time, startX, distanceX, duration);
            const newY = easeInOutQuart(time, startY, distanceY, duration);
            if (time >= duration) {
                clearInterval(timer);
            }
            window.scroll(newX, newY);
        }, 1000 / 60); // 60 fps
    },

    closeMenus() {
        Sestini.closeMenus = (removeOverlay) => {
            removeOverlay = Sestini.globalHelpers.isUndefined(removeOverlay) ?
                false :
                removeOverlay;

            Sestini.minicart
                .add(Sestini.searchBtnClose)
                .add(Sestini.searchDrop)
                .removeClass('is--active');

            Sestini.popupHowToCare
                .add(Sestini.popupSizeChart)
                .removeClass('is--active');

            Sestini.newsletter
                .add(Sestini.sideNewsletterBarContainer)
                .add(Sestini.sideNewsletterBarBtn)
                .removeClass('is--active is--popup');

            // Header Main Menu
            Sestini.menuOverlay.add(Sestini.searchResult).removeClass('is--active');

            if (isMobile.any) {
                Sestini.mainMenuSubmenuWrapper
                    .parent()
                    .removeClass('is--active')
                    .end()
                    .slideUp();
            }

            // Search On Close Actions
            // Sestini.searchInput.val('');
            // Sestini.searchResultList.empty();
            // Sestini.searchResultList.removeClass('is--active');
            // Sestini.searchResultListDrop.empty();
            // Sestini.searchBtnOpen.addClass('is--active');

            if (Sestini.isCategory) {
                if (isMobile.any) {
                    Sestini.closeCategoryOrderBy();
                    removeOverlay = false;
                } else {
                    Sestini.closeCategoryOrderBy();
                    Sestini.closeCategoryFilters();
                }
            }

            if (removeOverlay) {
                Sestini.overlay.removeClass('is--active');
                Sestini.menuOverlay.removeClass('is--active');
                Sestini.searchOverlay.removeClass('is--active');
                Sestini.body.removeClass(
                    'has--loader has--no-scroll has--search-loader has--minicart-loader has--wishlist-loader',
                );
                Sestini.enableScroll();
                document.querySelector('main').classList.remove('is--active');
            }

            // Mobile
            Sestini.menuMobile.removeClass('is--active');
        };
    },


    closeCategoryMenus() {
        // Category Filters
        Sestini.closeCategoryOrderBy = () => {
            orderBy.orderText.classList.remove('is--active');
            orderBy.orderDrop.classList.remove('is--active');
        };

        Sestini.closeCategoryFilters = () => {
            if (isMobile.any && filter.mainContainer !== null && filter.openButton !== null) {
                filter.mainContainer.classList.remove('is--active');
                filter.openButton.classList.remove('is--active');

                Sestini.overlay.removeClass('is--active');
                Sestini.menuOverlay.removeClass('is--active');
                Sestini.searchOverlay.removeClass('is--active');
                Sestini.body.removeClass(
                    'has--loader has--no-scroll has--search-loader has--minicart-loader has--wishlist-loader',
                );
                Sestini.enableScroll();
                document.querySelector('main').classList.remove('is--active');
            }

        };

        Sestini.closeCategoryAllDrops = () => {
            Sestini.closeCategoryOrderBy();
            Sestini.closeCategoryFilters();
        };

    },

    shelvesFullUpdate() {
        Sestini.shelfCategoryFullUpdate = () => {
            Sestini.shelfCategory.update();
            Sestini.lazyload.update();
        };
    },

    scrollActions() {
        const _preventDefault = (e) => {
            e = e || window.event;

            if (e.preventDefault) {
                e.preventDefault();
            }

            e.returnValue = false;
        };

        const _theMouseWheel = (e) => {
            _preventDefault(e);
        };

        const _disableScroll = () => {
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', _theMouseWheel, false);
            }

            window.onmousewheel = document.onmousewheel = _theMouseWheel;
        };

        const _enableScroll = () => {
            if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', _theMouseWheel, false);
            }

            window.onmousewheel = document.onmousewheel = null;
        };

        // Prevent Scroll
        Sestini.disableScroll = () => {
            if (isMobile.any) {
                Sestini.body.addClass('has--no-scroll');
            } else {
                _disableScroll();
            }
        };

        Sestini.enableScroll = () => {
            if (isMobile.any) {
                Sestini.body.removeClass('has--no-scroll');
            } else {
                _enableScroll();
            }
        };
    },

    setLazy() {
        Sestini.lazyload = new LazyLoad({
            data_src: 'src',
            data_srcset: 'srcset',
            class_loading: 'is--loading',
            class_loaded: 'is--loaded',
            class_error: 'has--lazy-error',
            elements_selector: '.js--lazy',
            threshold: 650,
            callback_set(self) {
                $(self).removeClass('has--lazy');
            },
            callback_load(self) {
                $(self).removeClass('has--placeloader');
            },
        });
    },

    /* eslint-disable */
    jQueryExtends() {
        $.fn.clearForm = function() {
            return this.each(function() {
                const type = this.type;
                const tag = this.tagName.toLowerCase();

                if (tag === "form") {
                    return $(":input", this).clearForm();
                }

                if (type === "text" || type === "password" || tag === "textarea") {
                    this.value = "";
                } else if (type === "checkbox" || type === "radio") {
                    this.checked = false;
                } else if (tag === "select") {
                    this.selectedIndex = -1;
                }
            });
        };

        /**
         * Chunk an array of DOM Elements
         * @example
         *     // Will wrap every 3 items in a new div with 'item__new' class
         *     $('.item').chunk(3).wrap('<div class="item__new"></div>');
         */
        $.fn.chunk = function(size) {
            var arr = [];

            for (var i = 0; i < this.length; i += size) {
                arr.push(this.slice(i, i + size));
            }

            return this.pushStack(arr, "chunk", size);
        };
    },

    jQueryValidate() {
        // Custom e-mail validate
        $.validator.methods.email = function(value, element) {
            return Sestini.globalHelpers.isEmail(value);
        };

        // Limit the number of files in a FileList.
        $.validator.addMethod(
            "maxfiles",
            function(value, element, param) {
                if (this.optional(element)) {
                    return true;
                }

                if ($(element).attr("type") === "file") {
                    if (element.files && element.files.length > param) {
                        return false;
                    }
                }

                return true;
            },
            $.validator.format("Please select no more than {0} files.")
        );

        // Limit the size of all files in a FileList.
        $.validator.addMethod(
            "maxsizetotal",
            function(value, element, param) {
                if (this.optional(element)) {
                    return true;
                }

                const len = element.files.length;

                if ($(element).attr("type") === "file") {
                    if (element.files && len) {
                        let totalSize = 0;

                        for (let i = 0; i < len; i += 1) {
                            totalSize += element.files[i].size;
                            if (totalSize > param) {
                                return false;
                            }
                        }
                    }
                }

                return true;
            },
            $.validator.format("Total size of all files must not exceed {0} bytes.")
        );

        /**
         * Limit the size of each individual file in a FileList.
         * @example
         *     rules: {
         *         file: {
         *             required: true,
         *             extension: 'txt|docx|pdf',
         *             maxsize: 5242880, // 1mb = 1048576
         *         },
         *     },
         *     messages: {
         *         file: {
         *             required: 'Campo obrigatório',
         *             extension: 'Arquivos devem ser TXT, DOCX ou PDF',
         *             maxsize: 'Tamanho máximo do arquivo 5mb',
         *         },
         *     },
         */
        $.validator.addMethod(
            "maxsize",
            function(value, element, param) {
                if (this.optional(element)) {
                    return true;
                }

                const len = element.files.length;

                if ($(element).attr("type") === "file") {
                    if (element.files && len) {
                        for (let i = 0; i < len; i += 1) {
                            if (element.files[i].size > param) {
                                return false;
                            }
                        }
                    }
                }

                return true;
            },
            $.validator.format("File size must not exceed {0} bytes each.")
        );
    }
    /* eslint-enable */
};

export default {
    init: Methods.init,
};