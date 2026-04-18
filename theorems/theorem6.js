/* ========================================
   Theorem 6: Tangents from a Point I - 专属交互逻辑
   ======================================== */

let isDragging = false;
let activePoint = null;
const svgConfig = { cx: 300, cy: 300, r: 200 };
const rightAngleSize = 20;
const lineLength = 600;

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
        lengthCB: 'Length |CB|',
        lengthDB: 'Length |DB|'
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
        lengthCB: '长度 |CB|',
        lengthDB: '长度 |DB|'
    }
};

// 获取翻译文本
function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initTheorem6();
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

    const lengthCBLabel = document.querySelector('.data-row .data-cb .data-label');
    if (lengthCBLabel) lengthCBLabel.textContent = t('lengthCB');
    const lengthDBLabel = document.querySelector('.data-row .data-db .data-label');
    if (lengthDBLabel) lengthDBLabel.textContent = t('lengthDB');
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
function initTheorem6() {
    const svg = document.getElementById('theoremSvg');
    const pointB = document.getElementById('pointB');

    pointB.addEventListener('mousedown', (e) => { e.preventDefault(); isDragging = true; activePoint = 'B'; });
    pointB.addEventListener('touchstart', (e) => { e.preventDefault(); isDragging = true; activePoint = 'B'; });

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', dragTouch, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    updateTheorem6();
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
    setPointBPosition(p.x, p.y);
}

function dragTouch(e) {
    if (!isDragging || !activePoint) return;
    e.preventDefault();
    const svg = document.getElementById('theoremSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.touches[0].clientX;
    pt.y = e.touches[0].clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPointBPosition(p.x, p.y);
}

function endDrag() {
    isDragging = false;
    activePoint = null;
}

function setPointBPosition(x, y) {
    const pointB = document.getElementById('pointB');
    pointB.setAttribute('cx', x);
    pointB.setAttribute('cy', y);
    updateLabelPosition('B', x, y);
    updateTheorem6();
}

function updateTheorem6() {
    const O = { x: svgConfig.cx, y: svgConfig.cy };
    const B = getPointCoords('pointB');

    const dx = B.x - O.x;
    const dy = B.y - O.y;
    const d = Math.hypot(dx, dy);

    const isInsideCircle = d < svgConfig.r;

    const elementsToToggle = [
        'tangentBC', 'tangentBD', 'radiusOC', 'radiusOD',
        'pointC', 'pointD', 'labelC', 'labelD',
        'rightAngleMarkC', 'rightAngleMarkD',
        'lengthCB', 'lengthDB'
    ];

    if (isInsideCircle) {
        elementsToToggle.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        document.getElementById('valueCB').textContent = '--';
        document.getElementById('valueDB').textContent = '--';
        return;
    }

    elementsToToggle.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block';
    });

    const tangentLength = Math.sqrt(d * d - svgConfig.r * svgConfig.r);

    const { C, D } = calculateTangentPoints(O, svgConfig.r, B);

    updatePoint('pointC', C.x, C.y);
    updatePoint('pointD', D.x, D.y);
    updateLabelPosition('C', C.x, C.y);
    updateLabelPosition('D', D.x, D.y);

    const { tangent1Start, tangent1End, tangent2Start, tangent2End } = calculateFullTangentLines(B, C, D);

    updateLine('tangentBC', tangent1Start, tangent1End);
    updateLine('tangentBD', tangent2Start, tangent2End);

    updateLine('radiusOC', O, C);
    updateLine('radiusOD', O, D);

    updateRightAngleMark('rightAngleMarkC', O, C, B);
    updateRightAngleMark('rightAngleMarkD', O, D, B);

    const lengthText = tangentLength.toFixed(2);
    document.getElementById('lengthCB').textContent = `|CB| = ${lengthText}`;
    document.getElementById('lengthDB').textContent = `|DB| = ${lengthText}`;
    document.getElementById('valueCB').textContent = lengthText;
    document.getElementById('valueDB').textContent = lengthText;

    updateLengthTextPosition('lengthCB', B, C);
    updateLengthTextPosition('lengthDB', B, D);
}

function getPointCoords(id) {
    const el = document.getElementById(id);
    return {
        x: parseFloat(el.getAttribute('cx')),
        y: parseFloat(el.getAttribute('cy'))
    };
}

function updatePoint(id, x, y) {
    const el = document.getElementById(id);
    el.setAttribute('cx', x);
    el.setAttribute('cy', y);
}

function updateLine(id, p1, p2) {
    const line = document.getElementById(id);
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
}

function calculateTangentPoints(O, r, B) {
    const dx = B.x - O.x;
    const dy = B.y - O.y;
    const d = Math.hypot(dx, dy);

    const ux = dx / d;
    const uy = dy / d;

    const theta = Math.acos(r / d);

    const c1x = Math.cos(theta);
    const c1y = -Math.sin(theta);
    const c2x = Math.cos(theta);
    const c2y = Math.sin(theta);

    const C = {
        x: O.x + r * (ux * c1x - uy * c1y),
        y: O.y + r * (ux * c1y + uy * c1x)
    };
    const D = {
        x: O.x + r * (ux * c2x - uy * c2y),
        y: O.y + r * (ux * c2y + uy * c2x)
    };

    return { C, D };
}

function calculateFullTangentLines(B, C, D) {
    const dir1X = C.x - B.x;
    const dir1Y = C.y - B.y;
    const len1 = Math.hypot(dir1X, dir1Y);
    const unitDir1X = dir1X / len1;
    const unitDir1Y = dir1Y / len1;
    const tangent1End1 = { x: C.x + unitDir1X * lineLength, y: C.y + unitDir1Y * lineLength };
    const tangent1End2 = { x: B.x - unitDir1X * lineLength, y: B.y - unitDir1Y * lineLength };

    const dir2X = D.x - B.x;
    const dir2Y = D.y - B.y;
    const len2 = Math.hypot(dir2X, dir2Y);
    const unitDir2X = dir2X / len2;
    const unitDir2Y = dir2Y / len2;
    const tangent2End1 = { x: D.x + unitDir2X * lineLength, y: D.y + unitDir2Y * lineLength };
    const tangent2End2 = { x: B.x - unitDir2X * lineLength, y: B.y - unitDir2Y * lineLength };

    return {
        tangent1Start: tangent1End1,
        tangent1End: tangent1End2,
        tangent2Start: tangent2End1,
        tangent2End: tangent2End2
    };
}

function updateRightAngleMark(markId, O, P, B) {
    const mark = document.getElementById(markId);

    const vecPO = { x: O.x - P.x, y: O.y - P.y };
    const vecPB = { x: B.x - P.x, y: B.y - P.y };

    const rotateAngle = Math.atan2(vecPO.y, vecPO.x) * 180 / Math.PI;

    mark.setAttribute('x', P.x);
    mark.setAttribute('y', P.y);

    mark.setAttribute('transform', `rotate(${rotateAngle} ${P.x} ${P.y})`);
}

function updateLengthTextPosition(textId, B, P) {
    const text = document.getElementById(textId);
    const midX = (B.x + P.x) / 2;
    const midY = (B.y + P.y) / 2;
    const dx = P.x - B.x;
    const dy = P.y - B.y;
    const len = Math.hypot(dx, dy);
    const offsetX = -dy / len * 25;
    const offsetY = dx / len * 25;

    text.setAttribute('x', midX + offsetX);
    text.setAttribute('y', midY + offsetY);
}