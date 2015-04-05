var questionsArray = new Array();
var currentQuestion = 0;   // 0-based index
var DEFAULT_ANSWER_NO = -1;


$(document).ready(function() {

	setupQuestions();

	// logQuestions();   // looks good

	$("#start-over-link").click(function() {
		startOver();
	});

	$("#submit-answer-button").click(function() {
		submitAnswer();
	});

	/*
	$(".stat-heading").click(function() {
		jumpToQuestion(this);
	});
	*/

	$("#stats ul").on("click", ".stat-heading", function() {
		jumpToQuestion(this);
	});

	startOver();

});


function setupQuestions()
{
	createAndAddQuestion("Unless otherwise posted, what is the speed limit on all highways and streets that are not designated as freeways?", 
		['25 mph', '45 mph', '55 mph', '70 mph', 'Mach 3'], 2, 'speed-limit-infinity.png');

	createAndAddQuestion("Which condition requires more stopping time and space?", 
		['A hot day', 'Night time', 'Wet pavement', 'New pavement', "Using the Flintstones' car"], 2, 'car-did-not-stop.jpg');

	createAndAddQuestion("When driving, keep your hands on the wheel and your eyes on the __________ .", 
		['speedometer', 'mirror', 'glove box', 'road', 'hot girl'], 3, 'rocket-car.jpg');

	createAndAddQuestion("Aggressive drivers do NOT do which of these?", 
		['run stops signs and red lights', 'speed', 'tailgate', 'make improper hand gestures', 'wax your car during traffic jam'], 4, 'aggressive-driver.png');
}


function startOver()
{
	resetResponsesAndStats();
	currentQuestion = 0;
	displayCurrentQuestion();
	hideSubmissionError();
	$("#overall-score").hide();
}


function hideSubmissionError()
{
	$("#submission-error").hide();
}


function jumpToQuestion(pStatHeadingElem)
{
	var jumpToQuestionOneBased = parseInt( $(pStatHeadingElem).html() );
	currentQuestion = jumpToQuestionOneBased - 1;
	displayCurrentQuestion();
}


function submitAnswer()
{
	hideSubmissionError();
	var answer = parseInt( $("input:radio[name=answer]:checked").val() || DEFAULT_ANSWER_NO );

	if (answer < 0 || answer > 4)
	{
		$("#submission-error").css("display", "inline-block");
		return;
	}

	questionsArray[currentQuestion].selectedAnswerNo = answer;
	updateOverallScore();
	updateStatIndicator();

	if (currentQuestion < questionsArray.length - 1)
	{
		currentQuestion += 1;
		displayCurrentQuestion();
	}
	else
	{
		logQuestions();   // temporary
	}
}


function updateOverallScore()
{
		var questionsCorrect = 0;
		var questionsAnswered = 0;

	for (var x = 0; x < questionsArray.length; x++)
	{
		var question = questionsArray[x];

		if (question.selectedAnswerNo != DEFAULT_ANSWER_NO)
		{
			questionsAnswered++;

			if (question.selectedAnswerNo == question.correctAnswerNo)
			{
				questionsCorrect++;
			}
		}

	}

	var percentCorrect = 0;

	if (questionsAnswered > 0)
	{
		percentCorrect = (questionsCorrect / questionsAnswered) * 100;
	}

	$("#questionsCorrect").html(questionsCorrect);
	$("#questionsAnswered").html(questionsAnswered);

	// Round following to one decimal position:
	$("#percentCorrect").html( Math.round(percentCorrect * 10) / 10 );

	$("#overall-score").show();
}


function updateStatIndicator()
{
	var indicatorQry = $("#question-" + currentQuestion + "-stat .stat-indicator");
	indicatorQry.removeClass("red").removeClass("green");

	var question = questionsArray[currentQuestion];

	if (question.selectedAnswerNo != DEFAULT_ANSWER_NO)
	{
		var newClass = question.selectedAnswerNo == question.correctAnswerNo ? "green" : "red";
		indicatorQry.addClass(newClass);
	}
}


function Question(pQuestionText, pAnswerTextArray, pCorrectAnswerNo, pImageFilename)
{
	this.questionText = pQuestionText;
	this.answerTextArray = pAnswerTextArray;
	this.correctAnswerNo = pCorrectAnswerNo;
	this.imageFilename = pImageFilename;

	this.selectedAnswerNo = DEFAULT_ANSWER_NO;
}


function createAndAddQuestion(pQuestionText, pAnswerTextArray, pCorrectAnswerNo, pImageFilename)
{
	var question = new Question(pQuestionText, pAnswerTextArray, pCorrectAnswerNo, pImageFilename);
	questionsArray.push(question);
}


function logQuestions()
{
	for (var x = 0; x < questionsArray.length; x++)
	{
		var question = questionsArray[x];
		console.log("questionText: " + question.questionText);

		for (var a = 0; a < question.answerTextArray.length; a++)
		{
			console.log("answerTextArray[" + a + "]: " + question.answerTextArray[a]);
		}

		console.log("correctAnswerNo: " + question.correctAnswerNo);
		console.log("imageFilename: " + question.imageFilename);
		console.log("selectedAnswerNo: " + question.selectedAnswerNo);
		console.log("");
	}
}


function resetResponsesAndStats()
{
	$(".stat-entry").remove();

	for (var x = 0; x < questionsArray.length; x++)
	{
		questionsArray[x].selectedAnswerNo = DEFAULT_ANSWER_NO;

		$("#stats ul").append('<li class="stat-entry" id="question-' + x + '-stat"><div class="stat-heading">' + (x + 1) + 
			'</div><div class="stat-indicator"></div></li>');
	}

	$("#total-questions").html(questionsArray.length);

}


function displayCurrentQuestion()
{
	$("#question-no").html((currentQuestion + 1));
	var question = questionsArray[currentQuestion];
	$("#question-text").html(question.questionText);

	for (var a = 0; a < question.answerTextArray.length; a++)
	{
		$("#answer-" + a + "-text").html(question.answerTextArray[a]);
	}

	$("input:radio[name=answer]").prop("checked", false);

	if (question.selectedAnswerNo != DEFAULT_ANSWER_NO)
	{
		$("#answer-" + question.selectedAnswerNo).prop("checked", true);
	}

	$("#question-image").attr("src", "images/" + question.imageFilename);

}