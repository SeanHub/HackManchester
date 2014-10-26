angular.module('app').factory('events', function ($http, $rootScope) {
	var fEvent = {};

	fEvent.events = [];

	fEvent.addEvent = function (event) {
		$http.post('/api/addEvent', {
			lat: event.lat,
			lon: event.lon,
			name: event.name,
			tags: event.tags,
			owner_id: event.owner_id
		}).success(function (data, status, headers, config) {
			fEvent.pushEvent(event);
		});
	};

	fEvent.pushEvent = function (event) {
		fEvent.events.push({
			name: event.name,
			tags: [],
			users: [],
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

	fEvent.setEvent = function (event) {
		$rootScope.selectedEvent = event;
	};

	fEvent.getEvents = function () {
		$http.get('/api/getEvents').success(function (data) {
			data.forEach(function (i) {
				fEvent.pushEvent(i);
			});
		});
	};

	fEvent.getEvents();

	return fEvent;
});