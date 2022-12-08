import VMasker from 'vanilla-masker';

import CacheSelector from './__cache-selector';

import Contact from './contact-submit';

const { form, inputs } = CacheSelector;

const Methods = {
  init() {
    // Methods.handleInputFile();
    Methods.addMaskPattern();
    Methods.switchInputs();
    Methods.contact();
    // Methods.contactFormValidate();
  },
  handleInputFile() {
    form.inputFile.addEventListener('change', (ev) => {
      if (ev.currentTarget.files) {
        form.labelFile.innerHTML = ev.target.value.split('\\').pop();
      }
    });
  },
  addMaskPattern() {
    VMasker(inputs.cellphoneInput).maskPattern('(99) 99999-9999');
    VMasker(inputs.telephoneInput).maskPattern('(99) 9999-9999');
    VMasker(inputs.zipcodeInput).maskPattern('99999-999');
    VMasker(inputs.cpfInput).maskPattern('999.999.999-99');
  },

  switchInputs() {
    [...inputs.secondForm].forEach(item => {
      item.classList.add('is--hide');
    });

    inputs.subjectInput.on('change', (ev) => {
      if (ev.target.value == 'Dúvidas sobre pedido, pagamento ou prazo de entrega - Loja Virtual' || ev.target.value == 'Produtos com Defeito / Assistência Técnica') {
        [...inputs.firstForm].forEach(item => {
          item.classList.add('is--hide');
        });
        Methods.resetSecondForm();
      } else {
        [...inputs.secondForm].forEach(item => {
          item.classList.add('is--hide');
        });
        Methods.resetFirstForm();
      }
    });
  },

  resetFirstForm() {
    [...inputs.firstForm].forEach(item => {
      item.classList.remove('is--hide');
    });
  },

  resetSecondForm() {
    [...inputs.secondForm].forEach(item => {
      item.classList.remove('is--hide');
    });
  },
  
  cellphoneHandler(masks, max, event) {
    const currentInput = event.target;
    const currentMask = currentInput.value.replace(/\D/g, '');
    const maskToApply = currentInput.value.length > max ? 1 : 0;
    VMasker(currentInput).unMask();
    VMasker(currentInput).maskPattern(masks[maskToApply]);
    currentInput.value = VMasker.toPattern(currentMask, masks[maskToApply]);
  },

  contact() {    
    const El = CacheSelector;
    Contact.contactFormValidate(El);
    Contact.backToForm(El);    
  }
};

export default {
  init: Methods.init,
};
