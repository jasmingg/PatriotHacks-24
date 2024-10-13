 // Define the latitude and longitude coordinates
 var latLng = [38.83258680733361, -77.3059053079477];
        
 var bounds = L.latLngBounds(
 [38.665, -77.520], // Southwest corner
 [39.030, -77.150]  // Northeast corner
);

 // Initialize the map and set its view to the chosen geographical point and zoom level
 var map = L.map('map').setView(latLng, 13);

 map.setMaxBounds(bounds);

 // Add a tile layer to the map (this is like the base map)
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; OpenStreetMap contributors'
 }).addTo(map);

 // map.setMinZoom(15)

 var predefinedLocations = [
  {
      coords: [38.8308, -77.307500],
      title: "George Mason University",
      description: "Home to Patriots!",
      color: "yellow"
  },
  {
      coords: [38.7551141, -77.296096],
      title: "Burke Lake Park",
      description: "Enjoy the weekend with family",
      color: "green"
  },
  {
      coords: [38.837000, -77.330000],
      title: "Location 3",
      description: "This is a description for Location 3."
  }
];

// Loop through predefined locations and add markers to the map
predefinedLocations.forEach(function(location) {
  var circleMarker = L.circleMarker(location.coords, {
      color: location.color,      // Outline color
      fillColor: location.color,  // Fill color
      fillOpacity: 0.5,           // Transparency of the marker
      radius: 20                 // Radius of the circle marker
  }).addTo(map);

    // Bind a popup to each marker
    circleMarker.bindPopup("<strong>" + location.title + "</strong><br>" + location.description);
});