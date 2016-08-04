$(document).ready(function() {


	function NewFriend(){
		this.name = '';
		this.image = '';
		this.selections = [];
		this.photo = '';
	}

	function GetPhoto(){
		this.photo = $('<img>')
	}

function MatchMaker(){
	this.c = [];
	this.count = 0;
	this.sum = 0;
	this.index = function(array,arrays){
		if (this.c.length < arrays.length){
			for (var i = 0; i < array.length; i++){
				this.sum += (array[i] - (arrays[this.count][i]));
		}
		this.c.push(this.sum);
		this.count++;
		this.index(array,arrays);
		} else {
			for(var j = 0; j < this.c.length; j++) {
				if (this.c[j] < 0){
				this.c[j] = this.c[j]*-1;
				}
			}
			if (this.c.length === 1) {
				alert("You are officially the first member. Your match will come");
				} else {
				this.c.sort(function(a,b){
					return a === b ? 0 : a < b ? -1: 1
				});
			 	if (this.c.indexOf(this.c[0]) >-1){
			 		
			 	}
			}
		}
	}
};
	var newMatch = new MatchMaker();
	var friend = new NewFriend();
	var photo = new GetPhoto();

	$('#surveyForm').on('submit', function(e){
		$('#submitHome').hide();

		e.preventDefault();
		$('#myModal').modal();
		$.post("http://localhost:8000/api/friends",{friend})
		$.ajax({
			type: "GET",
			url: "http://localhost:8000/api/friends"
		}).done(function(results){
			selectionsArray = [];
			var currentUserData = gettingLast(results);
			var allOtherData = removingLast(results);

		for(var i = 0; i < allOtherData.length; i++){
			selectionsArray.push(allOtherData[i].selections); 
		}

		newMatch.index(currentUserData.selections, selectionsArray);

			var matchDiv = $('<div>');

			var matchP = $('<p>');
			matchP.text(currentUserData.name);
			matchDiv.append(matchP);

			var matchImg = $('<img>');
			matchImg.attr('src', currentUserData.photo).height(300).width(300);
			matchDiv.append(matchImg);

			$('.modal-body').append(matchDiv);
			
			$('#submitButton').hide();
			$('#submitHome').show();
		});
});

	function gettingLast(array){
		for (var i = 0; i < array.length; i++){
			var lastArray = array[array.length-1];
			}
		return lastArray;
		};

	function removingLast(array){
		array.pop();
		return array;
	}
 
	// function hideThis(){
	// 	$('#surveyDiv').hide();
	// 	$('.matchDiv').show();
	// }

	//hiding the survey to input additional information
	$('.survey').hide();
	$('#submitButton').hide();

	//the next two sections help upload the picture
	$(function(){
		$(":file").change(function(){
			if(this.files && this.files[0]){
				var reader = new FileReader();
				reader.onload = imageIsLoaded;
				reader.readAsDataURL(this.files[0]);
				friend.image = this.files[0].name;
			}
		});
	});

	function imageIsLoaded(e) {
		var imageDiv = $('<div>');

		friend.photo = e.target.result;
		photo.photo.attr('src', e.target.result).height(300).width(300);
		imageDiv.append(photo.photo);
		$('.imageDiv').append(imageDiv);
	};

	$('#surveyTime').on('click', function(){
		friend.name = $('#nameInput').val().trim();
		$('.personalInfo').hide();
		$('.survey').show();
	});

	var questions = 
	[{question: "You would know at least 2 songs at a Pearl Jam concert"}, 
	{question: "You would dress up and dance all day Electric Zoo"},
	{question: "You can tell the difference between Country Songs"},
	{question: "You enjoy guitar solos"},
	{question: "You have been or would go to Bonnaroo"},
	{question: "You love Justin Bieber"},
	{question: "You know who Public Enemy is"},
	{question: "You appreciate Miles Davis"},
	{question: "You like and dance/or would like to learn to dance salsa"},
	{question: "You're one of those people that says you like all music"}];

	var questionNumber = 0;
	//creates each question one at a time
	function createQuestion(index){
			var newDiv = $('<div>', {
				id: 'current'
			});
			var newP = $('<p>');
			newP.append(questions[index].question);
			newDiv.append(newP);
			return newDiv;
	};
	//appends the next question and removes the previous question
	//also removes the display of the questions once done
	function displayNext(){
		$('#current').remove();
		if(questionNumber < questions.length){
			var nextQuestion = createQuestion(questionNumber);
			$('#question').append(nextQuestion);
		} else {
			$('.survey').hide();
			$('#submitButton').show();
			var newDiv2 = $('<div>');
			var final = $('<h2>Thank You For Taking This Survey. Please Press Submit Button To Meet Your Match</h2>');
			newDiv2.append(final);
			$('.thankYou').append(newDiv2);
		}
	}
	//makes sure the answer that is chosen is pushed to the selections
	function choice(){
       var answer = document.getElementsByName('q');
        for(i = 0; i < answer.length; i++) {
          if (answer[i].checked) {
            friend.selections.push(parseInt(answer[i].value));
           } 
           // else {
           // 	return alert("Please choose");
           // 	questionNumber--;
           // }
        }
    };

    //displays the initial question
	displayNext();

	//records the response for the answer to the question and moves to the next question.
	$('#next').on('click', function(){
		choice();
		questionNumber++;
		displayNext();
	});

});