/* ========================================
   Theorem 8: Alternate Segment Theorem - 专属交互逻辑
   ======================================== */

let isDragging = false;
let activePoint = null;
const svgConfig = { cx: 300, cy: 300, r: 200 };
const arcRadius = 30;
const tangentLength = 400;

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
        tangentChordA1: 'Tangent-Chord Angle (A)',
        alternateC: 'Alternate Angle (C)',
        tangentChordA2: 'Tangent-Chord Angle (A)',
        alternateB: 'Alternate Angle (B)'
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
        tangentChordA1: '弦切角 (A)',
        alternateC: '交替角 (C)',
        tangentChordA2: '弦切角 (A)',
        alternateB: '交替角 (B)'
    }
};

// 获取翻译文本
function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initTheorem8();
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

    const labels = document.querySelectorAll('.data-label');
    const labelKeys = ['tangentChordA1', 'alternateC', 'tangentChordA2', 'alternateB'];
    labels.forEach((label, index) => {
        if (labelKeys[index]) {
            label.textContent = t(labelKeys[index]);
        }
    });
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
function initTheorem8() {
    const svg = document.getElementById('theoremSvg');
    const draggablePoints = ['A', 'B', 'C'];

    draggablePoints.forEach(pointKey => {
        const point = document.getElementById(`point${pointKey}`);
        point.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            activePoint = pointKey;
        });
        point.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isDragging = true;
            activePoint = pointKey;
        });
    });

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', dragTouch, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    draggablePoints.forEach(pointKey => forcePointOnCircle(pointKey));
    updateTheorem8();
}

function forcePointOnCircle(pointKey) {
    const point = document.getElementById(`point${pointKey}`);
    const label = document.getElementById(`label${pointKey}`);
    let x = parseFloat(point.getAttribute('cx'));
    let y = parseFloat(point.getAttribute('cy'));
    const dx = x - svgConfig.cx;
    const dy = y - svgConfig.cy;
    const len = Math.hypot(dx, dy);
    const nx = svgConfig.cx + dx / len * svgConfig.r;
    const ny = svgConfig.cy + dy / len * svgConfig.r;
    point.setAttribute('cx', nx);
    point.setAttribute('cy', ny);
    updateLabelPosition(pointKey, nx, ny);
}

function updateLabelPosition(pointKey, x, y) {
    const label = document.getElementById(`label${pointKey}`);
    const dx = x - svgConfig.cx;
    const dy = y - svgConfig.cy;
    let offsetX = 15, offsetY = -10;

    if (Math.abs(dx) > Math.abs(dy)) {
        offsetX = dx > 0 ? 15 : -30;
    } else {
        offsetY = dy > 0 ? 25 : -15;
    }
    label.setAttribute('x', x + offsetX);
    label.setAttribute('y', y + offsetY);
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

    const point = document.getElementById(`point${activePoint}`);
    point.setAttribute('cx', nx);
    point.setAttribute('cy', ny);
    updateLabelPosition(activePoint, nx, ny);

    updateTheorem8();
}

function updateTheorem8() {
    const O = { x: svgConfig.cx, y: svgConfig.cy };
    const A = getPointCoords('pointA');
    const B = getPointCoords('pointB');
    const C = getPointCoords('pointC');

    updateLine('lineAB', A, B);
    updateLine('lineAC', A, C);
    updateLine('lineBC', B, C);

    const dxOA = A.x - O.x;
    const dyOA = A.y - O.y;
    const tangentDirX = -dyOA;
    const tangentDirY = dxOA;
    const lenTangent = Math.hypot(tangentDirX, tangentDirY);
    const unitTangentX = tangentDirX / lenTangent;
    const unitTangentY = tangentDirY / lenTangent;

    const tangentStart = {
        x: A.x + unitTangentX * tangentLength,
        y: A.y + unitTangentY * tangentLength
    };
    const tangentEnd = {
        x: A.x - unitTangentX * tangentLength,
        y: A.y - unitTangentY * tangentLength
    };
    updateLine('tangentLine', tangentStart, tangentEnd);

    const angleTangentAB = calculateAngle(A, tangentStart, B);
    const angleTangentAC = calculateAngle(A, tangentEnd, C);
    const angleABC = calculateAngle(B, A, C);
    const angleACB = calculateAngle(C, A, B);

    drawAngleArc('arcTangent1', A, tangentStart, B, arcRadius);
    drawAngleArc('arcTangent2', A, tangentEnd, C, arcRadius);
    drawAngleArc('arcAngleB', B, A, C, arcRadius);
    drawAngleArc('arcAngleC', C, A, B, arcRadius);

    const textTangent1 = angleTangentAB.toFixed(0);
    const textTangent2 = angleTangentAC.toFixed(0);
    const textAngleB = angleABC.toFixed(0);
    const textAngleC = angleACB.toFixed(0);

    document.getElementById('textTangent1').textContent = `${textTangent1}°`;
    document.getElementById('textTangent2').textContent = `${textTangent2}°`;
    document.getElementById('textAngleB').textContent = `${textAngleB}°`;
    document.getElementById('textAngleC').textContent = `${textAngleC}°`;

    document.getElementById('valueTangent1').textContent = `${textTangent1}°`;
    document.getElementById('valueTangent2').textContent = `${textTangent2}°`;
    document.getElementById('valueAngleB').textContent = `${textAngleB}°`;
    document.getElementById('valueAngleC').textContent = `${textAngleC}°`;

    updateAngleTextPosition('textTangent1', A, tangentStart, B, arcRadius);
    updateAngleTextPosition('textTangent2', A, tangentEnd, C, arcRadius);
    updateAngleTextPosition('textAngleB', B, A, C, arcRadius);
    updateAngleTextPosition('textAngleC', C, A, B, arcRadius);
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
    const degree = angle * 180 / Math.PI;
    return degree > 180 ? 360 - degree : degree;
}

function drawAngleArc(arcId, vertex, p1, p2, radius) {
    const arc = document.getElementById(arcId);

    const vec1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const vec2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };

    let startAngle = Math.atan2(vec1.y, vec1.x);
    let endAngle = Math.atan2(vec2.y, vec2.x);

    let angleDiff = endAngle - startAngle;
    if (angleDiff < 0) angleDiff += 2 * Math.PI;
    if (angleDiff > Math.PI) {
        [startAngle, endAngle] = [endAngle, startAngle];
        angleDiff = 2 * Math.PI - angleDiff;
    }

    const x1 = vertex.x + radius * Math.cos(startAngle);
    const y1 = vertex.y + radius * Math.sin(startAngle);
    const x2 = vertex.x + radius * Math.cos(endAngle);
    const y2 = vertex.y + radius * Math.sin(endAngle);

    const largeArcFlag = angleDiff > Math.PI ? 1 : 0;
    const sweepFlag = 1;
    const pathData = `M ${vertex.x} ${vertex.y} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z`;

    arc.setAttribute('d', pathData);
}

function updateAngleTextPosition(textId, vertex, p1, p2, radius) {
    const text = document.getElementById(textId);

    const vec1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const vec2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };

    const len1 = Math.hypot(vec1.x, vec1.y);
    const len2 = Math.hypot(vec2.x, vec2.y);
    const unitVec1 = { x: vec1.x / len1, y: vec1.y / len1 };
    const unitVec2 = { x: vec2.x / len2, y: vec2.y / len2 };

    const bisector = { x: unitVec1.x + unitVec2.x, y: unitVec1.y + unitVec2.y };
    const bisectorLen = Math.hypot(bisector.x, bisector.y);
    const unitBisector = { x: bisector.x / bisectorLen, y: bisector.y / bisectorLen };

    const textOffset = radius + 12;
    text.setAttribute('x', vertex.x + unitBisector.x * textOffset);
    text.setAttribute('y', vertex.y + unitBisector.y * textOffset);
}
