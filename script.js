const mainContainer = document.getElementById('container')
const headerImageContainer = document.getElementById('header-image-container')
const introContainer = document.getElementById('intro-container')
const questionsContainer = document.getElementById("questions-container")
const questionsImage = document.getElementById("questions-image")
const questionElement = document.getElementById("question")
const resultContainer = document.getElementById("result-container")
const endScreenContainer = document.getElementById("end-screen-container")
const scoreElement = document.getElementById("score")
const scoreDescriptionElement = document.getElementById("score-description")
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const answerButtons = document.getElementById("answers")

let questionCount
let currentQuestionIndex
let shuffledQuestions
let userScore

startButton.addEventListener("click", () => {
    startQuiz()
})
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    if (questionCount === currentQuestionIndex) {
        endScreen()
    }
    else {
        setupNextQuestion()
    }
})


function startQuiz() {
    headerImageContainer.classList.add('hide')
    introContainer.classList.add('hide')
    questionsContainer.classList.remove('hide')
    endScreenContainer.classList.add('hide')
    startButton.classList.add('hide')
    questionCount = questions.length
    currentQuestionIndex = 0
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    userScore = 0
    setupNextQuestion()
}

function setupNextQuestion() {
    resetState()
    displayQuestion(shuffledQuestions[currentQuestionIndex])
}

function resetState() {
    questionElement.innerText = ""
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
    resultContainer.classList.add('hide')
}

function displayQuestion(question) {
    questionsImage.src = question.image
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        nextButton.classList.add('hide')
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct

            //change answer to be in span (necessary for check and slide effects)
            button.innerText = ""

            //add checkmark with class set to hide
            const checkmarkCircleElement = document.createElement('span')
            checkmarkCircleElement.classList.add('circle', 'hide')
            button.appendChild(checkmarkCircleElement)
            const checkmarkElement = document.createElement('span')
            checkmarkElement.classList.add('check-mark', 'hide')
            checkmarkCircleElement.appendChild(checkmarkElement)

            const slideTextElement = document.createElement('span')
            slideTextElement.id = "span-to-slide"
            slideTextElement.innerText = answer.text
            button.appendChild(slideTextElement)
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correctWrongAnswer = selectedButton.dataset.correct
    const correctRightAnswer = selectedButton.parentElement.dataset.correct
    const correct = correctWrongAnswer || correctRightAnswer

    //disable buttons
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true

        //to style all buttons, not just selected
        /* setStatusClass(button, button.dataset.correct) */
    })
    
    if (correctWrongAnswer) {
        setStatusClass(selectedButton, correct)
    }
    else if (correctRightAnswer) {
        setStatusClass(selectedButton.parentElement, correct)
    }
    else {
        setStatusClass(selectedButton, correct)
    }

    //setStatusClass(selectedButton, correct)
    displayFeedback(questions[currentQuestionIndex], correct)
    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    //clearStatusClass(element.firstChild)
    console.log(element)
    if (correct) {
        element.classList.add('correct')

        // slide text
        const slideSpanElement = document.getElementById("span-to-slide")
        slideSpanElement.classList.add('slideRight')

        //add checkmark change this to arrow function to remove hide class
        setTimeout(() => {
            element.firstChild.classList.remove('hide')
            element.firstChild.firstChild.classList.remove('hide')
          }, "900")
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function displayFeedback(question, correct) {
    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild)
    }
    // display result
    resultContainer.classList.remove('hide')
    const result = document.createElement('h3')
    result.id = "result"
    if (correct) {
        result.innerText = "Correct"
        userScore++
    }
    else {
        result.innerText = "Incorrect"
    }
    resultContainer.appendChild(result)
    // give feedback
    const info = document.createElement('p')
    info.id = "info"
    info.innerText = question.feedback
    resultContainer.appendChild(info)
}

function endScreen() {
    resetState()
    questionElement.classList.add('hide')
    nextButton.classList.add('hide')
    endScreenContainer.classList.remove('hide')
    let scorePercentage = userScore / questionCount
    scorePercentage = scorePercentage.toFixed(2) * 100
    scoreElement.innerText = "Your score is " + scorePercentage + "%"

    if (scorePercentage <= 30) {
        questionsImage.src = "content/end3.png"
        scoreDescriptionElement.innerText = "So you must just go to trivia night for the food and drinks, huh?"
    }
    else if (scorePercentage <= 99) {
        questionsImage.src = "content/end2.png"
        scoreDescriptionElement.innerText = "You know a good amount about animal trivia. This will serve you well!"
    }
    else {
        questionsImage.src = "content/end1.png"
        scoreDescriptionElement.innerText = "You are an animal genius! "
    }


    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    endScreenContainer.classList.remove('hide')
}

const questions = [
    {
        question: "What is a baby whale called?",
        image: "content/whale.png",
        answers: [
            { text: 'Pup', correct: false},
            { text: 'Farrow', correct: false},
            { text: 'Calf', correct: true},
            { text: 'Fry', correct: false}
        ],
        feedback: "Baby whales are called Calves."
    },
    {
        question: "What animal is the Egyptian Sphinx based on?",
        image: "content/sphinx.png",
        answers: [
            { text: 'Lion', correct: true},
            { text: 'Cougar', correct: false},
            { text: 'Cat', correct: false},
            { text: 'Leopard', correct: false}
        ],
        feedback: "The sphinx is based on the lion."
    },
    {
        question: "How many wings do bees have?",
        image: "content/bee.png",
        answers: [
            { text: '2', correct: false},
            { text: '4', correct: true},
            { text: '5', correct: false},
            { text: '6', correct: false}
        ],
        feedback: "Bees have 4 wings - don't trust cartoon photos!"
    },
    {
        question: "What is the tallest dog breed?",
        image: "content/dog.png",
        answers: [
            { text: 'Dobermann', correct: false},
            { text: 'Great Dane', correct: true},
            { text: 'English Mastiff', correct: false},
            { text: 'Irish Wolfhound', correct: false}
        ],
        feedback: "The tallest dog was Zeus, a Great Dane from Michigan, United States."
    },
    {
        question: "To which bird family does the jay belong?",
        image: "content/bird.png",
        answers: [
            { text: 'Potoos', correct: false},
            { text: 'Rheas', correct: false},
            { text: 'Screamers', correct: false},
            { text: 'Crow', correct: true}
        ],
        feedback: "Jays are crows!"
    }
]

// old fire emblem questions
/* const questions = [
    {
        question: "From which game is this character a protagonist of?",
        answers: [
            { text: 'Awakening', correct: false},
            { text: 'Path of Radiance', correct: false},
            { text: 'Radiant Dawn', correct: true},
            { text: 'Sacred Stones', correct: false}
        ],
        feedback: "Macaiah is one of two protagonists in Fire Emblem: Radiant Dawn. "
    }, 
    {
        question: "Which race is this character a member of?",
        answers: [
            { text: 'Laguz', correct: true},
            { text: 'Kitsune', correct: false},
            { text: 'Beorc', correct: false},
            { text: 'Taguel', correct: false}
        ],
        feedback: "Laguz can shift between human-like forms and animal-like forms. There are beast, bird, and dragon tribes."
    },
    {
        question: "What is the name of this thief?",
        answers: [
            { text: 'Volke', correct: false},
            { text: 'Niles', correct: false},
            { text: 'Sothe', correct: false},
            { text: 'Matthew', correct: true}
        ],
        feedback: "Matthew is the primary thief unit in FE7: The Blazing Blade."
    },
    {
        question: "What is the name of this Fire Emblem hero?",
        answers: [
            { text: 'Corrin', correct: false},
            { text: 'Eirika', correct: true},
            { text: 'Byleth', correct: false},
            { text: 'Lynn', correct: false}
        ],
        feedback: "Eirika is a princess of Renais, and one of two protagonists in Fire Emblem 6: Sacred Stones."
    }
] */

// old batman questions
/* const questions = [
    {
        question: "Does Batman have super powers?",
        answers: [
            { text: 'Yes', correct: false},
            { text: 'No', correct: true}
        ],
        feedback: "Batman does NOT have super powers. "
    }, 
    {
        question: "How did Batman's parents die?",
        answers: [
            { text: 'They died in a car accident', correct: false},
            { text: 'They both had heart attacks', correct: false},
            { text: 'They were killed by a random mugger', correct: true}
        ],
        feedback: "Batman's parents were killed by a mugger, Joe Chill"
    },
    {
        question: "What is Batman's real name?",
        answers: [
            { text: 'Will Harvey', correct: false},
            { text: 'Chase Upton', correct: false},
            { text: 'Bruce Wayne', correct: true},
            { text: 'Jeranamo Berringer', correct: false}
        ],
        feedback: "The man beneath the mask is Bruce Wayne"
    }
] */