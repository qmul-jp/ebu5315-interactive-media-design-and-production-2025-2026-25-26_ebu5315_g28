/* ========================================
   Game 主页面逻辑
   包括：卡片点击跳转 + 语言切换 + 深色模式 + 字体大小
   ======================================== */

// 语言切换相关变量
let currentLang = localStorage.getItem('lang') || 'en';

// 中英文文本映射
const translations = {
    en: {
        breadcrumbHome: 'Home',
        breadcrumbCurrent: 'Interactive Theorems',
        heroBadge: 'Drag & Explore',
        heroTitle1: 'Explore 8 Core',
        heroTitle2: 'Circle Theorems',
        heroSubtitle: 'Click any theorem card below to enter the interactive playground. Drag points on the circle to observe real-time angle relationships!',
        cardBtn: 'Enter Playground',
        theorem1: 'Circle Theorem 1',
        theorem2: 'Circle Theorem 2',
        theorem3: 'Circle Theorem 3',
        theorem4: 'Circle Theorem 4',
        theorem5: 'Circle Theorem 5',
        theorem6: 'Circle Theorem 6',
        theorem7: 'Circle Theorem 7',
        theorem8: 'Circle Theorem 8',
        footerTitle: 'Circle Planet',
        footerDesc: 'Interactive Circle Theorem Learning Platform',
        footerLinks: 'Quick Links',
        footerLegal: 'Legal',
        footerAccessibility: 'Accessibility',
        footerHome: 'Home',
        footerGame: 'Game',
        footerQuiz: 'Quiz',
        featureColorBlind: 'Colour-blind Friendly',
        featureMobile: 'Mobile Responsive',
        featureBilingual: 'Bilingual Support',
        featureDarkMode: 'Dark Mode'
    },
    zh: {
        breadcrumbHome: '主页',
        breadcrumbCurrent: '互动定理',
        heroBadge: '拖拽探索',
        heroTitle1: '探索8个核心',
        heroTitle2: '圆定理',
        heroSubtitle: '点击下方任意定理卡片进入互动演示场。拖动圆上的点来观察实时角度关系！',
        cardBtn: '进入演示场',
        theorem1: '圆定理 1',
        theorem2: '圆定理 2',
        theorem3: '圆定理 3',
        theorem4: '圆定理 4',
        theorem5: '圆定理 5',
        theorem6: '圆定理 6',
        theorem7: '圆定理 7',
        theorem8: '圆定理 8',
        footerTitle: '圆星球',
        footerDesc: '互动圆定理学系平台',
        footerLinks: '快速链接',
        footerLegal: '法律信息',
        footerAccessibility: '无障碍功能',
        footerHome: '主页',
        footerGame: '游戏',
        footerQuiz: '测验',
        featureColorBlind: '色盲友好',
        featureMobile: '移动端适配',
        featureBilingual: '双语支持',
        featureDarkMode: '深色模式'
    }
};

// 获取翻译文本
function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initLangBtn();         // 语言切换
    initTheme();          // 深色模式
    initFontSize();       // 字体大小
    initMobileMenu();     // 移动端菜单
    initBackToTop();      // 返回顶部
    initCardNavigation(); // 卡片点击跳转

    // 应用初始语言
    applyTranslations();
});

// ========================================
// 语言切换功能
// ========================================
function initLangBtn() {
    const langBtn = document.getElementById('langBtn');
    currentLang = localStorage.getItem('lang') || 'en';
    updateLangButton();

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
    // 面包屑导航
    const breadcrumbHome = document.querySelector('.breadcrumb a');
    const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
    if (breadcrumbHome) breadcrumbHome.innerHTML = '<i class="fas fa-home"></i> ' + t('breadcrumbHome');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = t('breadcrumbCurrent');

    // Hero 区域
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.innerHTML = '<i class="fas fa-hand-pointer"></i> ' + t('heroBadge');

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = t('heroTitle1') + '<br><span class="gradient-text">' + t('heroTitle2') + '</span>';
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = t('heroSubtitle');

    // 导航链接 - 使用下划线样式，与 Homepage 一致（不使用圆圈图标）
    const navLinks = document.querySelectorAll('.nav-link');
    const navTexts = currentLang === 'en' ? ['Home', 'Game', 'Quiz'] : ['主页', '游戏', '测验'];
    navLinks.forEach((link, index) => {
        link.textContent = navTexts[index];
    });

    // 移动端菜单
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileNavTexts = currentLang === 'en' ? ['Home', 'Game', 'Quiz'] : ['主页', '游戏', '测验'];
    mobileNavLinks.forEach((link, index) => {
        link.innerHTML = '<i class="fas fa-chevron-right"></i> ' + mobileNavTexts[index];
    });

    // 定理卡片
    const cards = document.querySelectorAll('.theorem-card');
    const theoremKeys = ['theorem1', 'theorem2', 'theorem3', 'theorem4', 'theorem5', 'theorem6', 'theorem7', 'theorem8'];
    const subtitles = currentLang === 'en'
        ? ['Angle at the Centre', 'Angles in a Semicircle', 'Angles in the Same Segment', 'Cyclic Quadrilateral',
           'Radius to a Tangent', 'Tangents from a Point I', 'Tangents from a Point II', 'Alternate Segment Theorem']
        : ['圆心角', '半圆上的角', '同弧所对的角', '圆内接四边形',
           '切线的性质', '切线长定理 I', '切线长定理 II', '弦切角定理'];
    const descs = currentLang === 'en'
        ? [
            'The angle subtended at the centre is twice the angle at the circumference.',
            'The angle subtended by a diameter at the circumference is always 90°.',
            'Angles subtended by the same chord in the same segment are equal.',
            'Opposite angles of a cyclic quadrilateral sum to 180°.',
            'A radius is perpendicular to the tangent at the point of contact.',
            'Tangents drawn from the same external point to a circle are equal in length.',
            'The line from the external point to the centre bisects the angle between the tangents.',
            'The angle between tangent and chord is equal to the angle in the alternate segment.'
        ]
        : [
            '圆心角是圆周角的两倍。',
            '直径所对的圆周角永远是90°。',
            '同弧所对的圆周角相等。',
            '圆内接四边形的对角之和等于180°。',
            '半径垂直于切线。',
            '从同一点到圆的切线长度相等。',
            '从圆外点到圆心的连线平分两条切线的夹角。',
            '弦切角等于该弦所对的圆周角。'
        ];

    cards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const subtitle = card.querySelector('.theorem-subtitle');
        const desc = card.querySelector('.theorem-desc');
        const btn = card.querySelector('.card-btn');

        if (title) title.textContent = t(theoremKeys[index]);
        if (subtitle) subtitle.textContent = subtitles[index];
        if (desc) desc.textContent = descs[index];
        if (btn) btn.innerHTML = t('cardBtn') + ' <i class="fas fa-arrow-right"></i>';
    });

    // 页脚
    const footerTitle = document.querySelector('.footer-section h4');
    const footerDesc = document.querySelector('.footer-section p');
    const featureTags = document.querySelectorAll('.feature-tag');

    if (footerTitle) footerTitle.textContent = t('footerTitle');
    if (footerDesc) footerDesc.textContent = t('footerDesc');

    const featureTexts = [
        currentLang === 'en' ? 'Colour-blind Friendly' : '色盲友好',
        currentLang === 'en' ? 'Mobile Responsive' : '移动端适配',
        currentLang === 'en' ? 'Bilingual Support' : '双语支持',
        currentLang === 'en' ? 'Dark Mode' : '深色模式'
    ];
    featureTags.forEach((tag, index) => {
        tag.textContent = featureTexts[index];
    });

    // 版权年份
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        footerBottom.textContent = currentLang === 'en'
            ? '© 2026 Circle Planet. All rights reserved.'
            : '© 2026 圆星球 版权所有';
    }
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

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.toggleAttribute('data-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
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

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
        menuBtn.innerHTML = mobileMenu.classList.contains('show')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ========================================
// 返回顶部按钮
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

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

// ========================================
// 卡片点击跳转
// ========================================
function initCardNavigation() {
    const cards = document.querySelectorAll('.theorem-card');

    cards.forEach(card => {
        const href = card.getAttribute('data-href');
        if (href) {
            card.addEventListener('click', () => {
                window.location.href = href;
            });
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = href;
                }
            });
        }
    });
}