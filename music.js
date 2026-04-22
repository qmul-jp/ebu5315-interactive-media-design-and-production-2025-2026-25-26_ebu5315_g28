/* ========================================
   共享背景音乐控制模块
   所有页面共用这一个文件
   ======================================== */

let backgroundMusic = null;
let isMusicPlaying = false;

function initMusicControl() {
    const musicBtn = document.getElementById('musicBtn');

    if (!musicBtn) {
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
        // 初始化时也要更新图标状态
        updateMusicIcon();
    }

    // 点击按钮切换音乐
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            isMusicPlaying = false;
            localStorage.setItem('musicEnabled', 'false');
        } else {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                localStorage.setItem('musicEnabled', 'true');
            }).catch(e => {
                console.log('Music playback failed');
            });
        }
        updateMusicIcon();
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initMusicControl);
