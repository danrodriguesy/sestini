import Common from '../../../../common/js/pages/category';
import FilterButton from './_filter-button';
import DescriptionAccordion from './_description-accordion';

const init = () => {
  Common.init();
  FilterButton.init();
  DescriptionAccordion.init();
};

export default {
  init,
};
