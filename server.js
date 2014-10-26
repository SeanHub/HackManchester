var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public/app'));

app.get('/', function (req, res) {
	res.sendfile('./public/app/index.html');
});

app.get('/api/getEvents', function (req, res) {
	res.json([
		{
			coordinates: {
				lat: 53.487,
				lon: -2.274
			},
			name: "Magic",
			members: [
				{
					id: 8
				},
				{
					id: 15
				}
			]
		},
		{
			coordinates: {
				lat: 53.457,
				lon: -2.254
			},
			name: "Madness",
			members: [
				{
					id: 12
				},
				{
					id: 7
				}
			]
		}
	]);
});

app.all('*', function (req, res) {
	res.statusCode = 404;
	res.sendfile('./public/app/404.html');
});

app.listen(8000);