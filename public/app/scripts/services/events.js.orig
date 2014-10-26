angular.module('app').factory('events', function ($http) {
	var fEvent = {};

	fEvent.events = [];

	fEvent.addEvent = function (event) {
		console.log("USING EVENT SERVICE TO ADD MARKER");
		console.log(event);
		fEvent.events.push({
			marker: {
				coords: {
					latitude: event.lat,
					longitude: event.lon
				},
				id: fEvent.events.length
			},
			circle: {
				center: {
					latitude: event.lat,
					longitude: event.lon
				},
				radius: 700,
				stroke: {
					color: '#b20808',
					weight: 2,
					opacity: 0.5
				},
				fill: {
					color: '#f22828',
					opacity: 0.3
				},
				id: fEvent.events.length
			}
		});
	};

	$http.get('/api/getEvents').success(function (data) {
		data.forEach(function (i) {
			fEvent.addEvent({lat: i.coordinates.lat, lon: i.coordinates.lon});
		});
	});

	return fEvent;
});