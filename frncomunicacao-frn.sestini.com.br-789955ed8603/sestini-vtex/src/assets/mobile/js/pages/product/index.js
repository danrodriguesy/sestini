import Common from '../../../../common/js/pages/product';
import MainImages from './_images';
import QtyActions from './_qty-actions';
import DescriptionActions from './_description-actions';
import MainShelf from './_main-shelf';

const init = () => {
  Common.init();
  MainImages.init();
  QtyActions.init();
  DescriptionActions.init();
  MainShelf.init();
  setTimeout(() => {
    $('#_sincero_widget > section.ts-customer-questions > div > div > div > textarea').attr('placeholder', 'Digite aqui...')
    $('#_sincero_widget > section.ts-customer-questions > div > div > div > button').html('Enviar')
    if ($('.js--add-to-cart').html() == 'indisponível') {
      $('.js--add-to-cart').parent().css("max-width", '100%')
    }
  }, 2000);
};

export default {
  init,
};
