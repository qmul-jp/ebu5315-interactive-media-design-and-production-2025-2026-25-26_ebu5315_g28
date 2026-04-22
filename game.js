/* ========================================
   Game 主页面逻辑
   包括：卡片点击跳转 + 语言切换 + 深色模式 + 字体大小
   ======================================== */

// 语言切换相关变量
let currentLang = localStorage.getItem('lang') || 'en';

// 中英文文本映射 - 完整版
const translations = {
    en: {
        // 页面标题和加载
        pageTitle: 'Circle Planet | Interactive Theorems',
        loadingText: 'Loading Theorems...',
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
        breadcrumbCurrent: 'Interactive Theorems',

        // Hero 区域
        heroBadge: 'Drag & Explore',
        heroTitle1: 'Explore 8 Core',
        heroTitle2: 'Circle Theorems',
        heroSubtitle: 'Click any theorem card below to enter the interactive playground. Drag points on the circle to observe real-time angle relationships!',

        // 按钮文本
        cardBtn: 'Enter Playground',

        // 8个定理卡片标题
        theorem1Title: 'Circle Theorem 1',
        theorem2Title: 'Circle Theorem 2',
        theorem3Title: 'Circle Theorem 3',
        theorem4Title: 'Circle Theorem 4',
        theorem5Title: 'Circle Theorem 5',
        theorem6Title: 'Circle Theorem 6',
        theorem7Title: 'Circle Theorem 7',
        theorem8Title: 'Circle Theorem 8',

        // 8个定理副标题
        theorem1Sub: 'Angle at the Centre',
        theorem2Sub: 'Angles in a Semicircle',
        theorem3Sub: 'Angles in the Same Segment',
        theorem4Sub: 'Cyclic Quadrilateral',
        theorem5Sub: 'Radius to a Tangent',
        theorem6Sub: 'Tangents from a Point I',
        theorem7Sub: 'Tangents from a Point II',
        theorem8Sub: 'Alternate Segment Theorem',

        // 8个定理描述
        theorem1Desc: 'The angle subtended at the centre is twice the angle at the circumference.',
        theorem2Desc: 'The angle subtended by a diameter at the circumference is always 90°.',
        theorem3Desc: 'Angles subtended by the same chord in the same segment are equal.',
        theorem4Desc: 'Opposite angles of a cyclic quadrilateral sum to 180°.',
        theorem5Desc: 'A radius is perpendicular to the tangent at the point of contact.',
        theorem6Desc: 'Tangents drawn from the same external point to a circle are equal in length.',
        theorem7Desc: 'The line from the external point to the centre bisects the angle between the tangents.',
        theorem8Desc: 'The angle between tangent and chord is equal to the angle in the alternate segment.',

        // 页脚
        footerBrand: 'Circle Planet',
        footerDesc: 'Interactive Circle Theorem Learning Platform',
        footerLinks: 'Quick Links',
        footerLegal: 'Legal',
        footerAccessibility: 'Accessibility',
        footerHome: 'Home',
        footerGame: 'Game',
        footerQuiz: 'Quiz',
        footerPrivacy: 'Privacy Policy',
        footerTerms: 'Terms of Use',
        footerCookies: 'Cookie Policy',
        footerCopyright: '© 2026 Circle Planet. All rights reserved.',

        // 功能特性标签
        featureColourBlind: 'Colour-blind Friendly',
        featureFont: 'Adjustable Font',
        featureDarkMode: 'Dark Mode',
        featureDarkMode2: 'Dark Mode',
        featureMobile: 'Mobile Responsive',
        featureBilingual: 'Bilingual Support'
    },
    zh: {
        // 页面标题和加载
        pageTitle: '圆星球 | 交互式定理',
        loadingText: '正在加载定理...',
        logo: '圆星球',

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
        breadcrumbCurrent: '交互式定理',

        // Hero 区域
        heroBadge: '拖拽探索',
        heroTitle1: '探索8个核心',
        heroTitle2: '圆定理',
        heroSubtitle: '点击下方任意定理卡片进入互动演示场。拖动圆上的点来观察实时角度关系！',

        // 按钮文本
        cardBtn: '进入演示场',

        // 8个定理卡片标题
        theorem1Title: '圆定理 1',
        theorem2Title: '圆定理 2',
        theorem3Title: '圆定理 3',
        theorem4Title: '圆定理 4',
        theorem5Title: '圆定理 5',
        theorem6Title: '圆定理 6',
        theorem7Title: '圆定理 7',
        theorem8Title: '圆定理 8',

        // 8个定理副标题
        theorem1Sub: '圆心角',
        theorem2Sub: '半圆上的角',
        theorem3Sub: '同弧所对的角',
        theorem4Sub: '圆内接四边形',
        theorem5Sub: '切线的性质',
        theorem6Sub: '切线长定理 I',
        theorem7Sub: '切线长定理 II',
        theorem8Sub: '弦切角定理',

        // 8个定理描述
        theorem1Desc: '圆心角是圆周角的两倍。',
        theorem2Desc: '直径所对的圆周角永远是90°。',
        theorem3Desc: '同弧所对的圆周角相等。',
        theorem4Desc: '圆内接四边形的对角之和等于180°。',
        theorem5Desc: '半径垂直于切线。',
        theorem6Desc: '从同一点到圆的切线长度相等。',
        theorem7Desc: '从圆外点到圆心的连线平分两条切线的夹角。',
        theorem8Desc: '弦切角等于该弦所对的圆周角。',

        // 页脚
        footerBrand: '圆星球',
        footerDesc: '交互式圆定理学习平台',
        footerLinks: '快速链接',
        footerLegal: '法律信息',
        footerAccessibility: '无障碍功能',
        footerHome: '首页',
        footerGame: '游戏',
        footerQuiz: '测验',
        footerPrivacy: '隐私政策',
        footerTerms: '使用条款',
        footerCookies: 'Cookie政策',
        footerCopyright: '© 2026 圆星球 版权所有',

        // 功能特性标签
        featureColourBlind: '色盲友好',
        featureFont: '可调节字体',
        featureDarkMode: '深色模式',
        featureDarkMode2: '深色模式',
        featureMobile: '移动端适配',
        featureBilingual: '双语支持'
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
    initMusicControl();   // 背景音乐控制

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
    const langText = langBtn ? langBtn.querySelector('span') : null;
    if (langText) {
        // 显示目标语言（切换后将变成的语言）
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
            // 如果元素包含子元素（如按钮内的图标），保留子元素
            if (element.children.length > 0) {
                // 保留图标等子元素，只翻译文本节点
                const textNodes = [];
                element.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        textNodes.push(node);
                    }
                });
                if (textNodes.length > 0) {
                    textNodes[0].textContent = ' ' + t(key);
                } else {
                    element.textContent = t(key);
                }
            } else {
                element.textContent = t(key);
            }
        }
    });

    // 3. 翻译 Hero 区域（特殊处理）
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge && !heroBadge.hasAttribute('data-i18n')) {
        heroBadge.innerHTML = '<i class="fas fa-hand-pointer"></i> ' + t('heroBadge');
    }

    const heroTitle1 = document.querySelector('[data-i18n="heroTitle1"]');
    const heroTitle2 = document.querySelector('[data-i18n="heroTitle2"]');
    if (heroTitle1) heroTitle1.textContent = t('heroTitle1');
    if (heroTitle2) heroTitle2.textContent = t('heroTitle2');

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = t('heroSubtitle');

    // 4. 翻译导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    const navKeys = ['navHome', 'navGame', 'navQuiz'];
    navLinks.forEach((link, index) => {
        if (navKeys[index] && !link.hasAttribute('data-i18n')) {
            link.textContent = t(navKeys[index]);
        }
    });

    // 5. 翻译移动端菜单
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileNavKeys = ['mobileHome', 'mobileGame', 'mobileQuiz'];
    mobileNavLinks.forEach((link, index) => {
        if (mobileNavKeys[index] && !link.hasAttribute('data-i18n')) {
            link.innerHTML = '<i class="fas fa-chevron-right"></i> ' + t(mobileNavKeys[index]);
        }
    });

    // 6. 翻译面包屑导航
    const breadcrumbHome = document.querySelector('.breadcrumb a span[data-i18n]');
    if (breadcrumbHome) {
        breadcrumbHome.textContent = t('breadcrumbHome');
    }
    const breadcrumbCurrent = document.querySelector('.breadcrumb-current[data-i18n]');
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = t('breadcrumbCurrent');
    }

    // 7. 翻译定理卡片按钮（保留图标）
    const cardBtns = document.querySelectorAll('.card-btn');
    cardBtns.forEach(btn => {
        if (!btn.hasAttribute('data-i18n')) {
            btn.innerHTML = t('cardBtn') + ' <i class="fas fa-arrow-right"></i>';
        }
    });

    // 8. 翻译加载文本
    const loaderText = document.querySelector('.loader-text[data-i18n]');
    if (loaderText) {
        loaderText.textContent = t('loadingText');
    }

    // 9. 翻译 Logo 文字
    const logoText = document.querySelector('.logo-text[data-i18n]');
    if (logoText) {
        logoText.textContent = t('logo');
    }
}

// ========================================
// 深色模式功能
// ========================================

// 全局标记：防止重复初始化主题功能
window.themeInitialized = window.themeInitialized || false;

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

function initTheme() {
    // 防止重复初始化：如果已经初始化过，直接同步图标状态并返回
    if (window.themeInitialized) {
        updateThemeIcon();
        return;
    }

    // 标记为已初始化
    window.themeInitialized = true;

    const themeBtn = document.getElementById('themeBtn');

    // Check if button exists
    if (!themeBtn) {
        console.error('Theme button not found!');
        return;
    }

    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');

    // Apply saved theme or check system preference
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else if (savedTheme === 'light') {
        document.body.removeAttribute('data-theme');
    } else {
        // Check system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.setAttribute('data-theme', 'dark');
        }
    }

    // 初始化图标
    updateThemeIcon();

    // Toggle theme on click
    themeBtn.addEventListener('click', () => {
        const hasDarkTheme = document.body.hasAttribute('data-theme');
        if (hasDarkTheme) {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', 'dark');
        }

        updateThemeIcon();
        localStorage.setItem('theme', hasDarkTheme ? 'light' : 'dark');
    });
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

// ========================================
// 背景音乐控制
// ========================================
let backgroundMusic = null;
let isMusicPlaying = false;

function initMusicControl() {
    const musicBtn = document.getElementById('musicBtn');

    if (!musicBtn) {
        console.error('Music button not found!');
        return;
    }

    // 初始化音频
    backgroundMusic = new Audio('background.wav');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;

    // 检查本地存储的音乐状态
    const savedMusicState = localStorage.getItem('musicEnabled');
    if (savedMusicState === 'true') {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
        }).catch(e => {
            console.log('Music autoplay prevented');
            isMusicPlaying = false;
        }).finally(() => {
            updateMusicIcon();
        });
    } else {
        updateMusicIcon();
    }

    // 点击按钮切换音乐
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            isMusicPlaying = false;
            localStorage.setItem('musicEnabled', 'false');
            updateMusicIcon();
        } else {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                localStorage.setItem('musicEnabled', 'true');
                updateMusicIcon();
            }).catch(e => {
                console.log('Music playback failed');
                updateMusicIcon();
            });
        }
    });

    // 页面可见性变化时处理音乐
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isMusicPlaying) {
            backgroundMusic.pause();
        } else if (!document.hidden && isMusicPlaying) {
            backgroundMusic.play().catch(e => {
                console.log('Music resume failed');
            });
        }
    });
}

function updateMusicIcon() {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) return;

    // 找到按钮内的图标元素，只更新图标的class
    const icon = musicBtn.querySelector('i');
    if (icon) {
        if (isMusicPlaying) {
            icon.className = 'fas fa-volume-up';
        } else {
            icon.className = 'fas fa-volume-mute';
        }
    }
}
// ========================================
// 禁用 Toast 通知 (覆盖 script.js 中的 showNotification)
// ========================================
function showNotification(message, type) {
    // 什么都不做，禁用所有 toast 通知
}