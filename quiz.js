document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initFontSize();
    initMobileMenu();
    initBackToTop();
    initQuiz();
});

let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedLevel = null;
let userAnswers = {};
let correctCount = 0;
let wrongQuestions = [];

function initQuiz() {
    const quizSelection = document.getElementById('quizSelection');
    const quizGame = document.getElementById('quizGame');
    const quizResult = document.getElementById('quizResult');
    const startBtn = document.getElementById('startQuizBtn');
    const diffBtns = document.querySelectorAll('.diff-btn');
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const checkBtn = document.getElementById('checkBtn');
    const restartBtn = document.getElementById('restartBtn');
    const reviewBtn = document.getElementById('reviewBtn');
    const resultScore = document.getElementById('resultScore');
    const resultReview = document.querySelector('.result-review');

    // 选择难度
    diffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            diffBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedLevel = btn.dataset.level;
            startBtn.disabled = false;
        });
    });

    // 开始答题
    startBtn.addEventListener('click', () => {
        startQuizByLevel();
    });

    // 选项点击
    document.getElementById('quizOptions').addEventListener('click', (e) => {
        if (e.target.classList.contains('option-btn')) {
            document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            const qid = currentQuestions[currentQuestionIndex].id;
            userAnswers[qid] = e.target.innerText;
        }
    });

    // 检查答案
    checkBtn.addEventListener('click', () => {
        const sel = document.querySelector('.option-btn.selected');
        if (!sel) return alert('Please select an answer!');
        const q = currentQuestions[currentQuestionIndex];
        const opts = document.querySelectorAll('.option-btn');

        opts.forEach(o => o.disabled = true);
        opts.forEach(o => {
            if (o.innerText === q.answer) o.classList.add('correct');
            else if (o === sel) o.classList.add('wrong');
        });

        if (sel.innerText === q.answer && !userAnswers[q.id + '_c']) {
            correctCount++;
            userAnswers[q.id + '_c'] = true;
        }
        checkBtn.disabled = true;
    });

    // 下一题
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            renderCurrentQuestion();
            checkBtn.disabled = false;
        } else {
            wrongQuestions = currentQuestions.filter(q => userAnswers[q.id] !== q.answer);
            quizGame.style.display = 'none';
            quizResult.style.display = 'block';
            window.scrollTo(0, 0);
            resultScore.innerText = `${correctCount}/5 Correct!`;

            if (correctCount === 5) {
                resultReview.innerHTML = `<p>🏆 Perfect! Mastered!</p>`;
            } else if (correctCount >= 3) {
                resultReview.innerHTML = `<p>👍 Good job!</p>`;
            } else {
                resultReview.innerHTML = `<p>📚 Keep practicing!</p>`;
            }
        }
    });

    // 上一题
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderCurrentQuestion();
            checkBtn.disabled = false;
        }
    });

    // 返回主页
    backBtn.addEventListener('click', () => {
        quizResult.style.display = 'none';
        quizGame.style.display = 'none';
        quizSelection.style.display = 'block';
        document.getElementById("quiz-top-header").style.display = "block";
        diffBtns.forEach(b => b.classList.remove('active'));
        startBtn.disabled = true;
        selectedLevel = null;
    });

    // ======================
    // ✅ Try Again 保持当前难度重新答题
    // ======================
    restartBtn.addEventListener('click', () => {
        startQuizByLevel();
    });

    // ======================
    // ✅ Review Mistakes 功能
    // ======================
    reviewBtn.addEventListener('click', () => {
        if (wrongQuestions.length === 0) {
            alert('✅ No mistakes! Perfect score!');
            return;
        }
        currentQuestions = wrongQuestions;
        currentQuestionIndex = 0;
        quizResult.style.display = 'none';
        quizGame.style.display = 'block';
        renderCurrentQuestion();
        checkBtn.disabled = false;
    });
}

// 重新开始当前难度答题
function startQuizByLevel() {
    const quizSelection = document.getElementById('quizSelection');
    const quizGame = document.getElementById('quizGame');
    const quizResult = document.getElementById('quizResult');

    let allQuestions = questionBank[selectedLevel];
    currentQuestions = shuffle([...allQuestions]).slice(0, 5);
    currentQuestionIndex = 0;
    userAnswers = {};
    correctCount = 0;
    wrongQuestions = [];

    quizSelection.style.display = 'none';
    quizResult.style.display = 'none';
    quizGame.style.display = 'block';
    document.getElementById("quiz-top-header").style.display = "none";
    renderCurrentQuestion();
}

// 打乱题目
function shuffle(arr) {
    let a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// 渲染题目 & SVG
function renderCurrentQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    if (!q) return;

    document.getElementById('questionText').innerText = q.question;
    document.getElementById('quizSvg').innerHTML = q.svg;

    const opts = document.querySelectorAll('.option-btn');
    opts.forEach((btn, i) => {
        btn.innerText = q.options[i];
        btn.classList.remove('selected', 'correct', 'wrong');
        btn.disabled = false;
    });

    const total = currentQuestions.length;
    document.getElementById('stepText').innerText = `Step ${currentQuestionIndex + 1} / ${total}`;
    let percent = ((currentQuestionIndex + 1) / total) * 100;
    document.getElementById('progressFill').style.width = percent + '%';
}