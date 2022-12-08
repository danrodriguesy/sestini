import { bindData } from './bind-data';
import { getStores } from './get-stores';
import { updateMarkers } from '../controllers/updateMarkers';

export default {
  init() {
    getStores().then(bindData).then(({ storeLocator }) => storeLocator).then(updateMarkers);
  },
};
