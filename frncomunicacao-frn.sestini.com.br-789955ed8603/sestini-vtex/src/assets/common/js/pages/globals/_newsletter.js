import CacheSelectors from './__cache-selectors';

const { newsletter } = CacheSelectors;

const Methods = {
  init() {
    Methods.bindSendForm();
  },

  bindSendForm() {
    const form = $('.js--newsletter')[1]
    const message = $(".js--newsletter-message")[1]
    $('.js--newsletter').on('submit', (ev) => {
      ev.preventDefault();
      form.classList.add('is--sending-form');
      const email = $('.js--newsletter-email')[1].value
      const name =  $('.js--newsletter-name')[1].value
      const _url = 'https://sestinidocs.com.br/links/sestini/ecomm-api/register-user-rd.php';
      const _params = `?email=${email}&name=${name}`;
      
      fetch(_url + _params)
        .then(res => res.json())
        .then((res) => {
          form.reset()
          form.classList.add('is--sended-form');
          message.classList.add('is--sended-form');
          message.innerHTML = `Cadastro realizado. Aproveite!`;
        })
        .catch((err) => {
          form.classList.add('is--sended-form');
          message.innerHTML = `Ops .. :(<br/> Erro ao realizar seu cadastro, <br/> tente novamente mais tarde.`;
          throw new Error(err);
        });
    });
  },

  _getUserData(form) {
    return {
      email: form.querySelector('.x-newsletter-input').value,
    };
  },
};

export default {
  init: Methods.init,
};
