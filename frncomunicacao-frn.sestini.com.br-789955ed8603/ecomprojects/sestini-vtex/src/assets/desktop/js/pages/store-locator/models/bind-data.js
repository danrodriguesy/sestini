import CacheSelectors from '../__cache-selectors';
import { controller } from '../controllers';

const { mapContainer, mainContainer } = CacheSelectors;

export const bindData = data => Sestini.storeLocator = rivets.bind(mainContainer, {
  storeLocator: {
    controller,
    ...data,
    selectedStores: data.stores,
    map: new google.maps.Map(mapContainer),
  },
}).models;
