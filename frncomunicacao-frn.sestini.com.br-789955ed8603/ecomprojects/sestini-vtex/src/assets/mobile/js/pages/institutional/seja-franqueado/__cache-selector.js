// const mainForm = document.querySelector('.js--institutional-form');

export default {
  self: $('.js--institutional-form'),
  inputs: {
    nameInput: $('.js--input-name'),
    emailInput: $('.js--input-email'),
    birthdateInput: $('.js--input-date'),
    genderInput: $('.js--input-genero'),
    telephoneInput: $('.js--input-telephone'),
    cellphoneInput: $('.js--input-cellphone'),
    cityInput: $('.js--input-cidade'), 
    stateInput: $('.js--input-uf'), 
    locationInput: $('.js--input-interesse'), 
    messageInput: $('.js--input-ideia'), 
    error: {
      self: $('.js--submit-error'),
      errorInput: $('.error'),
      errorBtn: $('.js--submit-error-btn'),
      errorMessage: $('.js--submit-error'),
    },            
    successMessage: $('.js--contact-success'),
  },
};
