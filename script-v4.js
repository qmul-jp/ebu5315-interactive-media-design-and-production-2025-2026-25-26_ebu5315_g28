/* ========================================
   Circle Planet - Main Script File
   EBU5315 Coursework - Homepage Section
   Responsible: Homepage Interactive Features
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functional modules
    initLoader();           // Loading animation
    initTheme();            // Dark mode
    initFontSize();         // Font size adjustment
    initMobileMenu();       // Mobile menu
    initLanguage();         // Language switch (EN/CN)
    initChat();             // AI Chatbot
    initForm();             // Contact form
    initBackToTop();        // Back to top button
    initScrollAnimations(); // Scroll animations
    initScrollProgress();   // Scroll progress indicator
    initRealTimeValidation(); // Form validation
    initV3Iteration(); // 启动Version 3创意迭代功能（粒子/视差/3D卡片/弹窗）
});

// ========================================
// 1. Loading Animation
// ========================================
function initLoader() {
    const loader = document.getElementById('loader');
    // Hide after 1.5 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
}

// ========================================
// 2. Dark Mode Toggle (3 points for Wellbeing)
// ========================================
function initTheme() {
    const themeBtn = document.getElementById('themeBtn');

    // Check if button exists
    if (!themeBtn) {
        console.error('Theme button not found!');
        return;
    }

    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');

    // Initialize theme based on saved preference or system setting
    function applyTheme(isDark) {
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
        // COSMIC: 浅色模式隐藏星空粒子
        const starfield = document.getElementById('cosmicStarfield');
        if (starfield) {
            starfield.style.display = isDark ? '' : 'none';
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
        themeBtn.innerHTML = isDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
}

// ========================================
// 3. Font Size Adjustment (5 points for Inclusive Design)
// ========================================
function initFontSize() {
    const fontBtns = document.querySelectorAll('.font-btn');
    // Read saved preference
    const savedSize = localStorage.getItem('fontSize') || '16';

    // Apply saved font size
    document.documentElement.style.setProperty('--font-size-base', savedSize + 'px');
    updateActiveFontBtn(savedSize);

    // Bind click events
    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.id === 'fontS' ? 14 : btn.id === 'fontL' ? 18 : 16;
            document.documentElement.style.setProperty('--font-size-base', size + 'px');
            localStorage.setItem('fontSize', size);
            updateActiveFontBtn(size);
        });
    });

    // Update active button state
    function updateActiveFontBtn(size) {
        fontBtns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById(size === 14 ? 'fontS' : size === 18 ? 'fontL' : 'fontM');
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// ========================================
// 4. Language Switch (Bilingual Support)
// ========================================
function initLanguage() {
    const langBtn = document.getElementById('langBtn');
    const langLabel = document.getElementById('langLabel');
    let currentLang = localStorage.getItem('language') || 'en';

    // Translation data
    const translations = {
        en: {
            // Navigation
            'nav.home': 'Home',
            'nav.game': 'Game',
            'nav.quiz': 'Quiz',
            // Breadcrumb
            'breadcrumb.home': 'Home',
            'breadcrumb.current': 'Circle Theorems',
            // Hero
            'hero.badge': 'Learn by Playing',
            'hero.title1': 'Master Circle',
            'hero.title2': 'Theorems Fun Way',
            'hero.subtitle': 'Discover the magic of geometry through interactive animations, AI-powered learning & exciting challenges. No memorization needed - just explore and play!',
            'hero.usp1': 'AI-Powered Personalized Learning',
            'hero.usp2': 'Learn by Playing',
            'hero.btnStart': 'Start Adventure',
            'hero.stat1': 'Theorems',
            'hero.stat2': 'Exercises',
            'hero.stat3': 'Free Access',
            // Ad
            'ad.title': 'Unlock Premium Star Map',
            'ad.subtitle': 'Full Question Bank + 1v1 AI Tutor - Only £2.99/month',
            'ad.btn': 'Get Access',
            // Theorem
            'theorem.title': 'Core Circle Theorems',
            'theorem.subtitle': 'Click on any theorem to learn more and test your knowledge!',
            'theorem.central.title': 'Central Angle Theorem',
            'theorem.central.desc': 'The angle at the centre is twice the angle at the circumference. Essential foundation for all circle problems.',
            'theorem.semi.title': 'Angle in Semicircle',
            'theorem.semi.desc': 'The angle in a semicircle is always 90°. Perfect for quick geometric proofs and angle calculations.',
            'theorem.segment.title': 'Angles in Same Segment',
            'theorem.segment.desc': 'Angles in the same segment are equal. Key for solving complex angle relationship problems.',
            'theorem.btn': 'Learn More',
            // Features
            'features.title': 'Why Choose Circle Planet?',
            'features.card1.title': 'Learn by Playing',
            'features.card1.desc': 'Turn theorem practice into exciting challenges and games. Stay motivated while mastering geometry concepts naturally.',
            'features.card2.title': 'AI-Powered Learning',
            'features.card2.desc': 'Get personalized explanations and hints from our AI tutor. Learn at your own pace with adaptive difficulty levels.',
            'features.card3.title': 'Bilingual Support',
            'features.card3.desc': 'Full English and Chinese language support. Perfect for international students studying GCSE mathematics.',
            // Chat
            'chat.title': 'Circle AI Guide',
            'chat.status': 'Online - AI-Powered',
            'chat.clear': 'Clear',
            'chat.welcome': 'Welcome to Circle Planet! I\'m Guide AI-01, your personal geometry assistant.',
            // Contact
            'contact.title': 'Signal Station',
            'contact.subtitle': 'Any discoveries or suggestions? Tell our control center.',
            'contact.location': 'Galaxy Arm 3, Earth Sector',
            'contact.nameLabel': 'Explorer Name',
            'contact.nameError': 'Please enter your name',
            'contact.emailLabel': 'Communication Frequency (Email)',
            'contact.emailError': 'Please enter a valid email',
            'contact.ratingLabel': 'How was your adventure?',
            'contact.interestLabel': 'Which area interests you most?',
            'contact.interest1': 'Game Ruins',
            'contact.interest2': 'Challenge Trial',
            'contact.interest3': 'Knowledge Map',
            'contact.messageLabel': 'Send Signal (Message)',
            'contact.messageError': 'Please enter your message',
            'contact.privacyText': 'I agree to the',
            'contact.privacyLink': 'Data Transmission Protocol',
            'contact.submitBtn': 'Send Signal',
            // Modal
            'modal.title': 'Confirm Submission',
            'modal.body': 'Cannot be modified after submission. Confirm?',
            'modal.cancel': 'Cancel',
            'modal.confirm': 'Confirm',
            // Footer
            'footer.desc': 'Interactive Circle Theorem Learning Platform',
            'footer.tagline': 'Learn by Playing | AI-Powered',
            'footer.quickLinks': 'Quick Links',
            'footer.legal': 'Legal',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Use',
            'footer.cookies': 'Cookie Policy',
            'footer.accessibility': 'Accessibility',
            'footer.colorBlind': 'Colour-blind Friendly',
            'footer.adjustable': 'Adjustable Font',
            'footer.darkMode': 'Dark Mode',
            'footer.feature1': 'Colour-blind Friendly',
            'footer.feature2': 'Mobile Responsive',
            'footer.feature3': 'Bilingual Support',
            'footer.feature4': 'Dark Mode',
            // Animation Controls
            'anim.pause': 'Pause Animation',
            'anim.play': 'Play Animation',
            'anim.reset': 'Reset',
            // Placeholder & Misc
            'placeholder.chatInput': 'Ask me anything about circle theorems...',
            // Lab
            'lab.badge': 'Interactive Lab',
            'lab.title': 'The Living Geometry',
            'lab.subtitle': 'Drag points on the circumference to observe the dynamic relationship between central and inscribed angles in real-time',
            'lab.central': 'Central Angle:',
            'lab.inscribed': 'Inscribed Angle:',
            'lab.auto': 'Auto Explore'
        },
        zh: {
            // Navigation
            'nav.home': '首页',
            'nav.game': '游戏',
            'nav.quiz': '测验',
            // Breadcrumb
            'breadcrumb.home': '首页',
            'breadcrumb.current': '圆定理',
            // Hero
            'hero.badge': '边玩边学',
            'hero.title1': '轻松掌握',
            'hero.title2': '圆定理奥秘',
            'hero.subtitle': '通过互动动画、AI智能学习和有趣挑战，发现几何的魅力！无需死记硬背 - 边玩边探索！',
            'hero.usp1': 'AI个性化学习',
            'hero.usp2': '边玩边学',
            'hero.btnStart': '开始探险',
            'hero.stat1': '定理',
            'hero.stat2': '练习',
            'hero.stat3': '免费使用',
            // Ad
            'ad.title': '解锁高级星图',
            'ad.subtitle': '完整题库 + 1v1 AI导师 - 每月仅需 £2.99',
            'ad.btn': '立即获取',
            // Theorem
            'theorem.title': '核心圆定理',
            'theorem.subtitle': '点击任意定理了解更多并测试你的知识！',
            'theorem.central.title': '圆心角定理',
            'theorem.central.desc': '圆心角是圆周角的两倍。这是所有圆问题的重要基础。',
            'theorem.semi.title': '半圆上的角',
            'theorem.semi.desc': '半圆上的角永远是90°。非常适合快速几何证明和角度计算。',
            'theorem.segment.title': '同弧所对的角',
            'theorem.segment.desc': '同弧所对的圆周角相等。解决复杂角度关系问题的关键。',
            'theorem.btn': '了解更多',
            // Features
            'features.title': '为什么选择圆星球？',
            'features.card1.title': '边玩边学',
            'features.card1.desc': '将定理练习变成刺激的挑战和游戏。在自然掌握几何概念的同时保持动力。',
            'features.card2.title': 'AI智能学习',
            'features.card2.desc': '获得AI导师的个性化解释和提示。按自己的节奏学习，自适应难度。',
            'features.card3.title': '双语支持',
            'features.card3.desc': '完整的中英双语支持。为学习GCSE数学的国际学生量身打造。',
            // Chat
            'chat.title': '圆球AI助手',
            'chat.status': '在线 - AI驱动',
            'chat.clear': '清除',
            'chat.welcome': '欢迎来到圆星球！我是AI助手-01，你的专属几何学习助手。',
            // Contact
            'contact.title': '信号站',
            'contact.subtitle': '有任何发现或建议？告诉我们的控制中心。',
            'contact.location': '地球第三旋臂',
            'contact.nameLabel': '探险者姓名',
            'contact.nameError': '请输入您的姓名',
            'contact.emailLabel': '通讯频率（邮箱）',
            'contact.emailError': '请输入有效的邮箱地址',
            'contact.ratingLabel': '这次探险体验如何？',
            'contact.interestLabel': '你最感兴趣的是哪个领域？',
            'contact.interest1': '游戏遗迹',
            'contact.interest2': '挑战试炼',
            'contact.interest3': '知识地图',
            'contact.messageLabel': '发送信号（留言）',
            'contact.messageError': '请输入您的留言',
            'contact.privacyText': '我同意',
            'contact.privacyLink': '数据传输协议',
            'contact.submitBtn': '发送信号',
            // Modal
            'modal.title': '确认提交',
            'modal.body': '提交后将无法修改。确定要提交吗？',
            'modal.cancel': '取消',
            'modal.confirm': '确认',
            // Footer
            'footer.desc': '互动式圆定理学习平台',
            'footer.tagline': '边玩边学 | AI驱动',
            'footer.quickLinks': '快速链接',
            'footer.legal': '法律信息',
            'footer.privacy': '隐私政策',
            'footer.terms': '使用条款',
            'footer.cookies': 'Cookie政策',
            'footer.accessibility': '无障碍设计',
            'footer.colorBlind': '色盲友好',
            'footer.adjustable': '可调节字体',
            'footer.darkMode': '深色模式',
            'footer.feature1': '色盲友好',
            'footer.feature2': '响应式设计',
            'footer.feature3': '双语支持',
            'footer.feature4': '深色模式',
            // Animation Controls
            'anim.pause': '暂停动画',
            'anim.play': '播放动画',
            'anim.reset': '重置',
            // Placeholder & Misc
            'placeholder.chatInput': '问我任何关于圆定理的问题...',
            // Lab
            'lab.badge': '互动实验室',
            'lab.title': '动态几何',
            'lab.subtitle': '拖动圆周上的点，实时观测圆心角与圆周角的变化逻辑',
            'lab.central': '圆心角:',
            'lab.inscribed': '圆周角:',
            'lab.auto': '自动探索',
            'lab.reset': '重置视图'
        }
    };

    // Apply translation
    function applyTranslation(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update chat input placeholder
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.placeholder = translations[lang]['placeholder.chatInput'];
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Initial apply
    applyTranslation(currentLang);
    langLabel.textContent = currentLang.toUpperCase();

    // Toggle language on button click
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('language', currentLang);
        langLabel.textContent = currentLang.toUpperCase();
        applyTranslation(currentLang);

        // Show notification
        showNotification(
            currentLang === 'en' ? 'Language switched to English' : '语言已切换为中文',
            'info'
        );
    });
}

// ========================================
// 5. Mobile Menu (5 points for Mobile)
// ========================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Toggle hamburger menu
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
        menuBtn.innerHTML = mobileMenu.classList.contains('show')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu after clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ========================================
// 6. AI Chatbot with Extended Q&A Library (10 points - AI Greeting)
// ========================================
function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearChat');
    const chatMessages = document.getElementById('chatMessages');

    // Bind send button event
    sendBtn.addEventListener('click', sendMessage);

    // Bind Enter key to send
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Clear conversation
    clearBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        addBotMessage('Conversation cleared. What would you like to explore next?');
    });

    // Send message function
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addUserMessage(text);
        chatInput.value = '';

        // Generate AI response
        setTimeout(() => {
            const response = generateAIResponse(text);
            addBotMessage(response);
        }, 800);
    }

    // Add user message to chat
    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'message message-user';
        msg.innerHTML = `
            <div class="message-avatar"><i class="fas fa-user"></i></div>
            <div class="message-content">
                <p>${escapeHtml(text)}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add AI message to chat
    function addBotMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'message message-bot';
        msg.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// ========================================
// Extended AI Response Library
// ========================================
function generateAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    // Central Angle Theorem responses
    if (msg.includes('central angle') || msg.includes('central')) {
        return `The <strong>Central Angle Theorem</strong> states that the angle at the center of a circle is twice the angle at the circumference standing on the same arc.<br><br>
                <strong>Formula:</strong> ∠AOB = 2 × ∠ACB<br><br>
                💡 <em>Tip: If the central angle is 80°, the angle at the circumference would be 40°!</em><br><br>
                Would you like to try a practice question or visit the Game page to test your knowledge?`;
    }

    // Semicircle theorem responses
    if (msg.includes('semicircle') || msg.includes('90') || msg.includes('right angle')) {
        return `The <strong>Angle in a Semicircle Theorem</strong> states that an angle subtended by a diameter is always 90° (a right angle).<br><br>
                <strong>Key:</strong> If you see a triangle with one side as the diameter, the angle opposite is 90°!<br><br>
                📐 <em>This is very useful for solving complex geometry problems!</em><br><br>
                Want to practice with our interactive animations?`;
    }

    // Same segment responses
    if (msg.includes('same segment') || msg.includes('angles in') || msg.includes('equal angles')) {
        return `The <strong>Angles in the Same Segment Theorem</strong> states that angles subtended by the same chord at the circumference are equal.<br><br>
                <strong>Example:</strong> If ∠BAC = ∠BDC, then points A, B, C, D lie on the same circle segment.<br><br>
                🎯 <em>This helps prove that multiple points lie on the same circle!</em><br><br>
                Shall I explain this with a visual example?`;
    }

    // Chord and tangent responses
    if (msg.includes('chord') && msg.includes('tangent')) {
        return `The <strong>Alternate Segment Theorem</strong> (or Tangent-Chord Theorem) states that the angle between a chord and a tangent equals the angle in the alternate segment.<br><br>
                <strong>Formula:</strong> ∠(chord, tangent) = ∠(opposite chord's inscribed angle)<br><br>
                🔑 <em>This connects angles outside the circle with angles inside!</em>`;
    }

    // Cyclic quadrilateral responses
    if (msg.includes('cyclic') || msg.includes('quadrilateral')) {
        return `A <strong>Cyclic Quadrilateral</strong> is a four-sided figure with all vertices on a circle.<br><br>
                <strong>Key Property:</strong> Opposite angles sum to 180° (supplementary)!<br><br>
                ✨ <em>This is one of the most useful theorems for solving complex problems!</em><br><br>
                Would you like to practice with our Quiz section?`;
    }

    // Game page navigation
    if (msg.includes('game') || msg.includes('play') || msg.includes('take me to')) {
        return `Great choice! 🎮 Our Game section has exciting challenges to help you master circle theorems through play!<br><br>
                You can access it from the navigation menu above, or I'll guide you there:<br><br>
                <strong>Game Features:</strong><br>
                • Interactive theorem challenges<br>
                • Timed quizzes<br>
                • Achievement rewards<br><br>
                Ready to start your adventure?`;
    }

    // Quiz page navigation
    if (msg.includes('quiz') || msg.includes('test') || msg.includes('practice')) {
        return `Perfect! 📝 Our Quiz section offers level-based mock tests with interactive feedback.<br><br>
                <strong>Quiz Features:</strong><br>
                • Multiple difficulty levels<br>
                • AI-powered question progression<br>
                • Instant feedback & explanations<br><br>
                You can find the Quiz in the navigation menu. Good luck! 🌟`;
    }

    // Help/navigation responses
    if (msg.includes('help') || msg.includes('what can') || msg.includes('do you')) {
        return `I'm your Circle Planet AI Guide! Here's what I can help with:<br><br>
                📚 <strong>Theorems:</strong> I can explain any circle theorem with examples<br>
                🎮 <strong>Games:</strong> Tell me about our game challenges<br>
                📝 <strong>Quizzes:</strong> Help you prepare for tests<br>
                🎯 <strong>Practice:</strong> Give you practice questions<br><br>
                What would you like to explore?`;
    }

    // Angle problem solving
    if (msg.includes('solve') && (msg.includes('angle') || msg.includes('problem'))) {
        return `Let me help you solve angle problems! 🧮<br><br>
                <strong>Quick Tips:</strong><br>
                1. Identify if it's a central or inscribed angle<br>
                2. Look for diameter/semicircle clues (90°!)<br>
                3. Check for equal angles (same segment)<br>
                4. Sum of angles in quadrilateral = 180°<br><br>
                Share a specific problem and I'll guide you step by step!`;
    }

    // General greeting
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return `Hello! Welcome to Circle Planet! 👋<br><br>
                I'm here to help you master circle theorems in a fun, interactive way.<br><br>
                Type a question or click the suggestion buttons below to get started!`;
    }

    // Thank you
    if (msg.includes('thank') || msg.includes('thanks')) {
        return `You're welcome! 😊<br><br>
                Keep exploring and have fun with circle theorems!<br><br>
                Remember: <em>"Learn by Playing, Learn by Doing!"</em> 🌟`;
    }

    // Default responses
    const defaultResponses = [
        "That's an interesting question about circle theorems! Could you be more specific? For example, you can ask about 'Central Angle' or 'Semicircle' specifically.",
        "I'm here to help with circle geometry! Try asking about specific theorems like 'What is the Central Angle Theorem?' or 'How do I solve angle problems?'",
        "Let me connect you with the right learning path! You can explore our theorems by clicking 'Learn More' on the cards above, or try the Game section for hands-on practice!",
        "Great question! Circle Planet is all about learning through exploration. Would you like to see an animated example of a theorem?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// 7. Contact Form Handling (10 points - Contact Form)
// ========================================
function initForm() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');

    // Form submission event
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) return;

        // Check privacy policy (2 points for Ethics)
        const privacyCheck = document.getElementById('privacyCheck');
        if (!privacyCheck.checked) {
            showNotification('Please agree to the Data Transmission Protocol first.', 'error');
            return;
        }

        // Show confirmation modal (3 points - Wellbeing)
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // Close modal function
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Bind close events
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Confirm submission
    confirmBtn.addEventListener('click', () => {
        closeModal();
        showNotification('Signal sent successfully! We will reply soon.', 'success');
        form.reset();
    });
}

// ========================================
// Real-time Form Validation
// ========================================
function initRealTimeValidation() {
    const inputs = document.querySelectorAll('.form-control');

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            const error = document.getElementById(input.id + 'Error');
            if (error && input.value.trim()) {
                error.style.display = 'none';
                input.classList.remove('error');
            }
        });
    });
}

function validateForm() {
    let isValid = true;
    const fields = ['name', 'email', 'message'];

    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const error = document.getElementById(field.id + 'Error');
    let isValid = true;

    if (field.required && !field.value.trim()) {
        isValid = false;
    }

    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
        }
    }

    if (error) {
        error.style.display = isValid ? 'none' : 'block';
        field.classList.toggle('error', !isValid);
    }

    return isValid;
}

// ========================================
// 8. Ad Banner Click (10 points - Profit-making)
// ========================================
function showPremiumAlert() {
    showNotification('Premium Feature Coming Soon!\n\nFull Question Bank + 1v1 AI Tutor will be available soon!', 'info');
}

// ========================================
// 9. Notification System
// ========================================
function showNotification(message, type) {
    const notification = document.createElement('div');
    const colors = {
        success: 'linear-gradient(135deg, #22c55e, #16a34a)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// 10. Back to Top Button
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Click to scroll to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// 11. Scroll Animations (10 points for Creativity)
// ========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Add scroll animation to cards and sections
    document.querySelectorAll('.theorem-card, .ai-chat, .contact-section, .features-section, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// 12. Scroll Progress Indicator
// ========================================
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;

        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    });
}

function scrollToTheorems() {
    document.getElementById('theoremsSection').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// 14. Chat Suggestion Buttons
// ========================================
function askSuggestion(question) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = question;
    document.getElementById('sendBtn').click();
}

// ========================================
// 15. Navigate to Learning Content
// ========================================
function navigateToLearn(theorem) {
    // Scroll to AI chat for more information
    document.getElementById('chatInput').value = `Tell me more about ${theorem.replace('-', ' ')} theorem`;
    document.getElementById('chatInput').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('chatInput').focus();

    // Optional: Show a notification
    showNotification(`Opening ${theorem.replace('-', ' ')} learning mode!`, 'info');
}

// ============================================================
// VERSION 3 - CREATIVE INTERACTION LOGIC（适配你的circle-ring圆圈）
// ============================================================

function initV3Iteration() {
    createParticles();    // 创建背景漂浮粒子
    handleMouseParallax(); // Hero圆圈鼠标视差（适配你的par-1/2/3 ID）
    handle3DTilt();       // 定理卡片3D倾斜效果
    handleCookieBanner();  // Cookie隐私条逻辑
    handleOfferPopup();    // 滚动触发促销弹窗逻辑
    initAudioSystem();  // 启动声音系统
    initTheoremLab();   // 启动圆定理实验室 (Canvas)
    createStarfield();    // COSMIC: 创建星空背景粒子
    initHeroParallax();   // COSMIC: Hero轨道容器视差增强
}

// 1. 背景漂浮粒子（修复版：保证显示）
// 背景漂浮粒子（可见且不丑版）
function createParticles() {
    const container = document.getElementById('v3Particles');
    if (!container) { 
        console.warn('❌ 没找到v3Particles容器！检查HTML里的<div id="v3Particles">');
        return;
    }
    // 清空旧粒子
    container.innerHTML = '';
    // 粒子数量和原来的泡泡版一样：20个，不会太密
    const particleCount = 20; 
    for (let i = 0; i < particleCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'v3-dot';
        // 粒子尺寸：15px ~ 35px，比原来的泡泡版稍小，但完全可见
        const size = Math.random() * 20 + 15; 
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}vw`;
        dot.style.animationDelay = `${Math.random() * 15}s`;
        // 随机透明度，在0.2-0.3之间波动，避免完全透明
        dot.style.opacity = Math.random() * 0.1 + 0.2;
        container.appendChild(dot);
    }
    console.log('✅ 粒子创建成功！数量：', particleCount);
}

// 2. Hero圆圈视差（适配你加的par-1/2/3 ID）
function handleMouseParallax() {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 45; // 水平偏移量
        const y = (window.innerHeight / 2 - e.pageY) / 45; // 垂直偏移量
        
        // 遍历3个圆圈（par-1/2/3），按ID找元素（适配你的circle-ring）
        for(let i=1; i<=3; i++) {
            const el = document.getElementById(`par-${i}`);
            if(!el) continue; // 元素不存在则跳过，避免报错
            const depth = i * 0.7; // 不同圆圈不同视差深度（更灵动）
            el.style.transform = `translate(${x * depth}px, ${y * depth}px) rotate(${x}deg)`;
        }
    });
}

// 3. 定理卡片3D倾斜（防抖+丝滑）
function handle3DTilt() {
    const cards = document.querySelectorAll('.theorem-card');
    if (cards.length === 0) { // 没找到卡片时提示
        console.warn('❌ 检查HTML：没找到class="theorem-card"的元素，3D效果失效');
        return;
    }
    cards.forEach(card => {
        let tiltTimer; // 防抖计时器（减少卡顿）
        card.addEventListener('mousemove', (e) => {
            clearTimeout(tiltTimer);
            tiltTimer = setTimeout(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (centerY - y) / 10; // 垂直倾斜
                const rotateY = (x - centerX) / 10; // 水平倾斜
                // 增强3D效果：加translateZ
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateY(-10px) translateZ(20px)`;
            }, 10);
        });
        // 鼠标离开时恢复原样
        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1) translateY(0px) translateZ(0px)`;
        });
    });
}

// 4. Cookie隐私条（防错+本地存储）
// Cookie隐私条（每次打开都显示）
function handleCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    if (!cookieBanner) {
        console.warn('❌ 检查HTML：没找到id="cookieBanner"的元素');
        return;
    }
    // 删掉localStorage判断，每次打开都2.5秒后显示
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 2500);
}
// 关闭Cookie条函数（只隐藏，不记录）
window.closeCookie = (accept) => {
    const cookieBanner = document.getElementById('cookieBanner');
    if (!cookieBanner) return;
    // 删掉localStorage.setItem这行，取消记忆
    cookieBanner.classList.remove('show');
};

// 5. 滚动触发促销弹窗（节流+背景关闭+防重复）
function handleOfferPopup() {
    const offerPopup = document.getElementById('offerPopup');
    const closeBtn = document.querySelector('.v3-close-btn');
    if (!offerPopup || !closeBtn) {
        console.warn('❌ 检查HTML：没找到offerPopup或关闭按钮');
        return;
    }

    let hasShown = false;
    // 节流函数：避免滚动频繁触发（500ms只执行1次）
    function throttle(fn, delay) {
        let timer = null;
        return () => {
            if (!timer) timer = setTimeout(() => { fn(); timer = null; }, delay);
        };
    }

    // 滚动到70%以上时显示弹窗
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 70 && !hasShown) {
            offerPopup.style.display = 'flex';
            hasShown = true;
           // localStorage.setItem('v3_offer_shown', 'true'); // 标记已显示（刷新不重复弹）
        }
    }, 500));

    // 点击×关闭弹窗
    closeBtn.onclick = () => { offerPopup.style.display = 'none'; };
    // 点击弹窗背景关闭（新手友好）
    offerPopup.addEventListener('click', (e) => {
        if (e.target === offerPopup) offerPopup.style.display = 'none';
    });

    // 刷新页面不重复显示
    //if (localStorage.getItem('v3_offer_shown')) hasShown = true;
}

// ============================================================
// VERSION 3 - MULTIMEDIA AUDIO SYSTEM（适配你的文件名）
// ============================================================
function initAudioSystem() {
    const bgm = document.getElementById('bgmAudio');
    const bgmBtn = document.getElementById('bgmToggle');
    const sfxClick = document.getElementById('sfxClick');

    // 找不到按钮就退出，防止报错
    if (!bgmBtn) return;

   // 1. 背景音乐 (BGM) 播放/暂停控制
bgmBtn.addEventListener('click', () => {
    if (!bgm) return;
    
    if (bgm.paused) {
        bgm.volume = 0.3; // 加个默认音量，避免音乐太大声（加分项）
        bgm.play().catch(e => console.log('BGM Play Error:', e));
        // 切换图标+添加播放状态类
        bgmBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        bgmBtn.classList.add('is-playing');
    } else {
        bgm.pause();
        // 切换图标+移除播放状态类
        bgmBtn.innerHTML = '<i class="fas fa-music"></i>';
        bgmBtn.classList.remove('is-playing');
    }
});

    // 2. 全局点击音效绑定（所有按钮/链接/卡片都用这个）
    const clickableElements = document.querySelectorAll('button, .nav-link, .theorem-card, .logo, .v3-close-btn');
    
    clickableElements.forEach(item => {
        item.addEventListener('click', () => {
            if (!sfxClick) return;
            // 进度归零，允许连续点击快速触发
            sfxClick.currentTime = 0;
            // 播放点击音效（忽略报错）
            sfxClick.play().catch(() => {});
        });
    });
}

// ============================================================
// VERSION 3 - CIRCLE THEOREM DYNAMIC LAB (HIGH INTERACTIVITY)
// ============================================================
function initTheoremLab() {
    const canvas = document.getElementById('theoremCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = document.getElementById('canvasContainer');
    const centralValEl = document.getElementById('centralAngleVal');
    const inscribedValEl = document.getElementById('inscribedAngleVal');
    const toggleAutoBtn = document.getElementById('toggleAuto');
    const resetLabBtn = document.getElementById('resetLab');

    // Lab State
    let width, height, centerX, centerY, radius;
    let isAutoMode = false;
    let draggedPoint = null;
    
    // Geometric Points (Angles in radians)
    let points = {
        A: Math.PI * 0.75, // Circumference point 1
        B: Math.PI * 0.25, // Circumference point 2
        C: Math.PI * 1.5,  // Inscribed angle vertex
    };

    const colors = {
        primary: '#4361ee',
        secondary: '#7209b7',
        accent: '#ff9f1c',
        text: '#64748b'
    };

    // 1. Setup & Resize
    function setup() {
        const rect = container.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
        centerX = width / 2;
        centerY = height / 2;
        radius = Math.min(width, height) * 0.35;
        draw();
    }

    // 2. Geometric Calculations
    function getPos(angle) {
        return {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
        };
    }

    function calculateAngles() {
        // Central Angle (AOB)
        let diff = points.B - points.A;
        while (diff < 0) diff += Math.PI * 2;
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        const centralDeg = (diff * 180 / Math.PI).toFixed(1);

        // Inscribed Angle (ACB)
        const inscribedDeg = (centralDeg / 2).toFixed(1);

        if (centralValEl) centralValEl.textContent = `${centralDeg}°`;
        if (inscribedValEl) inscribedValEl.textContent = `${inscribedDeg}°`;
    }

    // 3. Drawing Logic
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        const posA = getPos(points.A);
        const posB = getPos(points.B);
        const posC = getPos(points.C);

        // Draw Main Circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(67, 97, 238, 0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Chords (Inscribed Angle ACB)
        ctx.beginPath();
        ctx.moveTo(posA.x, posA.y);
        ctx.lineTo(posC.x, posC.y);
        ctx.lineTo(posB.x, posB.y);
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Draw Central Radii (Central Angle AOB)
        ctx.beginPath();
        ctx.moveTo(posA.x, posA.y);
        ctx.lineTo(centerX, centerY);
        ctx.lineTo(posB.x, posB.y);
        ctx.strokeStyle = colors.secondary;
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Center O
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors.secondary;
        ctx.fill();
        ctx.fillText("O", centerX + 10, centerY + 10);

        // Draw Interaction Points
        drawPoint(posA, "A", colors.accent);
        drawPoint(posB, "B", colors.accent);
        drawPoint(posC, "C", colors.primary);

        // Draw Angle Labels (Mathematical Symbol Style)
        drawAngleLabel(posC, posA, posB, "θ", colors.primary);
        drawAngleLabel({x: centerX, y: centerY}, posA, posB, "2θ", colors.secondary);

        calculateAngles();
    }

    function drawPoint(pos, label, color) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--dark').trim() || '#0f172a';
        ctx.font = "bold 14px Inter";
        ctx.fillText(label, pos.x + 12, pos.y - 12);
    }

    function drawAngleLabel(vertex, p1, p2, text, color) {
        ctx.fillStyle = color;
        ctx.font = "italic bold 16px serif";
        // Calculate a nice position for the label
        const avgX = (vertex.x + (p1.x + p2.x) / 2) / 2;
        const avgY = (vertex.y + (p1.y + p2.y) / 2) / 2;
        ctx.fillText(text, avgX, avgY);
    }

    // 4. Interaction Logic
    function handleInteraction(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const mouseY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

        if (e.type === 'mousedown' || e.type === 'touchstart') {
            // Check if clicking on any point
            for (let key in points) {
                const pos = getPos(points[key]);
                const dist = Math.sqrt((pos.x - mouseX) ** 2 + (pos.y - mouseY) ** 2);
                if (dist < 20) {
                    draggedPoint = key;
                    isAutoMode = false;
                    break;
                }
            }
        } else if ((e.type === 'mousemove' || e.type === 'touchmove') && draggedPoint) {
            const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
            points[draggedPoint] = angle;
            draw();
        } else if (e.type === 'mouseup' || e.type === 'touchend') {
            draggedPoint = null;
        }
    }

    // 5. Auto Animation
    function autoAnimate() {
        if (!isAutoMode) return;
        points.C += 0.01;
        draw();
        requestAnimationFrame(autoAnimate);
    }

    // 6. Listeners
    window.addEventListener('resize', setup);
    canvas.addEventListener('mousedown', handleInteraction);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('mouseup', handleInteraction);
    canvas.addEventListener('touchstart', handleInteraction);
    window.addEventListener('touchmove', handleInteraction);
    window.addEventListener('touchend', handleInteraction);

    if (toggleAutoBtn) {
        toggleAutoBtn.addEventListener('click', () => {
            isAutoMode = !isAutoMode;
            if (isAutoMode) {
                toggleAutoBtn.innerHTML = '<i class="fas fa-pause"></i> <span>Stop Exploring</span>';
                autoAnimate();
            } else {
                toggleAutoBtn.innerHTML = '<i class="fas fa-play"></i> <span>Auto Explore</span>';
            }
        });
    }

    if (resetLabBtn) {
        resetLabBtn.addEventListener('click', () => {
            points = { A: Math.PI * 0.75, B: Math.PI * 0.25, C: Math.PI * 1.5 };
            isAutoMode = false;
            if (toggleAutoBtn) toggleAutoBtn.innerHTML = '<i class="fas fa-play"></i> <span>Auto Explore</span>';
            draw();
        });
    }

    setup();
}

/* ========================================
   COSMIC CELESTIAL - Starfield & Hero Parallax
   ======================================== */
function createStarfield() {
    const container = document.getElementById('cosmicStarfield');
    if (!container) { console.warn('cosmicStarfield container not found'); return; }
    const starCount = 150;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'cosmic-star';
        const size = Math.random() * 3 + 1;
        star.style.cssText = `position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;background:white;border-radius:50%;opacity:${Math.random()*0.5+0.3};animation:cosmicStarTwinkle ${Math.random()*4+2}s ease-in-out ${Math.random()*6+2}s infinite;`;
        if (size > 2.5) star.style.boxShadow = `0 0 ${size*2}px rgba(255,255,255,0.5)`;
        fragment.appendChild(star);
    }
    container.appendChild(fragment);
}

function initHeroParallax() {
    const heroSection = document.getElementById('heroSection');
    if (!heroSection) return;
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const orbitContainer = heroSection.querySelector('.cosmic-orbit-container');
        if (orbitContainer) {
            orbitContainer.style.transform = `translate(calc(-50% + ${x*15}px), calc(-50% + ${y*15}px)) rotateY(${x*10}deg) rotateX(${-y*10}deg)`;
        }
    });
    heroSection.addEventListener('mouseleave', () => {
        const orbitContainer = heroSection.querySelector('.cosmic-orbit-container');
        if (orbitContainer) {
            orbitContainer.style.transform = 'translate(-50%, -50%) rotateY(0deg) rotateX(0deg)';
            orbitContainer.style.transition = 'transform 0.5s ease';
            setTimeout(() => { orbitContainer.style.transition = ''; }, 500);
        }
    });
}