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

         if (ev.currentTarget.classList.contains("is--opened")) {
           Methods.resetElements();
           return;
         }

         Methods.resetElements();
         ev.currentTarget.classList.add("is--opened");
         containers[index].classList.add("is--opened");

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
