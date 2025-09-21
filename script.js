//DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const quizAnswers = document.getElementById("quiz-answers");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScore = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

//QUESTIONS
const questions = [
    {
        questions: 'Qual é o nome da cidade vizinha de Stardew Valley?',
        answers: [
            {text: 'Zuzu City', correct: true},
            {text: 'Pelican Town', correct: false},
            {text: 'Rosewood Town', correct: false},
            {text: 'Junimo Village', correct: false}
        ],

    },
    {
        questions: 'O que acontece no festival da dança das flores?',
        answers: [
        
         {text: 'Você planta flores', correct: false},
         {text: 'Você faz uma competição de flores', correct: false},
         {text: 'Você decora a cidade com flores', correct: false},
         {text: 'Você escolhe um parceiro para dançar', correct: true}
        ],
    },
    {
        questions: 'Quem é o prefeito da cidade?',
        answers: [
            {text: 'Pierre', correct: false},
            {text: 'Robin', correct: false},
             {text: 'Lewis', correct: true},
            {text: 'Caroline', correct: false}
             ],
        },
    {
        questions: 'Qual é o último andar acessível da mina tradicional?',
        answers: [
            {text: '120', correct: true},
            {text: '100', correct: false},
            {text: '110', correct: false},
            {text: '150', correct: false}
             ],
    },

    {
        questions: 'Quem é o NPC secreto que mora nos esgotos?',
        answers: [
            {text: 'Gil', correct: false},
            {text: 'Krobus', correct: true},
            {text: 'Kent', correct: false},
            {text: 'Rasmodius', correct: false}
             ],
    }

];

/*GAME VARIABLES*/
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = questions.length; // TODO: valor esta retornando nullo
maxScoreSpan.textContent = questions.length;

//EVENT LISTENERS
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click',restartQuiz);


function startQuiz() {
// console.log(Array.from(answerContainer.children.forEach((el) => console.log(el))));

    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;

    const currentQuestion = questions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionText.textContent = currentQuestion.questions;

    // todo: 
    quizAnswers.innerHTML = '';

    currentQuestion.answers.forEach(answers =>{
        const button = document.createElement('button');
        button.textContent = answers.text;
        button.classList.add('answers-btn');


        button.dataset.correct = answers.correct;

        button.addEventListener('click', selectAnswers);
        quizAnswers.appendChild(button);

    });
}

function selectAnswers(event) {
    if(answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    Array.from(quizAnswers.children).forEach(button =>{
        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else if(button === selectedButton) {
            button.classList.add('incorrect');
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult()
        }
    }, 1000)
        }


function showResult() {
     console.log("Pontuação final:", score);
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScore.textContent = score;

    const percentage = (score / questions.length) * 100;

    if(percentage === 100) {
        resultMessage.textContent = 'Incrível! Você é um mestre de Stardew Valley!';
    } else if(percentage >= 80) {
        resultMessage.textContent = 'Ótimo trabalho! Você conhece bem Stardew Valley!';
    } else if(percentage >= 50) {
        resultMessage.textContent = 'Bom esforço! Mas você pode melhorar.';
    } else {
        resultMessage.textContent = 'Parece que você não conhece muito Stardew Valley. Tente novamente!';
    }
}




function restartQuiz() {
    resultScreen.classList.remove('active');

    startQuiz();
}
