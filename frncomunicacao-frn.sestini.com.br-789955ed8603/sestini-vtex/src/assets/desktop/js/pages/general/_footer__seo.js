import CacheSelectors from './__cache-selectors';

const { footer } = CacheSelectors;

const Methods = {
  init() {
    Methods.handleSeoContainer();
  },
  handleSeoContainer() {
    footer.seoContainer.classList.add('is--opened');
    [...footer.seoButton].map(button => button.addEventListener('click', (ev) => {
      ev.preventDefault();
      footer.seoContainer.classList.contains('is--opened')
        ? footer.seoContainer.classList.remove('is--opened')
        : footer.seoContainer.classList.add('is--opened');
    }));
  },
};

export default {
  init: Methods.init,
};
