const fetchConfig = {
  headers: {
    'REST-Range': 'resources=0-1000',
  },
};
export const getStores = () => fetch('/api/dataentities/SL/search?_sort=nome ASC&_fields=id,bairro,cidade,complemento,endereco,estado,lat,lng,nome,numero,celular,horario,email,telefone', fetchConfig)
  .then(res => res.json())
  .then((data) => {
    const stores = data
      .filter(store => store.lat && store.lng)
      .map(({
        id, bairro, cidade, complemento, endereco, estado, lat, lng, nome, numero, celular, horario, email, telefone,
      }) => ({
        id,
        nome,
        lat,
        lng,
        celular,
        cidade,
        estado,
        horario,
        email,
        contato: `${telefone} ${celular ? `| ${celular}` : ''}`,
        address: `${endereco}, ${numero} ${complemento || ''} - ${bairro} - ${cidade}/${estado}`,
      }));

    const states = stores
      .map(({ estado }) => ({
        nome: estado,
        stores: stores.filter(store => store.estado === estado),
      }))
      .filter(({ nome }, index, array) => array.findIndex(estado => estado.nome === nome) === index)
      .sort(({ nome: a }, { nome: b }) => a.localeCompare(b));
    const cities = stores
      .map(( { cidade, estado }) => ({
        nome: cidade,
        estado: estado,
        stores: stores.filter(store => store.cidade === cidade),
      }))
      .filter(({ nome }, index, array) => array.findIndex(cidade => cidade.nome === nome) === index)
      .sort(({ nome: a }, { nome: b }) => a.localeCompare(b));

    return {
      states,
      cities,
      stores,
      availableCities: [],
      selectedStores: stores,
    };
  });
