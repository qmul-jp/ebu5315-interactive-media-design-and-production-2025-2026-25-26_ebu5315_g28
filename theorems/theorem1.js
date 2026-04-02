/* ========================================
   Theorem 1: Angle at the Centre - 专属交互逻辑
   拖拽点、实时角度计算、图形更新
   ======================================== */

// 状态变量
let isDragging = false;
let activePoint = null;

// SVG 坐标配置
const svgConfig = {
    cx: 300,
    cy: 300,
    r: 200
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initTheorem1Interaction();
});

// ========================================
// 核心交互逻辑
// ========================================
function initTheorem1Interaction() {
    const svg = document.getElementById('theoremSvg');
    if (!svg) return;

    // 可拖拽的点
    const points = {
        A: document.getElementById('pointA'),
        B: document.getElementById('pointB'),
        C: document.getElementById('pointC')
    };

    // 点的标签
    const labels = {
        A: document.getElementById('labelA'),
        B: document.getElementById('labelB'),
        C: document.getElementById('labelC')
    };

    // ========================================
    // ✅【修复】初始化强制把 A B C 全部放在圆上
    // ========================================
    forceAllPointsOnCircle();

    // 绑定鼠标/触摸事件
    Object.keys(points).forEach(key => {
        // 鼠标按下开始拖拽
        points[key].addEventListener('mousedown', (e) => startDrag(e, key));
        // 触摸开始拖拽（移动端兼容）
        points[key].addEventListener('touchstart', (e) => startDrag(e, key), { passive: false });
    });

    // 拖拽过程
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', drag, { passive: false });
    
    // 结束拖拽
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // 初始渲染
    updateTheorem1();

    // --- 内部函数 ---
    // 开始拖拽
    function startDrag(e, pointKey) {
        e.preventDefault();
        isDragging = true;
        activePoint = pointKey;
    }

    // 拖拽中更新点位置
    function drag(e) {
        if (!isDragging || !activePoint) return;
        e.preventDefault();

        // 获取鼠标/触摸在SVG中的坐标
        const svg = document.getElementById('theoremSvg');
        const pt = svg.createSVGPoint();
        
        if (e.touches) {
            // 移动端触摸坐标
            pt.x = e.touches[0].clientX;
            pt.y = e.touches[0].clientY;
        } else {
            // 桌面端鼠标坐标
            pt.x = e.clientX;
            pt.y = e.clientY;
        }

        // 转换为SVG内部坐标
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

        // 计算角度，把点限制在圆周上
        const dx = svgP.x - svgConfig.cx;
        const dy = svgP.y - svgConfig.cy;
        const angle = Math.atan2(dy, dx);

        // 计算圆周上的新坐标
        const newX = svgConfig.cx + svgConfig.r * Math.cos(angle);
        const newY = svgConfig.cy + svgConfig.r * Math.sin(angle);

        // 更新点的位置
        points[activePoint].setAttribute('cx', newX);
        points[activePoint].setAttribute('cy', newY);

        // 更新标签位置
        updateLabelPosition(activePoint, newX, newY);

        // 实时更新图形和角度
        updateTheorem1();
    }

    // 结束拖拽
    function endDrag() {
        isDragging = false;
        activePoint = null;
    }

    // 动态调整标签位置，避免被图形遮挡
    function updateLabelPosition(key, x, y) {
        let offsetX = 15, offsetY = 5;
        
        // 根据点在圆上的象限调整标签偏移
        if (x < svgConfig.cx) offsetX = -30;
        if (y > svgConfig.cy) offsetY = 25;
        if (y < svgConfig.cy) offsetY = -10;

        labels[key].setAttribute('x', x + offsetX);
        labels[key].setAttribute('y', y + offsetY);
    }

    // ✅ 强制所有点回到圆上
    function forceAllPointsOnCircle() {
        ['A', 'B', 'C'].forEach(key => {
            const point = points[key];
            let x = parseFloat(point.getAttribute('cx'));
            let y = parseFloat(point.getAttribute('cy'));

            const dx = x - svgConfig.cx;
            const dy = y - svgConfig.cy;
            const dist = Math.hypot(dx, dy);
            const nx = svgConfig.cx + (dx / dist) * svgConfig.r;
            const ny = svgConfig.cy + (dy / dist) * svgConfig.r;

            point.setAttribute('cx', nx);
            point.setAttribute('cy', ny);
            updateLabelPosition(key, nx, ny);
        });
    }
}

// ========================================
// 图形更新与角度计算 —— 完全不变
// ========================================
function updateTheorem1() {
    // 获取所有点的坐标
    const O = { x: svgConfig.cx, y: svgConfig.cy };
    const A = getPointCoords('pointA');
    const B = getPointCoords('pointB');
    const C = getPointCoords('pointC');

    // 计算圆心角和圆周角
    const angleAOB = calculateAngle(O, A, B); // 圆心角 ∠AOB
    const angleACB = calculateAngle(C, A, B); // 圆周角 ∠ACB

    // 更新数据面板
    document.getElementById('angleCentre').textContent = Math.round(angleAOB) + '°';
    document.getElementById('angleCircum').textContent = Math.round(angleACB) + '°';

    // 更新连线
    updateLine('lineOA', O, A);
    updateLine('lineOB', O, B);
    updateLine('lineCA', C, A);
    updateLine('lineCB', C, B);

    // 绘制角度弧
    drawArc('arcCentre', O, A, B, 40, 'centre');
    drawArc('arcCircum', C, A, B, 30, 'circum');
}

// 辅助函数：获取点的坐标
function getPointCoords(id) {
    const el = document.getElementById(id);
    return {
        x: parseFloat(el.getAttribute('cx')),
        y: parseFloat(el.getAttribute('cy'))
    };
}

// 辅助函数：更新线段
function updateLine(id, p1, p2) {
    const line = document.getElementById(id);
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
}

// 辅助函数：计算两点之间的夹角
function calculateAngle(vertex, p1, p2) {
    const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
    
    const dot = v1.x * v2.x + v1.y * v2.y;
    const det = v1.x * v2.y - v1.y * v2.x;
    
    let angle = Math.atan2(det, dot);
    if (angle < 0) angle += 2 * Math.PI;
    
    return angle * (180 / Math.PI);
}

// 辅助函数：绘制角度弧
function drawArc(id, centre, p1, p2, radius, type) {
    const path = document.getElementById(id);
    if (!path) return;
    
    const startAngle = Math.atan2(p1.y - centre.y, p1.x - centre.x);
    const endAngle = Math.atan2(p2.y - centre.y, p2.x - centre.x);

    const x1 = centre.x + radius * Math.cos(startAngle);
    const y1 = centre.y + radius * Math.sin(startAngle);
    const x2 = centre.x + radius * Math.cos(endAngle);
    const y2 = centre.y + radius * Math.sin(endAngle);

    // 计算角度差，决定大弧/小弧
    let angleDiff = endAngle - startAngle;
    if (angleDiff < 0) angleDiff += 2 * Math.PI;
    
    const largeArcFlag = angleDiff > Math.PI ? 1 : 0;
    // 构建SVG路径
    const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    path.setAttribute('d', d);
}