import CacheSelector from './__cache-selectors';

const {
  description: { buttons, containers },
} = CacheSelector;

const Methods = {
  init() {
    Methods.openContainer();
  },
  openContainer() {
    [...buttons].map((button, index) => {
      button.addEventListener('click', (ev) => {
        ev.preventDefault();

         Methods.resetElements();
         ev.target.classList.add("is--opened");
         containers[index].classList.add("is--opened");

        return true;
      });
    });
  },
  resetElements() {
    [...containers, ...buttons].map(el => el.classList.remove('is--opened'));
  },
};

export default {
  init: Methods.init,
};
