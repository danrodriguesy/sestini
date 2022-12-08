import Cookies from '../../utils/cookies.js';

const popupLead = {
    init(options) {
        // const isPopUpOpened = Cookies.get('isPopUpOpened');
        // if (isPopUpOpened == undefined) {
        //     setTimeout(() => {
        //         this.openPopUp()
        //     }, 30000);
        // }
    },

    openPopUp() {
        const template = `<div class='popup-lead'>
                            <div class='popup-lead__close-btn'>X</div>
                            <div class='popup-lead__left'>
                                <img alt='Malas Sestini' src='/arquivos/popup-image-newsletter.jpg' />
                            </div>
                            <div class='popup-lead__right'>
                                <h2 class='popup-lead__right__title'>Bem-vindo(a)</h2>
                                <p class='popup-lead__right__subtitle'>Cadastre-se para receber nossas novidades e descontos exclusivos!</p>
                                <form id='form-popup-lead'>
                                    <div class='popup-lead__right__input-group'>
                                        <label class='popup-lead__right__label'>Nome: </label>
                                        <input required type='text' id='popup-name' class='popup-lead__right__input'/>
                                    </div>
                                    <div class='popup-lead__right__input-group'>
                                        <label class='popup-lead__right__label'>E-mail: </label>
                                        <input required type='email' id='popup-email' class='popup-lead__right__input'/>
                                    </div>
                                    <div class='popup-lead__right__input-group'>
                                        <label class='popup-lead__right__label'>Data de nascimento: </label>
                                        <input required type='date' id='popup-birthday' class='popup-lead__right__input'/>
                                    </div>
                                    <button type='submit' class='popup-lead__right__button'>Receber Novidades!</button>
                                    <p class='popup-lead__right__error'></p>
                                </form>
                            </div>
                        </div>`
        const overlayTemplate = `<div class='popup-lead-overlay'></div>`
        $('body').append(template)
        $('body').append(overlayTemplate)
        this.bindVerifyBirthday()
        this.bindClosePopup()
        this.bindSendForm()
    },

    bindVerifyBirthday() {
        $('#popup-birthday').focusout(() => {
            const inputData = $('#popup-birthday').val()
            const dataAtual = new Date()
            const dataNascimento = new Date(inputData)
            if (dataNascimento < dataAtual) {
                $('.popup-lead__right__error').html('')
                $('.popup-lead__right__button').attr('disabled', false)
            } else {
                $('.popup-lead__right__error').html('Data de nascimento inválida.')
                $('.popup-lead__right__button').attr('disabled', true)
            }
        })
    },
    bindClosePopup() {
        $('.popup-lead__close-btn').click(() => {
            $('.popup-lead-overlay').remove()
            $('.popup-lead').fadeOut()
            Cookies.set('isPopUpOpened', true);
        })
    },

    bindSendForm() {
        $('#form-popup-lead').on('submit', (e) => {
            e.preventDefault()
            const email = $('#popup-email').val()
            const name = $('#popup-name').val()
            const birthday = $('#popup-birthday').val()
            const endpoint = `http://sestinidocs.com.br/links/sestini/ecomm-api/register-user-dito.php?name=${name}&email=${email}&birthday=${birthday}`
            fetch(endpoint)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        $('.popup-lead__close-btn').click()
                        $('.popup-lead__right__error').html('')
                        Cookies.set('isPopUpOpened', true);
                    } else {
                        $('.popup-lead__right__error').html('Erro ao realizar cadastro, tente novamente.')
                    }
                })
        })
    },
};

export default popupLead