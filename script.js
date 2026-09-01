/* =========================================================
   EngiSpark
   Main JavaScript
   ========================================================= */


/* =========================================================
   CLOUDFLARE AI API
   ========================================================= */

const AI_API_URL =
    "https://engispark-api.engisparkquiz2026.workers.dev/api/generate-questions";


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const DEFAULT_DEPARTMENTS = [
    "CSE",
    "EE",
    "Civil",
    "Mechanical"
];

const DEFAULT_SUBJECTS = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Basic Electrical"
];

const DEFAULT_TIMER = 15;


/* =========================================================
   GLOBAL QUIZ VARIABLES
   ========================================================= */

let allQuestions = [];

let quizQuestions = [];

let currentQuestionIndex = 0;

let userAnswers = {};

let quizStartTime = null;

let quizEndTime = null;

let quizTimerInterval = null;


/* =========================================================
   CAPTCHA
   ========================================================= */

let captchaCode = "";


/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function getDepartments() {

    const data =
        localStorage.getItem("engiSparkDepartments");

    if (!data) {

        localStorage.setItem(
            "engiSparkDepartments",
            JSON.stringify(DEFAULT_DEPARTMENTS)
        );

        return [...DEFAULT_DEPARTMENTS];
    }

    try {

        const parsed =
            JSON.parse(data);

        if (Array.isArray(parsed)) {
            return parsed;
        }

    } catch (error) {

        console.warn(
            "Department storage error:",
            error
        );
    }

    return [...DEFAULT_DEPARTMENTS];
}


function saveDepartments(data) {

    localStorage.setItem(
        "engiSparkDepartments",
        JSON.stringify(data)
    );
}


function getSubjects() {

    const data =
        localStorage.getItem("engiSparkSubjects");

    if (!data) {

        localStorage.setItem(
            "engiSparkSubjects",
            JSON.stringify(DEFAULT_SUBJECTS)
        );

        return [...DEFAULT_SUBJECTS];
    }

    try {

        const parsed =
            JSON.parse(data);

        if (Array.isArray(parsed)) {
            return parsed;
        }

    } catch (error) {

        console.warn(
            "Subject storage error:",
            error
        );
    }

    return [...DEFAULT_SUBJECTS];
}


function saveSubjects(data) {

    localStorage.setItem(
        "engiSparkSubjects",
        JSON.stringify(data)
    );
}


function getTimerSetting() {

    const data =
        localStorage.getItem("engiSparkTimer");

    if (!data) {

        localStorage.setItem(
            "engiSparkTimer",
            DEFAULT_TIMER
        );

        return DEFAULT_TIMER;
    }

    const timer =
        Number(data);

    return (
        timer === 10 ||
        timer === 15 ||
        timer === 20
    )
        ? timer
        : DEFAULT_TIMER;
}


function saveTimerSetting(minutes) {

    localStorage.setItem(
        "engiSparkTimer",
        String(minutes)
    );
}


/* =========================================================
   CAPTCHA GENERATOR
   ========================================================= */

function generateCaptcha() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789#$@";

    let result = "";

    for (let i = 0; i < 5; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        result += characters[randomIndex];
    }

    captchaCode = result;

    const captchaElement =
        document.getElementById("captchaCode");

    if (captchaElement) {

        captchaElement.textContent =
            captchaCode;

        captchaElement.innerText =
            captchaCode;

        captchaElement.style.display =
            "inline-block";

        captchaElement.style.visibility =
            "visible";

        captchaElement.style.opacity =
            "1";
    }

    const input =
        document.getElementById("captchaInput");

    if (input) {

        input.value = "";

        input.autocomplete = "off";
    }

    console.log(
        "EngiSpark CAPTCHA generated."
    );
}


/* =========================================================
   CAPTCHA REFRESH
   ========================================================= */

function refreshCaptcha() {

    generateCaptcha();

    const errorElement =
        document.getElementById(
            "verificationError"
        );

    if (errorElement) {

        errorElement.textContent = "";
    }
}


/* Make functions available to HTML onclick */
window.generateCaptcha =
    generateCaptcha;

window.refreshCaptcha =
    refreshCaptcha;


/* =========================================================
   USER VERIFICATION
   ========================================================= */

function verifyUser() {

    const nameInput =
        document.getElementById(
            "userName"
        );

    const captchaInput =
        document.getElementById(
            "captchaInput"
        );

    const errorElement =
        document.getElementById(
            "verificationError"
        );

    if (!nameInput || !captchaInput) {

        console.error(
            "Verification elements not found."
        );

        return;
    }

    const name =
        nameInput.value.trim();

    const enteredCaptcha =
        captchaInput.value.trim();

    if (errorElement) {

        errorElement.textContent = "";
    }


    /* NAME */

    if (!name) {

        if (errorElement) {

            errorElement.textContent =
                "Please enter your full name.";
        }

        nameInput.focus();

        return;
    }


    /* CAPTCHA EMPTY */

    if (!enteredCaptcha) {

        if (errorElement) {

            errorElement.textContent =
                "Please enter the CAPTCHA.";
        }

        captchaInput.focus();

        return;
    }


    /* CAPTCHA NOT GENERATED */

    if (!captchaCode) {

        generateCaptcha();

        if (errorElement) {

            errorElement.textContent =
                "CAPTCHA was refreshed. Please enter the new CAPTCHA.";
        }

        captchaInput.focus();

        return;
    }


    /* CAPTCHA CHECK */

    if (
        enteredCaptcha.toLowerCase() !==
        captchaCode.toLowerCase()
    ) {

        if (errorElement) {

            errorElement.textContent =
                "CAPTCHA is incorrect. A new CAPTCHA has been generated.";
        }

        captchaInput.value = "";

        generateCaptcha();

        captchaInput.focus();

        return;
    }


    /* SUCCESS */

    localStorage.setItem(
        "engiSparkUserName",
        name
    );

    localStorage.setItem(
        "engiSparkVerified",
        "true"
    );

    window.location.href =
        "dashboard.html";
}


window.verifyUser =
    verifyUser;


/* =========================================================
   DASHBOARD
   ========================================================= */

function loadDashboard() {

    const nameElement =
        document.getElementById(
            "userNameDisplay"
        );

    const popup =
        document.getElementById(
            "welcomePopup"
        );

    const name =
        localStorage.getItem(
            "engiSparkUserName"
        );

    if (nameElement) {

        nameElement.textContent =
            name || "Student";
    }

    if (popup) {

        popup.style.display =
            "flex";

        setTimeout(() => {

            popup.style.display =
                "none";

        }, 4000);
    }

    populateDashboardDepartments();

    populateDashboardSubjects();

    const timer =
        getTimerSetting();

    const timerSelect =
        document.getElementById(
            "quizTime"
        );

    if (timerSelect) {

        timerSelect.value =
            String(timer);
    }
}


function populateDashboardDepartments() {

    const select =
        document.getElementById(
            "department"
        );

    if (!select) {
        return;
    }

    const departments =
        getDepartments();

    select.innerHTML = "";

    departments.forEach(
        department => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                department;

            option.textContent =
                department;

            select.appendChild(
                option
            );
        }
    );
}


function populateDashboardSubjects() {

    const select =
        document.getElementById(
            "subject"
        );

    if (!select) {
        return;
    }

    const subjects =
        getSubjects();

    select.innerHTML = "";

    subjects.forEach(
        subject => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                subject;

            option.textContent =
                subject;

            select.appendChild(
                option
            );
        }
    );
}


/* =========================================================
   START QUIZ
   ========================================================= */

function startQuiz() {

    const department =
        document.getElementById(
            "department"
        )?.value;

    const subject =
        document.getElementById(
            "subject"
        )?.value;

    const difficulty =
        document.getElementById(
            "difficulty"
        )?.value;

    const time =
        document.getElementById(
            "quizTime"
        )?.value;

    const quizSettings = {

        year: "1st Year",

        department:
            department || "CSE",

        subject:
            subject || "Mathematics",

        difficulty:
            difficulty || "Medium",

        time:
            Number(time) ||
            getTimerSetting()
    };

    localStorage.setItem(
        "engiSparkQuizSettings",
        JSON.stringify(
            quizSettings
        )
    );

    window.location.href =
        "quiz.html";
}


window.startQuiz =
    startQuiz;


/* =========================================================
   LOAD QUESTIONS
   ========================================================= */

async function loadQuestions() {

    try {

        const response =
            await fetch(
                "questions.json",
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {

            throw new Error(
                `questions.json returned ${response.status}`
            );
        }

        const data =
            await response.json();

        if (!Array.isArray(data)) {

            throw new Error(
                "questions.json is not an array."
            );
        }

        allQuestions =
            data;

        return allQuestions;

    } catch (error) {

        console.warn(
            "questions.json unavailable. Checking saved questions.",
            error
        );

        const savedQuestions =
            localStorage.getItem(
                "engiSparkQuestions"
            );

        if (savedQuestions) {

            try {

                const parsed =
                    JSON.parse(
                        savedQuestions
                    );

                if (Array.isArray(parsed)) {

                    allQuestions =
                        parsed;

                    return allQuestions;
                }

            } catch (storageError) {

                console.warn(
                    "Saved question data invalid:",
                    storageError
                );
            }
        }

        allQuestions = [];

        return [];
    }
}


/* =========================================================
   SAVE QUESTIONS
   ========================================================= */

function saveQuestions() {

    try {

        localStorage.setItem(
            "engiSparkQuestions",
            JSON.stringify(
                allQuestions
            )
        );

    } catch (error) {

        console.error(
            "Unable to save questions:",
            error
        );

        showAdminMessage(
            "Unable to save questions in this browser."
        );
    }
}


/* =========================================================
   SHUFFLE
   ========================================================= */

function shuffleArray(array) {

    const copy =
        [...array];

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            copy[i],
            copy[j]
        ] = [
            copy[j],
            copy[i]
        ];
    }

    return copy;
}


/* =========================================================
   PREPARE QUIZ
   ========================================================= */

async function prepareQuiz() {

    const settingsData =
        localStorage.getItem(
            "engiSparkQuizSettings"
        );

    if (!settingsData) {

        window.location.href =
            "dashboard.html";

        return;
    }

    let settings;

    try {

        settings =
            JSON.parse(
                settingsData
            );

    } catch {

        window.location.href =
            "dashboard.html";

        return;
    }

    const questions =
        await loadQuestions();

    let filteredQuestions =
        questions.filter(
            question => {

                const departmentMatch =
                    !question.department ||
                    question.department ===
                    settings.department;

                const subjectMatch =
                    !question.subject ||
                    question.subject ===
                    settings.subject;

                const difficultyMatch =
                    !question.difficulty ||
                    question.difficulty ===
                    settings.difficulty;

                return (
                    departmentMatch &&
                    subjectMatch &&
                    difficultyMatch
                );
            }
        );


    /* SECOND FALLBACK */

    if (
        filteredQuestions.length < 10
    ) {

        filteredQuestions =
            questions.filter(
                question => {

                    const departmentMatch =
                        !question.department ||
                        question.department ===
                        settings.department;

                    const subjectMatch =
                        !question.subject ||
                        question.subject ===
                        settings.subject;

                    return (
                        departmentMatch &&
                        subjectMatch
                    );
                }
            );
    }


    /* FINAL FALLBACK */

    if (
        filteredQuestions.length < 10
    ) {

        filteredQuestions =
            questions;
    }


    if (
        filteredQuestions.length === 0
    ) {

        const questionText =
            document.getElementById(
                "questionText"
            );

        if (questionText) {

            questionText.textContent =
                "No questions are available.";
        }

        return;
    }


    quizQuestions =
        shuffleArray(
            filteredQuestions
        ).slice(
            0,
            Math.min(
                10,
                filteredQuestions.length
            )
        );


    quizQuestions =
        quizQuestions.map(
            question => {

                const optionObjects = [

                    {
                        key: "A",
                        text: question.optionA
                    },

                    {
                        key: "B",
                        text: question.optionB
                    },

                    {
                        key: "C",
                        text: question.optionC
                    },

                    {
                        key: "D",
                        text: question.optionD
                    }

                ];

                return {

                    ...question,

                    shuffledOptions:
                        shuffleArray(
                            optionObjects
                        )
                };
            }
        );


    currentQuestionIndex = 0;

    userAnswers = {};

    quizStartTime =
        Date.now();

    quizEndTime = null;


    localStorage.setItem(
        "engiSparkQuizQuestions",
        JSON.stringify(
            quizQuestions
        )
    );

    localStorage.setItem(
        "engiSparkUserAnswers",
        JSON.stringify(
            userAnswers
        )
    );

    localStorage.removeItem(
        "engiSparkQuizSubmitted"
    );


    displayQuizSettings();

    displayQuestion();

    startQuizTimer(
        settings.time
    );
}


/* =========================================================
   DISPLAY QUIZ SETTINGS
   ========================================================= */

function displayQuizSettings() {

    const settingsData =
        localStorage.getItem(
            "engiSparkQuizSettings"
        );

    if (!settingsData) {
        return;
    }

    let settings;

    try {

        settings =
            JSON.parse(
                settingsData
            );

    } catch {

        return;
    }

    const subjectElement =
        document.getElementById(
            "quizSubject"
        );

    if (subjectElement) {

        subjectElement.textContent =
            settings.subject;
    }
}


/* =========================================================
   DISPLAY QUESTION
   ========================================================= */

function displayQuestion() {

    const question =
        quizQuestions[
            currentQuestionIndex
        ];

    if (!question) {
        return;
    }


    const numberElement =
        document.getElementById(
            "questionNumber"
        );

    if (numberElement) {

        numberElement.textContent =
            `Question ${
                currentQuestionIndex + 1
            }/${quizQuestions.length}`;
    }


    const questionText =
        document.getElementById(
            "questionText"
        );

    if (questionText) {

        questionText.textContent =
            question.question || "";
    }


    const optionsContainer =
        document.getElementById(
            "options"
        );

    if (!optionsContainer) {
        return;
    }

    optionsContainer.innerHTML = "";


    question.shuffledOptions.forEach(
        option => {

            const label =
                document.createElement(
                    "label"
                );

            label.className =
                "option";


            const radio =
                document.createElement(
                    "input"
                );

            radio.type =
                "radio";

            radio.name =
                "quizOption";

            radio.value =
                option.key;


            if (
                userAnswers[
                    currentQuestionIndex
                ] === option.key
            ) {

                radio.checked =
                    true;

                label.classList.add(
                    "selected"
                );
            }


            radio.addEventListener(
                "change",
                () => {

                    selectAnswer(
                        option.key
                    );

                    updateOptionStyles();
                }
            );


            const text =
                document.createElement(
                    "span"
                );

            text.className =
                "option-text";

            text.textContent =
                `${option.key}. ${option.text}`;


            label.appendChild(
                radio
            );

            label.appendChild(
                text
            );

            optionsContainer.appendChild(
                label
            );
        }
    );


    updateNavigationButtons();

    updateProgress();
}


/* =========================================================
   SELECT ANSWER
   ========================================================= */

function selectAnswer(answer) {

    userAnswers[
        currentQuestionIndex
    ] = answer;

    localStorage.setItem(
        "engiSparkUserAnswers",
        JSON.stringify(
            userAnswers
        )
    );
}


window.selectAnswer =
    selectAnswer;


function updateOptionStyles() {

    const options =
        document.querySelectorAll(
            ".option"
        );

    options.forEach(
        option => {

            const radio =
                option.querySelector(
                    "input"
                );

            if (
                radio &&
                radio.checked
            ) {

                option.classList.add(
                    "selected"
                );

            } else {

                option.classList.remove(
                    "selected"
                );
            }
        }
    );
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function previousQuestion() {

    if (
        currentQuestionIndex <= 0
    ) {
        return;
    }

    currentQuestionIndex--;

    displayQuestion();
}


function nextQuestion() {

    if (
        currentQuestionIndex <
        quizQuestions.length - 1
    ) {

        currentQuestionIndex++;

        displayQuestion();

        return;
    }

    submitQuiz(false);
}


window.previousQuestion =
    previousQuestion;

window.nextQuestion =
    nextQuestion;


function updateNavigationButtons() {

    const previous =
        document.getElementById(
            "prevBtn"
        );

    const next =
        document.getElementById(
            "nextBtn"
        );

    if (previous) {

        previous.disabled =
            currentQuestionIndex === 0;
    }

    if (next) {

        if (
            currentQuestionIndex ===
            quizQuestions.length - 1
        ) {

            next.textContent =
                "✔ Finish";

        } else {

            next.textContent =
                "Next ►";
        }
    }
}


/* =========================================================
   PROGRESS
   ========================================================= */

function updateProgress() {

    const progress =
        document.getElementById(
            "progressBar"
        );

    if (
        !progress ||
        quizQuestions.length === 0
    ) {
        return;
    }

    const percentage =
        (
            (
                currentQuestionIndex + 1
            )
            /
            quizQuestions.length
        ) * 100;

    progress.style.width =
        `${percentage}%`;
}


/* =========================================================
   QUIZ TIMER
   ========================================================= */

function startQuizTimer(minutes) {

    clearInterval(
        quizTimerInterval
    );

    let remainingSeconds =
        Math.max(
            1,
            Number(minutes) * 60
        );


    const timerElement =
        document.getElementById(
            "timer"
        );

    const timerBox =
        document.querySelector(
            ".quiz-timer"
        );


    function updateTimer() {

        const mins =
            Math.floor(
                remainingSeconds / 60
            );

        const secs =
            remainingSeconds % 60;


        if (timerElement) {

            timerElement.textContent =
                `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        }


        if (
            remainingSeconds <= 60 &&
            timerBox
        ) {

            timerBox.classList.add(
                "warning"
            );
        }


        if (
            remainingSeconds <= 0
        ) {

            clearInterval(
                quizTimerInterval
            );

            submitQuiz(true);

            return;
        }

        remainingSeconds--;
    }


    updateTimer();

    quizTimerInterval =
        setInterval(
            updateTimer,
            1000
        );
}


/* =========================================================
   SUBMIT QUIZ
   ========================================================= */

function submitQuiz(
    autoSubmit = false
) {

    if (
        !quizQuestions.length
    ) {
        return;
    }


    if (
        localStorage.getItem(
            "engiSparkQuizSubmitted"
        ) === "true"
    ) {
        return;
    }


    const unanswered =
        quizQuestions.length -
        Object.keys(
            userAnswers
        ).length;


    if (
        !autoSubmit &&
        unanswered > 0
    ) {

        const shouldSubmit =
            confirm(
                `You have ${unanswered} unanswered question(s). Submit anyway?`
            );

        if (!shouldSubmit) {
            return;
        }
    }


    clearInterval(
        quizTimerInterval
    );


    quizEndTime =
        Date.now();


    let correct = 0;

    const wrongAnswers = [];


    quizQuestions.forEach(
        (question, index) => {

            const userAnswer =
                userAnswers[index];

            const correctAnswer =
                question.correctAnswer;


            if (
                userAnswer ===
                correctAnswer
            ) {

                correct++;

            } else {

                const correctOption =
                    question.shuffledOptions.find(
                        option =>
                            option.key ===
                            correctAnswer
                    );

                const userOption =
                    question.shuffledOptions.find(
                        option =>
                            option.key ===
                            userAnswer
                    );


                wrongAnswers.push({

                    question:
                        question.question,

                    questionNumber:
                        index + 1,

                    userAnswer:
                        userOption
                            ? `${userOption.key}. ${userOption.text}`
                            : "Not answered",

                    correctAnswer:
                        correctOption
                            ? `${correctOption.key}. ${correctOption.text}`
                            : correctAnswer
                });
            }
        }
    );


    const total =
        quizQuestions.length;


    const percentage =
        total > 0
            ? Math.round(
                (correct / total) * 100
            )
            : 0;


    const timeTaken =
        quizStartTime
            ? quizEndTime -
              quizStartTime
            : 0;


    const result = {

        score:
            correct,

        total:
            total,

        percentage:
            percentage,

        correct:
            correct,

        wrong:
            total - correct,

        wrongAnswers:
            wrongAnswers,

        timeTaken:
            timeTaken
    };


    localStorage.setItem(
        "engiSparkQuizResult",
        JSON.stringify(
            result
        )
    );


    localStorage.setItem(
        "engiSparkQuizSubmitted",
        "true"
    );


    window.location.href =
        "result.html";
}


window.submitQuiz =
    submitQuiz;


/* =========================================================
   RESULT
   ========================================================= */

function loadResult() {

    const resultData =
        localStorage.getItem(
            "engiSparkQuizResult"
        );

    if (!resultData) {
        return;
    }

    let result;

    try {

        result =
            JSON.parse(
                resultData
            );

    } catch {

        return;
    }


    const score =
        document.getElementById(
            "score"
        );

    if (score) {

        score.textContent =
            `${result.score}/${result.total}`;
    }


    const percentage =
        document.getElementById(
            "percentage"
        );

    if (percentage) {

        percentage.textContent =
            `${result.percentage}%`;
    }


    const correct =
        document.getElementById(
            "correctCount"
        );

    if (correct) {

        correct.textContent =
            result.correct;
    }


    const wrong =
        document.getElementById(
            "wrongCount"
        );

    if (wrong) {

        wrong.textContent =
            result.wrong;
    }


    const time =
        document.getElementById(
            "timeTaken"
        );

    if (time) {

        time.textContent =
            formatTime(
                result.timeTaken
            );
    }


    displayStars(
        result.percentage
    );

    displayWrongAnswers(
        result.wrongAnswers
    );
}


/* =========================================================
   FORMAT TIME
   ========================================================= */

function formatTime(
    milliseconds
) {

    const totalSeconds =
        Math.floor(
            Number(milliseconds || 0) /
            1000
        );

    const minutes =
        Math.floor(
            totalSeconds / 60
        );

    const seconds =
        totalSeconds % 60;


    return `${minutes} minute${
        minutes !== 1 ? "s" : ""
    } ${seconds} second${
        seconds !== 1 ? "s" : ""
    }`;
}


/* =========================================================
   STARS
   ========================================================= */

function displayStars(
    percentage
) {

    const stars =
        document.getElementById(
            "stars"
        );

    if (!stars) {
        return;
    }


    let count = 1;


    if (
        percentage >= 90
    ) {

        count = 5;

    } else if (
        percentage >= 80
    ) {

        count = 4;

    } else if (
        percentage >= 60
    ) {

        count = 3;

    } else if (
        percentage >= 40
    ) {

        count = 2;
    }


    stars.textContent =
        "⭐".repeat(count) +
        "☆".repeat(5 - count);
}


/* =========================================================
   WRONG ANSWERS
   ========================================================= */

function displayWrongAnswers(
    wrongAnswers
) {

    const container =
        document.getElementById(
            "wrongAnswersList"
        );

    const section =
        document.getElementById(
            "wrongAnswersSection"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !wrongAnswers ||
        wrongAnswers.length === 0
    ) {

        if (section) {

            section.innerHTML = `
                <h2>🎉 Excellent!</h2>
                <p>
                    You answered every question correctly.
                </p>
            `;
        }

        return;
    }


    wrongAnswers.forEach(
        item => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "wrong-answer";


            div.innerHTML = `
                <h3>
                    Question ${escapeHTML(
                        String(
                            item.questionNumber
                        )
                    )}:
                    ${escapeHTML(
                        item.question
                    )}
                </h3>

                <p class="user-answer">
                    Your answer:
                    ${escapeHTML(
                        item.userAnswer
                    )}
                </p>

                <p class="correct-answer">
                    Correct answer:
                    ${escapeHTML(
                        item.correctAnswer
                    )}
                </p>
            `;


            container.appendChild(
                div
            );
        }
    );
}


/* =========================================================
   RETAKE QUIZ
   ========================================================= */

function retakeQuiz() {

    localStorage.removeItem(
        "engiSparkQuizSubmitted"
    );

    localStorage.removeItem(
        "engiSparkQuizResult"
    );

    localStorage.removeItem(
        "engiSparkUserAnswers"
    );

    window.location.href =
        "dashboard.html";
}


window.retakeQuiz =
    retakeQuiz;


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

function adminLogin() {

    const username =
        document.getElementById(
            "adminUsername"
        )?.value.trim();

    const password =
        document.getElementById(
            "adminPassword"
        )?.value;

    const error =
        document.getElementById(
            "adminLoginError"
        );


    if (
        username === "EngiSpark" &&
        password === "1234"
    ) {

        sessionStorage.setItem(
            "engiSparkAdmin",
            "true"
        );

        window.location.href =
            "admin-panel.html";

    } else {

        if (error) {

            error.textContent =
                "Wrong username or password!";
        }
    }
}


window.adminLogin =
    adminLogin;


/* =========================================================
   ADMIN ACCESS
   ========================================================= */

function checkAdminAccess() {

    const loggedIn =
        sessionStorage.getItem(
            "engiSparkAdmin"
        );


    if (
        loggedIn !== "true"
    ) {

        window.location.href =
            "admin-login.html";

        return false;
    }


    return true;
}


function adminLogout() {

    sessionStorage.removeItem(
        "engiSparkAdmin"
    );

    window.location.href =
        "admin-login.html";
}


window.checkAdminAccess =
    checkAdminAccess;

window.adminLogout =
    adminLogout;


/* =========================================================
   ADMIN MESSAGE
   ========================================================= */

function showAdminMessage(
    message
) {

    const box =
        document.getElementById(
            "adminMessage"
        );

    const text =
        document.getElementById(
            "adminMessageText"
        );


    if (!box || !text) {
        return;
    }


    text.textContent =
        message;


    box.style.display =
        "flex";


    setTimeout(
        () => {

            box.style.display =
                "none";

        },
        3500
    );
}


function hideAdminMessage() {

    const box =
        document.getElementById(
            "adminMessage"
        );

    if (box) {

        box.style.display =
            "none";
    }
}


window.showAdminMessage =
    showAdminMessage;

window.hideAdminMessage =
    hideAdminMessage;


/* =========================================================
   TIMER MANAGEMENT
   ========================================================= */

function updateTimerSetting() {

    const select =
        document.getElementById(
            "adminTimer"
        );

    if (!select) {
        return;
    }


    const minutes =
        Number(
            select.value
        );


    if (
        ![10, 15, 20].includes(
            minutes
        )
    ) {

        showAdminMessage(
            "Please select a valid timer."
        );

        return;
    }


    saveTimerSetting(
        minutes
    );


    const current =
        document.getElementById(
            "currentTimer"
        );


    if (current) {

        current.textContent =
            `${minutes} Minutes`;
    }


    showAdminMessage(
        "Quiz timer updated successfully."
    );
}


window.updateTimerSetting =
    updateTimerSetting;


/* =========================================================
   DEPARTMENT MANAGEMENT
   ========================================================= */

function addDepartment() {

    const input =
        document.getElementById(
            "newDepartment"
        );

    if (!input) {
        return;
    }


    const name =
        input.value.trim();


    if (!name) {

        showAdminMessage(
            "Please enter a department name."
        );

        return;
    }


    const departments =
        getDepartments();


    const exists =
        departments.some(
            item =>
                item.toLowerCase() ===
                name.toLowerCase()
        );


    if (exists) {

        showAdminMessage(
            "This department already exists."
        );

        return;
    }


    departments.push(
        name
    );


    saveDepartments(
        departments
    );


    input.value = "";


    renderDepartmentList();

    populateQuestionDepartmentSelect();

    populateDashboardDepartments();

    populateAIDepartmentSelect();


    showAdminMessage(
        "Department added successfully."
    );
}


function deleteDepartment(
    index
) {

    const departments =
        getDepartments();


    if (
        index < 0 ||
        index >= departments.length
    ) {
        return;
    }


    const name =
        departments[index];


    const confirmed =
        confirm(
            `Delete department "${name}"?`
        );


    if (!confirmed) {
        return;
    }


    departments.splice(
        index,
        1
    );


    saveDepartments(
        departments
    );


    renderDepartmentList();

    populateQuestionDepartmentSelect();

    populateDashboardDepartments();

    populateAIDepartmentSelect();


    showAdminMessage(
        "Department deleted."
    );
}


function renderDepartmentList() {

    const container =
        document.getElementById(
            "departmentList"
        );


    if (!container) {
        return;
    }


    const departments =
        getDepartments();


    container.innerHTML = "";


    if (
        departments.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-state">
                No departments available.
            </div>
        `;

        return;
    }


    departments.forEach(
        (
            department,
            index
        ) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "manage-item";


            div.innerHTML = `
                <span>
                    ${escapeHTML(
                        department
                    )}
                </span>

                <button
                    type="button"
                    onclick="deleteDepartment(${index})"
                >
                    🗑️ Delete
                </button>
            `;


            container.appendChild(
                div
            );
        }
    );
}


window.addDepartment =
    addDepartment;

window.deleteDepartment =
    deleteDepartment;

window.renderDepartmentList =
    renderDepartmentList;


/* =========================================================
   SUBJECT MANAGEMENT
   ========================================================= */

function addSubject() {

    const input =
        document.getElementById(
            "newSubject"
        );


    if (!input) {
        return;
    }


    const name =
        input.value.trim();


    if (!name) {

        showAdminMessage(
            "Please enter a subject name."
        );

        return;
    }


    const subjects =
        getSubjects();


    const exists =
        subjects.some(
            item =>
                item.toLowerCase() ===
                name.toLowerCase()
        );


    if (exists) {

        showAdminMessage(
            "This subject already exists."
        );

        return;
    }


    subjects.push(
        name
    );


    saveSubjects(
        subjects
    );


    input.value = "";


    renderSubjectList();

    populateQuestionSubjectSelect();

    populateDashboardSubjects();

    populateAISubjectSelect();


    showAdminMessage(
        "Subject added successfully."
    );
}


function deleteSubject(
    index
) {

    const subjects =
        getSubjects();


    if (
        index < 0 ||
        index >= subjects.length
    ) {
        return;
    }


    const name =
        subjects[index];


    const confirmed =
        confirm(
            `Delete subject "${name}"?`
        );


    if (!confirmed) {
        return;
    }


    subjects.splice(
        index,
        1
    );


    saveSubjects(
        subjects
    );


    renderSubjectList();

    populateQuestionSubjectSelect();

    populateDashboardSubjects();

    populateAISubjectSelect();


    showAdminMessage(
        "Subject deleted."
    );
}


function renderSubjectList() {

    const container =
        document.getElementById(
            "subjectList"
        );


    if (!container) {
        return;
    }


    const subjects =
        getSubjects();


    container.innerHTML = "";


    if (
        subjects.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-state">
                No subjects available.
            </div>
        `;

        return;
    }


    subjects.forEach(
        (
            subject,
            index
        ) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "manage-item";


            div.innerHTML = `
                <span>
                    ${escapeHTML(
                        subject
                    )}
                </span>

                <button
                    type="button"
                    onclick="deleteSubject(${index})"
                >
                    🗑️ Delete
                </button>
            `;


            container.appendChild(
                div
            );
        }
    );
}


window.addSubject =
    addSubject;

window.deleteSubject =
    deleteSubject;

window.renderSubjectList =
    renderSubjectList;


/* =========================================================
   QUESTION DROPDOWNS
   ========================================================= */

function populateQuestionSubjectSelect() {

    const select =
        document.getElementById(
            "questionSubject"
        );


    if (!select) {
        return;
    }


    const subjects =
        getSubjects();


    select.innerHTML = "";


    subjects.forEach(
        subject => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                subject;

            option.textContent =
                subject;

            select.appendChild(
                option
            );
        }
    );
}


function populateQuestionDepartmentSelect() {

    const select =
        document.getElementById(
            "questionDepartment"
        );


    if (!select) {
        return;
    }


    const departments =
        getDepartments();


    select.innerHTML = "";


    departments.forEach(
        department => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                department;

            option.textContent =
                department;

            select.appendChild(
                option
            );
        }
    );
}


/* =========================================================
   AI DROPDOWNS
   ========================================================= */

function populateAIDepartmentSelect() {

    const select =
        document.getElementById(
            "aiDepartment"
        );


    if (!select) {
        return;
    }


    const departments =
        getDepartments();


    select.innerHTML = "";


    departments.forEach(
        department => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                department;

            option.textContent =
                department;

            select.appendChild(
                option
            );
        }
    );
}


function populateAISubjectSelect() {

    const select =
        document.getElementById(
            "aiSubject"
        );


    if (!select) {
        return;
    }


    const subjects =
        getSubjects();


    select.innerHTML = "";


    subjects.forEach(
        subject => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                subject;

            option.textContent =
                subject;

            select.appendChild(
                option
            );
        }
    );
}


/* =========================================================
   QUESTION ID
   ========================================================= */

function getNextQuestionId() {

    if (
        !Array.isArray(allQuestions) ||
        allQuestions.length === 0
    ) {

        return 1;
    }


    const ids =
        allQuestions
            .map(
                question =>
                    Number(
                        question.id
                    )
            )
            .filter(
                id =>
                    Number.isFinite(id)
            );


    if (
        ids.length === 0
    ) {

        return 1;
    }


    return (
        Math.max(...ids) + 1
    );
}


/* =========================================================
   ADD / EDIT QUESTION
   ========================================================= */

async function saveQuestion(
    event
) {

    if (event) {

        event.preventDefault();
    }


    await loadQuestions();


    const question =
        document.getElementById(
            "questionText"
        )?.value.trim();


    const optionA =
        document.getElementById(
            "optionA"
        )?.value.trim();


    const optionB =
        document.getElementById(
            "optionB"
        )?.value.trim();


    const optionC =
        document.getElementById(
            "optionC"
        )?.value.trim();


    const optionD =
        document.getElementById(
            "optionD"
        )?.value.trim();


    const correctAnswer =
        document.getElementById(
            "correctAnswer"
        )?.value;


    const subject =
        document.getElementById(
            "questionSubject"
        )?.value;


    const department =
        document.getElementById(
            "questionDepartment"
        )?.value;


    const difficulty =
        document.getElementById(
            "questionDifficulty"
        )?.value;


    const editingId =
        document.getElementById(
            "editingQuestionId"
        )?.value;


    if (
        !question ||
        !optionA ||
        !optionB ||
        !optionC ||
        !optionD ||
        !correctAnswer ||
        !subject ||
        !department ||
        !difficulty
    ) {

        showAdminMessage(
            "Please fill in all question fields."
        );

        return;
    }


    const questionData = {

        id:
            editingId
                ? Number(editingId)
                : getNextQuestionId(),

        year:
            "1st Year",

        subject:
            subject,

        department:
            department,

        difficulty:
            difficulty,

        question:
            question,

        optionA:
            optionA,

        optionB:
            optionB,

        optionC:
            optionC,

        optionD:
            optionD,

        correctAnswer:
            correctAnswer
    };


    if (editingId) {

        const index =
            allQuestions.findIndex(
                q =>
                    Number(q.id) ===
                    Number(editingId)
            );


        if (index !== -1) {

            allQuestions[index] =
                questionData;
        }


        showAdminMessage(
            "Question updated successfully."
        );

    } else {

        allQuestions.push(
            questionData
        );


        showAdminMessage(
            "Question added successfully."
        );
    }


    saveQuestions();

    resetQuestionForm();

    renderAdminQuestions();
}


window.saveQuestion =
    saveQuestion;


/* =========================================================
   RESET QUESTION FORM
   ========================================================= */

function resetQuestionForm() {

    const form =
        document.getElementById(
            "questionForm"
        );


    if (form) {

        form.reset();
    }


    const editingId =
        document.getElementById(
            "editingQuestionId"
        );


    if (editingId) {

        editingId.value = "";
    }


    const button =
        document.getElementById(
            "questionSubmitBtn"
        );


    if (button) {

        button.textContent =
            "➕ Add Question";
    }


    populateQuestionSubjectSelect();

    populateQuestionDepartmentSelect();
}


window.resetQuestionForm =
    resetQuestionForm;


/* =========================================================
   EDIT QUESTION
   ========================================================= */

function editQuestion(
    id
) {

    const question =
        allQuestions.find(
            q =>
                Number(q.id) ===
                Number(id)
        );


    if (!question) {
        return;
    }


    const questionText =
        document.getElementById(
            "questionText"
        );

    const optionA =
        document.getElementById(
            "optionA"
        );

    const optionB =
        document.getElementById(
            "optionB"
        );

    const optionC =
        document.getElementById(
            "optionC"
        );

    const optionD =
        document.getElementById(
            "optionD"
        );

    const correctAnswer =
        document.getElementById(
            "correctAnswer"
        );

    const questionSubject =
        document.getElementById(
            "questionSubject"
        );

    const questionDepartment =
        document.getElementById(
            "questionDepartment"
        );

    const questionDifficulty =
        document.getElementById(
            "questionDifficulty"
        );

    const editingId =
        document.getElementById(
            "editingQuestionId"
        );


    if (questionText) {

        questionText.value =
            question.question || "";
    }

    if (optionA) {

        optionA.value =
            question.optionA || "";
    }

    if (optionB) {

        optionB.value =
            question.optionB || "";
    }

    if (optionC) {

        optionC.value =
            question.optionC || "";
    }

    if (optionD) {

        optionD.value =
            question.optionD || "";
    }

    if (correctAnswer) {

        correctAnswer.value =
            question.correctAnswer || "";
    }

    if (questionSubject) {

        questionSubject.value =
            question.subject || "";
    }

    if (questionDepartment) {

        questionDepartment.value =
            question.department || "";
    }

    if (questionDifficulty) {

        questionDifficulty.value =
            question.difficulty || "Medium";
    }

    if (editingId) {

        editingId.value =
            question.id;
    }


    const button =
        document.getElementById(
            "questionSubmitBtn"
        );


    if (button) {

        button.textContent =
            "💾 Update Question";
    }


    document.getElementById(
        "questionForm"
    )?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


window.editQuestion =
    editQuestion;


/* =========================================================
   DELETE QUESTION
   ========================================================= */

function deleteQuestion(
    id
) {

    const question =
        allQuestions.find(
            q =>
                Number(q.id) ===
                Number(id)
        );


    if (!question) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this question?"
        );


    if (!confirmed) {
        return;
    }


    allQuestions =
        allQuestions.filter(
            q =>
                Number(q.id) !==
                Number(id)
        );


    saveQuestions();

    renderAdminQuestions();


    showAdminMessage(
        "Question deleted successfully."
    );
}


window.deleteQuestion =
    deleteQuestion;


/* =========================================================
   RENDER ADMIN QUESTIONS
   ========================================================= */

function renderAdminQuestions(
    searchText = ""
) {

    const container =
        document.getElementById(
            "adminQuestionList"
        );


    if (!container) {
        return;
    }


    const search =
        String(searchText)
            .trim()
            .toLowerCase();


    let questions =
        allQuestions;


    if (search) {

        questions =
            questions.filter(
                question => {

                    const combined =
                        `
                        ${question.question || ""}
                        ${question.subject || ""}
                        ${question.department || ""}
                        ${question.difficulty || ""}
                        `.toLowerCase();


                    return combined.includes(
                        search
                    );
                }
            );
    }


    container.innerHTML = "";


    const count =
        document.getElementById(
            "questionCount"
        );


    if (count) {

        count.textContent =
            questions.length;
    }


    if (
        questions.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    📭
                </div>

                <p>
                    No questions found.
                </p>
            </div>
        `;

        return;
    }


    questions.forEach(
        question => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "admin-question";


            const difficultyClass =
                `difficulty-${
                    String(
                        question.difficulty ||
                        ""
                    ).toLowerCase()
                }`;


            article.innerHTML = `

                <div class="admin-question-header">

                    <div class="admin-question-title">

                        Question ${escapeHTML(
                            String(
                                question.id
                            )
                        )}:

                        ${escapeHTML(
                            question.question || ""
                        )}

                    </div>

                </div>


                <div class="admin-question-meta">

                    <span class="badge">
                        ${escapeHTML(
                            question.subject || ""
                        )}
                    </span>

                    <span class="badge">
                        ${escapeHTML(
                            question.department || ""
                        )}
                    </span>

                    <span class="badge ${difficultyClass}">
                        ${escapeHTML(
                            question.difficulty || ""
                        )}
                    </span>

                </div>


                <div class="admin-question-options">

                    <div class="
                        admin-question-option
                        ${
                            question.correctAnswer === "A"
                                ? "correct"
                                : ""
                        }
                    ">
                        A. ${escapeHTML(
                            question.optionA || ""
                        )}
                    </div>


                    <div class="
                        admin-question-option
                        ${
                            question.correctAnswer === "B"
                                ? "correct"
                                : ""
                        }
                    ">
                        B. ${escapeHTML(
                            question.optionB || ""
                        )}
                    </div>


                    <div class="
                        admin-question-option
                        ${
                            question.correctAnswer === "C"
                                ? "correct"
                                : ""
                        }
                    ">
                        C. ${escapeHTML(
                            question.optionC || ""
                        )}
                    </div>


                    <div class="
                        admin-question-option
                        ${
                            question.correctAnswer === "D"
                                ? "correct"
                                : ""
                        }
                    ">
                        D. ${escapeHTML(
                            question.optionD || ""
                        )}
                    </div>

                </div>


                <div class="admin-question-actions">

                    <button
                        type="button"
                        class="edit-btn"
                        onclick="editQuestion(${Number(
                            question.id
                        )})"
                    >
                        ✏️ Edit
                    </button>


                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteQuestion(${Number(
                            question.id
                        )})"
                    >
                        🗑️ Delete
                    </button>

                </div>

            `;


            container.appendChild(
                article
            );
        }
    );
}


/* =========================================================
   SEARCH QUESTIONS
   ========================================================= */

function filterAdminQuestions() {

    const input =
        document.getElementById(
            "questionSearch"
        );


    renderAdminQuestions(
        input
            ? input.value
            : ""
    );
}


window.filterAdminQuestions =
    filterAdminQuestions;


/* =========================================================
   AI QUESTION GENERATOR
   ========================================================= */

async function generateAIQuestions() {

    const department =
        document.getElementById(
            "aiDepartment"
        )?.value.trim();


    const subject =
        document.getElementById(
            "aiSubject"
        )?.value.trim();


    const difficulty =
        document.getElementById(
            "aiDifficulty"
        )?.value ||
        "Medium";


    let count =
        Number(
            document.getElementById(
                "aiCount"
            )?.value ||
            3
        );


    const button =
        document.getElementById(
            "generateAIButton"
        );


    /* LIMIT */

    count =
        Math.min(
            Math.max(
                count,
                1
            ),
            20
        );


    if (
        !department ||
        !subject
    ) {

        showAIStatus(
            "Please select a department and subject.",
            "error"
        );

        return;
    }


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "⏳ Generating...";
    }


    showAIStatus(
        `Generating ${count} question(s) with Cloudflare AI...`,
        "loading"
    );


    try {

        /*
         * Make the API request.
         */

        const response =
            await fetch(
                AI_API_URL,
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            department:
                                department,

                            subject:
                                subject,

                            difficulty:
                                difficulty,

                            count:
                                count
                        })
                }
            );


        /*
         * Read response safely.
         */

        const rawText =
            await response.text();


        let data = null;


        if (rawText) {

            try {

                data =
                    JSON.parse(
                        rawText
                    );

            } catch {

                console.error(
                    "Cloudflare returned non-JSON response:",
                    rawText
                );

                throw new Error(
                    `Cloudflare Worker returned an invalid response (${response.status}).`
                );
            }
        }


        /*
         * HTTP ERROR
         */

        if (!response.ok) {

            const serverMessage =
                data?.error ||
                data?.message ||
                data?.detail ||
                `Server error ${response.status}`;

            throw new Error(
                serverMessage
            );
        }


        /*
         * SUCCESS FLAG
         */

        if (
            data &&
            data.success === false
        ) {

            throw new Error(
                data.error ||
                data.message ||
                "Cloudflare AI request failed."
            );
        }


        /*
         * Find questions.
         *
         * Supports:
         *
         * {
         *   questions: [...]
         * }
         *
         * or
         *
         * {
         *   data: {
         *      questions: [...]
         *   }
         * }
         */

        let generated = [];


        if (
            Array.isArray(
                data?.questions
            )
        ) {

            generated =
                data.questions;

        } else if (
            Array.isArray(
                data?.data?.questions
            )
        ) {

            generated =
                data.data.questions;
        }


        /*
         * No questions
         */

        if (
            generated.length === 0
        ) {

            throw new Error(
                "Cloudflare AI did not return any questions."
            );
        }


        /*
         * Load current questions first.
         */

        await loadQuestions();


        /*
         * IMPORTANT:
         * Reserve unique IDs before pushing.
         */

        let nextId =
            getNextQuestionId();


        const convertedQuestions =
            generated
                .map(
                    q => {

                        const converted =
                            convertAIQuestion(
                                q,
                                department,
                                subject,
                                difficulty,
                                nextId
                            );

                        if (converted) {

                            nextId++;
                        }

                        return converted;
                    }
                )
                .filter(
                    Boolean
                );


        if (
            convertedQuestions.length === 0
        ) {

            throw new Error(
                "AI response was received, but the question format was invalid."
            );
        }


        /*
         * Add to question database.
         */

        allQuestions.push(
            ...convertedQuestions
        );


        saveQuestions();

        renderAdminQuestions();


        /*
         * Preview
         */

        displayAIGeneratedQuestions(
            generated
        );


        showAIStatus(
            `${convertedQuestions.length} question(s) generated successfully and added to the question list.`,
            "success"
        );


        showAdminMessage(
            `${convertedQuestions.length} AI question(s) added successfully.`
        );


    } catch (error) {

        console.error(
            "Cloudflare AI generation error:",
            error
        );


        let message =
            error?.message ||
            "Unable to generate questions.";


        /*
         * Network / CORS
         */

        if (
            error instanceof TypeError
        ) {

            message =
                "Network or CORS error. Please check that your Cloudflare Worker is running and allows requests from this website.";
        }


        showAIStatus(
            message,
            "error"
        );


    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "✨ Generate Questions";
        }
    }
}


window.generateAIQuestions =
    generateAIQuestions;


/* =========================================================
   CONVERT AI QUESTION
   ========================================================= */

function convertAIQuestion(
    aiQuestion,
    department,
    subject,
    difficulty,
    id
) {

    if (!aiQuestion) {
        return null;
    }


    const questionText =
        typeof aiQuestion.question ===
        "string"
            ? aiQuestion.question.trim()
            : "";


    const options =
        Array.isArray(
            aiQuestion.options
        )
            ? aiQuestion.options
            : [];


    const answer =
        typeof aiQuestion.answer ===
        "string"
            ? aiQuestion.answer.trim()
            : "";


    if (
        !questionText ||
        options.length !== 4 ||
        !answer
    ) {

        return null;
    }


    const cleanedOptions =
        options.map(
            option =>
                String(
                    option
                ).trim()
        );


    if (
        cleanedOptions.some(
            option =>
                !option
        )
    ) {

        return null;
    }


    /*
     * Find answer by exact text.
     */

    let correctIndex =
        cleanedOptions.findIndex(
            option =>
                option.toLowerCase() ===
                answer.toLowerCase()
        );


    /*
     * Also support A/B/C/D answer.
     */

    if (
        correctIndex === -1
    ) {

        const answerKey =
            answer
                .toUpperCase()
                .replace(
                    /[^ABCD]/g,
                    ""
                )
                .charAt(0);


        if (answerKey) {

            correctIndex =
                ["A", "B", "C", "D"]
                    .indexOf(
                        answerKey
                    );
        }
    }


    /*
     * If answer is like:
     * "A. option text"
     */

    if (
        correctIndex === -1
    ) {

        correctIndex =
            cleanedOptions.findIndex(
                option =>
                    answer
                        .toLowerCase()
                        .includes(
                            option.toLowerCase()
                        )
            );
    }


    if (
        correctIndex < 0 ||
        correctIndex > 3
    ) {

        return null;
    }


    const correctKeys = [
        "A",
        "B",
        "C",
        "D"
    ];


    return {

        id:
            Number(id),

        year:
            "1st Year",

        subject:
            subject,

        department:
            department,

        difficulty:
            difficulty,

        question:
            questionText,

        optionA:
            cleanedOptions[0],

        optionB:
            cleanedOptions[1],

        optionC:
            cleanedOptions[2],

        optionD:
            cleanedOptions[3],

        correctAnswer:
            correctKeys[
                correctIndex
            ],

        explanation:
            typeof aiQuestion.explanation ===
            "string"
                ? aiQuestion.explanation.trim()
                : "",

        source:
            "AI"
    };
}


/* =========================================================
   AI STATUS
   ========================================================= */

function showAIStatus(
    message,
    type = "loading"
) {

    const status =
        document.getElementById(
            "aiStatus"
        );


    if (!status) {

        console.warn(
            "aiStatus element not found:",
            message
        );

        return;
    }


    status.textContent =
        message;


    status.className =
        "ai-status";


    if (
        type === "error"
    ) {

        status.classList.add(
            "error"
        );

    } else if (
        type === "success"
    ) {

        status.classList.add(
            "success"
        );

    } else {

        status.classList.add(
            "loading"
        );
    }


    status.style.display =
        "block";
}


window.showAIStatus =
    showAIStatus;


/* =========================================================
   AI PREVIEW
   ========================================================= */

function displayAIGeneratedQuestions(
    questions
) {

    const container =
        document.getElementById(
            "aiGeneratedList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `
        <h3>
            ✨ Newly Generated Questions
        </h3>
    `;


    questions.forEach(
        (
            question,
            index
        ) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "ai-generated-item";


            const options =
                Array.isArray(
                    question.options
                )
                    ? question.options
                    : [];


            item.innerHTML = `

                <h4>
                    ${index + 1}.
                    ${escapeHTML(
                        question.question || ""
                    )}
                </h4>


                <div class="ai-generated-options">

                    <div>
                        A. ${escapeHTML(
                            options[0] || ""
                        )}
                    </div>

                    <div>
                        B. ${escapeHTML(
                            options[1] || ""
                        )}
                    </div>

                    <div>
                        C. ${escapeHTML(
                            options[2] || ""
                        )}
                    </div>

                    <div>
                        D. ${escapeHTML(
                            options[3] || ""
                        )}
                    </div>

                </div>


                <div class="ai-generated-answer">

                    Correct Answer:
                    ${escapeHTML(
                        question.answer || ""
                    )}

                </div>


                ${
                    question.explanation
                        ? `
                            <p class="muted">
                                ${escapeHTML(
                                    question.explanation
                                )}
                            </p>
                        `
                        : ""
                }

            `;


            container.appendChild(
                item
            );
        }
    );
}


function clearAIGeneratedQuestions() {

    const container =
        document.getElementById(
            "aiGeneratedList"
        );


    const status =
        document.getElementById(
            "aiStatus"
        );


    if (container) {

        container.innerHTML = "";
    }


    if (status) {

        status.style.display =
            "none";
    }
}


window.displayAIGeneratedQuestions =
    displayAIGeneratedQuestions;

window.clearAIGeneratedQuestions =
    clearAIGeneratedQuestions;


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;
}


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const page =
            location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        console.log(
            "EngiSpark script loaded:",
            page
        );


        /* =====================================================
           VERIFICATION PAGE
           ===================================================== */

        if (
            page ===
            "verification.html"
        ) {

            /*
             * Small delay ensures that the HTML
             * has fully rendered before CAPTCHA
             * is inserted.
             */

            setTimeout(
                () => {

                    generateCaptcha();

                },
                50
            );


            const captchaInput =
                document.getElementById(
                    "captchaInput"
                );


            if (captchaInput) {

                captchaInput.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key ===
                            "Enter"
                        ) {

                            event.preventDefault();

                            verifyUser();
                        }
                    }
                );
            }
        }


        /* =====================================================
           DASHBOARD
           ===================================================== */

        if (
            page ===
            "dashboard.html"
        ) {

            loadDashboard();
        }


        /* =====================================================
           QUIZ
           ===================================================== */

        if (
            page ===
            "quiz.html"
        ) {

            localStorage.removeItem(
                "engiSparkQuizSubmitted"
            );

            await prepareQuiz();
        }


        /* =====================================================
           RESULT
           ===================================================== */

        if (
            page ===
            "result.html"
        ) {

            loadResult();
        }


        /* =====================================================
           ADMIN LOGIN
           ===================================================== */

        if (
            page ===
            "admin-login.html"
        ) {

            const username =
                document.getElementById(
                    "adminUsername"
                );

            const password =
                document.getElementById(
                    "adminPassword"
                );


            [
                username,
                password
            ].forEach(
                input => {

                    if (!input) {
                        return;
                    }


                    input.addEventListener(
                        "keydown",
                        event => {

                            if (
                                event.key ===
                                "Enter"
                            ) {

                                event.preventDefault();

                                adminLogin();
                            }
                        }
                    );
                }
            );
        }


        /* =====================================================
           ADMIN PANEL
           ===================================================== */

        if (
            page ===
            "admin-panel.html"
        ) {

            if (
                !checkAdminAccess()
            ) {

                return;
            }


            await loadQuestions();


            /* TIMER */

            const timerSelect =
                document.getElementById(
                    "adminTimer"
                );


            const currentTimer =
                document.getElementById(
                    "currentTimer"
                );


            const timer =
                getTimerSetting();


            if (timerSelect) {

                timerSelect.value =
                    String(timer);
            }


            if (currentTimer) {

                currentTimer.textContent =
                    `${timer} Minutes`;
            }


            /* DEPARTMENTS */

            renderDepartmentList();

            populateQuestionDepartmentSelect();

            populateAIDepartmentSelect();


            /* SUBJECTS */

            renderSubjectList();

            populateQuestionSubjectSelect();

            populateAISubjectSelect();


            /* QUESTIONS */

            renderAdminQuestions();
        }

    }
);
