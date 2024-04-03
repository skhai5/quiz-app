const questions = [
    {
        question: "What is the biggest continent in the world?",
        answers: [
            {text:"Africa", correct:"false"},
            {text:"North America", correct:"false"},
            {text:"Europe", correct:"false"},
            {text:"Asia", correct:"true"},
        ]
    },
    {
        question: "Mount Fuji is the highest point located in which country?",
        answers: [
            {text:"Fiji", correct:"false"},
            {text:"Japan", correct:"true"},
            {text:"South Korea", correct:"false"},
            {text:"South Africa", correct:"false"},
        ] 
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text:"Antartica", correct:"true"},
            {text:"Kalahari", correct:"false"},
            {text:"Gobi", correct:"false"},
            {text:"Sahara", correct:"false"}
        ] 
    },
    {
        question: "What is the largest island in the Mediterranean?",
        answers: [
            {text:"Cyprus", correct:"false"},
            {text:"Maldives", correct:"false"},
            {text:"Sicily", correct:"true"},
            {text:"Mauritius", correct:"false"},
        ] 
    },
    {
        question: "Which is the smallest continent int he world?",
        answers: [
            {text:"Asia", correct:"false"},
            {text:"Africa", correct:"false"},
            {text:"South America", correct:"false"},
            {text:"Oceania", correct:"true"},
        ] 
    },
    {
        question: "What is the capital of Denmark?",
        answers: [
            {text:"Berlin", correct:"false"},
            {text:"Copenhagen", correct:"true"},
            {text:"Oslo", correct:"false"},
            {text:"Prague", correct:"false"},
        ] 
    },
    {
        question: "The White Sea is located next to which country?",
        answers: [
            {text:"India", correct:"false"},
            {text:"Groenland", correct:"false"},
            {text:"Finland", correct:"false"},
            {text:"Russia", correct:"true"},
        ]
    },
    {
        question: "Which US state is the Grand Canyon located in?",
        answers: [
            {text:"Texas", correct:"false"},
            {text:"Arizona", correct:"true"},
            {text:"New Mexico", correct:"false"},
            {text:"Delaware", correct:"false"},
        ] 
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();