const Methods = {
    init() {
        Methods.formatInputs();
        Methods.bindVerifyForm();
        Methods.bindSendForm();
        Methods.bindChangeInputFile();
    },

    bindChangeInputFile() {
        $('#input-file').on('change', () => {
            const filesLen = $('#input-file')[0].files.length
            if (filesLen > 0) {
                $('#files-qty').html(`${filesLen} arquivo(s) selecionado(s)`)
            } else {
                $('#files-qty').html(`Nenhum arquivo selecionado`)
            }
        })
    },

    bindVerifyForm() {
        // Verify e-mail
        $('#input-email').focusout(() => {
            const email = $('#input-email').val();
            // Validate e-mail
            if (this.validateMail(email)) {
                $('#message-email').hide();
                $('#input-email').css('margin-bottom', '15px');
                $('#input-email').css('border', '2px solid #5aa03e');
                return true;
            } else {
                $('#message-email').html('E-mail inválido!');
                $('#message-email').show();
                $('#input-email').css('margin-bottom', '0px');
                return false;
            }
        })

        // Verify CPF
        $('#input-cpf').focusout(() => {
            const cpf = $('#input-cpf').val().toString();
            const cpfFormatado = this.replaceAll(cpf, '.', '').replace('-', '')
                // Validate CPF
            if (this.validateCpf(cpfFormatado)) {
                $('#message-cpf').hide();
                $('#input-cpf').css('margin-bottom', '15px');
                $('#input-cpf').css('border', '2px solid #5aa03e');
                return true;
            } else {
                $('#message-cpf').html('CPF inválido!');
                $('#message-cpf').show();
                $('#input-cpf').css('margin-bottom', '0px');
                return false;
            }
        })

        $('#input-telefone').focusout(() => {
            const telefone = $('#input-telefone').val()
            if (telefone.length == 15) {
                $('#message-telefone').hide();
                $('#input-telefone').css('margin-bottom', '15px');
                $('#input-telefone').css('border', '2px solid #5aa03e');
                return true;
            } else {
                $('#message-telefone').html('Telefone inválido!');
                $('#message-telefone').show();
                $('#input-telefone').css('margin-bottom', '0px');
                return false;
            }
        })
    },

    formatInputs() {
        $('#input-cpf').mask('000.000.000-00', { reverse: true });
        $('#input-telefone').mask('(00) 00000-0000');
    },

    validateMail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    validateCpf(inputCPF) {
        var soma = 0;
        var resto;

        if (inputCPF == '00000000000') return false;
        for (var i = 1; i <= 9; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(inputCPF.substring(9, 10))) return false;

        soma = 0;
        for (var i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(inputCPF.substring(10, 11))) return false;
        return true;
    },

    bindSendForm() {
        $('#form-register').on('submit', (event) => {
            event.preventDefault()
            let email = $('#input-email').val();
            let cpf = $('#input-cpf').val();
            const cpfFormatado = this.replaceAll(cpf, '.', '').replace('-', '')
            let name = $('#input-nome').val();
            let cellphone = $('#input-telefone').val();
            let message = $('#input-message').val();
            let files = $('#input-file')[0].files

            if (!this.validateMail(email)) {
                $('#message-form').html('Preencha o E-mail corretamente.')
                $('#message-form').show()
            } else if (!this.validateCpf(cpfFormatado)) {
                $('#message-form').html('Preencha o CPF corretamente.')
                $('#message-form').show()
            } else if (cellphone.length != 15) {
                $('#message-form').html('Preencha o Telefone corretamente.')
                $('#message-form').show()
            } else {
                $('#message-form').hide()
                this.sendMail(email, cpf, name, cellphone, message, files)
            }
        })
    },

    sendMail(email, cpf, name, cellphone, message, files) {
        Methods.loadingButton(true)
        var formData = new FormData()
        formData.append('email', email)
        formData.append('cpf', cpf)
        formData.append('name', name)
        formData.append('cellphone', cellphone)
        formData.append('message', message)
        formData.append('filesLength', files.length)
        for (var i = 0; i < files.length; i++) {
            formData.append(`file_${i}`, files[i])
        }
        $.ajax({
            url: 'http://sestinidocs.com.br/links/sestini/ecomm-api/contact.php',
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,
            crossDomain: true,
        }).done(res => {
            if (res.error) {
                $('#message-form').show()
                $('#message-form').html('Erro ao enviar e-mail, tente novamente...')
            } else {
                $('#message-form').html('E-mail enviado com sucesso! Nossa equipe entrará em contato com você.')
                $('#message-form').addClass('success')
                $('#message-form').show()
                Methods.resetForm()
            }
            Methods.loadingButton(false)
        });
    },

    resetForm() {
        $('input').val('')
        $('textarea').val('')
        setTimeout(() => {
            $('#message-form').hide()
            $('#message-form').removeClass('success')
        }, 2000);
    },

    loadingButton(set) {
        if (set) {
            $('.x-contact-form button').attr('disabled', true)
            $('.x-contact-form button').html('<div class="loader"></div> Enviando')
        } else {
            $('.x-contact-form button').attr('disabled', false)
            $('.x-contact-form button').html('Enviar')
        }
    },

    replaceAll(str, find, replace) {
        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    },

    escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    }

};

export default {
    init: Methods.init
};