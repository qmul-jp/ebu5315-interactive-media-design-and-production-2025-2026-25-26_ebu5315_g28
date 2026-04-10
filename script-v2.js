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
            'hero.btnWatch': 'Watch Demo',
            'hero.stat1': 'Theorems',
            'hero.stat2': 'Exercises',
            'hero.stat3': 'Free Access',
            // Video
            'video.title': 'Theorem Animations',
            'video.infoTitle': 'Master All Circle Theorems in 5 Minutes',
            'video.infoSubtitle': 'With subtitles | English & Chinese support',
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
            // Placeholder & Misc
            'placeholder.chatInput': 'Ask me anything about circle theorems...'
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
            'hero.btnWatch': '观看演示',
            'hero.stat1': '定理',
            'hero.stat2': '练习',
            'hero.stat3': '免费使用',
            // Video
            'video.title': '定理动画',
            'video.infoTitle': '5分钟掌握所有圆定理',
            'video.infoSubtitle': '含字幕 | 中英双语',
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
            // Placeholder & Misc
            'placeholder.chatInput': '问我任何关于圆定理的问题...'
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

// ========================================
// 13. Scroll to Sections
// ========================================
function scrollToVideo() {
    document.getElementById('videoSection').scrollIntoView({ behavior: 'smooth' });
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
