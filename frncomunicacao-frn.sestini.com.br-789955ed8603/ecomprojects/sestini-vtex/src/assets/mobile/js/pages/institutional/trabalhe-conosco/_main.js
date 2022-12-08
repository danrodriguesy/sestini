import VMasker from 'vanilla-masker';

import CacheSelector from './__cache-selector';

const { form, inputs } = CacheSelector;

const Methods = {
  init() {
    Methods.handleInputFile();
    Methods.addMaskPattern();
  },
  handleInputFile() {
    form.inputFile.addEventListener('change', (ev) => {
      if (ev.currentTarget.files) {
        form.labelFile.innerHTML = ev.target.value.split('\\').pop();
      }
    });
  },
  addMaskPattern() {
    const masksToUse = ['(99) 9999-9999', '(99) 99999-9999'];

    VMasker(inputs.dateInput).maskPattern('99/99/9999');
    VMasker(inputs.cellphoneInput).maskPattern(masksToUse[0]);
    VMasker(inputs.telephoneInput).maskPattern('(99) 9999-9999');

    inputs.cellphoneInput.addEventListener('input', Methods.cellphoneHandler.bind(undefined, masksToUse, 14), false);
  },
  cellphoneHandler(masks, max, event) {
    const currentInput = event.target;
    const currentMask = currentInput.value.replace(/\D/g, '');
    const maskToApply = currentInput.value.length > max ? 1 : 0;
    VMasker(currentInput).unMask();
    VMasker(currentInput).maskPattern(masks[maskToApply]);
    currentInput.value = VMasker.toPattern(currentMask, masks[maskToApply]);
  },
};

export default {
  init: Methods.init,
};
