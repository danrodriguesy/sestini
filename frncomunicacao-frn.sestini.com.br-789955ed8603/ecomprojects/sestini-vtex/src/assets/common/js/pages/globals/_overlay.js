const Methods = {
  init() {
    Methods.closeOverlay();
  },

  closeOverlay() {
    Sestini.overlay.on('click', (ev) => {
      Sestini.closeMenus(true);
    });

    Sestini.menuOverlay.on('click', (ev) => {
      Sestini.closeMenus(true);
    });

    Sestini.searchOverlay.on('click', (ev) => {
      Sestini.closeMenus(true);
    });
  },
};

export default {
  init: Methods.init,
};
