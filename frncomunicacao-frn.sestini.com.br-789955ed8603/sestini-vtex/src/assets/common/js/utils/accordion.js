
export default {
  accordionAction(pageType) {
    $(document).on('click', `.js--${pageType}-accordion-title`, (ev) => {
      const $this = $(ev.currentTarget);
      const $accordionContent = $this.next();
      const $siblings = $this.parent().siblings();
      const $accordionsContent = $siblings.find(`.js--${pageType}-accordion-content`);
      const $accordionsTitle = $siblings.find(`.js--${pageType}-accordion-title`);

      $accordionsTitle.removeClass('is--active');
      $this.toggleClass('is--active');

      $accordionsContent.slideUp();
      $accordionContent.slideToggle();
    });
  },
};
