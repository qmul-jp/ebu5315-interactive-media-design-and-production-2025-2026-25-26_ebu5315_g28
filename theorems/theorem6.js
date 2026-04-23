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
        breadcrumbCurrent: 'Tangents from a Point I',
        detailTitle: 'Circle Theorem 6: Tangents from a Point I',
        backBtn: 'Back to All Theorems',
        infoTitle: 'How to Explore',
        infoPoint1: 'Drag point <strong>B</strong> outside the circle.',
        infoPoint2: 'Observe how the tangent lengths change.',
        infoPoint3: 'Notice that <span class="formula">|CB| = |DB|</span> always.',
        // 数据面板
        lengthCB: 'Length |CB|',
        lengthDB: 'Length |DB|',
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
        breadcrumbCurrent: '切线长定理 I',
        detailTitle: '圆定理 6：切线长定理 I',
        backBtn: '返回全部定理',
        infoTitle: '如何探索',
        infoPoint1: '拖动圆外的点 <strong>B</strong>。',
        infoPoint2: '观察切线长度如何变化。',
        infoPoint3: '注意这个固定关系：<span class="formula">|CB| = |DB|</span>。',
        // 数据面板
        lengthCB: '长度 |CB|',
        lengthDB: '长度 |DB|',
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
    const lengthCBLabel = document.querySelector('.data-row .data-cb .data-label');
    if (lengthCBLabel) lengthCBLabel.textContent = t('lengthCB');
    const lengthDBLabel = document.querySelector('.data-row .data-db .data-label');
    if (lengthDBLabel) lengthDBLabel.textContent = t('lengthDB');

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
// 深色模式功能（使用 script.js 的实现）
// ========================================
function initTheme() {
    const themeBtn = document.getElementById('themeBtn');

    // Check if button exists
    if (!themeBtn) {
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