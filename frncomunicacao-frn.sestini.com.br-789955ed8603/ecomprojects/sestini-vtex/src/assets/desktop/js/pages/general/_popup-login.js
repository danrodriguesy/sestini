const Methods = {
    init() {
        setTimeout(() => {
            Methods.addRegisterButton();
            Methods.bindCloseButton()
        }, 2000);
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