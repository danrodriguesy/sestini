import '../../vendor/vtex-category-filter-init.js';

import Main from './_main';
import BuildFilters from './_build-filters';
import FiltersActions from './_filters-actions';

const init = () => {
  Main.init();
  BuildFilters.init();
  FiltersActions.init();
};

export default {
  init,
};
