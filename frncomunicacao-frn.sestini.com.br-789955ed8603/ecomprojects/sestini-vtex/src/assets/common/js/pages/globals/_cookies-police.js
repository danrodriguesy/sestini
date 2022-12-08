import Cookies from '../../utils/cookies.js';

const cookiesPolice = {
    init() {
        this.verifyCookie();
    },
    verifyCookie() {
        const template = `<section class="x-cookies">
                                <div class="x-cookies-content">
                                    <div class="x-cookies-content-text">
                                        Nós usamos cookies para criar uma melhor experiência de navegação. 
                                        Ao navegar no site da Sestini, você concorda com nossa 
                                        <a target="_blank" href="https://www.sestini.com.br/institucional/privacidade-e-seguranca">
                                            Política de Privacidade.
                                        </a>
                                    </div>
                                    <button class="x-cookies-content-button">aceitar</button>
                                </div>
                            </section>`
        const isCookiesAccepted = Cookies.get('isCookiesAccepted');
        if (!isCookiesAccepted) {
            $("body").append(template);
            this.bindSaveCookie();
        }
    },
    bindSaveCookie() {
        $(".x-cookies-content-button").on("click", () => {
            Cookies.set('isCookiesAccepted', true);
            $(".x-cookies").fadeOut().remove();
        })
    }
};

export default cookiesPolice