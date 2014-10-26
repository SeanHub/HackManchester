var express = require('express');
var app = express();


app.get('/', function (req, res) {
	res.sendfile('./public/app/index.html');
});


var MONGOHQ_URL="mongodb://admin:Maxpassword124@linus.mongohq.com:10030/groupData";
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var BSON = mongodb.BSONPure;

var bodyParser= require('body-parser');
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded({extended:true}));

var dbConnection = null;
mongoClient.connect(MONGOHQ_URL, function(err,db){
	err ? console.log(err) : dbConnection = db;

	var userObj = { name: "Corrie", _id:"544c66fb38f2c584111f8179"};
	var eventObj = { name:"Hack Manchester", _id: "544c654526bdf3d81387028b", "lat":"53","lon":"-2","tags":["lol","lolz"],"users":[]};
	//addEvents(eventObj);
	//userAddEvent(userObj,eventObj);
	//userLeaveEvent(userObj,eventObj);
	//removeUser(userObj);
	//removeEvent(eventObj);

	// var events = dbConnection.collection('events');
	// var event;
	// events.find().toArray(function(err,result){
	// 	if(err) {
	// 		console.log(err);
	// 	} else {
	// 		event = result[0];
	// 		removeEvent(event);
	// 	}
	// });

});


app.use(express.static(__dirname + '/public/app'));

// ====================== end points ======================

// get all events
app.get('/api/getEvents', function(req, res){
	var events = dbConnection.collection('events');
	res.statusCode = 200;
	events.find().toArray(function(err,result){
		if(err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

// get all users
app.get('/api/getUsers', function(req, res){
	var users = dbConnection.collection('users');
	res.statusCode = 200;
	users.find().toArray(function(err,result){
		if(err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

// get single user
app.get('/api/getUser/:id', function(req, res){
	var users = dbConnection.collection('users');
	res.statusCode = 200;
	users.findOne({_id : BSON.ObjectID.createFromHexString(req.params.id)}, function(err,result){
		if(err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

// get single event
app.get('/api/getEvent/:id', function(req, res){
	var events = dbConnection.collection('events');
	res.statusCode = 200;
	events.findOne({_id : BSON.ObjectID.createFromHexString(req.params.id)}, function(err,result){
		if(err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

app.post('/api/addUser', function(req,res){
	var name = req.body.name;

	var user = {name: name};

	var users = dbConnection.collection('users');
	users.save(user, function(err,succ){
		if(err){
			res.status(400);
		} else {
			res.status(200);
		}
	});
});

app.post('/api/addEvent', function(req,res){
	var eventLat = req.body.lat;
	var eventLon = req.body.lon;
	var eventName = req.body.name;
	var eventTags = req.body.tags;
	var owner_id = req.body.owner_id;
	var tags = eventTags.split(",");

	var event = { name: eventName, lat: eventLat, lon: eventLon, tags: tags, owner_id: owner_id};

	console.log(event);
	var events = dbConnection.collection('events');
	events.save(event, function(err, success){
		if(err) {
			res.status(404); 
		} else {
			res.status(200);
		}
	});

});

// =========== adds the user to the event ============

app.post('/api/addUserToEvent', function(req,res){
	var user = req.body.userID;
	var event = req.body.eventID;

	console.log(req.body);

	var users = dbConnection.collection('users');
	var events = dbConnection.collection('events');

	events.findOne({_id : BSON.ObjectID.createFromHexString(event)}, function(err,result){
		if(err) {
			res.status(400);
		} else {
			var eventObj = result;
			users.findOne({_id : BSON.ObjectID.createFromHexString(user)}, function(err,result){
				if(err) {
					res.status(400)
				} else {
					var userObj = result;
					eventObj.users.push(userObj);
					events.update({_id: BSON.ObjectID.createFromHexString(event)}, {users: eventObj.users}
					, function(err){
							if(err) {
								console.log(err);
								res.status(400);
							} else {
								res.status(200);
							}
						});

				}
			})
		}
	});




});

app.post('/api/removeUserFromEvent', function(req,res){
	var user = req.body.userID;
	var event = req.body.eventID;


	console.log(req.body);
	

	var events = dbConnection.collection('events');
	res.statusCode = 200;
	events.findOne({_id : BSON.ObjectID.createFromHexString(event)}, function(err,result){
		if(err) {
			res.status(400);
		} else {
			var eventObj = result;

			var users = dbConnection.collection('users');
			users.findOne({_id : BSON.ObjectID.createFromHexString(user)}, function(err,result){
				if(err) {
					res.status(400)
				} else {
					var userObj = result;
					var index = eventObj.users.indexOf(userObj);
					eventObj.users.splice(index,1);
					events.update(
						{_id: eventObj._id}, {users: eventObj.users}
						, function(err){
							if(err) {
								res.status(400);
							} else {
								res.status(200);
							}
						}
					);
				}
			});
			
		}
	});

});


app.get('/api/getMyGroups/:id', function(req,res){
	var userID = req.params.id;

	var events = dbConnection.collection('events');
	events.findOne({owner_id : userID}, function(err,result){
		if(err) {
			res.status(400);
		} else {
			var event = result;

			if(event === null) {
				events.findOne({"users._id" : BSON.ObjectID.createFromHexString(userID)}, function(err,result){
					if(err){
						res.status(400);
					} else {
						event = result;
						res.json(result);
					}
				});
			} else {
				res.json(event);
			}
		}

	});

});


app.post('/api/removeUser/', function(req, res){
	//{eventID: "sdadasa"}
	var user = req.body.userID;

	var users = dbConnection.collection('users');
	users.remove(
		{_id: BSON.ObjectID.createFromHexString(user)},
		function(err,success){
			if(err) {
				res.status(400);
			} else {
				res.status(200);
			}
		}
	);

});

app.post('/api/removeEvent/', function(req, res){
	//{eventID: "sdadasa"}
	var event = req.body.eventID;

	var events = dbConnection.collection('events');
	events.remove(
		{_id: BSON.ObjectID.createFromHexString(event)},
		function(err,success){
			if(err) {
				res.status(400);
			} else {
				res.status(200);
			}
		}
	);

});

//  var removeEvent = function(eventObj) {
// 		var events = dbConnection.collection('events');
// 		events.remove({_id: BSON.ObjectID.createFromHexString(eventObj._id)}
// 		, function(err){
// 				if(err) {
// 					console.log(err);
// 				}
// 			});
// };

app.all('*', function (req, res) {
	res.statusCode = 404;
	res.sendfile('./public/app/404.html');
});
 
// =============== start server ==============
app.listen(8000);