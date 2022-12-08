import '../../vendor/vtex-category-filter-init.js';

import Main from './_main';
import OrderBy from './_order-by';

const init = () => {
  Main.init();
  OrderBy.init();
};

export default {
  init,
};
