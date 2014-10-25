angular.module('app', ['ng-polymer-elements', 'google-maps'.ns()])

.config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
  GoogleMapApi.configure({
    v: '3.17'
  });
}])