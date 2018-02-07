var initMap = () => {
  let casa = {
    lat: -12.173045,
    lng: -77.005913
  };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: casa
  });
  let latitud, longitud;
  let success = (position) => {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    map.setZoom(18);
    map.setCenter({
      lat: latitud,
      lng: longitud
    });
    let myubication = new google.maps.Marker({
      position: {
        lat: latitud, 
        lng: longitud},
      map: map
    });
  };
  let error = (error) =>{
    alert('Tenemos un error al localizar su ubicación');
  };
  let search = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  document.getElementById('encuentrame').addEventListener('click', search);
  let inputStart = document.getElementById('start');
  let inputEnd = document.getElementById('end');
  new google.maps.places.Autocomplete(inputStart); 
  new google.maps.places.Autocomplete(inputEnd);
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let calculateAndDisplayRoute = (directionsService, directionsDisplay) =>{
    directionsService.route({
      origin: inputStart.value,
      destination: inputEnd.value,
      travelMode: 'DRIVING'
    }, (response, status)=>{
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('no encontramos la ruta');
      }
    });
  };
  directionsDisplay.setMap(map);
  let traceRoute = ()=>{
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('ruta').addEventListener('click', traceRoute);
};


