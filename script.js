/* =========================================================
   EngiSpark
   Main JavaScript
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const ENGISPARK_AI_API =
    "https://engispark-api.engisparkquiz2026.workers.dev";


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const DEFAULT_DEPARTMENTS = [
    "CSE",
    "EEE",
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
   LOCAL STORAGE HELPERS
   ========================================================= */

function getDepartments() {

    const data =
        localStorage.getItem(
            "engiSparkDepartments"
        );

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

        return Array.isArray(parsed)
            ? parsed
            : [...DEFAULT_DEPARTMENTS];

    } catch {

        return [...DEFAULT_DEPARTMENTS];
    }
}


function saveDepartments(data) {

    localStorage.setItem(
        "engiSparkDepartments",
        JSON.stringify(data)
    );
}


function getSubjects() {

    const data =
        localStorage.getItem(
            "engiSparkSubjects"
        );

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

        return Array.isArray(parsed)
            ? parsed
            : [...DEFAULT_SUBJECTS];

    } catch {

        return [...DEFAULT_SUBJECTS];
    }
}


function saveSubjects(data) {

    localStorage.setItem(
        "engiSparkSubjects",
        JSON.stringify(data)
    );
}


function getTimerSetting() {

    const data =
        localStorage.getItem(
            "engiSparkTimer"
        );

    if (!data) {

        localStorage.setItem(
            "engiSparkTimer",
            DEFAULT_TIMER
        );

        return DEFAULT_TIMER;
    }

    return Number(data) || DEFAULT_TIMER;
}


function saveTimerSetting(minutes) {

    localStorage.setItem(
        "engiSparkTimer",
        String(minutes)
    );
}


/* =========================================================
   USER VERIFICATION
   ========================================================= */

let captchaCode = "";


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
        document.getElementById(
            "captchaCode"
        );

    if (captchaElement) {

        captchaElement.textContent =
            captchaCode;
    }
}


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
        return;
    }

    const name =
        nameInput.value.trim();

    const enteredCaptcha =
        captchaInput.value.trim();

    if (!name) {

        if (errorElement) {

            errorElement.textContent =
                "Please enter your full name.";
        }

        return;
    }

    if (!enteredCaptcha) {

        if (errorElement) {

            errorElement.textContent =
                "Please enter the CAPTCHA.";
        }

        return;
    }

    if (
        enteredCaptcha.toLowerCase() !==
        captchaCode.toLowerCase()
    ) {

        if (errorElement) {

            errorElement.textContent =
                "CAPTCHA is incorrect, please try again.";
        }

        captchaInput.value = "";

        generateCaptcha();

        return;
    }

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
        JSON.stringify(quizSettings)
    );

    window.location.href =
        "quiz.html";
}


/* =========================================================
   QUESTION DATA
   ========================================================= */

let allQuestions = [];

let quizQuestions = [];

let currentQuestionIndex = 0;

let userAnswers = {};

let quizStartTime = null;

let quizEndTime = null;

let quizTimerInterval = null;


/* =========================================================
   LOAD QUESTIONS
   ========================================================= */

async function loadQuestions() {

    /*
     * questions.json was removed.
     * First try localStorage.
     */

    const savedQuestions =
        localStorage.getItem(
            "engiSparkQuestions"
        );

    if (savedQuestions) {

        try {

            const parsed =
                JSON.parse(savedQuestions);

            if (Array.isArray(parsed)) {

                allQuestions =
                    parsed;

                return allQuestions;
            }

        } catch (error) {

            console.error(
                "Saved questions error:",
                error
            );
        }
    }


    /*
     * Optional fallback:
     * If questions.json exists, load it.
     */

    try {

        const response =
            await fetch(
                "questions.json",
                {
                    cache: "no-store"
                }
            );

        if (response.ok) {

            const data =
                await response.json();

            allQuestions =
                Array.isArray(data)
                    ? data
                    : [];

            if (allQuestions.length > 0) {

                saveQuestions();
            }

            return allQuestions;
        }

    } catch (error) {

        console.log(
            "questions.json unavailable."
        );
    }


    allQuestions = [];

    return allQuestions;
}


/* =========================================================
   SAVE QUESTIONS
   ========================================================= */

function saveQuestions() {

    localStorage.setItem(
        "engiSparkQuestions",
        JSON.stringify(allQuestions)
    );
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

    const settings =
        JSON.parse(
            settingsData
        );

    const questions =
        await loadQuestions();


    /*
     * Exact filter
     */

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


    /*
     * Department + subject fallback
     */

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


    /*
     * Final fallback
     */

    if (
        filteredQuestions.length < 10
    ) {

        filteredQuestions =
            questions;
    }


    quizQuestions =
        shuffleArray(
            filteredQuestions
        ).slice(0, 10);


    /*
     * Shuffle options
     */

    quizQuestions =
        quizQuestions.map(
            question => {

                const optionObjects = [

                    {
                        key: "A",
                        text:
                            question.optionA
                    },

                    {
                        key: "B",
                        text:
                            question.optionB
                    },

                    {
                        key: "C",
                        text:
                            question.optionC
                    },

                    {
                        key: "D",
                        text:
                            question.optionD
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

    const settings =
        JSON.parse(
            settingsData
        );

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
            question.question;
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

    if (!progress) {
        return;
    }

    if (!quizQuestions.length) {
        return;
    }

    const percentage =
        (
            (
                currentQuestionIndex + 1
            ) /
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
        Number(minutes) * 60;

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
                `${String(mins).padStart(
                    2,
                    "0"
                )}:${String(secs).padStart(
                    2,
                    "0"
                )}`;
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
        Math.round(
            (
                correct /
                total
            ) * 100
        );


    const timeTaken =
        quizEndTime -
        quizStartTime;


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


/* =========================================================
   LOAD RESULT
   ========================================================= */

function loadResult() {

    const resultData =
        localStorage.getItem(
            "engiSparkQuizResult"
        );

    if (!resultData) {
        return;
    }

    const result =
        JSON.parse(
            resultData
        );


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
            milliseconds / 1000
        );

    const minutes =
        Math.floor(
            totalSeconds / 60
        );

    const seconds =
        totalSeconds % 60;


    return `${minutes} minute${
        minutes !== 1
            ? "s"
            : ""
    } ${seconds} second${
        seconds !== 1
            ? "s"
            : ""
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


    if (percentage >= 90) {

        count = 5;

    } else if (percentage >= 80) {

        count = 4;

    } else if (percentage >= 60) {

        count = 3;

    } else if (percentage >= 40) {

        count = 2;
    }


    stars.textContent =
        "⭐".repeat(count) +
        "☆".repeat(
            5 - count
        );
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
                    Question ${
                        item.questionNumber
                    }:
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
    }
}


/* =========================================================
   ADMIN LOGOUT
   ========================================================= */

function adminLogout() {

    sessionStorage.removeItem(
        "engiSparkAdmin"
    );

    window.location.href =
        "admin-login.html";
}


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

    setTimeout(() => {

        box.style.display =
            "none";

    }, 3000);
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


/* =========================================================
   ADMIN TIMER
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

    populateAIDepartmentSelect();

    populateDashboardDepartments();


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

    populateAIDepartmentSelect();

    populateDashboardDepartments();


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

    populateAISubjectSelect();

    populateDashboardSubjects();


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

    populateAISubjectSelect();

    populateDashboardSubjects();


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


/* =========================================================
   QUESTION SELECT DROPDOWNS
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
        allQuestions.length === 0
    ) {
        return 1;
    }


    const ids =
        allQuestions
            .map(
                q =>
                    Number(q.id)
            )
            .filter(
                id =>
                    !isNaN(id)
            );


    if (
        ids.length === 0
    ) {
        return 1;
    }


    return (
        Math.max(
            ...ids
        ) + 1
    );
}


/* =========================================================
   MANUAL ADD / EDIT QUESTION
   ========================================================= */

async function saveQuestion(
    event
) {

    event.preventDefault();


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
            correctAnswer,

        explanation:
            ""
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
                {
                    ...allQuestions[index],
                    ...questionData
                };
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


    document.getElementById(
        "questionText"
    ).value =
        question.question || "";


    document.getElementById(
        "optionA"
    ).value =
        question.optionA || "";


    document.getElementById(
        "optionB"
    ).value =
        question.optionB || "";


    document.getElementById(
        "optionC"
    ).value =
        question.optionC || "";


    document.getElementById(
        "optionD"
    ).value =
        question.optionD || "";


    document.getElementById(
        "correctAnswer"
    ).value =
        question.correctAnswer || "";


    document.getElementById(
        "questionSubject"
    ).value =
        question.subject || "";


    document.getElementById(
        "questionDepartment"
    ).value =
        question.department || "";


    document.getElementById(
        "questionDifficulty"
    ).value =
        question.difficulty || "Medium";


    document.getElementById(
        "editingQuestionId"
    ).value =
        question.id;


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
        behavior: "smooth"
    });
}


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
        searchText
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

                        Question ${
                            escapeHTML(
                                String(
                                    question.id
                                )
                            )
                        }:

                        ${escapeHTML(
                            question.question
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

                    ${
                        question.source === "AI"
                            ? `
                                <span class="badge">
                                    🤖 AI
                                </span>
                              `
                            : ""
                    }

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


                ${
                    question.explanation
                        ? `
                            <div class="muted">
                                <strong>
                                    Explanation:
                                </strong>
                                ${escapeHTML(
                                    question.explanation
                                )}
                            </div>
                          `
                        : ""
                }


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
        )?.value.trim();


    const count =
        Number(
            document.getElementById(
                "aiQuestionCount"
            )?.value
        ) || 3;


    const button =
        document.getElementById(
            "generateAIButton"
        );


    const status =
        document.getElementById(
            "aiGeneratorStatus"
        );


    const preview =
        document.getElementById(
            "generatedQuestionsPreview"
        );


    if (
        !department ||
        !subject
    ) {

        if (status) {

            status.textContent =
                "Please select a department and subject.";
        }

        return;
    }


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "⏳ Generating...";
    }


    if (status) {

        status.textContent =
            `Generating ${count} question(s) using EngiSpark AI...`;
    }


    if (preview) {

        preview.innerHTML = "";
    }


    try {

        await loadQuestions();


        /*
         * Send request to Cloudflare Worker
         */

        const response =
            await fetch(
                `${ENGISPARK_AI_API}/api/generate-questions`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
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


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "AI request failed."
            );
        }


        if (
            !data.success
        ) {

            throw new Error(
                data.error ||
                "AI generation failed."
            );
        }


        if (
            !Array.isArray(
                data.questions
            )
        ) {

            throw new Error(
                "AI did not return a valid questions list."
            );
        }


        /*
         * Convert backend AI format
         * into EngiSpark quiz format.
         */

        const generated =
            data.questions
                .map(
                    question =>
                        convertAIQuestion(
                            question,
                            department,
                            subject,
                            difficulty
                        )
                )
                .filter(Boolean);


        if (
            generated.length === 0
        ) {

            throw new Error(
                "No valid questions were generated."
            );
        }


        /*
         * Add questions to local question bank.
         */

        allQuestions.push(
            ...generated
        );


        saveQuestions();


        /*
         * Render immediately.
         */

        renderAdminQuestions();


        /*
         * Show generated questions.
         */

        renderGeneratedQuestions(
            generated
        );


        if (status) {

            status.textContent =
                `${generated.length} question(s) generated and added successfully.`;
        }


        showAdminMessage(
            `${generated.length} AI question(s) added successfully.`
        );


    } catch (error) {

        console.error(
            "AI generation error:",
            error
        );


        if (status) {

            status.textContent =
                `❌ ${error.message}`;
        }


        showAdminMessage(
            `AI generation failed: ${error.message}`
        );


    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "🤖 Generate Questions with AI";
        }
    }
}


/* =========================================================
   CONVERT AI QUESTION
   ========================================================= */

function convertAIQuestion(
    aiQuestion,
    department,
    subject,
    difficulty
) {

    if (!aiQuestion) {
        return null;
    }


    const questionText =
        String(
            aiQuestion.question || ""
        ).trim();


    const options =
        Array.isArray(
            aiQuestion.options
        )
            ? aiQuestion.options
            : [];


    const answer =
        String(
            aiQuestion.answer || ""
        ).trim();


    const explanation =
        String(
            aiQuestion.explanation || ""
        ).trim();


    if (
        !questionText ||
        options.length !== 4 ||
        options.some(
            option =>
                !String(
                    option || ""
                ).trim()
        ) ||
        !answer
    ) {

        return null;
    }


    /*
     * Find the correct answer's option index.
     */

    const answerIndex =
        options.findIndex(
            option =>
                String(
                    option
                ).trim().toLowerCase() ===
                answer.toLowerCase()
        );


    if (
        answerIndex === -1
    ) {

        console.warn(
            "AI answer did not match any option:",
            answer
        );

        return null;
    }


    const correctAnswer =
        ["A", "B", "C", "D"][
            answerIndex
        ];


    return {

        id:
            getNextQuestionId(),

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
            String(
                options[0]
            ).trim(),

        optionB:
            String(
                options[1]
            ).trim(),

        optionC:
            String(
                options[2]
            ).trim(),

        optionD:
            String(
                options[3]
            ).trim(),

        correctAnswer:
            correctAnswer,

        explanation:
            explanation,

        source:
            "AI"
    };
}


/* =========================================================
   GENERATED QUESTION PREVIEW
   ========================================================= */

function renderGeneratedQuestions(
    questions
) {

    const container =
        document.getElementById(
            "generatedQuestionsPreview"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    questions.forEach(
        (
            question,
            index
        ) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "admin-question";


            div.innerHTML = `

                <h3>
                    🤖 Generated Question ${
                        index + 1
                    }
                </h3>


                <p>
                    <strong>
                        ${escapeHTML(
                            question.question
                        )}
                    </strong>
                </p>


                <p>
                    A. ${escapeHTML(
                        question.optionA
                    )}
                </p>

                <p>
                    B. ${escapeHTML(
                        question.optionB
                    )}
                </p>

                <p>
                    C. ${escapeHTML(
                        question.optionC
                    )}
                </p>

                <p>
                    D. ${escapeHTML(
                        question.optionD
                    )}
                </p>


                <p class="correct-answer">
                    Correct Answer:
                    ${escapeHTML(
                        question.correctAnswer
                    )}
                </p>


                ${
                    question.explanation
                        ? `
                            <p class="muted">
                                <strong>
                                    Explanation:
                                </strong>
                                ${escapeHTML(
                                    question.explanation
                                )}
                            </p>
                          `
                        : ""
                }

            `;


            container.appendChild(
                div
            );
        }
    );
}


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
                .pop();


        /* -------------------------
           Verification
           ------------------------- */

        if (
            page ===
            "verification.html"
        ) {

            generateCaptcha();
        }


        /* -------------------------
           Dashboard
           ------------------------- */

        if (
            page ===
            "dashboard.html"
        ) {

            loadDashboard();
        }


        /* -------------------------
           Quiz
           ------------------------- */

        if (
            page ===
            "quiz.html"
        ) {

            localStorage.removeItem(
                "engiSparkQuizSubmitted"
            );

            await prepareQuiz();
        }


        /* -------------------------
           Result
           ------------------------- */

        if (
            page ===
            "result.html"
        ) {

            loadResult();
        }


        /* -------------------------
           Admin Panel
           ------------------------- */

        if (
            page ===
            "admin-panel.html"
        ) {

            checkAdminAccess();


            await loadQuestions();


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


            renderDepartmentList();

            renderSubjectList();

            populateQuestionSubjectSelect();

            populateQuestionDepartmentSelect();

            populateAIDepartmentSelect();

            populateAISubjectSelect();

            renderAdminQuestions();
        }

    }
);
