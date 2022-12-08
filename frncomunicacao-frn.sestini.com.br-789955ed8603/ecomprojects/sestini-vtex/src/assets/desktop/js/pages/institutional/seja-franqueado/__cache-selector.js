// const mainForm = document.querySelector('.js--institutional-form');

export default {
  
  self: $('.js--institutional-form'),
  popupMessage: $('.js--message-popup'), 
  inputs: {
    nameInput: $('.js--input-name'),
    emailInput: $('.js--input-email'),
    birthdateInput: $('.js--input-date'),
    genderInput: $('.js--input-genero'),
    telephoneInput: $('.js--input-telephone'),
    cellphoneInput: $('.js--input-cellphone'),
    cityInput: $('.js--input-cidade'), 
    ufInput: $('.js--input-uf'), 
    locationInput: $('.js--input-interesse'), 
    messageInput: $('.js--input-ideia'), 
    popup: {
      body: $('.is--institutional'),
      self: $('.js--message-popup'),
      successMessage: $('.js--contact-success'),
      errorMessage: $('.js--submit-error'),
      closeBtn: $('.js--close-button'),
      overlay: $('.js--overlay'),
    }, 
  },
};
