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

	function indexOfSmallest(a){
		var lowest = 0;
		for (var i = 1; i < a.length; i++){
			if(a[i] < a[lowest]) lowest = i;
		}
		return lowest;
	}

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
			var selectionsArray = [];
			var nameArray = [];
			var photoArray = [];
			var c = []
			var count = 0;
			var sum = 0;
			var currentUserData = gettingLast(results);
			var allOtherData = removingLast(results);
			console.log(currentUserData.selections);

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
				if (c.length === 1) {
					alert("You are officially the first member. Your match will come");
					} else {

					console.log(selectionsArray[indexOfSmallest(c)]);

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