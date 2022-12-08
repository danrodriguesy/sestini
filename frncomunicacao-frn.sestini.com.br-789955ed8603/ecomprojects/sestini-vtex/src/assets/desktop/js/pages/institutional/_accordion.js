import CacheSelector from './__cache-selector';

const {
   accordionWrapper, accordionButton
} = CacheSelector;

const Methods = {
  init() {
    Methods.accordionToggle();
  },
  accordionToggle() {
      [...accordionButton].map((item, index) => {
          item.addEventListener('click', (ev) => {
            ev.preventDefault();
            !ev.currentTarget.classList.contains('is--opened')
            ? (Methods.resetElements(),
            ev.currentTarget.classList.add('is--opened'),
            accordionWrapper[index].classList.add('is--opened'))
            : Methods.resetElements();
      });
    });
  },
  resetElements() {
    [...accordionWrapper, ...accordionButton].map(el => el.classList.remove('is--opened'));
  },
};

export default {
  init: Methods.init,
};
