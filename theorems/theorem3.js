let isDragging = false;
let activePoint = null;

// 圆的配置：和HTML完全一致
const svgConfig = {
    cx: 300,
    cy: 300,
    r: 200
};

document.addEventListener('DOMContentLoaded', function () {
    initTheorem3Interaction();
});

function initTheorem3Interaction() {
    const svg = document.getElementById('theoremSvg');
    const pointA = document.getElementById('pointA');
    const pointB = document.getElementById('pointB');
    const pointC = document.getElementById('pointC');
    const pointD = document.getElementById('pointD');

    // 【新增】初始化时强制校正所有点到圆周上（双重保险）
    forcePointOnCircle('pointA');
    forcePointOnCircle('pointB');
    forcePointOnCircle('pointC');
    forcePointOnCircle('pointD');

    // 绑定所有4个点的拖拽事件
    pointA.addEventListener('mousedown', (e) => startDrag(e, 'A'));
    pointA.addEventListener('touchstart', (e) => startDrag(e, 'A'), { passive: false });
    
    pointB.addEventListener('mousedown', (e) => startDrag(e, 'B'));
    pointB.addEventListener('touchstart', (e) => startDrag(e, 'B'), { passive: false });
    
    pointC.addEventListener('mousedown', (e) => startDrag(e, 'C'));
    pointC.addEventListener('touchstart', (e) => startDrag(e, 'C'), { passive: false });
    
    pointD.addEventListener('mousedown', (e) => startDrag(e, 'D'));
    pointD.addEventListener('touchstart', (e) => startDrag(e, 'D'), { passive: false });

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', dragTouch, { passive: false });
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // 初始渲染
    updateTheorem3();
}

// 【新增】强制将点校正到圆周上的辅助函数
function forcePointOnCircle(pointId) {
    const point = document.getElementById(pointId);
    const label = document.getElementById(`label${pointId.slice(-1)}`);
    
    let x = parseFloat(point.getAttribute('cx'));
    let y = parseFloat(point.getAttribute('cy'));
    
    const dx = x - svgConfig.cx;
    const dy = y - svgConfig.cy;
    const len = Math.hypot(dx, dy);
    
    // 强制校正到圆周上
    const nx = svgConfig.cx + dx / len * svgConfig.r;
    const ny = svgConfig.cy + dy / len * svgConfig.r;
    
    point.setAttribute('cx', nx);
    point.setAttribute('cy', ny);
    
    // 同时校正标签位置
    let offsetX = 15, offsetY = -10;
    if (nx < svgConfig.cx) offsetX = -30;
    if (ny > svgConfig.cy) offsetY = 25;
    label.setAttribute('x', nx + offsetX);
    label.setAttribute('y', ny + offsetY);
}

// 开始拖拽
function startDrag(e, pointKey) {
    e.preventDefault();
    isDragging = true;
    activePoint = pointKey;
}

// 桌面端拖拽
function drag(e) {
    if (!isDragging || !activePoint) return;
    const svg = document.getElementById('theoremSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPointOnCircle(p.x, p.y);
}

// 移动端拖拽
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

// 结束拖拽
function endDrag() {
    isDragging = false;
    activePoint = null;
}

// 限制点在圆周上（所有点都可以在整个圆上自由移动）
function setPointOnCircle(x, y) {
    const dx = x - svgConfig.cx;
    const dy = y - svgConfig.cy;
    const len = Math.hypot(dx, dy);
    
    // 强制限制在圆周上
    const nx = svgConfig.cx + dx / len * svgConfig.r;
    const ny = svgConfig.cy + dy / len * svgConfig.r;

    // 更新点位置
    const pointEl = document.getElementById(`point${activePoint}`);
    pointEl.setAttribute('cx', nx);
    pointEl.setAttribute('cy', ny);

    // 更新标签位置
    const labelEl = document.getElementById(`label${activePoint}`);
    let offsetX = 15, offsetY = -10;
    if (nx < svgConfig.cx) offsetX = -30;
    if (ny > svgConfig.cy) offsetY = 25;
    labelEl.setAttribute('x', nx + offsetX);
    labelEl.setAttribute('y', ny + offsetY);

    // 实时更新图形和角度
    updateTheorem3();
}

// 更新图形和角度计算
function updateTheorem3() {
    const A = getPointCoords('pointA');
    const B = getPointCoords('pointB');
    const C = getPointCoords('pointC');
    const D = getPointCoords('pointD');

    // 计算两个圆周角
    const angleACB = calculateAngle(C, A, B);
    const angleADB = calculateAngle(D, A, B);

    // 更新数据面板
    document.getElementById('angleC').textContent = Math.round(angleACB) + '°';
    document.getElementById('angleD').textContent = Math.round(angleADB) + '°';

    // 更新所有连线
    updateLine('lineAC', A, C);
    updateLine('lineBC', B, C);
    updateLine('lineAD', A, D);
    updateLine('lineBD', B, D);

    // 绘制角度弧（强制只画锐角）
    drawAcuteAngleArc('arcC', C, A, B, 30);
    drawAcuteAngleArc('arcD', D, A, B, 30);
}

// 辅助函数：获取点坐标
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

// 辅助函数：计算两点之间的夹角（精确计算圆周角，取锐角）
function calculateAngle(vertex, p1, p2) {
    const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
    
    const dot = v1.x * v2.x + v1.y * v2.y;
    const det = v1.x * v2.y - v1.y * v2.x;
    
    let angle = Math.atan2(det, dot);
    if (angle < 0) angle += 2 * Math.PI;
    
    // 转换为角度，取锐角（保证和数据面板一致）
    const angleInDeg = angle * (180 / Math.PI);
    return angleInDeg > 180 ? 360 - angleInDeg : angleInDeg;
}

// 核心修改：只在锐角一侧绘制角度弧
function drawAcuteAngleArc(id, centre, p1, p2, radius) {
    const path = document.getElementById(id);
    if (!path) return;
    
    // 计算两个方向的角度
    let startAngle = Math.atan2(p1.y - centre.y, p1.x - centre.x);
    let endAngle = Math.atan2(p2.y - centre.y, p2.x - centre.x);

    // 计算角度差，判断是锐角还是钝角
    let angleDiff = endAngle - startAngle;
    if (angleDiff < 0) angleDiff += 2 * Math.PI;
    
    // 如果是钝角，交换起点和终点，强制画锐角
    if (angleDiff > Math.PI) {
        [startAngle, endAngle] = [endAngle, startAngle];
        angleDiff = 2 * Math.PI - angleDiff;
    }

    // 计算弧的起点和终点坐标
    const x1 = centre.x + radius * Math.cos(startAngle);
    const y1 = centre.y + radius * Math.sin(startAngle);
    const x2 = centre.x + radius * Math.cos(endAngle);
    const y2 = centre.y + radius * Math.sin(endAngle);

    // 因为已经强制为锐角，所以largeArcFlag永远是0
    const largeArcFlag = 0;
    // sweepFlag设为1，保证绘制方向正确
    const sweepFlag = 1;

    const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;
    path.setAttribute('d', d);
}