var initMap = () => {
  let casa = {
    lat: -12.173045,
    lng: -77.005913
  };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: casa
  });
  var latitud, longitud;
  var success = (position) => {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    map.setZoom(18);
    map.setCenter({
      lat: latitud,
      lng: longitud
    });
    var myubication = new google.maps.Marker({
      position: {
        lat: latitud, 
        lng: longitud},
      map: map
    });
  };
  var error = (error) =>{
    alert('Tenemos un error al localizar su ubicación');
  };
  var search = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  document.getElementById('encuentrame').addEventListener('click', search);
  var inputStart = document.getElementById('start');
  var inputEnd = document.getElementById('end');
  new google.maps.places.Autocomplete(inputStart); 
  new google.maps.places.Autocomplete(inputEnd);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var calculateAndDisplayRoute = (directionsService, directionsDisplay) =>{
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
  var traceRoute = ()=>{
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('ruta').addEventListener('click', traceRoute);
};


