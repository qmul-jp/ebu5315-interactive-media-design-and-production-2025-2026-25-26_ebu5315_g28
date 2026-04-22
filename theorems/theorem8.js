/* ========================================
   Theorem 8: Alternate Segment Theorem - 专属交互逻辑
   ======================================== */

// 全局标记：防止重复初始化主题功能（与 script.js 保持一致）
window.themeInitialized = window.themeInitialized || false;

let isDragging = false;
let activePoint = null;
const svgConfig = { cx: 300, cy: 300, r: 200 };
const arcRadius = 30;
const tangentLength = 400;

// 语言切换相关变量
let currentLang = localStorage.getItem('lang') || 'en';

// 中英文文本映射 - 完整的翻译
const translations = {
    en: {
        // 页面标题
        pageTitle: 'Circle Theorem 8 | Alternate Segment Theorem',
        loadingText: 'Loading Playground...',
        logo: 'Circle Planet',

        // 导航栏
        navHome: 'Home',
        navGame: 'Game',
        navQuiz: 'Quiz',

        // 移动端菜单
        mobileHome: 'Home',
        mobileGame: 'Game',
        mobileQuiz: 'Quiz',

        // 面包屑导航
        breadcrumbHome: 'Home',
        breadcrumbGame: 'Interactive Theorems',
        breadcrumbCurrent: 'Alternate Segment Theorem',

        // 详情页头部
        backBtn: 'Back to All Theorems',
        detailTitle: 'Circle Theorem 8: Alternate Segment Theorem',

        // 信息卡片
        infoTitle: 'How to Explore',
        infoPoint1: 'Drag the tangent point <strong>A</strong> and circle points <strong>B</strong>, <strong>C</strong> freely on the circle.',
        infoPoint2: 'The tangent line will rotate automatically with point A.',
        infoPoint3: 'Observe: The angle between the tangent and chord is <strong>equal to the angle in the alternate segment</strong>.',
        infoPoint4: '<span class="formula">∠Tangent-AB = ∠ACB</span> and <span class="formula">∠Tangent-AC = ∠ABC</span> always hold true.',

        // 数据面板标签
        tangentChordA1: 'Tangent-Chord Angle (A)',
        alternateC: 'Alternate Angle (C)',
        tangentChordA2: 'Tangent-Chord Angle (A)',
        alternateB: 'Alternate Angle (B)',

        // 边栏
        sidebarTitle: 'Theorems',
        backToAll: 'All Theorems',

        // 8个定理标题
        theorem1: 'Angle at the Centre',
        theorem2: 'Angles in a Semicircle',
        theorem3: 'Angles in the Same Segment',
        theorem4: 'Cyclic Quadrilateral',
        theorem5: 'Radius to a Tangent',
        theorem6: 'Tangents from a Point I',
        theorem7: 'Tangents from a Point II',
        theorem8: 'Alternate Segment Theorem',

        // 页脚
        footerBrand: 'Circle Planet',
        footerDesc: 'Interactive Circle Theorem Learning Platform',
        footerQuickLinks: 'Quick Links',
        footerHome: 'Home',
        footerGame: 'Game',
        footerQuiz: 'Quiz',
        footerLegal: 'Legal',
        footerPrivacy: 'Privacy Policy',
        footerTerms: 'Terms of Use',
        footerCookies: 'Cookie Policy',
        footerAccessibility: 'Accessibility',
        featureColourBlind: 'Colour-blind Friendly',
        featureFont: 'Adjustable Font',
        featureDarkMode: 'Dark Mode',
        featureMobile: 'Mobile Responsive',
        featureBilingual: 'Bilingual Support',
        footerCopyright: '© 2026 Circle Planet. All rights reserved.'
    },
    zh: {
        // 页面标题
        pageTitle: '圆定理 8 | 弦切角定理',
        loadingText: '正在加载交互区...',
        logo: '圆球星球',

        // 导航栏
        navHome: '首页',
        navGame: '游戏',
        navQuiz: '测验',

        // 移动端菜单
        mobileHome: '首页',
        mobileGame: '游戏',
        mobileQuiz: '测验',

        // 面包屑导航
        breadcrumbHome: '首页',
        breadcrumbGame: '交互式定理',
        breadcrumbCurrent: '弦切角定理',

        // 详情页头部
        backBtn: '返回全部定理',
        detailTitle: '圆定理 8：弦切角定理',

        // 信息卡片
        infoTitle: '如何探索',
        infoPoint1: '拖动切点<strong>A</strong>和圆上的点<strong>B</strong>、<strong>C</strong>在圆上自由移动。',
        infoPoint2: '切线会随着点A的位置自动旋转。',
        infoPoint3: '观察：切线与弦之间的角度<strong>等于圆内对应弧所对的圆周角</strong>。',
        infoPoint4: '<span class="formula">∠切线-AB = ∠ACB</span> 且 <span class="formula">∠切线-AC = ∠ABC</span> 始终成立。',

        // 数据面板标签
        tangentChordA1: '弦切角 (A)',
        alternateC: '圆周角 (C)',
        tangentChordA2: '弦切角 (A)',
        alternateB: '圆周角 (B)',

        // 边栏
        sidebarTitle: '定理列表',
        backToAll: '全部定理',

        // 8个定理标题
        theorem1: '圆心角',
        theorem2: '半圆上的角',
        theorem3: '同弧所对的角',
        theorem4: '圆内接四边形',
        theorem5: '切线的性质',
        theorem6: '切线长定理 I',
        theorem7: '切线长定理 II',
        theorem8: '弦切角定理',

        // 页脚
        footerBrand: '圆球星球',
        footerDesc: '交互式圆定理学习平台',
        footerQuickLinks: '快速链接',
        footerHome: '首页',
        footerGame: '游戏',
        footerQuiz: '测验',
        footerLegal: '法律信息',
        footerPrivacy: '隐私政策',
        footerTerms: '使用条款',
        footerCookies: 'Cookie政策',
        footerAccessibility: '无障碍功能',
        featureColourBlind: '色盲友好',
        featureFont: '可调节字体',
        featureDarkMode: '深色模式',
        featureMobile: '响应式设计',
        featureBilingual: '双语支持',
        footerCopyright: '© 2026 圆球星球 版权所有'
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
        langText.textContent = currentLang === 'en' ? '中' : 'EN';
    }
}

// ========================================
// 完整的翻译应用函数
// ========================================
function applyTranslations() {
    // 1. 翻译页面标题
    const pageTitle = document.querySelector('title[data-i18n]');
    if (pageTitle) {
        pageTitle.textContent = t('pageTitle');
    }

    // 2. 翻译所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key] !== undefined) {
            // 检查是否包含HTML标签
            if (translations[currentLang][key].includes('<') && translations[currentLang][key].includes('>')) {
                element.innerHTML = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });

    // 3. 翻译面包屑链接（需要特殊处理，因为有图标）
    const breadcrumbHome = document.querySelector('.breadcrumb a:first-child span[data-i18n]');
    if (breadcrumbHome) {
        breadcrumbHome.textContent = t('breadcrumbHome');
    }

    // 4. 翻译返回按钮（需要保留图标）
    const backBtn = document.querySelector('.detail-header .btn span[data-i18n]');
    if (backBtn) {
        backBtn.textContent = t('backBtn');
    }

    // 5. 翻译边栏底部按钮（需要保留图标）
    const sidebarBackBtn = document.querySelector('.sidebar-back-btn span[data-i18n]');
    if (sidebarBackBtn) {
        sidebarBackBtn.textContent = t('backToAll');
    }
}

// ========================================
// 深色模式功能
// ========================================
function initTheme() {
    const themeBtn = document.getElementById('themeBtn');

    // Check if button exists
    if (!themeBtn) {
        console.error('Theme button not found!');
        return;
    }

    // 防止重复初始化：如果已经初始化过，直接同步图标状态并返回
    if (window.themeInitialized) {
        updateThemeIcon();
        return;
    }

    // 标记为已初始化
    window.themeInitialized = true;

    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');

    // Initialize theme based on saved preference or system setting
    function applyTheme(isDark) {
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
        updateThemeIcon(isDark);
    }

    // Apply saved theme or check system preference
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else if (savedTheme === 'light') {
        applyTheme(false);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark);
    }

    // Toggle theme on click
    themeBtn.addEventListener('click', () => {
        const hasDarkTheme = document.body.hasAttribute('data-theme');
        const newIsDark = !hasDarkTheme;

        applyTheme(newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');

        console.log('Theme toggled to:', newIsDark ? 'dark' : 'light');
    });

    // Update button icon
    function updateThemeIcon(isDark) {
        if (themeBtn) {
            const themeIsDark = isDark !== undefined ? isDark : document.body.hasAttribute('data-theme');
            themeBtn.innerHTML = themeIsDark
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
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
