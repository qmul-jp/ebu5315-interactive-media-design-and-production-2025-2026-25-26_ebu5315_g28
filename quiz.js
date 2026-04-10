document.addEventListener('DOMContentLoaded', function () {
    initLangBtn();
    initTheme();
    initFontSize();
    initMobileMenu();
    initBackToTop();
    initQuiz();
});

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
        perfectScore: "Perfect Score! You're a Circle Theorem Master!",
        greatJob: 'Great job! You passed the quiz!',
        greatJobSub: 'Keep practicing to get even better.',
        keepPracticing: 'Keep practicing! You\'ll get there.',
        reviewMistakes: 'Review the mistakes and try again.'
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
        perfectScore: '满分！你就是圆定理大师！',
        greatJob: '太棒了！你通过了测验！',
        greatJobSub: '继续练习，你会做得更好。',
        keepPracticing: '继续加油！你一定可以的。',
        reviewMistakes: '复习错题再试一次。'
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

// 题目库（来自 questions.js）- 支持中英文
const questionBank = {

easy: [

{
id:1,
question_en:"The angle at the center of a circle is ____ the angle at the circumference.",
question_zh:"圆心角的度数是圆周角的____。",
options_en:["half","equal to","twice","three times"],
options_zh:["一半","相等","两倍","三倍"],
answer:"twice",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="230" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="70" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:2,
question_en:"A line from the center to the circle is called a ____.",
question_zh:"从圆心到圆上的连线叫做____。",
options_en:["diameter","radius","chord","arc"],
options_zh:["直径","半径","弦","弧"],
answer:"radius",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:3,
question_en:"A line passing through the center and touching both sides of the circle is a ____.",
question_zh:"经过圆心并与圆相交于两点的线段是____。",
options_en:["radius","arc","diameter","tangent"],
options_zh:["半径","弧","直径","切线"],
answer:"diameter",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:4,
question_en:"A line that touches the circle at exactly one point is called a ____.",
question_zh:"只与圆相交于一点的直线叫做____。",
options_en:["tangent","diameter","chord","radius"],
options_zh:["切线","直径","弦","半径"],
answer:"tangent",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="20" y1="250" x2="280" y2="250" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:5,
question_en:"All radii of the same circle are ____.",
question_zh:"同一个圆的所有半径都____。",
options_en:["different","equal","random","curved"],
options_zh:["不同","相等","随机","弯曲"],
answer:"equal",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="70" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:6,
question_en:"A straight line joining two points on a circle is called a ____.",
question_zh:"连接圆上两点的直线叫做____。",
options_en:["chord","radius","tangent","arc"],
options_zh:["弦","半径","切线","弧"],
answer:"chord",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="80" x2="220" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:7,
question_en:"Half of a circle is called a ____.",
question_zh:"圆的一半叫做____。",
options_en:["arc","radius","semicircle","chord"],
options_zh:["弧","半径","半圆","弦"],
answer:"semicircle",
svg:`<svg viewBox="0 0 300 300">
<path d="M50 150 A100 100 0 0 1 250 150" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:8,
question_en:"The distance around a circle is called ____.",
question_zh:"圆一周的长度叫做____。",
options_en:["diameter","area","circumference","radius"],
options_zh:["直径","面积","周长","半径"],
answer:"circumference",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#f59e0b" stroke-width="4" fill="none"/>
</svg>`
},

{
id:9,
question_en:"The center of a circle is the point ____.",
question_zh:"圆心是____的点。",
options_en:["on the edge","in the middle","outside","on a line"],
options_zh:["在边上","在中间","在外面","在线上"],
answer:"in the middle",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<circle cx="150" cy="150" r="6" fill="#4f46e5"/>
</svg>`
},

{
id:10,
question_en:"Two radii form an angle at the ____.",
question_zh:"两条半径在____形成角。",
options_en:["edge","center","diameter","arc"],
options_zh:["边上","圆心","直径","弧"],
answer:"center",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="230" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="80" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
}

],

medium:[

{
id:1,
question_en:"Angles in the same segment of a circle are ____.",
question_zh:"同弧所对的圆周角____。",
options_en:["equal","double","random","half"],
options_zh:["相等","两倍","随机","一半"],
answer:"equal",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="70" y1="80" x2="230" y2="80" stroke="#4f46e5" stroke-width="3"/>
</svg>`
},

{
id:2,
question_en:"The angle in a semicircle is ____.",
question_zh:"半圆所对的圆周角是____。",
options_en:["45°","60°","90°","180°"],
options_zh:["45°","60°","90°","180°"],
answer:"90°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#4f46e5" stroke-width="3"/>
</svg>`
},

{
id:3,
question_en:"A tangent is ____ to the radius at the point of contact.",
question_zh:"切线在切点处____于半径。",
options_en:["parallel","equal","perpendicular","random"],
options_zh:["平行","相等","垂直","随机"],
answer:"perpendicular",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#4f46e5" stroke-width="3"/>
<line x1="250" y1="150" x2="250" y2="50" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:4,
question_en:"Opposite angles of a cyclic quadrilateral sum to ____.",
question_zh:"圆内接四边形的对角之和等于____。",
options_en:["90°","180°","270°","360°"],
options_zh:["90°","180°","270°","360°"],
answer:"180°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:5,
question_en:"Equal chords are ____ from the center.",
question_zh:"相等的弦到圆心的距离____。",
options_en:["nearer","equidistant","random","farther"],
options_zh:["更近","相等","随机","更远"],
answer:"equidistant",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="80" x2="220" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="80" y1="220" x2="220" y2="220" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:6,
question_en:"The perpendicular from the center to a chord ____ the chord.",
question_zh:"从圆心到弦的垂线____弦。",
options_en:["bisects","touches","crosses","extends"],
options_zh:["平分","接触","穿过","延长"],
answer:"bisects",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="100" x2="220" y2="100" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:7,
question_en:"Angles subtended by the same arc are ____.",
question_zh:"同弧所对的圆周角____。",
options_en:["equal","double","random","half"],
options_zh:["相等","两倍","随机","一半"],
answer:"equal",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:8,
question_en:"The longest chord of a circle is the ____.",
question_zh:"圆最长的弦是____。",
options_en:["arc","radius","diameter","tangent"],
options_zh:["弧","半径","直径","切线"],
answer:"diameter",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:9,
question_en:"A diameter divides the circle into ____ equal parts.",
question_zh:"直径把圆分成____等份。",
options_en:["1","2","3","4"],
options_zh:["1","2","3","4"],
answer:"2",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:10,
question_en:"The radius is ____ the diameter.",
question_zh:"半径是直径的____。",
options_en:["half of","equal to","twice","triple"],
options_zh:["一半","相等","两倍","三倍"],
answer:"half of",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
}

],

hard:[

{
id:1,
question_en:"If the central angle is 120°, the angle at the circumference is ____.",
question_zh:"如果圆心角是120°，则圆周角是____。",
options_en:["30°","60°","90°","120°"],
options_zh:["30°","60°","90°","120°"],
answer:"60°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:2,
question_en:"Angles in the same segment are ____.",
question_zh:"同弧所对的圆周角____。",
options_en:["equal","double","random","opposite"],
options_zh:["相等","两倍","随机","相反"],
answer:"equal",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:3,
question_en:"If radius is 5, diameter is ____.",
question_zh:"如果半径是5，则直径是____。",
options_en:["5","8","10","12"],
options_zh:["5","8","10","12"],
answer:"10",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="80" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:4,
question_en:"The angle between tangent and radius is ____.",
question_zh:"切线和半径之间的夹角是____。",
options_en:["30°","60°","90°","120°"],
options_zh:["30°","60°","90°","120°"],
answer:"90°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:5,
question_en:"The diameter is ____ the radius.",
question_zh:"直径是半径的____。",
options_en:["half","equal","twice","triple"],
options_zh:["一半","相等","两倍","三倍"],
answer:"twice",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:6,
question_en:"The center of a circle is equidistant from all ____.",
question_zh:"圆心到____的所有点的距离相等。",
options_en:["points on the circle","lines","diameters","angles"],
options_zh:["圆上的点","线","直径","角"],
answer:"points on the circle",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:7,
question_en:"An arc is part of the ____.",
question_zh:"弧是____的一部分。",
options_en:["circle","radius","diameter","center"],
options_zh:["圆","半径","直径","圆心"],
answer:"circle",
svg:`<svg viewBox="0 0 300 300">
<path d="M80 220 A100 100 0 0 1 220 220" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:8,
question_en:"Two diameters always intersect at the ____.",
question_zh:"两条直径总在____相交。",
options_en:["edge","center","arc","random point"],
options_zh:["边上","圆心","弧","随机点"],
answer:"center",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b"/>
<line x1="150" y1="50" x2="150" y2="250" stroke="#f59e0b"/>
</svg>`
},

{
id:9,
question_en:"A tangent touches the circle at ____ point.",
question_zh:"切线与圆相切于____点。",
options_en:["one","two","three","four"],
options_zh:["一","两","三","四"],
answer:"one",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:10,
question_en:"If diameter is 20, radius is ____.",
question_zh:"如果直径是20，则半径是____。",
options_en:["5","10","15","20"],
options_zh:["5","10","15","20"],
answer:"10",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
}

]

};

let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedLevel = null;
let userAnswers = {};
let correctCount = 0;
let wrongQuestions = [];
let timerInterval = null;
let timeLeft = 30;
let questionTimes = [];

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
        }
    });

    checkBtn.addEventListener('click', () => {
        const sel = document.querySelector('.option-btn.selected');
        if (!sel) { showAlert(t('selectAnswer')); return; }
        stopTimer();
        questionTimes.push(timeLeft);
        const q = currentQuestions[currentQuestionIndex];
        const opts = document.querySelectorAll('.option-btn');
        opts.forEach(o => o.disabled = true);
        opts.forEach(o => {
            if (o.querySelector('.option-text').innerText === q.answer) o.classList.add('correct');
            else if (o === sel) o.classList.add('wrong');
        });
        const isCorrect = sel.querySelector('.option-text').innerText === q.answer;
        showFeedback(isCorrect);
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
            wrongQuestions = currentQuestions.filter(q => userAnswers[q.id] !== q.answer);
            quizGame.style.display = 'none';
            quizResult.style.display = 'block';
            window.scrollTo(0, 0);
            showResults();
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
    document.getElementById('currentScore').innerText = '0';
    quizSelection.style.display = 'none';
    quizResult.style.display = 'none';
    quizGame.style.display = 'block';
    document.getElementById('quiz-top-header').style.display = 'none';
    renderCurrentQuestion(true);
    startTimer();
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
        else if (timeLeft <= 5) { timerEl.className = 'timer danger'; timerFillEl.className = 'timer-fill danger'; }
        if (timeLeft <= 0) {
            stopTimer();
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
    const total = currentQuestions.length;
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
    } else if (correctCount >= 3) {
        resultReview.innerHTML = '<p>' + t('greatJob') + '</p><p>' + t('greatJobSub') + '</p>';
        resultIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        resultCard.classList.add('good');
        triggerCelebration('medium');
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
    updateThemeIcon(savedTheme);
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.classList.remove(currentTheme);
        document.body.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    function updateThemeIcon(theme) {
        const icon = themeBtn.querySelector('i');
        icon.className = 'fas fa-' + (theme === 'dark' ? 'sun' : 'moon');
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
    function applyFontSize(size) { const sizes = { s: '14px', m: '16px', l: '18px' }; document.body.style.fontSize = sizes[size] || '16px'; }
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuBtn.querySelector('i').className = 'fas fa-bars';
        }
    });
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
