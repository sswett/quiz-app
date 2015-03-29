var questionsArray = new Array();


$(document).ready(function() {

	createAndAddQuestion("How old am I?", 40, 45, 50, 55, 51, 5, '');
	createAndAddQuestion("How old is Peggy?", 35, 40, 45, 50, 55, 4, '');

	// logQuestions();   // looks good

});


function Question(pQuestionText, pAnswer1Text, pAnswer2Text, pAnswer3Text, pAnswer4Text, pAnswer5Text, pCorrectAnswerNo, pImageUrl)
{
	this.questionText = pQuestionText;
	this.answer1Text = pAnswer1Text;
	this.answer2Text = pAnswer2Text;
	this.answer3Text = pAnswer3Text;
	this.answer4Text = pAnswer4Text;
	this.answer5Text = pAnswer5Text;
	this.correctAnswerNo = pCorrectAnswerNo;
	this.imageUrl = pImageUrl;

	this.selectedAnswerNo = 0;   // default value
}


function createAndAddQuestion(pQuestionText, pAnswer1Text, pAnswer2Text, pAnswer3Text, pAnswer4Text, pAnswer5Text, pCorrectAnswerNo, pImageUrl)
{
	var question = new Question(pQuestionText, pAnswer1Text, pAnswer2Text, pAnswer3Text, pAnswer4Text, pAnswer5Text, pCorrectAnswerNo, pImageUrl);
	questionsArray.push(question);
}


function logQuestions()
{
	for (var x = 0; x < questionsArray.length; x++)
	{
		var question = questionsArray[x];
		console.log("questionText: " + question.questionText);
		console.log("answer1Text: " + question.answer1Text);
		console.log("answer2Text: " + question.answer2Text);
		console.log("answer3Text: " + question.answer3Text);
		console.log("answer4Text: " + question.answer4Text);
		console.log("answer5Text: " + question.answer5Text);
		console.log("correctAnswerNo: " + question.correctAnswerNo);
		console.log("imageUrl: " + question.imageUrl + "\n");
	}
}