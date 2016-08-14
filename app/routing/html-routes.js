$(document).ready(function() {

	//constructor that gets posted to the server
	function NewFriend(){
		this.name = '';
		this.image = '';
		this.selections = [];
		this.photo = '';
	}
	//constructor that displays photo on page when uploaded
	function GetPhoto(){
		this.photo = $('<img>')
	}
	//function that finds the index of the smallest number in an array
	//i use this to locate then match within the ajax post
	function indexOfSmallest(a){
		var lowest = 0;
		for (var i = 1; i < a.length; i++){
			if(a[i] < a[lowest]) lowest = i;
		}
		return lowest;
	}
	//pulls out the last item of the array and uses that item
	//i use this for the current user of the application
	function gettingLast(array){
		for (var i = 0; i < array.length; i++){
			var lastArray = array[array.length-1];
			}
		return lastArray;
		};
	//pulls out the last item of the array and displays the rest of the arrays
	//used for all of the other users data, and takes out the current user
	function removingLast(array){
		array.pop();
		return array;
	}
	//creating variables for constructors to send item to constructor functions throughout page
	var friend = new NewFriend();
	var photo = new GetPhoto();

	//submitting the name, photo, and survey results from the form on the html page
	$('#surveyForm').on('submit', function(e){
		//hiding the submit home button so user only has choice to submitted
		$('#submitHome').hide();
		//not allowing the modal to close automatically, as when the submit button was originally pressed, it would
		//redirect back to /survey. e.preventDefault() prevents that.
		e.preventDefault();
		//pushing the matched information to a pop-up modal
		$('#myModal').modal();
		//posting the submitted information to the server
		$.post("/api/friends",{friend})
		//getting the posted information from server to display on html page and using the algorithm below to find the 
		//closest match to the current users results. My favorite part is my use of recursion :)
		$.ajax({
			type: "GET",
			url: "/api/friends"
		}).done(function(results){
			var selectionsArray = [];
			var nameArray = [];
			var photoArray = [];
			var c = []
			var count = 0;
			var sum = 0;
			var currentUserData = gettingLast(results);
			var allOtherData = removingLast(results);

			for(var i = 0; i < allOtherData.length; i++){
				selectionsArray.push(allOtherData[i].selections); 
				nameArray.push(allOtherData[i].name);
				photoArray.push(allOtherData[i].photo)
			}
			function index(){
				if (c.length < allOtherData.length){
					for (var i = 0; i < currentUserData.selections.length; i++){
					 	sum += ((currentUserData.selections[i] - selectionsArray[count][i])*-1);
				}
				c.push(sum);
				nameArray.push(allOtherData[count].name);
				photoArray.push(allOtherData[count].photo);
				sum = 0;
				count++;
				index();
					} else {
					for(var j = 0; j < c.length; j++) {
						if (c[j] < 0){
						c[j] = c[j]*-1;
						}
					}
					if (c.length > 0) {
						var matchDiv = $('<div>');

						var matchP = $('<p>');
						matchP.text(nameArray[indexOfSmallest(c)]);
						matchDiv.append(matchP);

						var matchImg = $('<img>');
						matchImg.attr('src', photoArray[indexOfSmallest(c)]).height(300).width(300);
						matchDiv.append(matchImg);

						$('.modal-body').append(matchDiv);
						
						$('#submitButton').hide();
						$('#submitHome').show();
						}
				}
			}
			index();
		})
	});
 
	//hiding the survey to input additional information
	$('.survey').hide();
	$('#submitButton').hide();

	//the next two functions help upload the picture
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
	//starts the survey, sending the name information to the constructor as part of the submit.
	//doing the same with photo above with friend.photo
	$('#surveyTime').on('click', function(){
		friend.name = $('#nameInput').val().trim();
		$('.personalInfo').hide();
		$('.survey').show();
	});
	//survey questions
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

	//starting with question as 0 since array starts at 0
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
	//attempting to run more functionality below....if i have time
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