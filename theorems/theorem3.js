/* ========================================
   Theorem 3: Angles in the Same Segment - 专属交互逻辑
   拖拽点、实时角度计算、图形更新、边栏导航
   ======================================== */

let isDragging = false;
let activePoint = null;

// 圆的配置：和HTML完全一致
const svgConfig = {
    cx: 300,
    cy: 300,
    r: 200
};

// 语言切换相关变量
let currentLang = localStorage.getItem('lang') || 'en';

// 中英文文本映射
const translations = {
    en: {
        sidebarTitle: 'Theorems',
        backToAll: 'All Theorems',
        theorem1: 'Angle at the Centre',
        theorem2: 'Angles in a Semicircle',
        theorem3: 'Angles in the Same Segment',
        theorem4: 'Cyclic Quadrilateral',
        theorem5: 'Radius to a Tangent',
        theorem6: 'Tangents from a Point I',
        theorem7: 'Tangents from a Point II',
        theorem8: 'Alternate Segment Theorem',
        backBtn: 'Back to All Theorems',
        angleLabelC: 'Angle ∠ACB',
        angleLabelD: 'Angle ∠ADB'
    },
    zh: {
        sidebarTitle: '定理列表',
        backToAll: '全部定理',
        theorem1: '圆心角',
        theorem2: '半圆上的角',
        theorem3: '同弧所对的角',
        theorem4: '圆内接四边形',
        theorem5: '切线的性质',
        theorem6: '切线长定理 I',
        theorem7: '切线长定理 II',
        theorem8: '弦切角定理',
        backBtn: '返回全部定理',
        angleLabelC: '角度 ∠ACB',
        angleLabelD: '角度 ∠ADB'
    }
};

// 获取翻译文本
function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initTheorem3Interaction();
    initSidebar();
    initLangBtn();
    initTheme();
    initFontSize();
    initMobileMenu();
    initBackToTop();
    applyTranslations();
});

// ========================================
// 边栏功能初始化
// ========================================
function initSidebar() {
    const sidebar = document.getElementById('theoremSidebar');
    const toggleBtn = document.getElementById('sidebarToggle');

    if (sidebar && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            const icon = toggleBtn.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-left';
            } else {
                icon.className = 'fas fa-chevron-right';
            }
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });

        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState === 'true') {
            sidebar.classList.add('collapsed');
            toggleBtn.querySelector('i').className = 'fas fa-chevron-left';
        }
    }
}

// ========================================
// 语言切换功能
// ========================================
function initLangBtn() {
    const langBtn = document.getElementById('langBtn');
    currentLang = localStorage.getItem('lang') || 'en';
    updateLangButton();

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'zh' : 'en';
            localStorage.setItem('lang', currentLang);
            updateLangButton();
            applyTranslations();
        });
    }
}

function updateLangButton() {
    const langBtn = document.getElementById('langBtn');
    const langText = langBtn ? langBtn.querySelector('span') : null;
    if (langText) {
        langText.textContent = currentLang === 'en' ? 'EN' : '中';
    }
}

function applyTranslations() {
    const sidebarTitle = document.querySelector('.sidebar-header h3 span');
    if (sidebarTitle) sidebarTitle.textContent = t('sidebarTitle');

    const backBtn = document.querySelector('.sidebar-back-btn');
    if (backBtn) backBtn.innerHTML = '<i class="fas fa-th"></i> ' + t('backToAll');

    const theoremTitles = document.querySelectorAll('.theorem-nav-title');
    const titleKeys = ['theorem1', 'theorem2', 'theorem3', 'theorem4', 'theorem5', 'theorem6', 'theorem7', 'theorem8'];
    theoremTitles.forEach((title, index) => {
        if (titleKeys[index]) {
            title.textContent = t(titleKeys[index]);
        }
    });

    const angleLabelC = document.querySelector('.data-c .data-label');
    const angleLabelD = document.querySelector('.data-d .data-label');
    if (angleLabelC) angleLabelC.textContent = t('angleLabelC');
    if (angleLabelD) angleLabelD.textContent = t('angleLabelD');
}

// ========================================
// 深色模式功能
// ========================================
function initTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.toggleAttribute('data-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon(isDark);
        });
    }

    function updateThemeIcon(isDark) {
        if (themeBtn) {
            themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }
}

// ========================================
// 字体大小功能
// ========================================
function initFontSize() {
    const fontBtns = document.querySelectorAll('.font-btn');
    const savedSize = localStorage.getItem('fontSize') || '16';

    document.documentElement.style.setProperty('--font-size-base', savedSize + 'px');
    updateActiveFontBtn(savedSize);

    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.id === 'fontS' ? '14' : btn.id === 'fontL' ? '18' : '16';
            document.documentElement.style.setProperty('--font-size-base', size + 'px');
            localStorage.setItem('fontSize', size);
            updateActiveFontBtn(size);
        });
    });

    function updateActiveFontBtn(size) {
        fontBtns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById(size === '14' ? 'fontS' : size === '18' ? 'fontL' : 'fontM');
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// ========================================
// 移动端菜单
// ========================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
            menuBtn.innerHTML = mobileMenu.classList.contains('show') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// ========================================
// 返回顶部按钮
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ========================================
// 核心交互逻辑
// ========================================
function initTheorem3Interaction() {
    const svg = document.getElementById('theoremSvg');
    const pointA = document.getElementById('pointA');
    const pointB = document.getElementById('pointB');
    const pointC = document.getElementById('pointC');
    const pointD = document.getElementById('pointD');

    forcePointOnCircle('pointA');
    forcePointOnCircle('pointB');
    forcePointOnCircle('pointC');
    forcePointOnCircle('pointD');

    pointA.addEventListener('mousedown', (e) => startDrag(e, 'A'));
    pointA.addEventListener('touchstart', (e) => startDrag(e, 'A'), { passive: false });

    pointB.addEventListener('mousedown', (e) => startDrag(e, 'B'));
    pointB.addEventListener('touchstart', (e) => startDrag(e, 'B'), { passive: false });

    pointC.addEventListener('mousedown', (e) => startDrag(e, 'C'));
    pointC.addEventListener('touchstart', (e) => startDrag(e, 'C'), { passive: false });

    pointD.addEventListener('mousedown', (e) => startDrag(e, 'D'));
    pointD.addEventListener('touchstart', (e) => startDrag(e, 'D'), { passive: false });

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', dragTouch, { passive: false });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    updateTheorem3();
}

function forcePointOnCircle(pointId) {
    const point = document.getElementById(pointId);
    const label = document.getElementById(`label${pointId.slice(-1)}`);

    let x = parseFloat(point.getAttribute('cx'));
    let y = parseFloat(point.getAttribute('cy'));

    const dx = x - svgConfig.cx;
    const dy = y - svgConfig.cy;
    const len = Math.hypot(dx, dy);

    const nx = svgConfig.cx + dx / len * svgConfig.r;
    const ny = svgConfig.cy + dy / len * svgConfig.r;

    point.setAttribute('cx', nx);
    point.setAttribute('cy', ny);

    let offsetX = 15, offsetY = -10;
    if (nx < svgConfig.cx) offsetX = -30;
    if (ny > svgConfig.cy) offsetY = 25;
    label.setAttribute('x', nx + offsetX);
    label.setAttribute('y', ny + offsetY);
}

function startDrag(e, pointKey) {
    e.preventDefault();
    isDragging = true;
    activePoint = pointKey;
}

function drag(e) {
    if (!isDragging || !activePoint) return;
    const svg = document.getElementById('theoremSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPointOnCircle(p.x, p.y);
}

function dragTouch(e) {
    if (!isDragging || !activePoint) return;
    e.preventDefault();
    const svg = document.getElementById('theoremSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.touches[0].clientX;
    pt.y = e.touches[0].clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPointOnCircle(p.x, p.y);
}

function endDrag() {
    isDragging = false;
    activePoint = null;
}

function setPointOnCircle(x, y) {
    const dx = x - svgConfig.cx;
    const dy = y - svgConfig.cy;
    const len = Math.hypot(dx, dy);

    const nx = svgConfig.cx + dx / len * svgConfig.r;
    const ny = svgConfig.cy + dy / len * svgConfig.r;

    const pointEl = document.getElementById(`point${activePoint}`);
    pointEl.setAttribute('cx', nx);
    pointEl.setAttribute('cy', ny);

    const labelEl = document.getElementById(`label${activePoint}`);
    let offsetX = 15, offsetY = -10;
    if (nx < svgConfig.cx) offsetX = -30;
    if (ny > svgConfig.cy) offsetY = 25;
    labelEl.setAttribute('x', nx + offsetX);
    labelEl.setAttribute('y', ny + offsetY);

    updateTheorem3();
}

function updateTheorem3() {
    const A = getPointCoords('pointA');
    const B = getPointCoords('pointB');
    const C = getPointCoords('pointC');
    const D = getPointCoords('pointD');

    const angleACB = calculateAngle(C, A, B);
    const angleADB = calculateAngle(D, A, B);

    document.getElementById('angleC').textContent = Math.round(angleACB) + '°';
    document.getElementById('angleD').textContent = Math.round(angleADB) + '°';

    updateLine('lineAC', A, C);
    updateLine('lineBC', B, C);
    updateLine('lineAD', A, D);
    updateLine('lineBD', B, D);

    drawAcuteAngleArc('arcC', C, A, B, 30);
    drawAcuteAngleArc('arcD', D, A, B, 30);
}

function getPointCoords(id) {
    const el = document.getElementById(id);
    return {
        x: parseFloat(el.getAttribute('cx')),
        y: parseFloat(el.getAttribute('cy'))
    };
}

function updateLine(id, p1, p2) {
    const line = document.getElementById(id);
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
}

function calculateAngle(vertex, p1, p2) {
    const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };

    const dot = v1.x * v2.x + v1.y * v2.y;
    const det = v1.x * v2.y - v1.y * v2.x;

    let angle = Math.atan2(det, dot);
    if (angle < 0) angle += 2 * Math.PI;

    const angleInDeg = angle * (180 / Math.PI);
    return angleInDeg > 180 ? 360 - angleInDeg : angleInDeg;
}

function drawAcuteAngleArc(id, centre, p1, p2, radius) {
    const path = document.getElementById(id);
    if (!path) return;

    let startAngle = Math.atan2(p1.y - centre.y, p1.x - centre.x);
    let endAngle = Math.atan2(p2.y - centre.y, p2.x - centre.x);

    let angleDiff = endAngle - startAngle;
    if (angleDiff < 0) angleDiff += 2 * Math.PI;

    if (angleDiff > Math.PI) {
        [startAngle, endAngle] = [endAngle, startAngle];
        angleDiff = 2 * Math.PI - angleDiff;
    }

    const x1 = centre.x + radius * Math.cos(startAngle);
    const y1 = centre.y + radius * Math.sin(startAngle);
    const x2 = centre.x + radius * Math.cos(endAngle);
    const y2 = centre.y + radius * Math.sin(endAngle);

    const largeArcFlag = 0;
    const sweepFlag = 1;

    const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;
    path.setAttribute('d', d);
}