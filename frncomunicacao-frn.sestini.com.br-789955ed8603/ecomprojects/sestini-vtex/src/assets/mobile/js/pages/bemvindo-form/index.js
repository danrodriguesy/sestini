const Methods = {
  init() {
    Methods.getStates()
    Methods.formatPhone()
    Methods.bindCities()
    Methods.bindSendForm()
    Methods.setInitialMail()
  },

  setInitialMail(){
    const urlParams = new URLSearchParams(window.location.search);
    $('#input-email').val(urlParams.get('email'))
  },

  getStates() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => res.json())
      .then(data => {
        $('#input-uf').append(`<option value=''>Selecione...</option>`)
        const sortedData = data.sort((a, b) => {
          return a.nome.localeCompare(b.nome);
        })

        sortedData.map(state => {
          const { sigla, nome } = state
          $('#input-uf').append(`<option value='${sigla}'>${nome}</option>`)
        })
      })
  },

  formatPhone() {
    $('#input-phone').mask('(00) 00000-0000');
  },

  bindCities() {
    $('#input-uf').change(() => {
      const uf = $('#input-uf').val()
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
        .then(res => res.json())
        .then(data => {
          uf.toLowerCase() == 'sp' && (data[99999] = {nome: 'São Paulo'})
          const sortedData = data.sort((a, b) => {
            return a.nome.localeCompare(b.nome);
          })
          $('#input-cidade').empty()
          $('#input-cidade').append(`<option value=''>Selecione...</option>`)
          sortedData.map(city => {
            const { nome } = city
            $('#input-cidade').append(`<option value='${nome}'>${nome}</option>`)
          })
        })
    })
  },


  bindSendForm() {
    $('#form-register').submit(e => {
      Methods.loadingButton(true)
      e.preventDefault()
      const email = $('#input-email').val()
      const gender = $('#input-gender').val()
      const birthday = $('#input-nascimento').val()
      const favoriteMalas = $('#input-favorite-malas').prop('checked') ? `Malas` : ``
      const favoriteInfantil = $('#input-favorite-infantil').prop('checked') ? `Infantil` : ``
      const favoriteJuvenil = $('#input-favorite-adolescente').prop('checked') ? `Adolescente` : ``
      const favoriteExecutivo = $('#input-favorite-executivo').prop('checked') ? `Executivo` : ``
      const favoriteDiaDia = $('#input-favorite-dia-dia').prop('checked') ? `Dia a dia` : ``
      const filhos = $(`#input-filho-sim`).prop('checked')
      const uf = $('#input-uf').val()
      const city = $('#input-cidade').val()
      const phone = $('#input-phone').val()

      const formData = new FormData()
      formData.append('email', email)
      formData.append('gender', gender)
      formData.append('birthday', birthday)
      formData.append('favoriteMalas', favoriteMalas)
      formData.append('favoriteInfantil', favoriteInfantil)
      formData.append('favoriteJuvenil', favoriteJuvenil)
      formData.append('favoriteExecutivo', favoriteExecutivo)
      formData.append('favoriteDiaDia', favoriteDiaDia)
      formData.append('filhos', filhos ? 'Sim' : 'Nao')
      formData.append('uf', uf)
      formData.append('city', city)
      formData.append('phone', phone)


      $.ajax({
        url: 'http://sestinidocs.com.br/links/sestini/ecomm-api/bemvindo-form.php',
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
          $('#message-form').html('Cadastro realizado com sucesso!')
          $('#message-form').addClass('success')
          $('#message-form').show()
          Methods.showPopUp()
        }
        Methods.loadingButton(false)
      });
    })
  },

  showPopUp() {
    const template = `<div class='modal-bemvindo-form'>
                        <div class='modal-bemvindo-form-container'>
                          <img src="/arquivos/modal-bemvindo-form-2.png" alt='Use o cupom BEMVINDO10'/>
                          <p class='modal-bemvindo-form-container-paragraph'>Como forma de agradecimento, </br> utilize o cupom abaixo:</p>
                          <p class='modal-bemvindo-form-container-paragraph coupon'>BEMVINDO10 <span id='copy-icon'></span></p>
                          <p class='modal-bemvindo-form-container-paragraph'>E arrase com Produtos Sestini</p>
                          <a class='modal-bemvindo-form-container-button' href='/'>APROVEITAR!</a>
                        </div>
                      </div>`
    $(`body`).append(template)
    Methods.bindCopy()
  },

  bindCopy() {
    $('#copy-icon').click(() => {
      navigator.clipboard.writeText(`BEMVINDO10`).then(() => {
        $('#copy-icon').html(`<p class='success'>Copiado!</p>`)
        setTimeout(() => {
          $('#copy-icon').html(``)
        }, 2000)
      })
    })
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
}

export default {
  init: Methods.init
};
