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
	createAndAddQuestion("How old is Steve?", [40, 45, 50, 55, 51], 4, '');
	createAndAddQuestion("How old is Peggy?", [35, 40, 45, 50, 55], 3, '');
	createAndAddQuestion("How old is Tanner?", [21, 22, 23, 24, 25], 1, '');
	createAndAddQuestion("How old is Andy?", [19, 20, 21, 22, 23], 1, '');
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

}