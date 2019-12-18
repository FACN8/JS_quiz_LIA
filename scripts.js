var element = document.getElementById("myprogressBar");  
const bodyElement = document.getElementById('questionBody');
const buttons = document.querySelectorAll('button');
const scoreCounter = document.getElementById('scoreCounter');
const questionCounter = document.getElementById('questionCounter');
const isAnsCorrect = document.getElementById('isCorrect');
var starter;
var start_flag = false;
var task_time = document.getElementById("taskTimer");
var content = [
    {
        question: "What is the capital of Thailand?",
        difficulty: 1,
        answer: 2,
        options: ["Beijing", "Shanghai", "Bangkok", "Jakarta"]},
        {
            question: "Which country is in the Caribbean?",
            difficulty: 2,
            answer: 2,
            options: ["Fiji", "Tuvalu", "St Kitts and Nevis", "Micronesia"]},
        {
            question: "Which country is in Scandinavia?",
            difficulty: 1,
            answer: 0,
            options: ["Finland", "Slovenia", "Portugal", "Ukraine"]},
        {
            question: "Which of the following is the most populous country?",
            difficulty: 1,
            answer: 3,
            options: ["France", "Japan", "Russia", "United States"]},
        {
            question: "Which is the lowest point in the ocean?",
            difficulty: 3,
            answer: 1,
            options: ["The Dead Sea", "The Mariana Trench", "The Bermuda Triangle", "The Sargasso Sea"]},
        {
            question: "Where was baby Jesus born?",
            difficulty: 1,
            answer: 3,
            options: ["Nazareth", "Umm Al Fahm", "Ramat Gan", "Bethlehem"]
        }
]
var maxquestions = content.length;
var currentquestion;
var score;
var mins_countdown;
var seconds_countdown;
var width;
var skipped;
if (window.location.search.slice(1).split('&').length > 1) {
    var queryString = window.location.search.slice(1).split('&');

    currentquestion = parseInt(queryString[0].split('=')[1]);
    score = parseInt(queryString[1].split('=')[1]);
    mins_countdown = queryString[2].split('=')[1];
    seconds_countdown = queryString[3].split('=')[1];
    skipped = parseInt(queryString[4].split('=')[1]) == 1 ? true : false;
    
    width = (currentquestion+1)/maxquestions * 100;  
    element.style.width = width + '%';  


} else {
    skipped = false;
    score = 0;
    currentquestion = 0;
    mins_countdown =1;
    seconds_countdown =30;
}

content.sort(compare);

function compare(a, b) {
    return a.difficulty - b.difficulty;
}

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

    if(!start_flag) {
        start_flag = true;
        starter = setInterval(tick, 1000);
    }

    if(currentquestion == maxquestions){
        window.location.href = "end.html?score=" + score.toString();
    }

    scoreCounter.innerHTML = " " + score + " ";
    questionCounter.innerHTML = (currentquestion + 1).toString() + "/" + maxquestions.toString();

    if((currentquestion+1) % 5 ==0 ){
        window.location.href = "bonus.html?question=" +currentquestion.toString() + "&score=" + score.toString() + "&mins_countdown=" + mins_countdown.toString() + "&seconds_countdown=" + seconds_countdown.toString() + "&skipped=" + (skipped ? 1 : 0);
    }
    bodyElement.innerHTML = content[currentquestion].question;
    buttons[0].textContent = content[currentquestion].options[0];
    buttons[1].textContent = content[currentquestion].options[1]
    buttons[2].textContent = content[currentquestion].options[2]
    buttons[3].textContent = content[currentquestion].options[3]
}

function checkAns(n){
update();
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
        buttons[n].style ="hover{ background: #434343; } ";
         currentquestion++;
         isAnsCorrect.innerHTML = "";
        refresh();
        buttons.forEach(element => {
            element.disabled = false;
        });
    }, timer);
}

function update() { 
    var width = (currentquestion+1)/maxquestions * 100;  
    element.style.width = width + '%';  
}
