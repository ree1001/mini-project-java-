// Quiz Data - Space Quiz with extra questions
const quizData = [
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Saturn", "Earth", "Jupiter", "Neptune"],
        correct: "Jupiter"
    },
    {
        question: "Who was the first human to journey into outer space?",
        choices: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"],
        correct: "Yuri Gagarin"
    },
    {
        question: "What galaxy is the Earth located in?",
        choices: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
        correct: "Milky Way"
    },
    {
        question: "What is the hottest planet in the solar system?",
        choices: ["Mars", "Venus", "Mercury", "Earth"],
        correct: "Venus"
    },
    {
        question: "Which planet has the most moons?",
        choices: ["Jupiter", "Saturn", "Mars", "Uranus"],
        correct: "Saturn"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const timerElement = document.getElementById('timer');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('nextBtn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartBtn');

function loadQuestion() {
    clearInterval(timer);  // Stop previous timer
    timeLeft = 10;  // Reset time
    feedbackElement.classList.add('hidden'); // Hide feedback message

    // Load current question
    const currentQuiz = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuiz.question;
    
    // Load choices
    choicesElement.innerHTML = '';
    currentQuiz.choices.forEach(choice => {
        const li = document.createElement('li');
        li.innerText = choice;
        li.addEventListener('click', () => selectAnswer(choice));
        choicesElement.appendChild(li);
    });

    nextButton.disabled = true;  // Disable next button initially
    startTimer();  // Start countdown
}

function startTimer() {
    timerElement.innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(true);  // Auto-check answer if time runs out
        }
    }, 1000);
}

function selectAnswer(selectedAnswer) {
    const currentQuiz = quizData[currentQuestionIndex];
    
    // Check if the selected answer is correct
    if (selectedAnswer === currentQuiz.correct) {
        score++;
        feedbackElement.innerText = "Correct! 🎉";
        feedbackElement.className = "feedback correct";
    } else {
        feedbackElement.innerText = `Wrong! The correct answer was "${currentQuiz.correct}".`;
        feedbackElement.className = "feedback incorrect";
    }
    
    feedbackElement.classList.remove('hidden');  // Show feedback message
    nextButton.disabled = false;  // Enable next button after checking answer
    clearInterval(timer);  // Stop the timer
}

function checkAnswer(isTimeUp = false) {
    const currentQuiz = quizData[currentQuestionIndex];

    // Check answer in case time runs out
    if (isTimeUp) {
        feedbackElement.innerText = `Time's up! The correct answer was "${currentQuiz.correct}".`;
        feedbackElement.className = "feedback incorrect";
        feedbackElement.classList.remove('hidden');
        nextButton.disabled = false;  // Enable next button
    }
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();  // Load next question
    } else {
        showResults();  // Quiz is complete
    }
}

function showResults() {
    questionElement.classList.add('hidden');
    choicesElement.classList.add('hidden');
    nextButton.classList.add('hidden');
    feedbackElement.classList.add('hidden');
    timerElement.classList.add('hidden');

    resultElement.classList.remove('hidden');
    scoreElement.innerText = `${score} / ${quizData.length}`;
}

restartButton.addEventListener('click', restartQuiz);

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add('hidden');

    questionElement.classList.remove('hidden');
    choicesElement.classList.remove('hidden');
    nextButton.classList.remove('hidden');
    timerElement.classList.remove('hidden');

    loadQuestion();  // Start quiz again
}

// Initialize quiz
loadQuestion();
nextButton.addEventListener('click', moveToNextQuestion);
