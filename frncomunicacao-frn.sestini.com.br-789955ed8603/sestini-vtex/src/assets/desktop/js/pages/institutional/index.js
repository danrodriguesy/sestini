import InstitutionalMain from './_main';
import InstitutionalBreadcrumb from './_breadcrumb';
import InstitutionalAccordion from './_accordion';


const init = () => {
  InstitutionalMain.init();
  InstitutionalBreadcrumb.init();
  InstitutionalAccordion.init();
};

export default {
  init,
};
