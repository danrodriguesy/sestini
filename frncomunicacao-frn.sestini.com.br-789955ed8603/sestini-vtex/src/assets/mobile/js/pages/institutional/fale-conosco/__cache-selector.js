// const mainForm = $('.js--institutional-form');

export default {
  self: $('.js--institutional-form'),
  inputs: {
    firstForm: $('.js--first-form'),
    secondForm: $('.js--second-form'),
    subjectInput: $('.js--input-subject'),
    subjectOptions: $('.js--input-subject-option'),
    nameInput: $('.js--input-name'),
    surnameInput: $('.js--input-surname'),
    emailInput: $('.js--input-email'),
    telephoneInput: $('.js--input-telephone'),
    cellphoneInput: $('.js--input-cellphone'),
    zipcodeInput: $('.js--input-zipcode'),
    addressInput: $('.js--input-address'),
    numberInput: $('.js--input-number'),
    complementInput: $('.js--input-complemento'),
    neighbourhoodInput: $('.js--input-bairro'),
    cityInput: $('.js--input-cidade'),
    stateInput: $('.js--input-estado'),
    messageInput: $('.js--input-mensagem'),
    cpfInput: $('.js--input-cpf'),
    orderInput: $('.js--input-order'),
    completeNameInput: $('.js--input-complete-name'),
    error: {
      self: $('.js--submit-error'),
      errorInput: $('.error'),
      errorBtn: $('.js--submit-error-btn'),
      errorMessage: $('.js--submit-error'),
    },            
    successMessage: $('.js--contact-success'),
  },
};
