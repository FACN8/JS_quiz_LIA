var content = [
    {
        question: "What is the capital of Thailand?",
        answer: 2,
        options: ["Beijing", "Shanghai", "Bangkok", "Jakarta"]},
        {
            question: "Which country is in the Caribbean?",
            answer: 2,
            options: ["Fiji", "Tuvalu", "St Kitts and Nevis", "Micronesia"]},
        {
            question: "Which country is in Scandinavia?",
            answer: 0,
            options: ["Finland", "Slovenia", "Portugal", "Ukraine"]},
        {
            question: "Which of the following is the most populous country?",
            answer: 3,
            options: ["France", "Japan", "Russia", "United States"]},
        {
            question: "Which is the lowest point in the ocean?",
            answer: 1,
            options: ["The Dead Sea", "The Mariana Trench", "The Bermuda Triangle", "The Sargasso Sea"]},
]
var score = 0;
var currentquestion = 0;
var maxquestions = content.length;
const bodyElement = document.getElementById('questionBody');
const buttons = document.querySelectorAll('button');
const scoreCounter = document.getElementById('scoreCounter');
const questionCounter = document.getElementById('questionCounter');
const isAnsCorrect = document.getElementById('isCorrect');

var starter;
var start_flag = false;


var task_time = document.getElementById("taskTimer");
var mins_countdown =1;
var seconds_countdown =30;

refresh();


function tick(){
    if(mins_countdown == 0 && seconds_countdown ==0){
        mins_countdown =1;
        seconds_countdown =30;
        start_flag = false;
        task_time.textContent = "00";
        clearInterval(starter);
        window.location.href = "end.html?score=" + score.toString();
        return;
    }
    if(seconds_countdown == 0){
        mins_countdown--;
        seconds_countdown = 60;
    }
    seconds_countdown--;
    
    task_time.textContent = ((mins_countdown < 10) ? ("0" + mins_countdown) : mins_countdown) + ":" + 
    ((seconds_countdown < 10) ? ("0" + seconds_countdown) : seconds_countdown);
}



function refresh() {

    if(!start_flag){
        start_flag = true;
        starter = setInterval(tick, 1000);
        
    }

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
var skipped = false;

function checkAns(n){

if (n == -1) {
    skipped = true;
    currentquestion++;
    refresh();
    return 0;
}
    buttons.forEach(element => {
        element.disabled = true;
    });

    var timer=0;
    if (n == content[currentquestion].answer) {
        isAnsCorrect.innerHTML = "Correct!"
        buttons[n].style.background="#2e9924";

        if (skipped) {
            score += 5;
            skipped = false;
        } else
            score+=10;

        timer = 1000;
    }
    else{
        isAnsCorrect.innerHTML = "Incorrect answer, the right answer is <u>" + content[currentquestion].options[content[currentquestion].answer] + " </u>!";
        timer = 2000;
        buttons[n].style.background="red";

    }
    setTimeout(function() {
        buttons[n].style.background="#7854ce";
         currentquestion++;
         isAnsCorrect.innerHTML = "";
        refresh();
        buttons.forEach(element => {
            element.disabled = false;
        });
    }, timer);
}
