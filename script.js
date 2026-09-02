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
    font-size: 
