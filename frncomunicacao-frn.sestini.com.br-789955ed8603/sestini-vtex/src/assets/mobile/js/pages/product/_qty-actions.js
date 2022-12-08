import ProductRvData from '../../../../common/js/pages/product/_rv-data';
import CacheSelector from './__cache-selectors';

const { qtySelect } = CacheSelector;

const Methods = {
  init() {
    Methods.insertQtyOptions();
  },
  insertQtyOptions() {
    const valueToInsert = ProductRvData.skuQty < 99 ? ProductRvData.skuQty : 99;
    for (let i = 1; i <= valueToInsert; i++) {
      qtySelect.innerHTML
        += `<option value=${i}>${i <= 9 ? `0${i}` : i}</option>`;
    }
  },
};

export default {
  init: Methods.init,
};
