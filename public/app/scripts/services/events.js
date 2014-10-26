angular.module('app').factory('events', function ($rootScope, $http) {
	var fEvent = {};

	fEvent.events = [];

	fEvent.addEvent = function (event) {
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
	
	fEvent.setEvent = function(event) {
		$rootScope.selectedEvent = event;
	};

	$http.get('/api/getEvents').success(function (data) {
		data.forEach(function (i) {
			fEvent.addEvent({name: i.name, lat: i.lat, lon: i.lon, users: i.users, owner_id: i.owner_id, _id: i._id});
		});
	});

	return fEvent;
});