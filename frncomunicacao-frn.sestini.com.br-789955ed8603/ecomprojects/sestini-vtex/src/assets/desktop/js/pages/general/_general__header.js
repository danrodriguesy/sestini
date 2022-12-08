const Methods = {
    init() {
        Methods.bindScroll()
        Methods.bindSearchButton()
        Methods.bindHoverMenu()
        Methods.setCarouselBenefitsBar()
        Methods.bindVoiceSearch()
        Methods.bindHoverVoiceSearch()
        Methods.addAccessibility()
    },
    addAccessibility() {
        const template = `
        <div class='x-header-container__top-accessibility-button'>
          <a href='/institucional/acessibilidade' class='x-header-container__top-accessibility-link'><div id='accessibility-icon'></div>Acessibilidade</a>
          <div class='x-header-container__top-accessibility-menu'>
            <div>
                <div id='accessibility-icon'></div>
                <a href='/institucional/acessibilidade'>Acessibilidade</a>
            </div>
                <p class='toggle-high-contrast'>Alto Contraste</p>
                <p class='toggle-zoom'>Aumentar Fontes</p>
                <p class='toggle-invert'>Inverter Cores</p>
                <p class='toggle-handtalk'>Leitura em Libras</p>
            </div>
        </div>`
        $('.x-header-container__top-account-container').prepend(template)
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
        $('.toggle-high-contrast').click(() => Methods.toggleAccessibilityFunction('high_contrast'))
        $('.toggle-zoom').click(() => Methods.toggleAccessibilityFunction('zoom'))
        $('.toggle-invert').click(() => Methods.toggleAccessibilityFunction('invert'))
        $('.toggle-handtalk').click(() => Methods.toggleAccessibilityFunction('handtalk'))
    },
    toggleAccessibilityFunction(type) {
        const html = $('html')
        switch (type) {
            case 'high_contrast':
                const highContrastElem = $('.toggle-high-contrast')
                highContrastElem.hasClass('active') ? highContrastElem.removeClass('active') : highContrastElem.addClass('active')
                highContrastElem.hasClass('active') ? html.addClass('__high_contrast') : html.removeClass('__high_contrast')
                highContrastElem.hasClass('active') ? Cookies.set('high_contrast', true) : Cookies.set('high_contrast', false)
                break;
            case 'zoom':
                const zoomElem = $('.toggle-zoom')
                zoomElem.hasClass('active') ? zoomElem.removeClass('active') : zoomElem.addClass('active')
                zoomElem.hasClass('active') ? html.addClass('__zoom') : html.removeClass('__zoom')
                zoomElem.hasClass('active') ? Cookies.set('zoom', true) : Cookies.set('zoom', false)
                break;
            case 'invert':
                const invertElem = $('.toggle-invert')
                invertElem.hasClass('active') ? invertElem.removeClass('active') : invertElem.addClass('active')
                invertElem.hasClass('active') ? html.addClass('__invert') : html.removeClass('__invert')
                invertElem.hasClass('active') ? Cookies.set('invert', true) : Cookies.set('invert', false)
                break;
            case 'handtalk':
                const handtalkElem = $('.toggle-handtalk')
                handtalkElem.hasClass('active') ? handtalkElem.removeClass('active') : handtalkElem.addClass('active')
                handtalkElem.hasClass('active') ? $('.ht-skip').show() : $('.ht-skip').hide()
                handtalkElem.hasClass('active') ? Cookies.set('handtalk', true) : Cookies.set('handtalk', false)
                break;
            default:
                break;
        }
    },
    bindHoverVoiceSearch() {
        const voiceSearchIcon = $('.x-header-container__top-search-form-voicesearch-icon')
        const inputGroup = $('.x-header-container__top-search-form-input-group')
        const template = `<div class='voice-search-hover'>
      <div class='voice-search-hover-icon'></div>
      <h2 class='voice-search-hover-title'>Busca por voz</h2>
      <p class='voice-search-hover-text'>Agora você pode realizar busca por voz em nosso site, <b>basta clicar no microfone e começar a falar.</b></p>
    </div>`
        voiceSearchIcon.hover(() => {
            if ($('.voice-search-hover').length < 1) {
                inputGroup.append(template)
            } else {
                $('.voice-search-hover').show()
            }
        }, () => {
            $('.voice-search-hover').hide()
        })
    },
    bindVoiceSearch() {
        const voiceSearchIcon = $('.x-header-container__top-search-form-voicesearch-icon')
        if (annyang) {
            [...voiceSearchIcon].map(e => $(e).show())
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
        $('.js--search-input').each((i, el) => {
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
        const urlParams = encodeURI(`searchTerm=${searchTerm}&os=${OSName}&browser=${browserName}&address=${address}`)
        fetch(`http://sestinidocs.com.br/links/sestini/ecomm-api/save-voicesearch-data.php?${urlParams}`)
        window.history.replaceState(null, null, `#&search-term=${searchTerm}`);
    },
    setCarouselBenefitsBar() {
        $('.x-header-container__benefits-wrapper').slick({
            autoplay: true,
            arrows: true,
            dots: false,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        })
    },
    bindHoverMenu() {
        $(`.x-header-container__bottom-menu-item`).hover(() => {
            $(`.js--headermenu-overlay`).addClass(`is--active`)
        }, () => {
            $(`.js--headermenu-overlay`).removeClass(`is--active`)
        })
    },
    bindScroll() {
        if ($(window).width() > 992) {
            $(window).scroll(function() {
                const offsetTop = $(this).scrollTop()
                if (offsetTop >= 450) {
                    $('#header-primary').css('position', 'fixed')
                    $('.x-header-container__benefits').css({ 'max-height': '0px', 'padding': 0 })
                } else {
                    $('#header-primary').css('position', 'relative')
                    $('.x-header-container__benefits').css({ 'max-height': '10000px', 'padding': '5px' })
                }
            })
        } else {
            $('#header-secondary').hide()
        }
    },
    bindSearchButton() {
        $('.js--search-input').keypress(e => e.keyCode == 13 ? $('.x-header-container__top-search-form-input-icon').click() : true)
        $('.x-header-container__top-search-form-input-icon').click((ev) => {
            ev.preventDefault()
            const searchInputValue = $('.js--search-input').val()
            if (searchInputValue != undefined && searchInputValue != "undefined" && searchInputValue != "") {
                window.location.href = '/' + searchInputValue
            }
        })
    },
};

export default {
    init: Methods.init,
};