// Seleciona os elementos do HTML que serão usados para exibir perguntas, respostas, botões e resultado final
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const result = document.getElementById("result");

// Variáveis que serão usadas durante o quiz
let shuffledQuestions, currentQuestionsIndex, score, shuffledAnswers;

// Função para embaralhar os itens de um array (usada para perguntas e respostas aleatórias)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
}

// Lista de perguntas e alternativas, organizadas em objetos
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

// Inicia o quiz
function startQuiz() {
    score = 0; // Zera a pontuação
    questionContainer.style.display = "flex"; // Exibe o contêiner de perguntas
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5); // Embaralha as perguntas
    currentQuestionsIndex = 0; // Começa pela primeira pergunta
    nextButton.classList.remove("hide"); // Mostra o botão "Próximo"
    restartButton.classList.add("hide"); // Esconde o botão de reiniciar
    result.classList.add("hide"); // Esconde o resultado final
    setNextQuestion(); // Carrega a primeira pergunta
}

// Define e exibe a próxima pergunta
function setNextQuestion() {
    resetState(); // Limpa as respostas anteriores
    showQuestion(shuffledQuestions[currentQuestionsIndex]); // Mostra a nova pergunta
}

// Exibe a pergunta e cria os botões de resposta dinamicamente
function showQuestion(question) {
    questionElement.innerText = question.question; // Define o texto da pergunta

    // Embaralha as respostas para exibição aleatória
    shuffledAnswers = [...question.answer].sort(() => Math.random() - 0.5);

    // Cria os elementos de input (radio) e label para cada alternativa
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
        answerButton.appendChild(inputGroup); // Adiciona o grupo de resposta ao container
    });
}

// Limpa as respostas antigas do DOM antes de carregar uma nova pergunta
function resetState() {
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

// Evento do botão "Próximo"
nextButton.addEventListener("click", () => {
    const selectedAnswer = document.querySelector("input[name='answer']:checked");

    // Verifica se uma resposta foi selecionada
    if (!selectedAnswer) {
        alert("Por favor, selecione uma resposta.");
        return;
    }

    const answerIndex = parseInt(selectedAnswer.value);

    // Verifica se a resposta selecionada é correta e soma a pontuação
    if (shuffledAnswers[answerIndex].correto) {
        score++;
    }

    currentQuestionsIndex++; // Avança para a próxima pergunta

    if (currentQuestionsIndex < shuffledQuestions.length) {
        setNextQuestion(); // Carrega a próxima pergunta
    } else {
        endQuiz(); // Finaliza o quiz
    }
});

// Evento do botão "Reiniciar"
restartButton.addEventListener("click", startQuiz);

// Mostra o resultado final ao término do quiz
function endQuiz() {
    questionContainer.style.display = "none"; // Esconde o container de perguntas
    nextButton.classList.add("hide"); // Esconde o botão "Próximo"
    restartButton.classList.remove("hide"); // Mostra o botão de reiniciar
    result.classList.remove("hide"); // Mostra o resultado final
    result.innerText = `Sua pontuação final: ${score} / ${shuffledQuestions.length}`; // Mostra pontuação
}

// Inicia o quiz automaticamente ao carregar a página
startQuiz();
