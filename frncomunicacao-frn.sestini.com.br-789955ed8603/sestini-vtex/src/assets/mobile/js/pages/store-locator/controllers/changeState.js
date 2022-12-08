import {
  updateMarkers
} from './updateMarkers';

export const changeState = ({
  currentTarget: select
}) => {
  Sestini.storeLocator.storeLocator.selectedStores = Sestini.storeLocator.storeLocator.stores = Sestini.storeLocator.storeLocator.states.find(({
    nome
  }) => select.value === nome).stores;
  
  const cities = Sestini.storeLocator.storeLocator.selectedStores.map(({
    cidade
  }) => ({
    nome: cidade
  }));

  Sestini.storeLocator.storeLocator.availableCities = Array.from(new Set(cities.map(JSON.stringify))).map(JSON.parse);

  updateMarkers(Sestini.storeLocator.storeLocator);
};
