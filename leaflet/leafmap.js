/*
 * Create and return the map- object
 */

var accuracyCircle = null;

function createLeafletMap()
{
	
	var map = L.map('map').fitWorld();

	var perus  = L.tileLayer('http://tiles.kartat.kapsi.fi/peruskartta/{z}/{x}/{y}.jpg', {
		attribution: '&copy; <a href="http://maanmittauslaitos.fi">Maanmittauslaitos</a>'
		});

	var orto  = L.tileLayer('http://tiles.kartat.kapsi.fi/ortokuva/{z}/{x}/{y}.jpg', {
		attribution: '&copy; <a href="http://maanmittauslaitos.fi">Maanmittauslaitos</a>'
		});

	perus.addTo(map);

	var baseMaps = {
    
	"Peruskartta": perus,
    "Ilmakuva": orto
    };

	var overlayMaps = {
	
	"OL1": perus,
	};

	L.control.layers(baseMaps, overlayMaps).addTo(map);

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);

 	map.addControl(new customControl());
	return map;
}

/*
	Center when map finds location
*/
function onLocationFound(e) {
		
		map.setZoom(16);
		accuracyCircle = L.circle(e.latlng, 200);
		map.addLayer(accuracyCircle);
		setTimeout(function(){
			map.removeLayer(accuracyCircle);
		}, 5000);
  	}

function onLocationError(e) {
	alert(e.message);
}

function locateMap()
{
	map.locate({setView: true, maxZoom: 16});
	
}

var marker = L.divIcon({
		className: 'ringicon',
        /*
		iconUrl: 'marker.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [15, 15]
		*/
    });



