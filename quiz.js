document.addEventListener('DOMContentLoaded', function () {
    initLangBtn();
    initTheme();
    initFontSize();
    initMobileMenu();
    initBackToTop();
    initQuiz();
    initSound();
    initSoundToggle();
    initParticles();
    initBeforeUnload();
});

// ========================================
// 页面离开警告
// ========================================
let quizInProgress = false;

function initBeforeUnload() {
    // 设置 beforeunload 事件监听器
    window.addEventListener('beforeunload', function(e) {
        if (quizInProgress) {
            // 显示确认对话框
            const message = currentLang === 'zh'
                ? '您正在进行测验，确定要离开吗？您的进度将会丢失。'
                : 'You are in the middle of a quiz. Are you sure you want to leave? Your progress will be lost.';
            e.preventDefault();
            e.returnValue = message;
            return message;
        }
    });
}

function setQuizInProgress(inProgress) {
    quizInProgress = inProgress;
}

// ========================================
// 音效和背景音乐系统 (合并控制)
// ========================================
let audioContext = null;
let backgroundMusic = null;
let soundEnabled = true;
let musicPlaying = false;

// 默认开启音乐和音效（如果localStorage中没有设置）
if (localStorage.getItem('soundEnabled') === null) {
    soundEnabled = true;
    localStorage.setItem('soundEnabled', 'true');
} else {
    soundEnabled = localStorage.getItem('soundEnabled') === 'true';
}

function initSoundToggle() {
    const musicBtn = document.getElementById('musicBtn');
    updateSoundIcon();

    // 初始化音频对象（音效）
    musicBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('soundEnabled', soundEnabled);
        updateSoundIcon();

        if (soundEnabled) {
            playSound('click'); // 开启时播放提示音
            // 恢复背景音乐
            if (backgroundMusic) {
                backgroundMusic.play().catch(e => console.log('Music resume failed:', e));
                musicPlaying = true;
            }
        } else {
            // 暂停背景音乐
            if (backgroundMusic) {
                backgroundMusic.pause();
                musicPlaying = false;
            }
        }
    });
}

function initSound() {
    // 懒加载 AudioContext（用户交互后初始化）
    document.addEventListener('click', function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }, { once: true });

    // 初始化背景音乐
    initMusic();
}

function initMusic() {
    backgroundMusic = new Audio('background.wav');
    backgroundMusic.loop = true; // 循环播放
    backgroundMusic.volume = 0.3; // 设置音量

    // 尝试播放音乐（可能被浏览器阻止）
    if (soundEnabled) {
        backgroundMusic.play().then(() => {
            musicPlaying = true;
        }).catch(() => {
            // 音乐被阻止，等待用户首次交互后播放
        });
    }

    // 监听用户首次交互，自动播放音乐
    const autoPlayHandler = () => {
        if (soundEnabled && !musicPlaying && backgroundMusic) {
            backgroundMusic.play().then(() => {
                musicPlaying = true;
            }).catch(() => {});
        }
        document.removeEventListener('click', autoPlayHandler);
        document.removeEventListener('touchstart', autoPlayHandler);
        document.removeEventListener('keydown', autoPlayHandler);
    };
    document.addEventListener('click', autoPlayHandler, { once: true });
    document.addEventListener('touchstart', autoPlayHandler, { once: true });
    document.addEventListener('keydown', autoPlayHandler, { once: true });
}

function updateSoundIcon() {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) return;

    const icon = musicBtn.querySelector('i');
    if (soundEnabled) {
        icon.className = 'fas fa-music';  // 开启时显示音乐图标
        musicBtn.classList.remove('muted');
    } else {
        icon.className = 'fas fa-volume-mute';  // 关闭时显示静音图标
        musicBtn.classList.add('muted');
    }

    // 同步移动端音乐按钮
    const musicBtnMobile = document.getElementById('musicBtnMobile');
    if (musicBtnMobile) {
        const mobileIcon = musicBtnMobile.querySelector('i');
        if (soundEnabled) {
            mobileIcon.className = 'fas fa-music';
            musicBtnMobile.classList.remove('muted');
        } else {
            mobileIcon.className = 'fas fa-volume-mute';
            musicBtnMobile.classList.add('muted');
        }
    }
}

// 播放音效函数
function playSound(type) {
    // 如果音效关闭，不播放任何音效
    if (!soundEnabled) return;

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const now = audioContext.currentTime;

    switch(type) {
        case 'select':
            // 选项选择音效 - 短促的"滴"声
            oscillator.frequency.setValueAtTime(600, now);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;

        case 'correct':
            // 正确音效 - 上升的三和弦
            oscillator.frequency.setValueAtTime(523, now); // C5
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, now);
            oscillator.start(now);

            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.setValueAtTime(659, now); // E5
                osc2.type = 'sine';
                gain2.gain.setValueAtTime(0.3, now);
                gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc2.start(now);
                osc2.stop(now + 0.15);
            }, 100);

            setTimeout(() => {
                const osc3 = audioContext.createOscillator();
                const gain3 = audioContext.createGain();
                osc3.connect(gain3);
                gain3.connect(audioContext.destination);
                osc3.frequency.setValueAtTime(784, now); // G5
                osc3.type = 'sine';
                gain3.gain.setValueAtTime(0.3, now);
                gain3.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc3.start(now);
                osc3.stop(now + 0.3);
            }, 200);

            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.stop(now + 0.1);
            break;

        case 'wrong':
            // 错误音效 - 下降的低音
            oscillator.frequency.setValueAtTime(200, now);
            oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
            break;

        case 'tick':
            // 计时器滴答声 - 仅在最后5秒
            oscillator.frequency.setValueAtTime(440, now);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.15, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            oscillator.start(now);
            oscillator.stop(now + 0.05);
            break;

        case 'timeout':
            // 时间耗尽音效 - 长的下降音
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.exponentialRampToValueAtTime(80, now + 0.8);
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.25, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
            oscillator.start(now);
            oscillator.stop(now + 0.8);
            break;

        case 'start':
            // 游戏开始音效 - 上升音
            oscillator.frequency.setValueAtTime(300, now);
            oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.2);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            oscillator.start(now);
            oscillator.stop(now + 0.25);
            break;

        case 'victory':
            // 胜利/满分音效 - 欢快的旋律
            const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.setValueAtTime(freq, now + i * 0.15);
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.3, now + i * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.3);
                osc.start(now + i * 0.15);
                osc.stop(now + i * 0.15 + 0.3);
            });
            return; // 提前返回，避免主oscillator播放

        case 'complete':
            // 测验完成音效
            const completeNotes = [392, 440, 494, 523]; // G4, A4, B4, C5
            completeNotes.forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.setValueAtTime(freq, now + i * 0.12);
                osc.type = 'triangle';
                gain.gain.setValueAtTime(0.25, now + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25);
                osc.start(now + i * 0.12);
                osc.stop(now + i * 0.12 + 0.25);
            });
            return;

        case 'click':
            // 按钮点击音效
            oscillator.frequency.setValueAtTime(500, now);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.15, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            oscillator.start(now);
            oscillator.stop(now + 0.05);
            break;
    }
}

// 语言切换相关变量
let currentLang = localStorage.getItem('lang') || 'en';

// 中英文文本映射
const translations = {
    en: {
        quizTitle: 'Circle Theorem Quiz',
        quizSubtitle: 'Test your geometry skills with interactive challenges',
        challengeTitle: 'Choose your challenge',
        difficultyInfo: 'Select a difficulty level to begin',
        startQuiz: 'Enter Quiz',
        prevBtn: 'Previous',
        nextBtn: 'Next',
        checkBtn: 'Check Answer',
        reviewBtn: 'Review Mistakes',
        restartBtn: 'Try Again',
        backBtn: 'Return to Hub',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect. Keep practicing!',
        selectAnswer: 'Please select an answer!',
        noMistakes: 'No mistakes! Perfect score!',
        stepText: 'Step',
        ofText: '/',
        correct: 'Correct',
        wrong: 'Wrong',
        avgTime: 'Avg Time',
        avgTimeUnit: 's',
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
        home: 'Home',
        game: 'Game',
        quiz: 'Quiz',
        // Footer link translations
        footerHome: 'Home',
        footerGame: 'Game',
        footerQuiz: 'Quiz',
        footerPrivacy: 'Privacy Policy',
        footerTerms: 'Terms of Use',
        footerCookies: 'Cookie Policy',
        perfectScore: "Perfect Score! You're a Circle Theorem Master!",
        greatJob: 'Great job! You passed the quiz!',
        greatJobSub: 'Keep practicing to get even better.',
        keepPracticing: 'Keep practicing! You\'ll get there.',
        reviewMistakes: 'Review the mistakes and try again.',
        // Footer translations
        footerTitle: 'Circle Planet',
        footerDesc: 'Interactive Circle Theorem Learning Platform',
        footerLinks: 'Quick Links',
        footerLegal: 'Legal',
        footerAccessibility: 'Accessibility',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        cookies: 'Cookie Policy',
        colourBlind: 'Colour-blind Friendly',
        adjustableFont: 'Adjustable Font',
        darkMode: 'Dark Mode',
        copyright: 'All rights reserved.',
        featureColourBlind: 'Colour-blind Friendly',
        featureMobile: 'Mobile Responsive',
        featureBilingual: 'Bilingual Support',
        featureDark: 'Dark Mode'
    },
    zh: {
        quizTitle: '圆定理测验',
        quizSubtitle: '通过互动挑战测试你的几何技能',
        challengeTitle: '选择你的挑战',
        difficultyInfo: '选择一个难度等级开始',
        startQuiz: '开始测验',
        prevBtn: '上一题',
        nextBtn: '下一题',
        checkBtn: '检查答案',
        reviewBtn: '复习错题',
        restartBtn: '再试一次',
        backBtn: '返回主页',
        correctFeedback: '正确！做得好！',
        wrongFeedback: '错误，继续加油！',
        selectAnswer: '请选择一个答案！',
        noMistakes: '没有错误！满分！',
        stepText: '第',
        ofText: '题，共',
        correct: '正确',
        wrong: '错误',
        avgTime: '平均用时',
        avgTimeUnit: '秒',
        easy: '简单',
        medium: '中等',
        hard: '困难',
        home: '主页',
        game: '游戏',
        quiz: '测验',
        // Footer link translations
        footerHome: '主页',
        footerGame: '游戏',
        footerQuiz: '测验',
        footerPrivacy: '隐私政策',
        footerTerms: '使用条款',
        footerCookies: 'Cookie政策',
        perfectScore: '满分！你就是圆定理大师！',
        greatJob: '太棒了！你通过了测验！',
        greatJobSub: '继续练习，你会做得更好。',
        keepPracticing: '继续加油！你一定可以的。',
        reviewMistakes: '复习错题再试一次。',
        // Footer translations
        footerTitle: 'Circle Planet',
        footerDesc: '互动圆定理学习平台',
        footerLinks: '快速链接',
        footerLegal: '法律信息',
        footerAccessibility: '无障碍功能',
        privacy: '隐私政策',
        terms: '使用条款',
        cookies: 'Cookie政策',
        colourBlind: '色盲友好',
        adjustableFont: '可调节字体',
        darkMode: '深色模式',
        copyright: '版权所有。',
        featureColourBlind: '色盲友好',
        featureMobile: '移动端适配',
        featureBilingual: '双语支持',
        featureDark: '深色模式'
    }
};

// 难度时间配置
const difficultyTime = { easy: 45, medium: 35, hard: 25 };

// 难度说明文本
const difficultyInfo = {
    easy: { title: 'Easy Mode Selected', desc: 'Basic circle theorem questions with 45 seconds per question' },
    medium: { title: 'Medium Mode Selected', desc: 'Intermediate level with 35 seconds per question' },
    hard: { title: 'Hard Mode Selected', desc: 'Advanced problems with only 25 seconds per question' }
};

const difficultyInfoZh = {
    easy: { title: '已选择简单模式', desc: '基础圆定理题目，每题45秒' },
    medium: { title: '已选择中等模式', desc: '中等难度题目，每题35秒' },
    hard: { title: '已选择困难模式', desc: '高难度题目，每题仅25秒' }
};

// 获取翻译文本
function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

// 题目库已移至 question.js

let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedLevel = null;
let userAnswers = {};
let correctCount = 0;
let wrongQuestions = [];
let timerInterval = null;
let timeLeft = 30;
let questionTimes = [];
let originalTotalQuestions = 5;
let isReviewMode = false;

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
    const difficultyInfoEl = document.getElementById('difficultyInfo');

    diffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            diffBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedLevel = btn.dataset.level;
            startBtn.disabled = false;
            const info = difficultyInfo[selectedLevel];
            difficultyInfoEl.className = 'difficulty-info ' + selectedLevel;
            difficultyInfoEl.innerHTML = '<p><strong>' + info.title + '</strong></p><p>' + info.desc + '</p>';
        });
    });

    startBtn.addEventListener('click', () => startQuizByLevel());

    document.getElementById('quizOptions').addEventListener('click', (e) => {
        const optionBtn = e.target.closest('.option-btn');
        if (optionBtn && !optionBtn.disabled) {
            document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
            optionBtn.classList.add('selected');
            const qid = currentQuestions[currentQuestionIndex].id;
            userAnswers[qid] = optionBtn.querySelector('.option-text').innerText;
            playSound('select'); // 选项选择音效
        }
    });

    checkBtn.addEventListener('click', () => {
        const sel = document.querySelector('.option-btn.selected');
        if (!sel) { showAlert(t('selectAnswer')); return; }
        stopTimer();
        questionTimes.push(timeLeft);
        const q = currentQuestions[currentQuestionIndex];
        // 根据当前语言获取正确答案
        const correctAnswer = currentLang === 'zh' ? q.answer_zh : q.answer_en;
        const userAnswer = sel.querySelector('.option-text').innerText;
        const opts = document.querySelectorAll('.option-btn');
        opts.forEach(o => o.disabled = true);
        opts.forEach(o => {
            const letterSpan = o.querySelector('.option-letter');
            if (o.querySelector('.option-text').innerText === correctAnswer) {
                o.classList.add('correct');
                letterSpan.innerHTML = '<i class="fas fa-check"></i>'; // 添加对勾图标
            } else if (o === sel) {
                o.classList.add('wrong');
                letterSpan.innerHTML = '<i class="fas fa-times"></i>'; // 添加X图标
            }
        });
        const isCorrect = userAnswer === correctAnswer;
        showFeedback(isCorrect);
        playSound(isCorrect ? 'correct' : 'wrong'); // 正确/错误音效
        if (isCorrect && !userAnswers[q.id + '_c']) { correctCount++; userAnswers[q.id + '_c'] = true; updateScore(); }
        checkBtn.disabled = true;
    });

    nextBtn.addEventListener('click', () => {
        hideFeedback();
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            renderCurrentQuestion(true);
            checkBtn.disabled = false;
            const qid = currentQuestions[currentQuestionIndex].id;
            if (!userAnswers[qid]) startTimer();
        } else {
            // 根据当前语言判断错题
            wrongQuestions = currentQuestions.filter(q => {
                const correctAnswer = currentLang === 'zh' ? q.answer_zh : q.answer_en;
                return userAnswers[q.id] !== correctAnswer;
            });
            quizGame.style.display = 'none';
            quizResult.style.display = 'block';
            window.scrollTo(0, 0);
            showResults();
            setQuizInProgress(false); // 禁用离开页面警告
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            hideFeedback();
            currentQuestionIndex--;
            renderCurrentQuestion(false);
            checkBtn.disabled = false;
        }
    });

    backBtn.addEventListener('click', () => {
        stopTimer();
        resetQuizState();
        quizResult.style.display = 'none';
        quizGame.style.display = 'none';
        quizSelection.style.display = 'block';
        document.getElementById('quiz-top-header').style.display = 'block';
        diffBtns.forEach(b => b.classList.remove('active'));
        startBtn.disabled = true;
        setQuizInProgress(false); // 禁用离开页面警告
        selectedLevel = null;
        difficultyInfoEl.className = 'difficulty-info';
        difficultyInfoEl.innerHTML = '<p>' + t('difficultyInfo') + '</p>';
    });

    restartBtn.addEventListener('click', () => startQuizByLevel());

    reviewBtn.addEventListener('click', () => {
        if (wrongQuestions.length === 0) { showAlert(t('noMistakes')); return; }
        currentQuestions = wrongQuestions;
        currentQuestionIndex = 0;
        questionTimes = [];
        // Reset correct count for review session
        correctCount = 0;
        userAnswers = {}; // Also reset user answers
        isReviewMode = true; // Mark as review mode
        document.getElementById('currentScore').innerText = '0';
        quizResult.style.display = 'none';
        quizGame.style.display = 'block';
        renderCurrentQuestion(true);
        checkBtn.disabled = false;
        startTimer();
    });

    document.addEventListener('keydown', (e) => {
        if (quizGame.style.display === 'block') {
            const opts = document.querySelectorAll('.option-btn:not(:disabled)');
            switch(e.key) {
                case '1': case 'a': case 'A': selectOption(0); break;
                case '2': case 'b': case 'B': selectOption(1); break;
                case '3': case 'c': case 'C': selectOption(2); break;
                case '4': case 'd': case 'D': selectOption(3); break;
                case 'Enter': if (!checkBtn.disabled) checkBtn.click(); else if (!nextBtn.disabled) nextBtn.click(); break;
            }
        }
    });
}

function selectOption(index) {
    const opts = document.querySelectorAll('.option-btn:not(:disabled)');
    if (opts[index]) {
        opts.forEach(o => o.classList.remove('selected'));
        opts[index].classList.add('selected');
        const qid = currentQuestions[currentQuestionIndex].id;
        userAnswers[qid] = opts[index].querySelector('.option-text').innerText;
        // 音效已在 quizOptions 事件中处理
    }
}

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
    questionTimes = [];
    originalTotalQuestions = currentQuestions.length; // Store original total
    isReviewMode = false; // Not in review mode
    document.getElementById('currentScore').innerText = '0';
    quizSelection.style.display = 'none';
    quizResult.style.display = 'none';
    quizGame.style.display = 'block';
    document.getElementById('quiz-top-header').style.display = 'none';
    playSound('start'); // 游戏开始音效
    renderCurrentQuestion(true);
    startTimer();
    setQuizInProgress(true); // 启用离开页面警告
}

function startTimer() {
    stopTimer();
    timeLeft = difficultyTime[selectedLevel] || 30;
    const totalTime = timeLeft;
    const timerEl = document.getElementById('timer');
    const timerTextEl = document.getElementById('timerText');
    const timerFillEl = document.getElementById('timerFill');
    timerEl.className = 'timer';
    timerFillEl.className = 'timer-fill';
    timerTextEl.innerText = timeLeft;
    timerFillEl.style.width = '100%';
    timerInterval = setInterval(() => {
        timeLeft--;
        timerTextEl.innerText = timeLeft;
        const percent = (timeLeft / totalTime) * 100;
        timerFillEl.style.width = percent + '%';
        if (timeLeft <= 10 && timeLeft > 5) { timerEl.className = 'timer warning'; timerFillEl.className = 'timer-fill warning'; }
        else if (timeLeft <= 5 && timeLeft > 0) {
            timerEl.className = 'timer danger';
            timerFillEl.className = 'timer-fill danger';
            playSound('tick'); // 最后5秒滴答声
        }
        if (timeLeft <= 0) {
            stopTimer();
            playSound('timeout'); // 时间耗尽音效
            const sel = document.querySelector('.option-btn.selected');
            if (!sel) { const opts = document.querySelectorAll('.option-btn'); if (opts.length > 0) opts[0].click(); }
            document.getElementById('checkBtn').click();
        }
    }, 1000);
}

function stopTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } }

function updateScore() {
    const scoreEl = document.getElementById('currentScore');
    scoreEl.innerText = correctCount;
    scoreEl.style.animation = 'none';
    scoreEl.offsetHeight;
    scoreEl.style.animation = 'pulse 0.5s ease';
}

function showFeedback(isCorrect) {
    const feedbackEl = document.getElementById('answerFeedback');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackText = document.getElementById('feedbackText');
    feedbackEl.style.display = 'block';
    feedbackEl.className = 'answer-feedback ' + (isCorrect ? 'correct' : 'wrong');
    feedbackIcon.innerHTML = '<i class="fas fa-' + (isCorrect ? 'check' : 'times') + '"></i>';
    feedbackText.innerText = isCorrect ? t('correctFeedback') : t('wrongFeedback');
    if (isCorrect) triggerCelebration('small');
}

function hideFeedback() {
    const feedbackEl = document.getElementById('answerFeedback');
    feedbackEl.style.display = 'none';
    feedbackEl.className = 'answer-feedback';
}

function renderCurrentQuestion(slideDirection) {
    const q = currentQuestions[currentQuestionIndex];
    if (!q) return;
    const container = document.getElementById('questionContainer');
    container.classList.remove('slide-left');
    container.offsetHeight;
    if (!slideDirection) container.classList.add('slide-left');

    // 根据语言显示题目
    const questionText = currentLang === 'zh' ? q.question_zh : q.question_en;
    document.getElementById('questionText').innerText = questionText;
    document.getElementById('quizSvg').innerHTML = q.svg;

    // 根据语言显示选项
    const options = currentLang === 'zh' ? q.options_zh : q.options_en;
    const opts = document.querySelectorAll('.option-btn');
    opts.forEach((btn, i) => {
        btn.querySelector('.option-text').innerText = options[i];
        btn.classList.remove('selected', 'correct', 'wrong');
        btn.disabled = false;
    });

    // Always enable checkBtn when rendering a new question
    const checkBtn = document.getElementById('checkBtn');
    checkBtn.disabled = false;

    const total = currentQuestions.length;
    if (currentLang === 'zh') {
        document.getElementById('stepText').innerText = '第 ' + (currentQuestionIndex + 1) + ' 题，共 ' + total + ' 题';
    } else {
        document.getElementById('stepText').innerText = 'Step ' + (currentQuestionIndex + 1) + ' / ' + total;
    }
    let percent = ((currentQuestionIndex + 1) / total) * 100;
    document.getElementById('progressFill').style.width = percent + '%';
    document.querySelector('.progress-glow').style.width = percent + '%';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showResults() {
    // If in review mode, display results based on current questions (wrong questions review)
    const total = isReviewMode ? currentQuestions.length : originalTotalQuestions;
    const resultScore = document.getElementById('resultScore');
    const resultReview = document.getElementById('resultReview');
    const resultCard = document.querySelector('.result-card');
    const resultIcon = document.getElementById('resultIcon');
    const avgTime = questionTimes.length > 0 ? (questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length).toFixed(1) : 0;
    resultScore.innerText = correctCount + '/' + total + (currentLang === 'zh' ? ' ' + t('correct') + '！' : ' Correct!');
    document.getElementById('correctCount').innerText = correctCount;
    document.getElementById('wrongCount').innerText = total - correctCount;
    document.getElementById('avgTime').innerText = avgTime + (currentLang === 'zh' ? t('avgTimeUnit') : 's');
    resultCard.classList.remove('perfect', 'good', 'needs-work');
    if (correctCount === total) {
        resultReview.innerHTML = '<p>' + t('perfectScore') + '</p>';
        resultIcon.innerHTML = '<i class="fas fa-trophy"></i>';
        resultCard.classList.add('perfect');
        triggerCelebration('big');
        playSound('victory'); // 满分胜利音效
    } else if (correctCount >= 3) {
        resultReview.innerHTML = '<p>' + t('greatJob') + '</p><p>' + t('greatJobSub') + '</p>';
        resultIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        resultCard.classList.add('good');
        triggerCelebration('medium');
        playSound('complete'); // 完成音效
    } else {
        resultReview.innerHTML = '<p>' + t('keepPracticing') + '</p><p>' + t('reviewMistakes') + '</p>';
        resultIcon.innerHTML = '<i class="fas fa-book"></i>';
        resultCard.classList.add('needs-work');
    }
    createConfetti();
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    container.innerHTML = '';
    const colors = ['#4f46e5', '#7e22ce', '#f59e0b', '#22c55e', '#ef4444', '#3b82f6'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }
}

function triggerCelebration(size) {
    const container = document.getElementById('celebrationContainer');
    if (size === 'big') {
        const colors = ['#4f46e5', '#7e22ce', '#f59e0b', '#22c55e', '#ef4444'];
        for (let i = 0; i < 100; i++) createConfettiPiece(container, colors);
    } else if (size === 'medium') {
        const colors = ['#22c55e', '#3b82f6', '#f59e0b'];
        for (let i = 0; i < 30; i++) createConfettiPiece(container, colors);
    }
}

function createConfettiPiece(container, colors) {
    const piece = document.createElement('div');
    piece.style.cssText = 'position:fixed;width:' + (Math.random() * 10 + 5) + 'px;height:' + (Math.random() * 10 + 5) + 'px;background:' + colors[Math.floor(Math.random() * colors.length)] + ';left:' + Math.random() * 100 + '%;top:-20px;opacity:1;animation:confettiFall ' + (Math.random() * 2 + 2) + 's linear forwards;z-index:10000;pointer-events:none;';
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
}

function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#4f46e5,#7e22ce);color:white;padding:1rem 2rem;border-radius:10px;z-index:10000;animation:fadeInDown 0.3s ease;box-shadow:0 4px 15px rgba(79,70,229,0.4);font-weight:600;';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => { alertBox.style.animation = 'fadeOut 0.3s ease forwards'; setTimeout(() => alertBox.remove(), 300); }, 2000);
}

function resetQuizState() {
    userAnswers = {}; correctCount = 0; wrongQuestions = []; questionTimes = []; currentQuestionIndex = 0;
    document.getElementById('currentScore').innerText = '0';
}

function shuffle(arr) {
    let a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
}

function initTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);
    // Also set data-theme attribute for styles.css compatibility
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // 初始化时检查是否为暗色模式，启动流星效果
    if (savedTheme === 'dark') {
        toggleShootingStars(true);
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.classList.remove(currentTheme);
        document.body.classList.add(newTheme);
        // Also update data-theme attribute
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        // Update particles color for dark/light mode
        updateParticlesColor();
        toggleShootingStars(newTheme === 'dark');
    });
    function updateThemeIcon(theme) {
        const icon = themeBtn.querySelector('i');
        icon.className = 'fas fa-' + (theme === 'dark' ? 'sun' : 'moon');
        // 更新移动端主题按钮
        const themeBtnMobile = document.getElementById('themeBtnMobile');
        if (themeBtnMobile) {
            const mobileIcon = themeBtnMobile.querySelector('i');
            mobileIcon.className = 'fas fa-' + (theme === 'dark' ? 'sun' : 'moon');
        }
    }
}

function initFontSize() {
    const fontBtns = document.querySelectorAll('.font-btn');
    const savedSize = localStorage.getItem('fontSize') || 'medium';
    applyFontSize(savedSize);
    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.id.replace('font', '').toLowerCase();
            fontBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFontSize(size);
            localStorage.setItem('fontSize', size);
        });
    });
    function applyFontSize(size) {
        const sizes = { s: '14px', m: '16px', l: '18px' };
        document.documentElement.style.fontSize = sizes[size] || '16px';
    }
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // 防止移动端点击穿透
    mobileMenu.style.pointerEvents = 'auto';

    // 汉堡菜单按钮点击
    const toggleMobileMenu = (e) => {
        e.stopPropagation();
        const isActive = mobileMenu.classList.contains('active');
        mobileMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.className = isActive ? 'fas fa-bars' : 'fas fa-times';
    };

    menuBtn.addEventListener('click', toggleMobileMenu);

    // 点击菜单外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuBtn.querySelector('i').className = 'fas fa-bars';
        }
    });

    // 触摸事件支持（移动端）
    menuBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        toggleMobileMenu(e);
    });

    // 点击菜单内链接后关闭菜单
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });

    // 点击菜单内功能按钮（不关闭菜单）
    const mobileFunctions = mobileMenu.querySelectorAll('.mobile-btn');
    mobileFunctions.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // 移动端语言切换按钮
    const langBtnMobile = document.getElementById('langBtnMobile');
    if (langBtnMobile) {
        langBtnMobile.addEventListener('click', () => {
            // 触发主语言按钮的点击
            document.getElementById('langBtn').click();
            // 更新移动端按钮文本
            const langTextMobile = document.getElementById('langTextMobile');
            if (langTextMobile) {
                langTextMobile.textContent = currentLang === 'en' ? '中' : 'EN';
            }
        });
    }

    // 移动端主题切换按钮
    const themeBtnMobile = document.getElementById('themeBtnMobile');
    if (themeBtnMobile) {
        themeBtnMobile.addEventListener('click', () => {
            document.getElementById('themeBtn').click();
        });
    }

    // 移动端音乐切换按钮
    const musicBtnMobile = document.getElementById('musicBtnMobile');
    if (musicBtnMobile) {
        musicBtnMobile.addEventListener('click', () => {
            document.getElementById('musicBtn').click();
        });
    }
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => { btn.style.opacity = window.scrollY > 300 ? '1' : '0'; btn.style.visibility = window.scrollY > 300 ? 'visible' : 'hidden'; });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initLangBtn() {
    const langBtn = document.getElementById('langBtn');
    currentLang = localStorage.getItem('lang') || 'en';
    updateLangButton();
    applyTranslations();
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('lang', currentLang);
        updateLangButton();
        applyTranslations();
    });
}

function updateLangButton() {
    const langBtn = document.getElementById('langBtn');
    const langText = langBtn.querySelector('span');
    langText.textContent = currentLang === 'en' ? 'EN' : '中';
    // 更新移动端语言按钮
    const langBtnMobile = document.getElementById('langBtnMobile');
    const langTextMobile = document.getElementById('langTextMobile');
    if (langBtnMobile && langTextMobile) {
        langTextMobile.textContent = currentLang === 'en' ? 'EN' : '中';
    }
}

function applyTranslations() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navTexts = ['home', 'game', 'quiz'];
    navLinks.forEach((link, index) => {
        if (link.classList.contains('active')) link.innerHTML = '<i class="fas fa-circle"></i> ' + t(navTexts[index]);
        else link.textContent = t(navTexts[index]);
    });
    mobileNavLinks.forEach((link, index) => { link.innerHTML = '<i class="fas fa-chevron-right"></i> ' + t(navTexts[index]); });
    const breadcrumbHome = document.querySelector('.breadcrumb a');
    const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
    if (breadcrumbHome) breadcrumbHome.innerHTML = '<i class="fas fa-home"></i> ' + t('home');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = t('quiz');
    const quizTitle = document.querySelector('.quiz-title');
    const quizSubtitle = document.querySelector('.quiz-subtitle');
    const challengeTitle = document.getElementById('challenge-title');
    if (quizTitle) quizTitle.textContent = t('quizTitle');
    if (quizSubtitle) quizSubtitle.textContent = t('quizSubtitle');
    if (challengeTitle) challengeTitle.textContent = t('challengeTitle');
    const diffBtns = document.querySelectorAll('.diff-btn');
    const difficultyIcons = ['fa-seedling', 'fa-fire', 'fa-crown'];
    const difficultyKeys = ['easy', 'medium', 'hard'];
    diffBtns.forEach((btn, index) => { btn.innerHTML = '<i class="fas ' + difficultyIcons[index] + '"></i> ' + t(difficultyKeys[index]); });
    const difficultyInfoEl = document.getElementById('difficultyInfo');
    const info = currentLang === 'en' ? difficultyInfo[selectedLevel] : difficultyInfoZh[selectedLevel];
    if (difficultyInfoEl && selectedLevel) {
        difficultyInfoEl.className = 'difficulty-info ' + selectedLevel;
        difficultyInfoEl.innerHTML = '<p><strong>' + info.title + '</strong></p><p>' + info.desc + '</p>';
    } else if (difficultyInfoEl) difficultyInfoEl.innerHTML = '<p>' + t('difficultyInfo') + '</p>';
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) startBtn.innerHTML = '<i class="fas fa-play"></i> ' + t('startQuiz');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const checkBtn = document.getElementById('checkBtn');
    if (prevBtn) prevBtn.innerHTML = '<i class="fas fa-arrow-left"></i> ' + t('prevBtn');
    if (nextBtn) nextBtn.innerHTML = t('nextBtn') + ' <i class="fas fa-arrow-right"></i>';
    if (checkBtn) checkBtn.innerHTML = '<i class="fas fa-check"></i> ' + t('checkBtn');
    const reviewBtn = document.getElementById('reviewBtn');
    const restartBtn = document.getElementById('restartBtn');
    const backBtn = document.getElementById('backBtn');
    if (reviewBtn) reviewBtn.innerHTML = '<i class="fas fa-redo"></i> ' + t('reviewBtn');
    if (restartBtn) restartBtn.innerHTML = '<i class="fas fa-sync-alt"></i> ' + t('restartBtn');
    if (backBtn) backBtn.innerHTML = '<i class="fas fa-home"></i> ' + t('backBtn');

    // 更新底栏翻译
    const footerSections = document.querySelectorAll('.footer-section');
    if (footerSections[0]) {
        const h4 = footerSections[0].querySelector('h4');
        const desc = footerSections[0].querySelector('p');
        if (h4) h4.textContent = t('footerTitle');
        if (desc) desc.textContent = t('footerDesc');
    }
    if (footerSections[1]) {
        const h4 = footerSections[1].querySelector('h4');
        const links = footerSections[1].querySelectorAll('a');
        if (h4) h4.textContent = t('footerLinks');
        if (links[0]) links[0].textContent = t('footerHome');
        if (links[1]) links[1].textContent = t('footerGame');
        if (links[2]) links[2].textContent = t('footerQuiz');
    }
    if (footerSections[2]) {
        const h4 = footerSections[2].querySelector('h4');
        const links = footerSections[2].querySelectorAll('a');
        if (h4) h4.textContent = t('footerLegal');
        if (links[0]) links[0].textContent = t('footerPrivacy');
        if (links[1]) links[1].textContent = t('footerTerms');
        if (links[2]) links[2].textContent = t('footerCookies');
    }
    if (footerSections[3]) {
        const h4 = footerSections[3].querySelector('h4');
        const items = footerSections[3].querySelectorAll('li');
        if (h4) h4.textContent = t('footerAccessibility');
        if (items[0]) items[0].innerHTML = '<i class="fas fa-eye"></i> ' + t('colourBlind');
        if (items[1]) items[1].innerHTML = '<i class="fas fa-text-height"></i> ' + t('adjustableFont');
        if (items[2]) items[2].innerHTML = '<i class="fas fa-moon"></i> ' + t('darkMode');
    }

    // 更新版权信息
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        const copyright = footerBottom.querySelector('p:first-child');
        if (copyright) copyright.textContent = '© 2026 Circle Planet. ' + t('copyright');
        const featureTags = footerBottom.querySelectorAll('.feature-tag');
        if (featureTags[0]) featureTags[0].textContent = t('featureColourBlind');
        if (featureTags[1]) featureTags[1].textContent = t('featureMobile');
        if (featureTags[2]) featureTags[2].textContent = t('featureBilingual');
        if (featureTags[3]) featureTags[3].textContent = t('featureDark');
    }

    // 如果正在答题中，更新当前题目的语言显示
    const quizGame = document.getElementById('quizGame');
    if (quizGame && quizGame.style.display !== 'none' && currentQuestions.length > 0) {
        renderCurrentQuestion(false);
    }

    updateStepText();
}

function updateStepText() {
    const stepText = document.getElementById('stepText');
    if (stepText && currentQuestions.length > 0) {
        const total = currentQuestions.length;
        const current = currentQuestionIndex + 1;
        if (currentLang === 'zh') stepText.textContent = t('stepText') + current + t('ofText') + total;
        else stepText.textContent = 'Step ' + current + ' / ' + total;
    }
}

// ========================================
// Particles.js 初始化
// ========================================
function initParticles() {
    // 检查 particles.js 是否已加载
    if (typeof particlesJS === 'undefined') {
        console.log('Particles.js not loaded');
        return;
    }

    const isDark = document.body.classList.contains('dark') || document.body.getAttribute('data-theme') === 'dark';

    // Light mode particle settings - circular particles, #4361ee color
    const lightParticleConfig = {
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: '#4361ee'  // --primary color
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#4361ee'
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 2,
                    sync: false
                }
            },
            line_linked: {
                enable: false  // No connecting lines
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out'
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 150,
                    line_linked: {
                        opacity: 0.3
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };

    // Dark mode particle settings - lighter blue for visibility
    const darkParticleConfig = {
        particles: {
            number: {
                value: 35,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: '#93c5fd'  // Lighter blue for dark mode
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#93c5fd'
                }
            },
            opacity: {
                value: 0.4,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.8,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1.5,
                    size_min: 1,
                    sync: false
                }
            },
            line_linked: {
                enable: false  // No connecting lines
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out'
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 150,
                    line_linked: {
                        opacity: 0.2
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    };

    // 初始化 particles
    particlesJS('particles-js', isDark ? darkParticleConfig : lightParticleConfig);
}

// 更新 particles 颜色
function updateParticlesColor() {
    const isDark = document.body.classList.contains('dark') || document.body.getAttribute('data-theme') === 'dark';

    // 更新 particles 颜色
    if (typeof pJSDom !== 'undefined' && pJSDom[0] && pJSDom[0].pJS) {
        const pJS = pJSDom[0].pJS;

        if (isDark) {
            pJS.particles.color.value = '#93c5fd';
            pJS.particles.line_linked.color = '#93c5fd';
        } else {
            pJS.particles.color.value = '#4361ee';
            pJS.particles.line_linked.color = '#4361ee';
        }

        // 重新绘制
        pJS.particles.update();
        pJS.fn.draw();
    }
}
let starTimer = null;

function createShootingStar() {
    const container = document.querySelector('.stars-container');
    // 只检查容器是否存在，定时器已保证在暗色模式下运行
    if (!container) return;

    const star = document.createElement('div');
    star.className = 'shooting-star';

    // 1. 随机水平位置 (0% - 100%)
    star.style.left = Math.random() * 100 + '%';

    // 2. 随机速度 (1.5s - 3s)
    const duration = 1.5 + Math.random() * 1.5;
    star.style.animation = `flyUp ${duration}s linear forwards`;

    // 3. 随机大小
    star.style.width = 1 + Math.random() * 2 + 'px';

    container.appendChild(star);

    // 动画播完后自动删除，防止占用内存
    star.addEventListener('animationend', () => star.remove());
}

// 供切换按钮调用的开关函数
function toggleShootingStars(isDark) {
    if (isDark) {
        if (!starTimer) {
            starTimer = setInterval(createShootingStar, 800); // 每0.8秒出一颗
        }
    } else {
        clearInterval(starTimer);
        starTimer = null;
        const container = document.querySelector('.stars-container');
        if (container) container.innerHTML = ''; // 白天时清空流星
    }
}
