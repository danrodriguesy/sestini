import CacheSelector from './__cache-selector';

const { breadcrumb } = CacheSelector;
const data = {
  isLoading: true,
  items: [
    {
      name: 'home',
      link: '/',
    },
  ],
};

const Methods = {
  init() {
    Methods.bindData();
    Methods.getData();
  },
  bindData() {
    rivets.bind(breadcrumb, {
      controller: {},
      breadcrumb: data,
    });
  },
  getData() {
    const allItems = window.location.pathname
      .split('/')
      .filter(el => el !== '');

    allItems.map((item, index) => {
      data.items.push({
        name: item.replace(/\-/gi, ' '),
        link: `/${allItems.slice(0, index + 1).join('/')}`,
      });
    });

    data.isLoading = false;
  },
};

export default {
  init: Methods.init,
};
