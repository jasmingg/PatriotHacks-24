// Define the latitude and longitude coordinates of George Mason
// We've set it as the center for the map when it first loads
var latLng = [38.83258680733361, -77.3059053079477];
        
var bounds = L.latLngBounds(
    [38.665, -77.520], // Southwest corner of Fairfax County
    [39.030, -77.150]  // Northeast corner of Fairfax County
);

// Initializing the map
var map = L.map('map').setView(latLng, 13);

map.setMaxBounds(bounds);

// Add a tile layer to the map (this is like the base map that was provided on Leaflet.js website)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// List of dummy test locations as examples of different areas and the sustainability scores
var predefinedLocations = [
    {
        coords: [38.8308, -77.307500],
        title: "George Mason University",
        description: "Home to Patriots!",
        color: "yellow",
        sustainabilityScore: 60 // Adding a sustainability score
    },
    {
        coords: [38.7551141, -77.296096],
        title: "Burke Lake Park",
        description: "Enjoy the weekend with family",
        color: "green",
        sustainabilityScore: 85
    },
    {
        coords: [38.90181820828413, -77.52742076176241],
        title: "Braddock Road",
        description: "A busy road spotted with isolated houses.",
        color: "red",
        sustainabilityScore: 20
    }
];

// By looping through predefinedLocations, this adds markers to the map
predefinedLocations.forEach(function(location) {
    var circleMarker = L.circleMarker(location.coords, {
        color: location.color,      // Outline color
        fillColor: location.color,  // Fill color
        fillOpacity: 0.5,           // Transparency of the marker
        radius: 20                 // Radius of the circle marker
    }).addTo(map);

    // Bind a popup to each marker
    circleMarker.bindPopup("<strong>" + location.title + "</strong><br>" + location.description);

    // Add an event listener to update the card when the marker is clicked
    circleMarker.on('click', function() {
        updateSustainabilityScore(location.sustainabilityScore, location.color, location.title, location.description);
    });
});