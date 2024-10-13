// Initialize the Leaflet map
const map = L.map('map').setView([37.5407, -77.4360], 10); // Default centered on Virginia

// Set up the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to fetch map data and create markers
function loadMapData(zipCode) {
    // Fetch latitude and longitude for the provided ZIP code
    fetch(`https://api.zippopotam.us/us/${zipCode}`)
        .then(response => response.json())
        .then(locationData => {
            const { latitude, longitude } = locationData.places[0];

            // Set the map view to the location of the ZIP code
            map.setView([latitude, longitude], 12); // Zoom level can be adjusted

            // Clear existing markers
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Fetch evacuation center data
            fetch("map-data.json")
                .then(response => response.json())
                .then(data => {
                    // console.log(data); 
                    data.forEach(center => {
                        // console.log(center);
                        const { name, latitude, longitude, address, phone, isGreen } = center;
                        console.log(longitude);
                        // Calculate the distance from the searched ZIP code location to center locations
                        const distance = map.distance([latitude, longitude], [latitude, longitude]);
                        if (distance < 50000) { // Check if within 50km; adjust as necessary
                            // Create marker with an arrow icon for each center
                            const marker = L.marker([latitude, longitude], {
                                icon: L.icon({
                                    iconUrl: 'icon.png', // Replace with the actual path to your arrow icon
                                    iconSize: [24, 24], // Size of the arrow icon
                                    iconAnchor: [12, 12], // Anchor point of the icon
                                })
                            }).addTo(map);

                            console.log("Address:", address);


                            const formattedAddress = typeof address === 'string' 
                            ? `<p>
                                <img src="pin.png" alt="Pin" width="20" height="20"> ${address.split(", ")[0]}<br>
                                ${address.split(", ")[1]}<br>
                                ${address.split(", ")[2]}
                            </p>`
                            : "<p>No Address Provided</p>";

                            // Create the content for the popup
                            const greenLeaf = isGreen ? '<img src="leaf.jpg" alt="Green Facility" width="20" height="20">' : ''; // Leaf icon
                            const phoneIcon = '<img src="phone.jpg" alt="Phone" width="20" height="20">'; 
                            const popupContent = `
                            <div class="popup-content">
                                <h3>${name}</h3>
                                <p style="margin: 0;">${formattedAddress}</p>
                                <p style="margin: 2px 0;">${phoneIcon} ${phone}</p>
                                <p>${isGreen ? 'Green Facility' : 'Non-Green Facility'} ${greenLeaf}</p>
                            </div>
                         `;

                            // Popup content for each marker
                            marker.bindPopup(popupContent, {
                                maxWidth: 200, // Limit popup width
                                closeButton: true // Optional close button
                            });
                        }
                    });
                })
                .catch(error => {
                    console.error("Error loading the map data:", error);
                });
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
            alert("Invalid ZIP Code. Please try again.");
        });
}

// Search button event listener
document.getElementById("search-button").addEventListener("click", function () {
    const zipCode = document.getElementById("location").value;
    if (zipCode) {
        loadMapData(zipCode);
    } else {
        alert("Please enter a valid ZIP Code.");
    }
});




