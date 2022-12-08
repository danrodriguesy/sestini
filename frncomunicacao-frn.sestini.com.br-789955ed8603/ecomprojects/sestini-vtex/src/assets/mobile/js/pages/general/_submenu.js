import CacheSelector from './__cache-selector';

const { submenu } = CacheSelector;

const Methods = {
  init() {
    Methods.openSubmenu();
    Methods.closeSubmenu();
    Methods.handleAccordions();
  },
  openSubmenu() {
    [...submenu.openSubmenu].map((button, index) => {
      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        submenu.submenuDepartments[index].classList.add('is--active');
      });
    });
  },
  closeSubmenu() {
    [...submenu.closeSubmenu].map((button) => {
      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        Methods.resetElements();
      });
    });
  },
  handleAccordions() {
    [...submenu.departmentsAccordion].map((button, index) => {
      button.addEventListener('click', (ev) => {
        !ev.currentTarget.classList.contains('is--opened')
          ? (Methods.resetAccordions(),
          ev.currentTarget.classList.add('is--opened'),
          submenu.departmentsAccordion[index].classList.add('is--opened'))
          : Methods.resetAccordions();
      });
    });
  },
  resetAccordions() {
    [
      ...submenu.departmentsAccordionButton,
      ...submenu.departmentsAccordion,
    ].map(el => el.classList.remove('is--opened'));
  },
  resetElements() {
    [...submenu.submenuDepartments].map(item => item.classList.remove('is--active'));
  },
};

export default {
  init: Methods.init,
};
