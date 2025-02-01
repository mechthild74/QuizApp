let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2
    },
    {
        "question": "Welches Attribut kann man nicht für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4
    }
];

let currentQuestion = 0;
let correctQuestion = 0;
let progressValue= 0;
let question;
let audioSuccess = new Audio("./assets/sound/success.mp3");
let audioFail = new Audio("./assets/sound/fail.mp3");

function init() {
    document.getElementById("all-questions").innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    
    if (gameIsOver()) {
        showEndScreen()
    }
    else {
        updateNextQuestion();
    }
    calculateProgress()
}

function gameIsOver(){
    return currentQuestion >= questions.length;
}

function showEndScreen(){
    document.getElementById("question-body").style.display='none';
    document.getElementById("end-screen").style.display='';
    document.getElementById("end-screen-all-question").innerHTML = questions.length;
    document.getElementById("end-screen-correct-question").innerHTML = correctQuestion;
    document.getElementById("header-image").src = "./assets/img/trophy_new.png";
}

function updateNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById("questiontext").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
    document.getElementById("current-question").innerHTML = currentQuestion + 1;
}

function answer(selection) {
    question= questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOFRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        correctQuestion++;
        audioSuccess.play();
    } 
    else{
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOFRightAnswer).parentNode.classList.add('bg-success');
        audioFail.play();
    }
    document.getElementById('next-btn').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber){
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion ++;
    document.getElementById('next-btn').disabled = true;
    showQuestion();
    resetAnswerBtn();
}

function resetAnswerBtn() {
    document.getElementById("answer_1").parentNode.classList.remove('bg-danger');
    document.getElementById("answer_1").parentNode.classList.remove('bg-success');
    document.getElementById("answer_2").parentNode.classList.remove('bg-danger');
    document.getElementById("answer_2").parentNode.classList.remove('bg-success');
    document.getElementById("answer_3").parentNode.classList.remove('bg-danger');
    document.getElementById("answer_3").parentNode.classList.remove('bg-success');
    document.getElementById("answer_4").parentNode.classList.remove('bg-danger');
    document.getElementById("answer_4").parentNode.classList.remove('bg-success');
}

function calculateProgress() {
    progressValue = Math.round((currentQuestion) / questions.length * 100);
    document.getElementById("progress-bar").innerHTML = `${progressValue} %`;
    document.getElementById("progress-bar").style = `width: ${progressValue}%`;
}

function restartGame() {
    currentQuestion = 0;
    correctQuestion = 0;
    progressValue= 0;
    document.getElementById("header-image").src = "./assets/img/pencil.jpg";
    init();
    document.getElementById("question-body").style.display='';
    document.getElementById("end-screen").style.display='none';
}