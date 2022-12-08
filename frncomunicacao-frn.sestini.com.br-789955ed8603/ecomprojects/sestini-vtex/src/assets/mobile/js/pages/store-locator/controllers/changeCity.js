import {
  updateMarkers
} from './updateMarkers';

export const changeCity = ({
  currentTarget: select
}) => {
  Sestini.storeLocator.storeLocator.selectedStores = Sestini.storeLocator.storeLocator.stores = Sestini.storeLocator.storeLocator.cities.find(({
    nome
  }) => select.value === nome).stores;
  updateMarkers(Sestini.storeLocator.storeLocator);
};
