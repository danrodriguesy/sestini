const Methods = {
    init() {
        const intervalSetLayout = setInterval(() => {
            if ($('.vtexIdUI-others-send-email').css('display') == 'flex') {
                Methods.addRegisterButton();
                Methods.bindCloseButton();
                clearInterval(intervalSetLayout)
            }
        }, 1000);
    },

    bindCloseButton() {
        $('.vtexIdUI-close').click(() => window.location.href = '/')
    },

    addRegisterButton() {
        $('.vtexIdUI-providers-list').append(`
                <a href='/cadastro' style='order: -1 !important; margin-bottom: 20px;' class='btn btn-block btn-large btn-success vtexIdUI-create-account'>Criar minha conta</a>
            `)
    },
};

export default {
    init: Methods.init,
};