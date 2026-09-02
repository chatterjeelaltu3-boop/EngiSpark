/* ========== RESET & BASE ========== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f5f5f5;
    color: #333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
a {
    text-decoration: none;
}

/* ========== BUTTONS ========== */
.btn-primary {
    background: #FF6B00;
    color: #fff;
    border: none;
    padding: 12px 30px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}
.btn-primary:hover {
    background: #e05f00;
    transform: scale(1.02);
}
.btn-secondary {
    background: #1A1A2E;
    color: #fff;
    border: 2px solid #FF6B00;
    padding: 12px 30px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}
.btn-secondary:hover {
    background: #FF6B00;
}

/* ========== SPLASH PAGE ========== */
.splash-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
    padding: 20px;
}
.splash-content {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.splash-logo-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid #FF6B00;
    margin-bottom: 20px;
    animation: pulse 2s infinite;
}
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
.splash-app-name {
    font-size: 48px;
    color: #FF6B00;
    font-weight: 800;
    letter-spacing: 2px;
}
.splash-tagline {
    font-size: 18px;
    color: #FFD700;
    font-style: italic;
    margin-bottom: 30px;
}
.splash-btn {
    font-size: 20px;
    padding: 15px 50px;
}

/* ========== VERIFICATION PAGE ========== */
.verification-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
    padding: 20px;
}
.verification-box {
    max-width: 500px;
    margin: 40px auto;
    background: #fff;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    flex: 1;
}
.verification-header {
    text-align: center;
    margin-bottom: 30px;
}
.verification-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #FF6B00;
    margin-bottom: 10px;
}
.verification-header h2 {
    color: #1A1A2E;
    font-size: 28px;
}
.verification-sub {
    color: #888;
    font-size: 14px;
}

/* ========== CAPTCHA ========== */
.captcha-box {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}
.captcha-text {
    background: #1A1A2E;
    color: #FFD700;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 4px;
    font-family: 'Courier New', monospace;
    user-select: none;
    flex: 1;
    text-align: center;
}
.btn-refresh {
    background: #1A1A2E;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.btn-refresh:hover {
    background: #FF6B00;
}

/* ========== FORM ELEMENTS ========== */
.form-group {
    margin-bottom: 20px;
}
.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
}
.form-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: border 0.3s ease;
}
.form-input:focus {
    outline: none;
    border-color: #FF6B00;
}
.form-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    background: #fff;
    cursor: pointer;
    transition: border 0.3s ease;
}
.form-select:focus {
    outline: none;
    border-color: #FF6B00;
}
.error-message {
    color: #ff4444;
    font-weight: 600;
    margin-top: 10px;
    text-align: center;
}

/* ========== DASHBOARD ========== */
.dashboard-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
}
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background: #1A1A2E;
    border-bottom: 3px solid #FF6B00;
}
.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
}
.header-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #FF6B00;
}
.header-app-name {
    font-size: 24px;
    font-weight: 700;
    color: #FF6B00;
}
.btn-admin {
    background: transparent;
    color: #FFD700;
    border: 2px solid #FFD700;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
}
.btn-admin:hover {
    background: #FFD700;
    color: #1A1A2E;
}
.welcome-section {
    background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
    padding: 30px 30px 50px;
    text-align: center;
    color: #fff;
}
.welcome-section h2 {
    font-size: 28px;
    margin-bottom: 15px;
}
.popup-message {
    background: #fff;
    color: #333;
    padding: 20px;
    border-radius: 12px;
    max-width: 400px;
    margin: 0 auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.popup-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #FF6B00;
    margin-bottom: 10px;
}
.popup-message strong {
    color: #FF6B00;
}
.popup-tagline {
    color: #FFD700;
    font-style: italic;
    font-size: 14px;
}
.quiz-setup-section {
    flex: 1;
    padding: 30px;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
}
.quiz-setup-card {
    background: #fff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.quiz-setup-card h3 {
    color: #1A1A2E;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
}
.btn-start {
    width: 100%;
    padding: 15px;
    font-size: 20px;
    margin-top: 10px;
}

/* ========== QUIZ PAGE ========== */
.quiz-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
}
.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background: #1A1A2E;
    border-bottom: 3px solid #FF6B00;
}
.timer {
    color: #FFD700;
    font-size: 22px;
    font-weight: 700;
    font-family: 'Courier New', monospace;
}
.quiz-progress {
    padding: 20px 30px;
    background: #fff;
    border-bottom: 1px solid #eee;
}
#questionCounter {
    font-weight: 600;
    font-size: 16px;
    display: block;
    margin-bottom: 8px;
}
.progress-bar {
    width: 100%;
    height: 8px;
    background: #eee;
    border-radius: 4px;
    overflow: hidden;
}
.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #FF6B00, #FFD700);
    border-radius: 4px;
    transition: width 0.3s ease;
}
.question-area {
    flex: 1;
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
}
#questionText {
    font-size: 22px;
    color: #1A1A2E;
    margin-bottom: 25px;
    line-height: 1.6;
}
.options-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.option-item {
    background: #fff;
    padding: 15px 20px;
    border: 2px solid #ddd;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
}
.option-item:hover {
    border-color: #FF6B00;
    transform: translateX(5px);
}
.option-item.selected {
    border-color: #FF6B00;
    background: #FFF0E6;
}
.option-item .option-letter {
    font-weight: 700;
    color: #FF6B00;
    margin-right: 10px;
}
.quiz-navigation {
    display: flex;
    justify-content: space-between;
    padding: 0 30px 20px;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
}
.btn-nav {
    background: #1A1A2E;
    color: #fff;
    border: none;
    padding: 10px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
}
.btn-nav:hover {
    background: #FF6B00;
}
.btn-nav:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.btn-submit {
    margin: 0 30px 30px;
    max-width: 800px;
    align-self: center;
    width: 100%;
    padding: 15px;
    font-size: 20px;
}

/* ========== RESULT PAGE ========== */
.result-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    padding: 20px;
}
.result-logo {
    text-align: center;
    padding: 30px 0 20px;
}
.result-logo-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid #FF6B00;
}
.result-app-name {
    font-size: 32px;
    color: #FF6B00;
    font-weight: 700;
}
.result-tagline {
    color: #FFD700;
    font-style: italic;
    font-size: 14px;
    background: #1A1A2E;
    display: inline-block;
    padding: 4px 16px;
    border-radius: 20px;
}
.result-box {
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    flex: 1;
    width: 100%;
}
.result-box h2 {
    text-align: center;
    font-size: 28px;
    color: #1A1A2E;
    margin-bottom: 20px;
}
.result-score {
    text-align: center;
    margin-bottom: 20px;
}
.score-number {
    font-size: 48px;
    font-weight: 800;
    color: #FF6B00;
    display: block;
}
.score-percentage {
    font-size: 20px;
    color: #FFD700;
    display: block;
    margin-top: 5px;
}
.result-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 20px 0;
}
.stat-card {
    padding: 15px 25px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
}
.stat-card.correct {
    background: #e8f5e9;
    color: #2e7d32;
}
.stat-card.wrong {
    background: #fce4ec;
    color: #c62828;
}
.result-time {
    text-align: center;
    color: #888;
    margin: 15px 0;
    font-size: 16px;
}
.wrong-answers {
    margin: 20px 0;
    padding: 15px;
    background: #fafafa;
    border-radius: 10px;
    border: 1px solid #eee;
}
.wrong-answers h4 {
    color: #c62828;
    margin-bottom: 10px;
}
.wrong-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}
.wrong-item:last-child {
    border-bottom: none;
}
.wrong-item .wrong-q {
    font-weight: 600;
    color: #1A1A2E;
}
.wrong-item .wrong-your {
    color: #c62828;
}
.wrong-item .wrong-correct {
    color: #2e7d32;
}
.result-buttons {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    flex-wrap: wrap;
}
.result-buttons button {
    flex: 1;
    min-width: 120px;
}

/* ========== ADMIN LOGIN ========== */
.admin-login-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
    padding: 20px;
}
.admin-login-box {
    max-width: 400px;
    margin: 40px auto;
    background: #fff;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    flex: 1;
}
.admin-login-header {
    text-align: center;
    margin-bottom: 30px;
}
.admin-login-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #FF6B00;
    margin-bottom: 10px;
}
.admin-login-header h2 {
    color: #1A1A2E;
    font-size: 24px;
}
.btn-admin-login {
    width: 100%;
    padding: 15px;
    font-size: 18px;
}

/* ========== ADMIN PANEL ========== */
.admin-panel-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
}
.admin-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background: #1A1A2E;
    border-bottom: 3px solid #FF6B00;
}
.btn-logout {
    background: #c62828;
    color: #fff;
    border: none;
    padding: 8px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
}
.btn-logout:hover {
    background: #b71c1c;
}
.admin-panel-title {
    text-align: center;
    padding: 20px;
    color: #1A1A2E;
    font-size: 28px;
}
.admin-section {
    background: #fff;
    margin: 15px 30px;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.admin-section h3 {
    color: #1A1A2E;
    margin-bottom: 15px;
    font-size: 20px;
}
.admin-form-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
}
.admin-form-row .form-input {
    flex: 1;
    min-width: 150px;
}
.admin-list {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.admin-list-item {
    background: #f0f0f0;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.admin-list-item .delete-btn {
    background: #c62828;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    cursor: pointer;
    font-weight: 700;
    font-size: 12px;
    transition: all 0.3s ease;
}
.admin-list-item .delete-btn:hover {
    background: #b71c1c;
}
.question-form {
    background: #fafafa;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #eee;
}
.form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}
.form-row-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
}
.question-list {
    margin-top: 20px;
}
.question-item {
    background: #fafafa;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}
.question-item .q-text {
    flex: 1;
    font-weight: 600;
}
.question-item .q-actions {
    display: flex;
    gap: 8px;
}
.question-item .q-actions button {
    padding: 4px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
}
.question-item .edit-btn {
    background: #FFD700;
    color: #1A1A2E;
}
.question-item .delete-btn {
    background: #c62828;
    color: #fff;
}

/* ========== FOOTER ========== */
.footer {
    background: #1A1A2E;
    padding: 25px 20px 20px;
    text-align: center;
    margin-top: auto;
    border-top: 3px solid #FF6B00;
}
.footer-content {
    max-width: 1200px;
    margin: 0 auto;
}
.footer-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 8px;
}
.footer-logo-img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #FF6B00;
}
.footer-app-name {
    font-size: 22px;
    font-weight: 700;
    color: #FF6B00;
    letter-spacing: 1px;
}
.footer-tagline {
    font-size: 13px;
    color: #FFD700;
    margin: 4px 0 8px;
    font-style: italic;
}
.footer-founder {
    font-size: 13px;
    color: #CCCCCC;
    margin: 4px 0;
}
.footer-founder a {
    color: #FF6B00;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}
.footer-founder a:hover {
    color: #FFD700;
    text-decoration: underline;
}
.footer-copyright {
    font-size: 11px;
    color: #888888;
    margin-top: 6px;
    letter-spacing: 0.5px;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
    .splash-app-name { font-size: 32px; }
    .splash-tagline { font-size: 14px; }
    .splash-btn { font-size: 16px; padding: 12px 30px; }
    .verification-box { margin: 20px auto; padding: 25px; }
    .dashboard-header { padding: 10px 15px; }
    .header-app-name { font-size: 18px; }
    .header-logo { width: 30px; height: 30px; }
    .welcome-section { padding: 20px 15px 30px; }
    .welcome-section h2 { font-size: 20px; }
    .quiz-setup-section { padding: 15px; }
    .quiz-setup-card { padding: 20px; }
    .quiz-header { padding: 10px 15px; }
    .timer { font-size: 18px; }
    .question-area { padding: 15px; }
    #questionText { font-size: 18px; }
    .option-item { padding: 12px 16px; font-size: 14px; }
    .quiz-navigation { padding: 0 15px 15px; }
    .btn-nav { padding: 8px 16px; font-size: 14px; }
    .btn-submit { margin: 0 15px 15px; padding: 12px; font-size: 16px; }
    .result-box { padding: 20px; }
    .score-number { font-size: 36px; }
    .result-stats { gap: 15px; flex-wrap: wrap; }
    .stat-card { padding: 10px 16px; font-size: 14px; }
    .result-buttons { flex-direction: column; }
    .admin-section { margin: 10px 15px; padding: 15px; }
    .admin-panel-header { padding: 10px 15px; }
    .form-row-2 { grid-template-columns: 1fr; }
    .form-row-3 { grid-template-columns: 1fr; }
    .admin-form-row { flex-direction: column; }
    .admin-form-row .form-input { width: 100%; }
    .footer-app-name { font-size: 18px; }
    .footer-logo-img { width: 28px; height: 28px; }
    .footer-tagline { font-size: 11px; }
    .footer-founder { font-size: 11px; }
    .footer-copyright { font-size: 10px; }
}
@media (max-width: 480px) {
    .splash-app-name { font-size: 26px; }
    .verification-box { padding: 20px; }
    .captcha-text { font-size: 18px; padding: 8px 12px; }
    .quiz-setup-card h3 { font-size: 20px; }
    .score-number { font-size: 28px; }
}
