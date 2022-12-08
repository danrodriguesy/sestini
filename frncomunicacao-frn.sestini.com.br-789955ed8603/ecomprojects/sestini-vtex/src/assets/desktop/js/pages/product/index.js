import Common from '../../../../common/js/pages/Product';
import MainImages from './_images';
import MainShelf from './_main-shelf';
import DescriptionActions from './_description-actions';
import BottomBuyBar from './_bottom-buy-bar';

const init = () => {
  Common.init();
  MainImages.init();
  MainShelf.init();
  DescriptionActions.init();
  BottomBuyBar.init();
  // Change label text trustvox
  setTimeout(() => {
    $('#_sincero_widget > section.ts-customer-questions > div > div > div > textarea').attr('placeholder', 'Digite aqui...')
    $('#_sincero_widget > section.ts-customer-questions > div > div > div > button').html('Enviar')
  }, 2000);
};

export default {
  init,
};
