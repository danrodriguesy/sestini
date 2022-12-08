import Cookies from '../../utils/cookies.js';

const newsletterModal = {
    init(options) {
        // MODAL IS NOW DISABLED
        // this.initModal();
        // this.bindModalClose();
        // this.bindSendForm();
        // this.bindBanners();
    },
    initModal() {
        const template = `
            <div class='modal-newsletter'>
                <span id='close-modal-bf-newsletter'>X</span>
                <div class='modal-newsletter__header'>
                    <h3 class='modal-newsletter__header-title'>A <strong> Black Friday</strong> <br />está chegando!<h3>
                    <h4 class='modal-newsletter__header-subtitle'>até <strong>70%</strong> OFF</h4>
                    <p class='modal-newsletter__header-description'>Cadastre-se para receber as novidades</p>
                    <form class='modal-newsletter__header-form' id='blackfriday-newsletter-form'>
                        <input placeholder='Digite seu nome...' type='text' required class='modal-newsletter__header-form-input'/>
                        <input placeholder='Digite seu e-mail...' type='email' id='email-modal-newsletter-bf' required class='modal-newsletter__header-form-input'/>
                        <button class='modal-newsletter__header-form-button' type='submit'>Enviar</button>
                    </form>
                    <span id='message-newsletter-bf'></span>
                </div>
                <div class='modal-newsletter__footer'>
                </div>
            </div>
        `;
        const modalCookies = Cookies.get('newsletterOppenedToday');
        if (!modalCookies) {
            $("body").append(template);
            this.saveCookie();
        }
    },
    bindModalClose() {
        $('#close-modal-bf-newsletter').click(() => $('.modal-newsletter').fadeOut());
    },
    saveCookie() {
        Cookies.set('newsletterOppenedToday', true, { expires: 2 });
    },
    bindSendForm() {
        $('.modal-newsletter__header-form').on('submit', (ev) => {
            ev.preventDefault();
            const email = $('#email-modal-newsletter-bf').val();
            const _url = 'http://landfy.smartcampaign.com.br/landfy/api/c5418be4-442e-11e9-b520-0e7eae3ca056';
            const _params = `?fields[Source]='Newsletter Footer'&fields[Email]=${email}&fields[Optin_Email]=true&unique=Email`;
            fetch(_url + _params)
                .then(res => res.json())
                .then((res) => {
                    $('#message-newsletter-bf').html('Cadastro realizado com sucesso!')
                    $('#message-newsletter-bf').removeClass('error')
                    $('#message-newsletter-bf').addClass('success')
                    setTimeout(() => {
                        $('.modal-newsletter').fadeOut()
                    }, 2000);
                })
                .catch((err) => {
                    $('#message-newsletter-bf').html('Erro ao realizar cadastro! Tente novamente...')
                    $('#message-newsletter-bf').removeClass('success')
                    $('#message-newsletter-bf').addClass('error')
                });
        });
    },
    bindBanners() {
        $('#banner-popup-nwbf').click(() => $('.modal-newsletter').fadeIn())
    }
};

export default newsletterModal
