import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.mainMenu;
const Methods = {
  init() {
    Methods.facebookShare();
  },

  facebookShare() {
    const $facebookButton = $('.js--facebook-share-btn');
    const _url = window.location.href;

    if ($facebookButton.length > 0) {
      $facebookButton.on('click', () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${_url}`,
          'facebook-share-dialog',
          'width=800,height=600',
        );

        return false;
      });
    }
  },
};

export default {
  init: Methods.init,
};
