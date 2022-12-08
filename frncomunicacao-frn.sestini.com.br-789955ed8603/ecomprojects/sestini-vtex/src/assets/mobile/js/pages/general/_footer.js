import CacheSelector from './__cache-selector';

const {
  footer: { seoButtons, seoContainers },
} = CacheSelector;

const Methods = {
  init() {
    Methods.openContainer();
  },
  openContainer() {
    [...seoButtons].map((button, index) => {
      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        if(!$(ev.target).hasClass('is--opened')){
          Methods.resetElements();
          ev.target.classList.add("is--opened");
          seoContainers[index].classList.add("is--opened");
        }else{
          Methods.resetElements();
        }

      });
    });
  },
  resetElements() {
    [...seoContainers, ...seoButtons].map(el => el.classList.remove('is--opened'));
  },
};

export default {
  init: Methods.init,
};
