import CacheSelector from './__cache-selector';
import Cookies from '../../../../common/js/utils/cookies.js';

const { header } = CacheSelector;
const Methods = {
    init() {
        Methods.openMenu();
        Methods.closeMenu();
        Methods.getUserStatus();
        Methods.doLogin();
        Methods.addBenefitBar()
        Methods.bindVoiceSearch()
        setInterval(Methods.fixSmarthintSearch, 1000)
        setTimeout(() => {
            Methods.bindSearchButton();
            Methods.addAccessibility()
        }, 500);
    },

    addAccessibility() {
        const template = `
        <div class='x-header-accessibility-button'>
          <a class='x-header-accessibility-link'><div id='accessibility-icon'></div></a>
          <div class='x-header-accessibility-menu'>
            <span id="close-accessibility">X</span>
            <div>
                <div id='accessibility-icon'></div>
                <a href='/institucional/acessibilidade'>Acessibilidade</a>
            </div>
                <p id='toggle-high-contrast'>Alto Contraste</p>
                <p id='toggle-zoom'>Aumentar Fontes</p>
                <p id='toggle-invert'>Inverter Cores</p>
                <p id='toggle-handtalk'>Leitura em Libras</p>
            </div>
        </div>`
        $('.x-header-menu__search-image-search').after(template)
        Methods.bindAccessibilityFunctions()
        Methods.checkAccessibilityCookies()
    },
    checkAccessibilityCookies() {
        const high_contrast = Cookies.get('high_contrast');
        const zoom = Cookies.get('zoom');
        const invert = Cookies.get('invert');
        const handtalk = Cookies.get('handtalk');
        const firstTimeHandTalk = Cookies.get('firstTimeHandTalk');
        high_contrast == `true` && Methods.toggleAccessibilityFunction('high_contrast')
        zoom == `true` && Methods.toggleAccessibilityFunction('zoom')
        invert == `true` && Methods.toggleAccessibilityFunction('invert')
        if (handtalk == `true`) {
            Methods.toggleAccessibilityFunction('handtalk')
        } else {
            if (firstTimeHandTalk == undefined) {
                Cookies.set('firstTimeHandTalk', false)
                Methods.toggleAccessibilityFunction('handtalk')
            } else {
                $('.ht-skip').hide()
            }
        }

    },
    bindAccessibilityFunctions() {
        $('#toggle-high-contrast').click(() => Methods.toggleAccessibilityFunction('high_contrast'))
        $('#toggle-zoom').click(() => Methods.toggleAccessibilityFunction('zoom'))
        $('#toggle-invert').click(() => Methods.toggleAccessibilityFunction('invert'))
        $('#toggle-handtalk').click(() => Methods.toggleAccessibilityFunction('handtalk'))
        $('#close-accessibility').click(() => $('.x-header-accessibility-menu').css('display', 'none'))
        $('#accessibility-icon').click(() => $('.x-header-accessibility-menu').css('display', 'flex'))
    },
    toggleAccessibilityFunction(type) {
        const html = $('html')
        switch (type) {
            case 'high_contrast':
                const highContrastElem = $('#toggle-high-contrast')
                highContrastElem.hasClass('active') ? highContrastElem.removeClass('active') : highContrastElem.addClass('active')
                highContrastElem.hasClass('active') ? html.addClass('__high_contrast') : html.removeClass('__high_contrast')
                highContrastElem.hasClass('active') ? Cookies.set('high_contrast', true) : Cookies.set('high_contrast', false)
                break;
            case 'zoom':
                const zoomElem = $('#toggle-zoom')
                zoomElem.hasClass('active') ? zoomElem.removeClass('active') : zoomElem.addClass('active')
                zoomElem.hasClass('active') ? html.addClass('__zoom') : html.removeClass('__zoom')
                zoomElem.hasClass('active') ? Cookies.set('zoom', true) : Cookies.set('zoom', false)
                break;
            case 'invert':
                const invertElem = $('#toggle-invert')
                invertElem.hasClass('active') ? invertElem.removeClass('active') : invertElem.addClass('active')
                invertElem.hasClass('active') ? html.addClass('__invert') : html.removeClass('__invert')
                invertElem.hasClass('active') ? Cookies.set('invert', true) : Cookies.set('invert', false)
                break;
            case 'handtalk':
                const handtalkElem = $('#toggle-handtalk')
                handtalkElem.hasClass('active') ? handtalkElem.removeClass('active') : handtalkElem.addClass('active')
                handtalkElem.hasClass('active') ? $('.ht-skip').show() : $('.ht-skip').hide()
                handtalkElem.hasClass('active') ? Cookies.set('handtalk', true) : Cookies.set('handtalk', false)
                break;
            default:
                break;
        }
    },

    fixSmarthintSearch() {
        [...document.querySelectorAll('#smarthint-search-result img.x-shelf__img-front')].map(elm => {
            elm.setAttribute('style', 'width: 100% !important')
        })
    },

    bindVoiceSearch() {
        const voiceSearchIcon = $('#voicesearch-btn')
        if (annyang) {
            voiceSearchIcon.show()
            annyang.setLanguage('pt-BR');
            annyang.addCallback('result', function(phrases) {
                voiceSearchIcon.removeClass('is--active')
                Methods.setSearchValue(phrases[0])
                Methods.getSearchUserData(phrases[0])
                annyang.abort()
            });
            voiceSearchIcon.click((e) => {
                e.preventDefault()
                annyang.start()
                voiceSearchIcon.addClass('is--active')
            })
        } else {
            console.log('Speech Recognition is not supported')
        }
    },
    setSearchValue(value) {
        $('.x-header-menu__search-input').each((i, el) => {
            $(el).val(value)
        })
    },

    getSearchUserData(searchTerm) {
        // OS NAME
        var OSName = "Unknown";
        if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) OSName = "Windows 10";
        if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName = "Windows 8";
        if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName = "Windows 7";
        if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName = "Windows Vista";
        if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName = "Windows XP";
        if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName = "Windows 2000";
        if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
        if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
        if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
        // BROWSER NAME
        var browserName = "Unknown"
        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) browserName = 'Opera';
        if (navigator.userAgent.indexOf("Chrome") != -1) browserName = 'Chrome';
        if (navigator.userAgent.indexOf("Safari") != -1) browserName = 'Safari';
        if (navigator.userAgent.indexOf("Firefox") != -1) browserName = 'Firefox';
        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) browserName = 'IE';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}%2C${longitude}&language=en%27&key=AIzaSyDkQpl8zs9YmQtVXyHPQ90QoehJNVicCy8`)
                    .then(res => res.json())
                    .then(data => {
                        const address = data.results[6].formatted_address
                        Methods.saveSearchUserData(searchTerm, OSName, browserName, address)
                    })
            });
        } else {
            Methods.saveSearchUserData(searchTerm, OSName, browserName, '')
        }
    },
    saveSearchUserData(searchTerm, OSName, browserName, address) {
        const urlParams = `searchTerm=${searchTerm}&os=${OSName}&browser=${browserName}&address=${address}`
        fetch(`http://sestinidocs.com.br/links/sestini/ecomm-api/save-voicesearch-data.php?${urlParams}`)
        window.history.replaceState(null, null, `#&search-term=${searchTerm}`);
    },

    addBenefitBar() {
        if ($('.x-header-container__benefits').length > 0) return true
        const template = `
        <div class='x-header-container__benefits'>
          <div class='x-header-container__benefits-wrapper'>
              <div class='x-header-container__benefits-item'>
                  <div class='icon-free-shipping'></div>
                  <p>
                      <b>Frete grátis</b> acima de R$199,90.
                      <a class='rules' target='_blank' href='/institucional/frete-e-prazo-de-entrega'>confira o regulamento para sua região
                          
                      </a>
                  </p>
              </div>

              <div class='x-header-container__benefits-item'>
                  <div class='icon-free-shipping'></div>
                  <p>
                      <b>Boleto parcelado</b> em até 15x*.
                      <a class='rules' target='_blank' href='/institucional/formas-de-pagamento'>confira o regulamento</a>
                  </p>
              </div>
          </div>
      </div>
    `
        const permission = Cookies.get('openBenefitBar');
        if (!permission) {
            $(".js--header").prepend(template);
            $('body main').css('margin-top', '169.5px')
            this.bindCloseBenefitBar();
            this.createCarouselBenefitBar()
        }
    },

    createCarouselBenefitBar() {
        $('.x-header-container__benefits-wrapper').slick({
            autoplay: true,
            arrows: true,
            dots: false,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        })
    },

    bindCloseBenefitBar() {
        $(window).on('scroll', () => {
            const benefitBar = $('.x-header-container__benefits')
            $(window).scrollTop() > 50 ? benefitBar.remove() : Methods.addBenefitBar()
        })
    },

    bindSearchButton() {
        $('.x-header-menu__search-input').keypress(e => e.keyCode == 13 ? $('.x-header-menu__search-icon').click() : true)
        $('.x-header-menu__search-icon').click(() => {
            const inputValue = $('.x-header-menu__search-input').val()
            if (inputValue != undefined && inputValue != '' && inputValue != 'undefined') {
                window.location.href = '/' + inputValue
            }
        })
    },

    openMenu() {
        header.buttonMenu.addEventListener('click', (ev) => {
            ev.preventDefault();
            Sestini.closeMenus(true);
            header.menu.classList.add('is--active');
            Sestini.disableScroll();
        });
    },

    closeMenu() {
        header.closeMenu.addEventListener('click', () => {
            Sestini.closeMenus(true);
        });
    },

    getUserStatus() {
        fetch('/no-cache/profileSystem/getProfile')
            .then(res => res.json())
            .then(({ IsUserDefined }) => {
                if (IsUserDefined) {
                    header.menu.classList.add('is--logged');
                }
            });
    },

    doLogin() {
        header.login.addEventListener('click', (ev) => {
            ev.preventDefault();

            Sestini.vtexHelpers.checkLogin().fail((user) => {
                if (!user.IsUserDefined) {
                    Sestini.closeMenus(true);
                    Sestini.vtexHelpers.openPopupLogin(true);
                    return false;
                }

                window.location.href = '/account';
            });
        });
    },
};

export default {
    init: Methods.init,
};