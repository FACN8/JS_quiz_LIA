var content = [
    {
    question: "What is the capital of Thailand?",
    answer: 2,
    options: ["Beijing", "Shanghai", "Bangkok", "Jakarta"]},
    
    {
    question: "aloo 2",
    answer: 3,
    options: ["Button one", "Button two", "Button three", "Button four"]}
]
var score = 0;
var currentquestion = 0;
var maxquestions = 2;
const bodyElement = document.getElementById('questionBody');
const buttons = document.querySelectorAll('button');
const scoreCounter = document.getElementById('scoreCounter');
const questionCounter = document.getElementById('questionCounter');
const isAnsCorrect = document.getElementById('isCorrect');
var task_timer = 0;

refresh();


function refresh() {
    if(currentquestion == maxquestions){
        window.location.href = "end.html?score=" + score.toString();
    }

    scoreCounter.innerHTML = score;
    questionCounter.innerHTML = "Q " + (currentquestion + 1).toString() + "/" + maxquestions.toString();
    bodyElement.innerHTML = content[currentquestion].question;
    buttons[0].textContent = content[currentquestion].options[0];
    buttons[1].textContent = content[currentquestion].options[1]
    buttons[2].textContent = content[currentquestion].options[2]
    buttons[3].textContent = content[currentquestion].options[3]
}

function checkAns(n){

    buttons.forEach(element => {
        element.disabled = true;
    });

    var timer=0;
    if (n == content[currentquestion].answer) {
        isAnsCorrect.innerHTML = "Correct!"
        buttons[n].style.background="#2e9924";
        score+=10;
        timer = 1000;
    }
    else{
        isAnsCorrect.innerHTML = "Incorrect answer, the right answer is <u>" + content[currentquestion].options[content[currentquestion].answer] + " </u>!";
        timer = 2000;
        buttons[n].style.background="red";

    }
    setTimeout(function() {
        buttons[n].style.background="#e730b9";
         currentquestion++;
         isAnsCorrect.innerHTML = "";
        refresh();
        buttons.forEach(element => {
            element.disabled = false;
        });
    }, timer);    
}