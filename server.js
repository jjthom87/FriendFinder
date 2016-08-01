//NPM install packages...Dependencies
var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');

//Sets up the the express app
var app = express();
var PORT = 8000;

//Sets up the express app to handle parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//displaying data from the home.html file
app.get('/', function(reckor,resin){
	resin.sendfile(path.join(__dirname, 'app/public/home.html'));
});

//getting data from the survey.html file
app.get('/survey', function(req, res){
	res.sendfile(path.join(__dirname, 'app/public/survey.html'));
})

app.post('/api/friends', function(req,res){
	var posted = req.body;
	console.log(posted);
})

//lets the server recognize the js files
app.use(express.static('app'));

//starts the server with the listening queue
app.listen(PORT, function(){
	console.log("Listening on port", PORT);
});
