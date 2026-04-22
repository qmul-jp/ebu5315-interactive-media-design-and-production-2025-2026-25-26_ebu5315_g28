/* ========================================
   Theorem 5: Radius to a Tangent - 专属交互逻辑
   ======================================== */

let isDragging = false;
let activePoint = null;
const svgConfig = { cx: 300, cy: 300, r: 200 };
const tangentLength = 400;
const rightAngleSize = 25;

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
        breadcrumbCurrent: 'Radius to a Tangent',
        detailTitle: 'Circle Theorem 5: Radius to a Tangent',
        backBtn: 'Back to All Theorems',
        infoTitle: 'How to Explore',
        infoPoint1: 'Drag the tangent point <strong>P</strong> around the circle.',
        infoPoint2: 'The tangent line will rotate with point P automatically.',
        infoPoint3: 'Observe: The radius is <strong>always perpendicular</strong> to the tangent at the point of contact.',
        // 数据面板
        angleLabel: 'Angle between Radius and Tangent',
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
        breadcrumbCurrent: '切线的性质',
        detailTitle: '圆定理 5：切线的性质',
        backBtn: '返回全部定理',
        infoTitle: '如何探索',
        infoPoint1: '拖动圆上的切点 <strong>P</strong> 在圆上移动。',
        infoPoint2: '切线会随点 P 自动旋转。',
        infoPoint3: '观察：半径在切点处<strong>始终垂直</strong>于切线。',
        // 数据面板
        angleLabel: '半径与切线的夹角',
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
    initTheorem5();
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

    const breadcrumbCurrent = document.querySelector('.breadcrumb-current[data-i18n="breadcrumbCurrent"]');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = t('breadcrumbCurrent');

    // 更新详情页标题
    const detailTitle = document.querySelector('.detail-title[data-i18n="detailTitle"]');
    if (detailTitle) detailTitle.textContent = t('detailTitle');

    // 更新返回按钮
    const backBtn = document.querySelector('.detail-header .btn[data-i18n="backBtn"]');
    if (backBtn) backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> ' + t('backBtn');

    // 更新说明区标题
    const infoTitle = document.querySelector('.info-card h3[data-i18n="infoTitle"]');
    if (infoTitle) infoTitle.innerHTML = '<i class="fas fa-lightbulb"></i> ' + t('infoTitle');

    // 更新说明区列表项
    const infoPoints = document.querySelectorAll('.info-point');
    const pointKeys = ['infoPoint1', 'infoPoint2', 'infoPoint3'];
    infoPoints.forEach((point, index) => {
        if (pointKeys[index]) point.innerHTML = t(pointKeys[index]);
    });

    // 更新数据面板标签
    const angleLabel = document.querySelector('.data-card .data-label[data-i18n="angleLabel"]');
    if (angleLabel) angleLabel.textContent = t('angleLabel');

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
    const footerBrand = document.querySelector('.footer-brand[data-i18n="footerBrand"]');
    if (footerBrand) footerBrand.textContent = t('footerBrand');

    const footerDesc = document.querySelector('.footer-desc[data-i18n="footerDesc"]');
    if (footerDesc) footerDesc.textContent = t('footerDesc');

    const footerQuickLinks = document.querySelector('.footer-title[data-i18n="footerQuickLinks"]');
    if (footerQuickLinks) footerQuickLinks.textContent = t('footerQuickLinks');

    const footerHome = document.querySelectorAll('.footer-link[data-i18n="footerHome"]');
    footerHome.forEach(el => el.textContent = t('footerHome'));

    const footerGame = document.querySelectorAll('.footer-link[data-i18n="footerGame"]');
    footerGame.forEach(el => el.textContent = t('footerGame'));

    const footerQuiz = document.querySelectorAll('.footer-link[data-i18n="footerQuiz"]');
    footerQuiz.forEach(el => el.textContent = t('footerQuiz'));

    const footerLegal = document.querySelector('.footer-title[data-i18n="footerLegal"]');
    if (footerLegal) footerLegal.textContent = t('footerLegal');

    const footerPrivacy = document.querySelectorAll('.footer-link[data-i18n="footerPrivacy"]');
    footerPrivacy.forEach(el => el.textContent = t('footerPrivacy'));

    const footerTerms = document.querySelectorAll('.footer-link[data-i18n="footerTerms"]');
    footerTerms.forEach(el => el.textContent = t('footerTerms'));

    const footerCookies = document.querySelectorAll('.footer-link[data-i18n="footerCookies"]');
    footerCookies.forEach(el => el.textContent = t('footerCookies'));

    const footerAccessibility = document.querySelector('.footer-title[data-i18n="footerAccessibility"]');
    if (footerAccessibility) footerAccessibility.textContent = t('footerAccessibility');

    const footerColourBlind = document.querySelectorAll('.feature-item[data-i18n="footerColourBlind"]');
    footerColourBlind.forEach(el => el.textContent = t('footerColourBlind'));

    const footerFont = document.querySelectorAll('.feature-item[data-i18n="footerFont"]');
    footerFont.forEach(el => el.textContent = t('footerFont'));

    const footerDarkMode = document.querySelectorAll('.feature-item[data-i18n="footerDarkMode"]');
    footerDarkMode.forEach(el => el.textContent = t('footerDarkMode'));

    const footerCopyright = document.querySelector('.footer-copyright[data-i18n="footerCopyright"]');
    if (footerCopyright) footerCopyright.textContent = t('footerCopyright');

    const featureColourBlind = document.querySelectorAll('[data-i18n="featureColourBlind"]');
    featureColourBlind.forEach(el => el.textContent = t('featureColourBlind'));

    const featureMobile = document.querySelectorAll('[data-i18n="featureMobile"]');
    featureMobile.forEach(el => el.textContent = t('featureMobile'));

    const featureBilingual = document.querySelectorAll('[data-i18n="featureBilingual"]');
    featureBilingual.forEach(el => el.textContent = t('featureBilingual'));

    const featureDarkMode = document.querySelectorAll('[data-i18n="featureDarkMode"]');
    featureDarkMode.forEach(el => el.textContent = t('featureDarkMode'));
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
function initTheorem5() {
    const svg = document.getElementById('theoremSvg');
    const pointP = document.getElementById('pointP');

    pointP.addEventListener('mousedown', (e) => { e.preventDefault(); isDragging = true; activePoint = 'P'; });
    pointP.addEventListener('touchstart', (e) => { e.preventDefault(); isDragging = true; activePoint = 'P'; });

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', dragTouch, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    forcePointOnCircle('P');
    updateTheorem5();
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
    let offsetX = 20, offsetY = 20;

    if (Math.abs(dx) > Math.abs(dy)) {
        offsetX = dx > 0 ? 20 : -35;
        offsetY = 5;
    } else {
        offsetY = dy > 0 ? 25 : -15;
        offsetX = 5;
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

    updateTheorem5();
}

function updateTheorem5() {
    const O = { x: svgConfig.cx, y: svgConfig.cy };
    const P = getPointCoords('pointP');

    updateLine('radiusLine', O, P);

    const dx = P.x - O.x;
    const dy = P.y - O.y;
    const len = Math.hypot(dx, dy);

    const unitRadiusToO = { x: -dx / len, y: -dy / len };
    const unitTangent = { x: -dy / len, y: dx / len };

    const tangentStart = {
        x: P.x + unitTangent.x * tangentLength,
        y: P.y + unitTangent.y * tangentLength
    };
    const tangentEnd = {
        x: P.x - unitTangent.x * tangentLength,
        y: P.y - unitTangent.y * tangentLength
    };
    updateLine('tangentLine', tangentStart, tangentEnd);

    updateRightAngleMark(P, dx, dy, len);
    updateAngleTextPosition(P, unitRadiusToO, unitTangent);
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

function updateRightAngleMark(P, dx, dy, len) {
    const mark = document.getElementById('rightAngleMark');
    const rotateAngle = Math.atan2(dy, dx) * 180 / Math.PI;

    mark.setAttribute('x', P.x - rightAngleSize);
    mark.setAttribute('y', P.y - rightAngleSize);
    mark.setAttribute('transform', `rotate(${rotateAngle} ${P.x} ${P.y})`);
}

function updateAngleTextPosition(P, unitRadiusToO, unitTangent) {
    const text = document.getElementById('angleText');
    const bisectorX = unitRadiusToO.x + unitTangent.x;
    const bisectorY = unitRadiusToO.y + unitTangent.y;
    const textOffset = 35;
    text.setAttribute('x', P.x + bisectorX * textOffset);
    text.setAttribute('y', P.y + bisectorY * textOffset);
    document.getElementById('angleValue').textContent = '90°';
}