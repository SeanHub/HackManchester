angular.module('app', ['ui.bootstrap', 'google-maps'.ns(), 'snap'])

.config(['GoogleMapApiProvider'.ns(), 'snapRemoteProvider',
	function (GoogleMapApi, snapRemoteProvider) {
		snapRemoteProvider.globalOptions.disable = 'right';
		GoogleMapApi.configure({
			v: '3.17'
		});
}]);