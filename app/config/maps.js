import React from 'react';

export default class Maps {

	static instance = null;
	static getInstance() {
		if(Maps.instance == null) {
			Maps.instance = new Maps();
		}

		return Maps.instance;
	}

getMap(adres){
	let script = '\r\n\t\tvar geocoder;\r\n\tvar map;\r\n\tvar address = \"'+adres+'\";\r\n\tfunction initMap() {\r\n\t  var map = new google.maps.Map(document.getElementById(\"map\"), {\r\n\t\tzoom: 15,\r\n\t\tdisableDefaultUI: true,\r\n\t\tzoomControl: false,\r\n\t\tscrollwheel: false,\r\n\t\tnavigationControl: false,\r\n\t\tmapTypeControl: false,\r\n\t\tscaleControl: false,\r\n\t\tdraggable: false,\r\n\t\tcenter: {lat: -34.397, lng: 150.644}\r\n\t  });\r\n\t  geocoder = new google.maps.Geocoder();\r\n\t  codeAddress(geocoder, map);\r\n\t}\r\n\r\n\tfunction codeAddress(geocoder, map) {\r\n\t  geocoder.geocode({\'address\': address}, function(results, status) {\r\n\t\tif (status === \'OK\') {\r\n\t\t  map.setCenter(results[0].geometry.location);\r\n\t\t  var marker = new google.maps.Marker({\r\n\t\t\tmap: map,\r\n\t\t\tposition: results[0].geometry.location\r\n\t\t  });\r\n\t\t} else {\r\n\t\t  alert(\'Geocode was not successful for the following reason: \' + status);\r\n\t\t}\r\n\t  });\r\n\t}\r\n\t    ';

	let htmlOne = '<html>\n'+
	  '<head>\n'+
		'<title>Disabling the Default UI</title>\n'+
		'<style>\n'+
		 ' #map {\n'+
			'height: 100%;\n'+
		  '}\n'+
		  'html, body {\n'+
			'height: 100%;\n'+
			'margin: 0;\n'+
			'padding: 0;\n'+
		  '}\n'+
		'</style>\n'+
	  '</head>\n'+
	  '<body>\n'+
		'<div id="map"></div>\n'+
		'<script>';

	let htmlTwo = '</script>\n'+
	'<script async defer\n'+
	'src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlHhXzz2tr1rZC0ia_7XgiCSLEDB4Dl5c&callback=initMap">\n'+
	'</script>\n'+
 ' </body>\n'+
'</html>';

	return htmlOne + script + htmlTwo;
	}
}
