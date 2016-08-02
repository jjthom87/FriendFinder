$(document).ready(function() {

$.ajax({
	type: "GET",
	url: "http://localhost:8000/api/friends"
})
.done(function(results){
	var matchDiv = $('<div>');
	var matchP = $('<p>');
	matchP.text(results);
	matchP.append(results);
	matchDiv.append(matchP);
	$('#nameAndPicDiv').append(matchDiv)
})

});