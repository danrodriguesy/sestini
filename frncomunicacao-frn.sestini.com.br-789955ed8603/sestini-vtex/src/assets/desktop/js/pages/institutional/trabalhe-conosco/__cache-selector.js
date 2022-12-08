const mainForm = document.querySelector('.js--institutional-form');

export default {
  mainForm,
  inputs: {
    dateInput: mainForm.querySelector('.js--input-date'),
    cellphoneInput: mainForm.querySelector('.js--input-cellphone'),
    telephoneInput: mainForm.querySelector('.js--input-telephone'),
  },
  form: {
    inputFile: document.querySelector('.js--input-cv'),
    labelFile: document.querySelector('.js--label-cv'),
  },
};
