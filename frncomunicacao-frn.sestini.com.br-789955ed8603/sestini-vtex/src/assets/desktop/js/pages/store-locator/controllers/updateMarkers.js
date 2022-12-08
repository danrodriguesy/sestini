
const markers = [];

export const updateMarkers = ({ selectedStores, map }) => {
  markers.forEach(marker => marker.setMap(null));
  markers.length = 0;
  const bounds = new google.maps.LatLngBounds();

  selectedStores.map(({ lat, lng, ...rest }) => ({
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    rest,
  })).map(({ lat, lng, ...rest }) => ({
    lat: Math.min(Math.max(lat, -90), 90),
    lng: Math.min(Math.max(lng, -180), 180),
    rest,
  }))
  .forEach(({ lat, lng, nome }) => {
    // console.log(lat, lng, nome, Sestini.selectedStores.selectedStores);
    markers.push(new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map,
      title: nome,
    }));

    bounds.extend(new google.maps.LatLng(lat, lng));
  });

  map.fitBounds(bounds);

  setTimeout(() => {
    const zoom = map.getZoom() || 15;
    map.setZoom(Math.min(zoom, 15));
  }, 100);
};
