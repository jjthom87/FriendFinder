//NPM install packages...Dependencies
var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var friendArray = [];
// var photoArray = [];

//Sets up the the express app
var app = express();
var PORT = 8000;

//Sets up the express app to handle parsing
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
	limit: '50mb',
	extended: true, 
	parameterLimit:50000}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//displaying data from the home.html file
app.get('/', function(reckor,resin){
	resin.sendfile(path.join(__dirname, 'app/public/home.html'));
});

//getting data from the survey.html file
app.get('/survey', function(req, res){
	res.sendfile(path.join(__dirname, 'app/public/survey.html'));
});

app.get('/api/friends', function(req,res){
	res.json(friendArray);
	// res.json(photoArray);
})

app.post('/api/friends', function(req,res){
	var friendName = req.body.friend.name;
	var friendImage = req.body.friend.image;
	var friendStringNumbers = req.body.friend.selections;
	var friendPhoto = req.body.friend.photo;
	function stringToNumber(array){
			for (var i = 0; i < array.length; i++) {
				array[i] = parseInt(array[i]);
			}
			return array	
		}
	var friendNumbers = stringToNumber(friendStringNumbers);
	var newFriend = {
	  	name: friendName,
		image: friendImage,
		selections: friendNumbers,
		photo: friendPhoto
		}
		friendArray.push(newFriend);
		res.json(newFriend);

		// photoArray.push(req.body.friend.photo);
	});

//lets the server recognize the js files
app.use(express.static('app'));

//starts the server with the listening queue
app.listen(PORT, function(){
	console.log("Listening on port", PORT);
});
