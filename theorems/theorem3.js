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
        // 导航栏
        logo: 'Circle Planet',
        navHome: 'Home',
        navGame: 'Game',
        navQuiz: 'Quiz',
        mobileHome: 'Home',
        mobileGame: 'Game',
        mobileQuiz: 'Quiz',
        breadcrumbHome: 'Home',
        breadcrumbGame: 'Interactive Theorems',
        // 主内容区
        breadcrumbCurrent: 'Angles in the Same Segment',
        detailTitle: 'Circle Theorem 3: Angles in the Same Segment',
        backBtn: 'Back to All Theorems',
        infoTitle: 'How to Explore',
        infoPoint1: 'Drag points <strong>A</strong> and <strong>B</strong> to change the segment.',
        infoPoint2: 'Drag points <strong>C</strong> and <strong>D</strong> to different positions on the same arc.',
        infoPoint3: 'Observe that <span class="formula">∠ACB = ∠ADB</span> always.',
        // 数据面板
        angleLabelC: 'Angle ∠ACB',
        angleLabelD: 'Angle ∠ADB',
        // 边栏
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
        footerColourBlind: 'Colour-blind Friendly',
        footerFont: 'Adjustable Font',
        footerDarkMode: 'Dark Mode',
        footerCopyright: '© 2026 Circle Planet. All rights reserved.',
        featureColourBlind: 'Colour-blind Friendly',
        featureMobile: 'Mobile Responsive',
        featureBilingual: 'Bilingual Support',
        featureDarkMode: 'Dark Mode'
    },
    zh: {
        // 导航栏
        logo: 'Circle Planet',
        navHome: '首页',
        navGame: '游戏',
        navQuiz: '测验',
        mobileHome: '首页',
        mobileGame: '游戏',
        mobileQuiz: '测验',
        breadcrumbHome: '首页',
        breadcrumbGame: '交互定理',
        // 主内容区
        breadcrumbCurrent: '同弧所对的角',
        detailTitle: '圆定理 3：同弧所对的角',
        backBtn: '返回全部定理',
        infoTitle: '如何探索',
        infoPoint1: '拖动点 <strong>A</strong> 和 <strong>B</strong> 改变弧段。',
        infoPoint2: '拖动点 <strong>C</strong> 和 <strong>D</strong> 到同一弧段的不同位置。',
        infoPoint3: '观察这个固定关系：<span class="formula">∠ACB = ∠ADB</span>',
        // 数据面板
        angleLabelC: '角度 ∠ACB',
        angleLabelD: '角度 ∠ADB',
        // 边栏
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
        // 页脚
        footerBrand: 'Circle Planet',
        footerDesc: '交互式圆定理学习平台',
        footerQuickLinks: '快速链接',
        footerHome: '首页',
        footerGame: '游戏',
        footerQuiz: '测验',
        footerLegal: '法律信息',
        footerPrivacy: '隐私政策',
        footerTerms: '使用条款',
        footerCookies: 'Cookie 政策',
        footerAccessibility: '无障碍功能',
        footerColourBlind: '色盲友好',
        footerFont: '可调节字体',
        footerDarkMode: '深色模式',
        footerCopyright: '© 2026 圆星球 版权所有 ',
        featureColourBlind: '色盲友好',
        featureMobile: '移动端适配',
        featureBilingual: '双语支持',
        featureDarkMode: '深色模式'
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
        langText.textContent = currentLang === 'en' ? '中' : 'EN';
    }
}

function applyTranslations() {
    // 更新导航栏
    const logo = document.querySelector('.logo-text[data-i18n="logo"]');
    if (logo) logo.textContent = t('logo');

    const navHome = document.querySelector('.nav-link[data-i18n="navHome"]');
    if (navHome) navHome.textContent = t('navHome');

    const navGame = document.querySelector('.nav-link[data-i18n="navGame"]');
    if (navGame) navGame.textContent = t('navGame');

    const navQuiz = document.querySelector('.nav-link[data-i18n="navQuiz"]');
    if (navQuiz) navQuiz.textContent = t('navQuiz');

    // 更新移动端菜单
    const mobileHome = document.querySelector('.mobile-nav-link[data-i18n="mobileHome"]');
    if (mobileHome) mobileHome.textContent = t('mobileHome');

    const mobileGame = document.querySelector('.mobile-nav-link[data-i18n="mobileGame"]');
    if (mobileGame) mobileGame.textContent = t('mobileGame');

    const mobileQuiz = document.querySelector('.mobile-nav-link[data-i18n="mobileQuiz"]');
    if (mobileQuiz) mobileQuiz.textContent = t('mobileQuiz');

    // 更新面包屑导航
    const breadcrumbHome = document.querySelector('[data-i18n="breadcrumbHome"]');
    if (breadcrumbHome) breadcrumbHome.textContent = t('breadcrumbHome');

    const breadcrumbGame = document.querySelector('[data-i18n="breadcrumbGame"]');
    if (breadcrumbGame) breadcrumbGame.textContent = t('breadcrumbGame');

    const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = t('breadcrumbCurrent');

    // 更新详情页标题
    const detailTitle = document.querySelector('.detail-title');
    if (detailTitle) detailTitle.textContent = t('detailTitle');

    // 更新返回按钮
    const backBtn = document.querySelector('.detail-header .btn');
    if (backBtn) backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> ' + t('backBtn');

    // 更新说明区标题
    const infoTitle = document.querySelector('.info-card h3');
    if (infoTitle) infoTitle.innerHTML = '<i class="fas fa-lightbulb"></i> ' + t('infoTitle');

    // 更新说明区列表项
    const infoPoints = document.querySelectorAll('.info-card li');
    const pointKeys = ['infoPoint1', 'infoPoint2', 'infoPoint3'];
    infoPoints.forEach((point, index) => {
        if (pointKeys[index]) point.innerHTML = t(pointKeys[index]);
    });

    // 更新数据面板标签
    const angleLabelC = document.querySelector('.data-c .data-label');
    const angleLabelD = document.querySelector('.data-d .data-label');
    if (angleLabelC) angleLabelC.textContent = t('angleLabelC');
    if (angleLabelD) angleLabelD.textContent = t('angleLabelD');

    // 更新边栏标题
    const sidebarTitle = document.querySelector('.sidebar-header h3 span');
    if (sidebarTitle) sidebarTitle.textContent = t('sidebarTitle');

    // 更新边栏返回按钮
    const sidebarBackBtn = document.querySelector('.sidebar-back-btn');
    if (sidebarBackBtn) sidebarBackBtn.innerHTML = '<i class="fas fa-th"></i> ' + t('backToAll');

    // 更新定理导航标题
    const theoremTitles = document.querySelectorAll('.theorem-nav-title');
    const titleKeys = ['theorem1', 'theorem2', 'theorem3', 'theorem4', 'theorem5', 'theorem6', 'theorem7', 'theorem8'];
    theoremTitles.forEach((title, index) => {
        if (titleKeys[index]) {
            title.textContent = t(titleKeys[index]);
        }
    });

    // 更新页脚
    const footerBrand = document.querySelector('[data-i18n="footerBrand"]');
    if (footerBrand) footerBrand.textContent = t('footerBrand');

    const footerDesc = document.querySelector('[data-i18n="footerDesc"]');
    if (footerDesc) footerDesc.textContent = t('footerDesc');

    const footerQuickLinks = document.querySelector('[data-i18n="footerQuickLinks"]');
    if (footerQuickLinks) footerQuickLinks.textContent = t('footerQuickLinks');

    const footerHome = document.querySelector('[data-i18n="footerHome"]');
    if (footerHome) footerHome.textContent = t('footerHome');

    const footerGame = document.querySelector('[data-i18n="footerGame"]');
    if (footerGame) footerGame.textContent = t('footerGame');

    const footerQuiz = document.querySelector('[data-i18n="footerQuiz"]');
    if (footerQuiz) footerQuiz.textContent = t('footerQuiz');

    const footerLegal = document.querySelector('[data-i18n="footerLegal"]');
    if (footerLegal) footerLegal.textContent = t('footerLegal');

    const footerPrivacy = document.querySelector('[data-i18n="footerPrivacy"]');
    if (footerPrivacy) footerPrivacy.textContent = t('footerPrivacy');

    const footerTerms = document.querySelector('[data-i18n="footerTerms"]');
    if (footerTerms) footerTerms.textContent = t('footerTerms');

    const footerCookies = document.querySelector('[data-i18n="footerCookies"]');
    if (footerCookies) footerCookies.textContent = t('footerCookies');

    const footerAccessibility = document.querySelector('[data-i18n="footerAccessibility"]');
    if (footerAccessibility) footerAccessibility.textContent = t('footerAccessibility');

    const footerColourBlind = document.querySelector('[data-i18n="footerColourBlind"]');
    if (footerColourBlind) footerColourBlind.textContent = t('footerColourBlind');

    const footerFont = document.querySelector('[data-i18n="footerFont"]');
    if (footerFont) footerFont.textContent = t('footerFont');

    const footerDarkMode = document.querySelector('[data-i18n="footerDarkMode"]');
    if (footerDarkMode) footerDarkMode.textContent = t('footerDarkMode');

    const footerCopyright = document.querySelector('[data-i18n="footerCopyright"]');
    if (footerCopyright) footerCopyright.textContent = t('footerCopyright');

    const featureColourBlind = document.querySelector('[data-i18n="featureColourBlind"]');
    if (featureColourBlind) featureColourBlind.textContent = t('featureColourBlind');

    const featureMobile = document.querySelector('[data-i18n="featureMobile"]');
    if (featureMobile) featureMobile.textContent = t('featureMobile');

    const featureBilingual = document.querySelector('[data-i18n="featureBilingual"]');
    if (featureBilingual) featureBilingual.textContent = t('featureBilingual');

    const featureDarkMode = document.querySelector('[data-i18n="featureDarkMode"]');
    if (featureDarkMode) featureDarkMode.textContent = t('featureDarkMode');
}

// ========================================
// 深色模式功能
// ========================================

// 全局标记：防止重复初始化主题功能
window.themeInitialized = window.themeInitialized || false;

function initTheme() {
    // 防止重复初始化：如果已经初始化过，直接同步图标状态并返回
    if (window.themeInitialized) {
        updateThemeIcon();
        return;
    }

    // 标记为已初始化
    window.themeInitialized = true;

    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon();

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.hasAttribute('data-theme');
            if (isDark) {
                document.body.removeAttribute('data-theme');
            } else {
                document.body.setAttribute('data-theme', 'dark');
            }
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
            updateThemeIcon();
        });
    }
}

// 更新主题图标
function updateThemeIcon() {
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        const isDark = document.body.hasAttribute('data-theme');
        themeBtn.innerHTML = isDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
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