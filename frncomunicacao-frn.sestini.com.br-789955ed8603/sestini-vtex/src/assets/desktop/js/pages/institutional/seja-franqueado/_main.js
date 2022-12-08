import VMasker from 'vanilla-masker';

import CacheSelector from './__cache-selector';

import Contact from './contact-submit';

const { inputs } = CacheSelector;

const Methods = {
  init() {
    Methods.addMaskPattern();
    Methods.contact();
  },
  addMaskPattern() {
    const masksToUse = ['(99) 99999-9999', '(99) 99999-9999'];

    VMasker(inputs.birthdateInput).maskPattern('99/99/9999');
    VMasker(inputs.cellphoneInput).maskPattern(masksToUse[0]);
    VMasker(inputs.telephoneInput).maskPattern('(99) 9999-9999');

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
  },
};

export default {
  init: Methods.init,
};
