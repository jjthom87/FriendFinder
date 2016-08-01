$(document).ready(function() {

	function NewFriend(){
		this.name = '';
		this.image = $('<img>');
		this.selections = [];
	}

	var friend = new NewFriend();

	//hiding the survey to input additional information
	$('.survey').hide();

	//the next two sections help upload the picture
	$(function(){
		$(":file").change(function(){
			if(this.files && this.files[0]){
				var reader = new FileReader();
				reader.onload = imageIsLoaded;
				reader.readAsDataURL(this.files[0]);
			}
		});
	});

	function imageIsLoaded(e) {
		var imageDiv = $('<div>');
		friend.image.attr('src', e.target.result);
		imageDiv.append(friend.image);
		$('.imageDiv').append(imageDiv);
	}

	$('#nameButton').on('click', function(){
		 friend.name = $('#nameInput').val().trim();
         $('#nameInput').val("");
	});

	$('#surveyTime').on('click', function(){
		$('.personalInfo').hide();
		$('.survey').show();
	})

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
			var newDiv2 = $('<div>');
			var final = $('<h2>Thank You For Taking This Survey</h2>');
			newDiv2.append(final);
			$('.thankYou').append(newDiv2);
			console.log(friend);
		}
	}
	//makes sure the answer that is chosen is pushed to the selections
	function choice(){
       var answer = document.getElementsByName('q');
        for(i = 0; i < answer.length; i++) {
          if (answer[i].checked) {
            friend.selections.push(answer[i].value)
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
