export default {
  activeMenu(menu) {
    menu.link.map((i, item) => {
      const $this = $(item);
      const href = $this.attr('href');
      const pathname = Sestini.globalHelpers.contains(
        '_secure',
        Sestini.pathname,
      )
        ? Sestini.globalHelpers.strReplace(
          ['/_secure'],
          '',
          Sestini.pathname,
        )
        : Sestini.pathname;

      if (pathname === href) {
        $this.parent().addClass('is--active');
      }
    });
  },

  mobileArccordion(menu, page) {
    this._menuLinksReorder(menu);

    menu.items.on('click', `.js--${page}-menu-link`, (ev) => {
      const $this = $(ev.currentTarget);

      menu.items.toggleClass('is--active');

      if ($this.parent().hasClass('is--active')) {
        ev.preventDefault();

        $this.parent().toggleClass('is--rotate');
        $this
          .parent()
          .siblings()
          .slideToggle();
      }
    });
  },

  /**
     * @access private
     */
  _menuLinksReorder(menu) {
    let index = 0;

    for (let i = 0, len = menu.item.length; i < len; i += 1) {
      menu.items.empty();

      if ($(menu.item[i]).hasClass('is--active')) {
        index = i;
      }
    }

    menu.items.append(menu.item);
    menu.items.prepend(menu.item[index]);
  },
};
