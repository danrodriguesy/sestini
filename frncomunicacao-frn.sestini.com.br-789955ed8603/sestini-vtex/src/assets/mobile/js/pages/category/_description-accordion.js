import CacheSelector from './__cache-selector';

const { filter, description } = CacheSelector;
const Methods = {
  init() {
    Methods.handleDescriptionClick();
  },

  handleDescriptionClick() {
    description.text.click((el) => {
      description.text.toggleClass("is--opened");
    })
  },
};

export default {
  init: Methods.init,
};
