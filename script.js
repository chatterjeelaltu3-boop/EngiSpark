// ============================================
// ========== SPLASH PAGE ==========
// ============================================
function goToVerification() {
    window.location.href = "verification.html";
}

// ============================================
// ========== VERIFICATION PAGE ==========
// ============================================
// CAPTCHA Generation
function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// DOM Elements
const captchaText = document.getElementById("captchaText");
const refreshBtn = document.getElementById("refreshCaptcha");
const captchaInput = document.getElementById("captchaInput");
const verifyBtn = document.getElementById("verifyBtn");
const errorMsg = document.getElementById("errorMsg");
const fullNameInput = document.getElementById("fullName");

// Initial CAPTCHA
let currentCaptcha = generateCaptcha();
if (captchaText) captchaText.textContent = currentCaptcha;

// Refresh CAPTCHA
if (refreshBtn) {
    refreshBtn.addEventListener("click", function() {
        currentCaptcha = generateCaptcha();
        captchaText.textContent = currentCaptcha;
        captchaInput.value = "";
        errorMsg.style.display = "none";
    });
}

// Verify CAPTCHA
if (verifyBtn) {
    verifyBtn.addEventListener("click", function() {
        const userInput = captchaInput.value.trim();
        const fullName = fullNameInput.value.trim();

        if (fullName === "") {
            alert("দয়া করে আপনার পুরো নাম লিখুন!");
            return;
        }

        if (userInput === currentCaptcha) {
            localStorage.setItem("engispark_user_name", fullName);
            window.location.href = "dashboard.html";
        } else {
            errorMsg.style.display = "block";
            currentCaptcha = generateCaptcha();
            captchaText.textContent = currentCaptcha;
            captchaInput.value = "";
            setTimeout(function() {
                errorMsg.style.display = "none";
            }, 3000);
        }
    });
}

// Enter key support
if (captchaInput) {
    captchaInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter" && verifyBtn) verifyBtn.click();
    });
}
if (fullNameInput) {
    fullNameInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter" && captchaInput) captchaInput.focus();
    });
}

// ============================================
// ========== DASHBOARD PAGE ==========
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    const userName = localStorage.getItem("engispark_user_name") || "User";
    const nameDisplay = document.getElementById("userNameDisplay");
    if (nameDisplay) nameDisplay.textContent = userName;
});

function startQuiz() {
    const department = document.getElementById("departmentSelect").value;
    const subject = document.getElementById("subjectSelect").value;
    const difficulty = document.getElementById("difficultySelect").value;
    const time = document.getElementById("timeSelect").value;

    localStorage.setItem("engispark_quiz_department", department);
    localStorage.setItem("engispark_quiz_subject", subject);
    localStorage.setItem("engispark_quiz_difficulty", difficulty);
    localStorage.setItem("engispark_quiz_time", time);

    window.location.href = "quiz.html";
}

function goToAdminLogin() {
    window.location.href = "admin-login.html";
}

// ============================================
// ========== QUIZ PAGE ==========
// ============================================
let questions = [];
let currentIndex = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 900;
let quizSubmitted = false;

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionCounter = document.getElementById("questionCounter");
const progressFill = document.getElementById("progressFill");
const timerDisplay = document.getElementById("timerDisplay");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("questionText")) {
        loadQuestions();
    }
});

function loadQuestions() {
    const department = localStorage.getItem("engispark_quiz_department") || "CSE";
    const subject = localStorage.getItem("engispark_quiz_subject") || "Mathematics";
    const difficulty = localStorage.getItem("engispark_quiz_difficulty") || "Medium";
    const time = parseInt(localStorage.getItem("engispark_quiz_time")) || 15;

    timeLeft = time * 60;
    updateTimerDisplay();

    let allQuestions = getQuestionsFromDB();
    
    let filtered = allQuestions.filter(q => 
        q.department === department && 
        q.subject === subject && 
        q.difficulty === difficulty
    );

    if (filtered.length < 10) {
        filtered = allQuestions.filter(q => 
            q.subject === subject && 
            q.difficulty === difficulty
        );
    }

    if (filtered.length < 10) {
        filtered = allQuestions;
    }

    shuffleArray(filtered);
    questions = filtered.slice(0, 10);

    if (questions.length === 0) {
        questions = getDefaultQuestions();
    }

    userAnswers = new Array(questions.length).fill(null);
    showQuestion(0);
    startTimer();
}

function showQuestion(index) {
    if (quizSubmitted) return;
    const q = questions[index];
    if (!q) return;

    currentIndex = index;
    questionText.textContent = q.question;

    questionCounter.textContent = `প্রশ্ন ${index + 1}/${questions.length}`;
    progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;

    const letters = ["A", "B", "C", "D"];
    let html = "";
    q.options.forEach((opt, i) => {
        const isSelected = userAnswers[index] === i;
        html += `
            <div class="option-item ${isSelected ? 'selected' : ''}" onclick="selectOption(${index}, ${i})">
                <span class="option-letter">${letters[i]})</span> ${opt}
            </div>
        `;
    });
    optionsContainer.innerHTML = html;

    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === questions.length - 1 ? "সাবমিট ►" : "পরে ►";
}

function selectOption(qIndex, optIndex) {
    if (quizSubmitted) return;
    if (qIndex !== currentIndex) return;
    userAnswers[qIndex] = optIndex;
    showQuestion(currentIndex);
}

function prevQuestion() {
    if (currentIndex > 0 && !quizSubmitted) {
        showQuestion(currentIndex - 1);
    }
}

function nextQuestion() {
    if (quizSubmitted) return;
    if (currentIndex === questions.length - 1) {
        submitQuiz();
    } else {
        showQuestion(currentIndex + 1);
    }
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (!timerDisplay) return;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.textContent = `⏱️ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (timeLeft < 60) {
        timerDisplay.style.color = "#ff4444";
    }
}

function submitQuiz() {
    if (quizSubmitted) return;
    quizSubmitted = true;
    clearInterval(timerInterval);

    let correct = 0;
    let wrong = 0;
    let wrongList = [];

    questions.forEach((q, i) => {
        const userAns = userAnswers[i];
        if (userAns === null) {
            wrong++;
            wrongList.push({
                question: q.question,
                yourAnswer: "উত্তর দেননি",
                correctAnswer: q.options[q.correctAnswer]
            });
        } else if (userAns === q.correctAnswer) {
            correct++;
        } else {
            wrong++;
            wrongList.push({
                question: q.question,
                yourAnswer: q.options[userAns],
                correctAnswer: q.options[q.correctAnswer]
            });
        }
    });

    const totalTime = parseInt(localStorage.getItem("engispark_quiz_time")) || 15;
    const timeTaken = totalTime * 60 - timeLeft;
    const mins = Math.floor(timeTaken / 60);
    const secs = timeTaken % 60;

    const result = {
        score: correct,
        total: questions.length,
        percentage: Math.round((correct / questions.length) * 100),
        correct: correct,
        wrong: wrong,
        wrongList: wrongList,
        timeTaken: `${mins} মিনিট ${secs} সেকেন্ড`
    };

    localStorage.setItem("engispark_quiz_result", JSON.stringify(result));
    window.location.href = "result.html";
}

function getQuestionsFromDB() {
    const stored = localStorage.getItem("engispark_questions");
    if (stored) {
        try { return JSON.parse(stored); } catch(e) { return getDefaultQuestions(); }
    }
    return getDefaultQuestions();
}

function getDefaultQuestions() {
    return [
        { id: 1, subject: "Mathematics", department: "CSE", difficulty: "Medium", question: "lim(x→0) sin x / x এর মান কত?", options: ["0", "1", "-1", "∞"], correctAnswer: 1 },
        { id: 2, subject: "Mathematics", department: "CSE", difficulty: "Medium", question: "(a+b)² এর বিস্তৃতি কী?", options: ["a² + b²", "a² + 2ab + b²", "a² - 2ab + b²", "2a² + 2b²"], correctAnswer: 1 },
        { id: 3, subject: "Physics", department: "CSE", difficulty: "Easy", question: "আলোর বেগ কত?", options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"], correctAnswer: 0 },
        { id: 4, subject: "Physics", department: "CSE", difficulty: "Medium", question: "নিউটনের গতির দ্বিতীয় সূত্র কী?", options: ["F = ma", "F = mv", "F = m/a", "F = a/m"], correctAnswer: 0 },
        { id: 5, subject: "Chemistry", department: "CSE", difficulty: "Easy", question: "পানির সংকেত কী?", options: ["H₂O", "CO₂", "NaCl", "HCl"], correctAnswer: 0 },
        { id: 6, subject: "Basic Electrical", department: "CSE", difficulty: "Medium", question: "ওহমের সূত্র কী?", options: ["V = IR", "V = I/R", "I = VR", "R = VI"], correctAnswer: 0 },
        { id: 7, subject: "Mathematics", department: "CSE", difficulty: "Hard", question: "∫ x² dx এর মান কত?", options: ["x³/3 + C", "x³ + C", "3x³ + C", "x²/2 + C"], correctAnswer: 0 },
        { id: 8, subject: "Physics", department: "CSE", difficulty: "Hard", question: "E = mc² সূত্রটি কে দিয়েছেন?", options: ["আইনস্টাইন", "নিউটন", "গ্যালিলিও", "প্ল্যাঙ্ক"], correctAnswer: 0 },
        { id: 9, subject: "Basic Electrical", department: "CSE", difficulty: "Easy", question: "বৈদ্যুতিক সার্কিটে ভোল্টেজের একক কী?", options: ["ভোল্ট", "অ্যাম্পিয়ার", "ওহম", "ওয়াট"], correctAnswer: 0 },
        { id: 10, subject: "Chemistry", department: "CSE", difficulty: "Medium", question: "পারমাণবিক সংখ্যা কী?", options: ["প্রোটন সংখ্যা", "ইলেকট্রন সংখ্যা", "নিউট্রন সংখ্যা", "পরমাণু ভর"], correctAnswer: 0 },
        { id: 11, subject: "Mathematics", department: "CSE", difficulty: "Easy", question: "π-এর মান কত?", options: ["3.1416", "3.14", "22/7", "উপরের সবগুলো"], correctAnswer: 3 },
        { id: 12, subject: "Physics", department: "CSE", difficulty: "Medium", question: "শব্দের বেগ কোন মাধ্যমে সবচেয়ে বেশি?", options: ["কঠিন", "তরল", "গ্যাস", "শূন্যস্থান"], correctAnswer: 0 }
    ];
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft") prevQuestion();
    if (e.key === "ArrowRight") nextQuestion();
});

// ============================================
// ========== RESULT PAGE ==========
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("scoreDisplay")) {
        loadResult();
    }
});

function loadResult() {
    const resultData = localStorage.getItem("engispark_quiz_result");
    if (!resultData) {
        window.location.href = "dashboard.html";
        return;
    }

    const result = JSON.parse(resultData);

    document.getElementById("scoreDisplay").textContent = `${result.score}/${result.total}`;
    document.getElementById("percentageDisplay").textContent = getStars(result.percentage) + ` (${result.percentage}%)`;
    document.getElementById("correctCount").textContent = result.correct;
    document.getElementById("wrongCount").textContent = result.wrong;
    document.getElementById("timeTaken").textContent = result.timeTaken;

    const wrongList = document.getElementById("wrongAnswersList");
    if (result.wrongList.length === 0) {
        wrongList.innerHTML = `<p style="color:#2e7d32;font-weight:600;">🎉 সব উত্তর সঠিক! দারুণ!</p>`;
    } else {
        let html = "";
        result.wrongList.forEach((item, i) => {
            html += `
                <div class="wrong-item">
                    <div class="wrong-q">প্রশ্ন ${i+1}: ${item.question}</div>
                    <div class="wrong-your">❌ আপনার উত্তর: ${item.yourAnswer}</div>
                    <div class="wrong-correct">✅ সঠিক উত্তর: ${item.correctAnswer}</div>
                </div>
            `;
        });
        wrongList.innerHTML = html;
    }
}

function getStars(percentage) {
    if (percentage >= 90) return "⭐⭐⭐⭐⭐";
    if (percentage >= 75) return "⭐⭐⭐⭐";
    if (percentage >= 50) return "⭐⭐⭐";
    if (percentage >= 30) return "⭐⭐";
    return "⭐";
}

function retakeQuiz() {
    localStorage.removeItem("engispark_quiz_result");
    window.location.href = "dashboard.html";
}

function goHome() {
    localStorage.removeItem("engispark_quiz_result");
    window.location.href = "dashboard.html";
}

// ============================================
// ========== ADMIN LOGIN PAGE ==========
// ============================================
function adminLogin() {
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMsg = document.getElementById("adminError");

    if (username === "EngiSpark" && password === "1234") {
        localStorage.setItem("engispark_admin_logged_in", "true");
        window.location.href = "admin-panel.html";
    } else {
        errorMsg.style.display = "block";
        setTimeout(function() {
            errorMsg.style.display = "none";
        }, 3000);
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && document.getElementById("adminPassword")) {
        adminLogin();
    }
});

// ============================================
// ========== ADMIN PANEL PAGE ==========
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("deptList")) {
        const isLoggedIn = localStorage.getItem("engispark_admin_logged_in");
        if (isLoggedIn !== "true") {
            window.location.href = "admin-login.html";
            return;
        }
        loadDepartments();
        loadSubjects();
        loadQuestionsList();
    }
});

function logoutAdmin() {
    localStorage.removeItem("engispark_admin_logged_in");
    window.location.href = "admin-login.html";
}

// Department Management
function loadDepartments() {
    const depts = JSON.parse(localStorage.getItem("engispark_departments") || 
        JSON.stringify(["CSE", "EEE", "Civil", "Mechanical"]));
    const list = document.getElementById("deptList");
    list.innerHTML = depts.map(d => `
        <span class="admin-list-item">
            ${d}
            <button class="delete-btn" onclick="deleteDepartment('${d}')">×</button>
        </span>
    `).join("");
}

function addDepartment() {
    const input = document.getElementById("deptInput");
    const name = input.value.trim();
    if (!name) return;
    const depts = JSON.parse(localStorage.getItem("engispark_departments") || 
        JSON.stringify(["CSE", "EEE", "Civil", "Mechanical"]));
    if (!depts.includes(name)) {
        depts.push(name);
        localStorage.setItem("engispark_departments", JSON.stringify(depts));
        loadDepartments();
    }
    input.value = "";
}

function deleteDepartment(name) {
    let depts = JSON.parse(localStorage.getItem("engispark_departments") || 
        JSON.stringify(["CSE", "EEE", "Civil", "Mechanical"]));
    depts = depts.filter(d => d !== name);
    localStorage.setItem("engispark_departments", JSON.stringify(depts));
    loadDepartments();
}

// Subject Management
function loadSubjects() {
    const subjects = JSON.parse(localStorage.getItem("engispark_subjects") || 
        JSON.stringify(["Mathematics", "Physics", "Chemistry", "Basic Electrical"]));
    const list = document.getElementById("subjectList");
    list.innerHTML = subjects.map(s => `
        <span class="admin-list-item">
            ${s}
            <button class="delete-btn" onclick="deleteSubject('${s}')">×</button>
        </span>
    `).join("");
}

function addSubject() {
    const input = document.getElementById("subjectInput");
    const name = input.value.trim();
    if (!name) return;
    const subjects = JSON.parse(localStorage.getItem("engispark_subjects") || 
        JSON.stringify(["Mathematics", "Physics", "Chemistry", "Basic Electrical"]));
    if (!subjects.includes(name)) {
        subjects.push(name);
        localStorage.setItem("engispark_subjects", JSON.stringify(subjects));
        loadSubjects();
        updateSubjectDropdowns();
    }
    input.value = "";
}

function deleteSubject(name) {
    let subjects = JSON.parse(localStorage.getItem("engispark_subjects") || 
        JSON.stringify(["Mathematics", "Physics", "Chemistry", "Basic Electrical"]));
    subjects = subjects.filter(s => s !== name);
    localStorage.setItem("engispark_subjects", JSON.stringify(subjects));
    loadSubjects();
    updateSubjectDropdowns();
}

function updateSubjectDropdowns() {
    const subjects = JSON.parse(localStorage.getItem("engispark_subjects") || 
        JSON.stringify(["Mathematics", "Physics", "Chemistry", "Basic Electrical"]));
    const select = document.getElementById("qSubject");
    if (select) {
        select.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join("");
    }
}

// Time Management
function updateTimer() {
    const time = document.getElementById("timeInput").value;
    if (time && time > 0) {
        localStorage.setItem("engispark_quiz_time_default", time);
        alert(`⏱️ টাইমার ${time} মিনিটে আপডেট করা হয়েছে!`);
    }
}

// Question Management
function getQuestions() {
    const stored = localStorage.getItem("engispark_questions");
    if (stored) {
        try { return JSON.parse(stored); } catch(e) { return []; }
    }
    return [];
}

function saveQuestions(questions) {
    localStorage.setItem("engispark_questions", JSON.stringify(questions));
}

function addQuestion() {
    const text = document.getElementById("qText").value.trim();
    const optA = document.getElementById("qOptA").value.trim();
    const optB = document.getElementById("qOptB").value.trim();
    const optC = document.getElementById("qOptC").value.trim();
    const optD = document.getElementById("qOptD").value.trim();
    const correct = document.getElementById("qCorrect").value;
    const subject = document.getElementById("qSubject").value;
    const difficulty = document.getElementById("qDifficulty").value;

    if (!text || !optA || !optB || !optC || !optD) {
        alert("দয়া করে সব ফিল্ড পূরণ করুন!");
        return;
    }

    const questions = getQuestions();
    const newQuestion = {
        id: Date.now(),
        subject: subject,
        department: "CSE",
        difficulty: difficulty,
        question: text,
        options: [optA, optB, optC, optD],
        correctAnswer: ["A", "B", "C", "D"].indexOf(correct)
    };

    questions.push(newQuestion);
    saveQuestions(questions);
    loadQuestionsList();
    clearQuestionForm();
    alert("✅ প্রশ্ন যোগ করা হয়েছে!");
}

function loadQuestionsList() {
    const questions = getQuestions();
    const list = document.getElementById("questionList");
    if (questions.length === 0) {
        list.innerHTML = `<p style="color:#888;">কোনো প্রশ্ন নেই। উপরে যোগ করুন।</p>`;
        return;
    }
    list.innerHTML = questions.map((q, i) => `
        <div class="question-item">
            <span class="q-text">${i+1}. ${q.question}</span>
            <span style="font-size:12px;color:#888;">${q.subject} | ${q.difficulty}</span>
            <div class="q-actions">
                <button class="edit-btn" onclick="editQuestion(${i})">✏️</button>
                <button class="delete-btn" onclick="deleteQuestion(${i})">🗑️</button>
            </div>
        </div>
    `).join("");
}

function deleteQuestion(index) {
    if (!confirm("এই প্রশ্ন ডিলিট করতে চান?")) return;
    const questions = getQuestions();
    questions.splice(index, 1);
    saveQuestions(questions);
    loadQuestionsList();
}

function editQuestion(index) {
    const questions = getQuestions();
    const q = questions[index];
    if (!q) return;

    document.getElementById("qText").value = q.question;
    document.getElementById("qOptA").value = q.options[0] || "";
    document.getElementById("qOptB").value = q.options[1] || "";
    document.getElementById("qOptC").value = q.options[2] || "";
    document.getElementById("qOptD").value = q.options[3] || "";
    document.getElementById("qCorrect").value = ["A", "B", "C", "D"][q.correctAnswer] || "A";
    document.getElementById("qSubject").value = q.subject || "Mathematics";
    document.getElementById("qDifficulty").value = q.difficulty || "Medium";

    questions.splice(index, 1);
    saveQuestions(questions);
    loadQuestionsList();
    window.scrollTo({ top: 0, behavior: "smooth" });
    alert("✏️ প্রশ্ন এডিট করুন, তারপর আবার 'অ্যাড প্রশ্ন' ক্লিক করুন।");
}

function clearQuestionForm() {
    document.getElementById("qText").value = "";
    document.getElementById("qOptA").value = "";
    document.getElementById("qOptB").value = "";
    document.getElementById("qOptC").value = "";
    document.getElementById("qOptD").value = "";
    document.getElementById("qCorrect").value = "A";
}
