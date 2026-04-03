/* ========================================
   Game 主页面逻辑
   只负责卡片点击跳转，无复杂逻辑，双击完全兼容
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // 绑定所有卡片的点击跳转
    const cards = document.querySelectorAll('.theorem-card');
    
    cards.forEach(card => {
        // 只给有跳转链接的卡片绑定事件
        const href = card.getAttribute('data-href');
        if (href) {
            // 点击跳转
            card.addEventListener('click', () => {
                window.location.href = href;
            });
            // 键盘回车/空格跳转
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = href;
                }
            });
        }
    });
});