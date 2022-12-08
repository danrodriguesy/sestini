import Headroom from 'headroom.js';
import CacheSelector from './__cache-selector';

const { filter } = CacheSelector;
const Methods = {
  init() {
    Methods.pinFilterButton();
  },

  pinFilterButton() {
    const headroom = new Headroom(filter.filterContainer);
    headroom.init();
  },
};

export default {
  init: Methods.init,
};
