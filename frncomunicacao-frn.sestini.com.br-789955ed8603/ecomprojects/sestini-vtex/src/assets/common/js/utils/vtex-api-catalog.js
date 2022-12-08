import { stringify } from 'querystring';

const SEARCH_URL = '/api/catalog_system/pub/products/search/';

function formatParams(idsArr, type = false) {
  const ids = idsArr.map((id) => (type === 'sku' ? `skuId:${id}` : `productId:${id}`));

  return ids;
}

export const searchProductArray = (ids) => {
    const buildQuery = stringify({ fq: formatParams(ids) });

    return fetch(`${SEARCH_URL}?${buildQuery}`)
      .then((res) => res.json());
};
