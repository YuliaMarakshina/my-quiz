const quizData = [
    { question: "Какой язык используется для создания стилей веб-страниц?", answers: ["HTML", "CSS", "JavaScript", "Python"], correct: 1 },
    { question: "Как в Python вывести текст на экран?", answers: ["console.log()", "echo", "print()", "System.out.println()"], correct: 2 },
    { question: "Какой тип данных в Python является неизменяемым?", answers: ["list", "dict", "tuple", "set"], correct: 2 },
    { question: "Что выведет код: print(2 ** 3)?", answers: ["6", "8", "9", "5"], correct: 1 },
    { question: "Какой цикл используется для перебора элементов в Python?", answers: ["for", "foreach", "loop", "each"], correct: 0 },
    { question: "Как создать функцию в Python?", answers: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"], correct: 1 },
    { question: "Что выведет код: print(type(10.5))?", answers: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'decimal'>"], correct: 1 },
    { question: "Какой метод добавляет элемент в конец списка Python?", answers: ["push()", "append()", "add()", "insert()"], correct: 1 },
    { question: "Что означает оператор // в Python?", answers: ["Деление с остатком", "Целочисленное деление", "Обычное деление", "Возведение в степень"], correct: 1 },
    { question: "Как правильно открыть файл для чтения в Python?", answers: ["open('file.txt', 'r')", "open('file.txt', 'read')", "open('file.txt', 'w')", "open('file.txt', 'rb')"], correct: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let canClick = true;

const questionTitle = document.getElementById("question-title");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress-bar");
const questionScreen = document.getElementById("question-screen");
const resultsScreen = document.getElementById("results-screen");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
    canClick = true;
    answersContainer.innerHTML = "";

    let progressPercent = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = progressPercent + "%";

    let currentData = quizData[currentQuestionIndex];
    questionTitle.textContent = currentData.question;

    currentData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index, button));
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, clickedButton) {
    if (!canClick) return;
    canClick = false;

    let currentData = quizData[currentQuestionIndex];
    let correctIndex = currentData.correct;
    const allButtons = answersContainer.querySelectorAll("button");

    if (selectedIndex === correctIndex) {
        clickedButton.classList.add("correct");
        score++;
    } else {
        clickedButton.classList.add("wrong");
        allButtons[correctIndex].classList.add("correct");
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    progressBar.style.width = "100%";
    questionScreen.classList.add("hidden");
    resultsScreen.classList.remove("hidden");
    resultText.textContent = "Вы ответили правильно на " + score + " из " + quizData.length + " вопросов.";
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultsScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    showQuestion();
});

showQuestion();