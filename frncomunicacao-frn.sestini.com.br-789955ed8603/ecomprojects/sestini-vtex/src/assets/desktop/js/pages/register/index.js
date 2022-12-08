const Methods = {
  init() {
    Methods.formatInputs();
    Methods.bindVerifyForm();
    Methods.bindSendForm();
  },

  verifyMailMD(mail) {
    fetch(`http://sestinidocs.com.br/links/sestini/ecomm-api/verify-email-register.php?email=${mail}`)
      .then(res => res.json())
      .then(data => {
        if (data[0].id) {
          $('#message-email').html(`E-mail já cadastrado! <a href='/account'>Clique aqui para realizar o log-in</a>`);
          $('#message-email').show();
          $('#input-email').css('margin-bottom', '0px');
          $('#input-email').css('border', '2px solid red');
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
        Methods.verifyMailMD(email)
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

    $('#input-nascimento').focusout(() => {
      const inputData = $('#input-nascimento').val().split('/')
      const dataAtual = new Date()
      const dataNascimento = new Date(`${inputData[2]}-${inputData[1]}-${inputData[0]}`)
      if (dataNascimento < dataAtual) {
        $('#message-nascimento').hide();
        $('#input-nascimento').css('margin-bottom', '15px');
        $('#input-nascimento').css('border', '2px solid #5aa03e');
      } else {
        $('#message-nascimento').html('Data de nascimento inválida!');
        $('#message-nascimento').show();
        $('#input-nascimento').val('')
        $('#input-nascimento').css('margin-bottom', '0px');
      }
    })
  },

  formatInputs() {
    $('#input-cpf').mask('000.000.000-00', { reverse: true });
    $('#input-telefone').mask('(00) 00000-0000');
    $('#input-nascimento').mask('00/00/0000');
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
      let firstName = $('#input-nome').val();
      let secondName = $('#input-sobrenome').val();
      let nascimento = $('#input-nascimento').val().split('/');
      let cellphone = $('#input-telefone').val();
      let newsletter = $('#input-newsletter').val();
      let gender = $('#input-gender').val();
      const cpfFormatado = this.replaceAll(cpf, '.', '').replace('-', '')
      var nascimentoFormatado = `${nascimento[2]}-${nascimento[1]}-${nascimento[0]}`
      if (nascimentoFormatado == 'Invalid Date') nascimentoFormatado = ''

      if (!this.validateMail(email)) {
        $('#message-form').html('Preencha o E-mail corretamente.')
        $('#message-form').show()
      } else if (!this.validateCpf(cpfFormatado)) {
        $('#message-form').html('Preencha o CPF corretamente.')
        $('#message-form').show()
      } else {
        $('#message-form').hide()
        this.createUser(email, cpf, firstName, secondName, cellphone, newsletter, nascimentoFormatado, gender)
      }
    })
  },

  createUser(email, cpf, firstName, secondName, cellphone, newsletter, nascimento, gender) {
    $.ajax({
      url: `http://sestinidocs.com.br/links/sestini/ecomm-api/create-user.php?email=${email}&document=${cpf}&documentType=cpf&firstName=${firstName}&lastName=${secondName}
      &phone=${cellphone}&birthDate=${nascimento}&gender=${gender}&isNewsletterOptIn=${newsletter}`,
      type: "GET",
      success: (response) => {
        if(response.error){
          $('#message-form').show()
          $('#message-form').html('Erro ao realizar cadastro, tente novamente...')
        }else{
          fetch(`https://sestinidocs.com.br/links/sestini/ecomm-api/register-user-rd.php?email=${email}&name=${firstName + ` ` + secondName}&birthday=${nascimento}&phone=${cellphone}&gender=${gender}`)
          .then(res => res.json())
          .then(d => {
            $('#message-form').html('Cadastro realizado com sucesso! Faça o login. (Você será redirecionado em 3 segundos)')
            $('#message-form').addClass('success')
            $('#message-form').show()
            setTimeout(() => {
              window.location.href = '/login'
            }, 3000);
          })
        }
      },
      error: (error) => {
        $('#message-form').show()
        $('#message-form').html('Erro ao realizar cadastro, tente novamente...')
      }
    })
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
