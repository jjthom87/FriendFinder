// $(document).ready(function() {

// $.ajax({
// 	type: "GET",
// 	url: "http://localhost:8000/api/friends"
// })
// .done(function(results){
// 	// var matchDiv = $('<div>');
// 	// var matchP = $('<p>');
// 	// matchP.text(results);
// 	// matchP.append(results);
// 	// matchDiv.append(matchP);
// 	// $('#nameAndPicDiv').append(matchDiv);
// 	var currentUserData = gettingLast(results);
// 	var allOtherData = removingLast(results);
// 	console.log(currentUserData);

// });
// 	function gettingLast(array){
// 		for (var i = 0; i < array.length; i++){
// 			var lastArray = array[array.length-1];
// 			}
// 		return lastArray;
// 		};
// 	function removingLast(array){
// 		array.pop();
// 		return array;
// 	}
// });