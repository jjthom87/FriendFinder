//NPM install packages...Dependencies
var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
// var ParseServer = require('parse-server').ParseServer;

//Sets up the the express app
var app = express();

//Where all of the post information is being pushed to
var friendArray = [{
	name: 'Joe',
	image: '',
	selections: [3,3,3,3,3,3,3,3,3,3],
	photo: '../joe.jpg'
},{
	name: 'Jamarcus',
	image: '',
	selections: [4,4,4,4,4,4,4,4,4,4],
	photo: '../jamarcus.jpg'
}];

//setting up the port that the server will be listening on
var PORT = process.env.PORT || 5000;

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

//sending the data from the post back to the page
app.get('/api/friends', function(req,res){
	res.json(friendArray);
});

//getting the information from the form on the page, and then combining the information that i want sent back to the page.
app.post('/api/friends', function(req,res){
	var friendName = req.body.friend.name;
	var friendImage = req.body.friend.image;
	var friendNumbers = req.body.friend.selections;
	var friendPhoto = req.body.friend.photo;

	var newFriend = {
	  	name: friendName,
		image: friendImage,
		selections: friendNumbers,
		photo: friendPhoto
	}
	
	friendArray.push(newFriend);
	res.json(newFriend);
});

// app.use('/parse', api);
//lets the server recognize the js files
app.use(express.static('app'));

console.log(friendArray);
//starts the server with the listening queue
app.listen(PORT, function(){
	console.log("Listening on port", PORT);
});
