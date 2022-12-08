
import { updateMarkers } from './updateMarkers';

export const changeStore = ({ currentTarget: input }) => {
  Sestini.storeLocator.storeLocator.selectedStores = Sestini.storeLocator.storeLocator.stores.filter(({ id }) => input.value === id);
  updateMarkers(Sestini.storeLocator.storeLocator);
};
