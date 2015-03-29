var questionsArray = new Array();
var DEFAULT_ANSWER_NO = -1;


$(document).ready(function() {

	createAndAddQuestion("How old is Steve?", [40, 45, 50, 55, 51], 5, '');
	createAndAddQuestion("How old is Peggy?", [35, 40, 45, 50, 55], 4, '');
	createAndAddQuestion("How old is Tanner?", [21, 22, 23, 24, 25], 2, '');
	createAndAddQuestion("How old is Andy?", [19, 20, 21, 22, 23], 2, '');

	// logQuestions();   // looks good

	$("#start-over-link").click(function() {
		startOver();
	});

	startOver();

});


function startOver()
{
	resetResponsesAndStats();
	displayQuestion(0);
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


function displayQuestion(pQuestionIndex)
{
	$("#question-no").html((pQuestionIndex + 1));
	var question = questionsArray[pQuestionIndex];
	$("#question-text").html(question.questionText);

	for (var a = 0; a < question.answerTextArray.length; a++)
	{
		$("#answer-" + a + "-text").html(question.answerTextArray[a]);
	}

}