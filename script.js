const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const result = document.getElementById("result");

let shuffledQuestions, currentQuestionsIndex, score, shuffledAnswers;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const questions = [
    {
        question: "Qual é a função da tag <head> em um documento HTML?",
        answer: [
            { texto: "Armazenar metadados e links para recursos externos", correto: true },
            { texto: "Exibir o conteúdo principal da página", correto: false },
            { texto: "Criar seções e divisões na página", correto: false },
            { texto: "Definir o rodapé do site", correto: false }
        ],
    },
    {
        question: "Qual propriedade CSS é usada para alterar a cor do texto?",
        answer: [
            { texto: "color", correto: true },
            { texto: "background-color", correto: false },
            { texto: "font-style", correto: false },
            { texto: "text-align", correto: false }
        ],
    },
    {
        question: "Como se declara uma variável que não pode ser reatribuída em JavaScript?",
        answer: [
            { texto: "const", correto: true },
            { texto: "let", correto: false },
            { texto: "var", correto: false },
            { texto: "static", correto: false }
        ],
    },
    {
        question: "Qual tag HTML é usada para criar um link?",
        answer: [
            { texto: "<a>", correto: true },
            { texto: "<link>", correto: false },
            { texto: "<href>", correto: false },
            { texto: "<url>", correto: false }
        ],
    },
    {
        question: "Qual seletor CSS seleciona um elemento pelo seu ID?",
        answer: [
            { texto: "#", correto: true },
            { texto: ".", correto: false },
            { texto: "*", correto: false },
            { texto: ":", correto: false }
        ],
    },
    {
        question: "Qual método JavaScript é usado para escrever no console do navegador?",
        answer: [
            { texto: "console.log()", correto: true },
            { texto: "print()", correto: false },
            { texto: "window.alert()", correto: false },
            { texto: "document.write()", correto: false }
        ],
    },
    {
        question: "No modelo de caixa CSS (Box Model), o que fica entre o conteúdo e a borda?",
        answer: [
            { texto: "Padding", correto: true },
            { texto: "Margin", correto: false },
            { texto: "Outline", correto: false },
            { texto: "Spacing", correto: false }
        ],
    },
    {
        question: "Qual é o operador de igualdade estrita em JavaScript?",
        answer: [
            { texto: "===", correto: true },
            { texto: "==", correto: false },
            { texto: "=", correto: false },
            { texto: "!==", correto: false }
        ],
    }
];

function startQuiz() {
    score = 0;
    questionContainer.style.display = "flex";
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionsIndex = 0;
    nextButton.classList.remove("hide");
    restartButton.classList.add("hide");
    result.classList.add("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionsIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;

    shuffledAnswers = [...question.answer].sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach((answer, index) => {
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "answer" + index;
        radio.name = "answer";
        radio.value = index;

        const label = document.createElement("label");
        label.htmlFor = "answer" + index;
        label.innerText = answer.texto;

        inputGroup.appendChild(radio);
        inputGroup.appendChild(label);
        answerButton.appendChild(inputGroup);
    });
}

function resetState() {
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

nextButton.addEventListener("click", () => {
    const selectedAnswer = document.querySelector("input[name='answer']:checked");

    if (!selectedAnswer) {
        alert("Por favor, selecione uma resposta.");
        return;
    }

    const answerIndex = parseInt(selectedAnswer.value);

    if (shuffledAnswers[answerIndex].correto) {
        score++;
    }

    currentQuestionsIndex++;

    if (currentQuestionsIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endQuiz();
    }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
    questionContainer.style.display = "none";
    nextButton.classList.add("hide");
    restartButton.classList.remove("hide");
    result.classList.remove("hide");
    result.innerText = `Sua pontuação final: ${score} / ${shuffledQuestions.length}`;
}

startQuiz();
