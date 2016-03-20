var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.sendfile('./public/app/index.html');
});

var MONGOHQ_URL=""; //MongoDB Connection String
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var BSON = mongodb.BSONPure;

var ObjectID = mongodb.ObjectID;

var bodyParser= require('body-parser');
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded({extended:true}));

var dbConnection = null;
mongoClient.connect(MONGOHQ_URL, function(err,db){
	err ? console.log(err) : dbConnection = db;
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
			res.json({});
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
			res.json({});
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
			res.json({});
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
			res.json({});
		} else {
			res.json(result);
		}
	});
});

app.post('/api/addUser', function(req,res){
	ObjectID = mongodb.ObjectID;
	var _id = new ObjectID();
	var name = req.body.name;

	var user = {name: name, _id:_id};

	var users = dbConnection.collection('users');
	users.save(user, function(err,succ){
		if(err){
			res.status(400);
			res.json({});
		} else {
			res.status(200);
			res.json({id: _id});
		}
	});
});

app.post('/api/addEvent', function(req,res){
	ObjectID = mongodb.ObjectID;
	var event_id = new ObjectID();
	var eventLat = req.body.lat;
	var eventLon = req.body.lon;
	var eventName = req.body.name;
	var eventTags = req.body.tags;
	var owner_id = req.body.owner_id;
	var tags = eventTags.split(",");
	var users = [{_id: BSON.ObjectID.createFromHexString(owner_id), name:'admin'}];

	var event = { name: eventName, lat: eventLat, lon: eventLon, tags: tags, owner_id: owner_id, _id: event_id, users: users};

	console.log(event);
	var events = dbConnection.collection('events');
	events.save(event, function(err, success){
		if(err) {
			res.status(404); 
			res.json({});
		} else {
			res.status(200);
			res.json({});
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
			res.json({});
		} else {
			var eventObj = result;
			users.findOne({_id : BSON.ObjectID.createFromHexString(user)}, function(err,result){
				if(err) {
					res.status(400);
					res.json({});
				} else {
					var userObj = result;
					eventObj.users.push(userObj);
					events.update({_id: BSON.ObjectID.createFromHexString(event)}, {name: eventObj.name,
																					lon: eventObj.lon,
																					lat:eventObj.lat,
																					tags:eventObj.tags,
																					owner_id:eventObj.owner_id,
																					users: eventObj.users}
					, function(err){
							if(err) {
								console.log(err);
								res.status(400);
								res.json({});
							} else {
								res.status(200);
								res.json({});

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
			res.json({});
		} else {
			var eventObj = result;

			var users = dbConnection.collection('users');
			users.findOne({_id : BSON.ObjectID.createFromHexString(user)}, function(err,result){
				if(err) {
					res.status(400)
					res.json({});
				} else {
					var userObj = result;
					var index = eventObj.users.indexOf(userObj);
					eventObj.users.splice(index,1);
					events.update(
						{_id: eventObj._id}, {users: eventObj.users}
						, function(err){
							if(err) {
								res.status(400);
								res.json({});
							} else {
								res.status(200);
								res.json({});
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
			res.json({});
		} else {
			var event = result;

			if(event === null) {
				events.findOne({"users._id" : BSON.ObjectID.createFromHexString(userID)}, function(err,result){
					if(err){
						res.status(400);
						res.json({});
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
				res.json({});
			} else {
				res.status(200);
				res.json({});
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
				res.json({});
			} else {
				res.status(200);
				res.json({});
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