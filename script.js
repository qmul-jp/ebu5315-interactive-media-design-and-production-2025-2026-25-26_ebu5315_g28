/* ========================================
   圆星球 Circle Planet - 主脚本文件
   EBU5315 Coursework - Homepage Section
   负责：首页所有交互功能
   ======================================== */

// 等待页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能模块
    initLoader();           // 加载动画
    initTheme();            // 深色模式
    initFontSize();         // 字体大小调整
    initMobileMenu();       // 移动端菜单
    initChat();             // AI 聊天机器人
    initForm();             // 联系表单
    initBackToTop();        // 返回顶部按钮
    initScrollAnimations(); // 滚动动画效果
});

// ========================================
// 1. 加载动画功能
// ========================================
function initLoader() {
    const loader = document.getElementById('loader');
    // 1.5秒后隐藏加载动画
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
}

// ========================================
// 2. 深色模式切换（Wellbeing 3分）
// ========================================
function initTheme() {
    const themeBtn = document.getElementById('themeBtn');
    // 从本地存储读取用户偏好
    const savedTheme = localStorage.getItem('theme');
    
    // 如果之前保存过深色模式，直接应用
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }

    // 点击按钮切换主题
    themeBtn.addEventListener('click', () => {
        const isDark = document.body.toggleAttribute('data-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });

    // 更新按钮图标
    function updateThemeIcon(isDark) {
        themeBtn.innerHTML = isDark 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
}

// ========================================
// 3. 字体大小调整（Inclusive Design 5分）
// ========================================
function initFontSize() {
    const fontBtns = document.querySelectorAll('.font-btn');
    // 从本地存储读取用户偏好
    const savedSize = localStorage.getItem('fontSize') || '16';
    
    // 应用保存的字体大小
    document.documentElement.style.setProperty('--font-size-base', savedSize + 'px');
    updateActiveFontBtn(savedSize);

    // 绑定点击事件
    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.id === 'fontS' ? 14 : btn.id === 'fontL' ? 18 : 16;
            document.documentElement.style.setProperty('--font-size-base', size + 'px');
            localStorage.setItem('fontSize', size);
            updateActiveFontBtn(size);
        });
    });

    // 更新激活状态按钮
    function updateActiveFontBtn(size) {
        fontBtns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById(size === 14 ? 'fontS' : size === 18 ? 'fontL' : 'fontM');
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// ========================================
// 4. 移动端菜单（Mobile 5分）
// ========================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // 点击汉堡按钮展开/收起菜单
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
        menuBtn.innerHTML = mobileMenu.classList.contains('show')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // 点击菜单链接后自动关闭
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ========================================
// 5. AI 聊天机器人（Homepage 10分 - AI Greeting）
// ========================================
function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearChat');
    const chatMessages = document.getElementById('chatMessages');

    // 绑定发送按钮事件
    sendBtn.addEventListener('click', sendMessage);
    
    // 绑定回车键发送
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // 清空对话功能
    clearBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        addBotMessage('Conversation cleared. What would you like to explore next?');
    });

    // 发送消息函数
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // 添加用户消息
        addUserMessage(text);
        chatInput.value = '';

        // 模拟 AI 回复（1秒延迟）
        setTimeout(() => {
            const responses = [
                'Great question! According to the Central Angle Theorem...',
                'Let me analyze this for you...',
                'Simply put, the answer is...',
                'Welcome to Circle Planet! This is a key theorem...',
                'The angle at the centre is twice the angle at the circumference...'
            ];
            const random = responses[Math.floor(Math.random() * responses.length)];
            addBotMessage(random);
        }, 1000);
    }

    // 添加用户消息到聊天区
    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'message message-user';
        msg.innerHTML = `
            <div class="message-avatar"><i class="fas fa-user"></i></div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 添加 AI 消息到聊天区
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
// 6. 联系表单处理（Homepage 10分 - Contact Form）
// ========================================
function initForm() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');

    // 表单提交事件
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 检查隐私政策勾选（Ethical 2分）
        const privacyCheck = document.getElementById('privacyCheck');
        if (!privacyCheck.checked) {
            alert('Please agree to the Data Transmission Protocol first.');
            return;
        }

        // 显示确认弹窗（Wellbeing 3分 - 危险操作确认）
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // 关闭弹窗函数
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // 绑定关闭事件
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // 确认提交
    confirmBtn.addEventListener('click', () => {
        closeModal();
        showNotification('Signal sent successfully! We will reply soon.', 'success');
        form.reset();
    });
}

// ========================================
// 7. 广告横幅点击（Homepage 10分 - Profit-making）
// ========================================
function showPremiumAlert() {
    alert('🚀 Premium Feature\n\nThis feature is under development!\n\nFull Question Bank + 1v1 AI Tutor will be available soon.');
}

// ========================================
// 8. 通知提示功能
// ========================================
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // 3秒后自动消失
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// 9. 返回顶部按钮
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // 点击返回顶部
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// 10. 滚动动画效果（Creativity 10分）
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

    // 为卡片和区块添加滚动动画
    document.querySelectorAll('.theorem-card, .ai-chat, .contact-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// 11. 滚动到视频区域
// ========================================
function scrollToVideo() {
    document.getElementById('videoSection').scrollIntoView({ behavior: 'smooth' });
}