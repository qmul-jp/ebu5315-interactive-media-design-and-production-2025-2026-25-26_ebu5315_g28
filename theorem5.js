let isDragging = false;
let activePoint = null;
const svgConfig = { cx: 300, cy: 300, r: 200 };
const tangentLength = 400; // 切线长度，足够贯穿画布
const rightAngleSize = 25; // 正方形直角标的边长，和示例图一致

document.addEventListener('DOMContentLoaded', function() {
    initTheorem5();
});

function initTheorem5() {
    const svg = document.getElementById('theoremSvg');
    const pointP = document.getElementById('pointP');

    // 绑定拖拽事件
    pointP.addEventListener('mousedown', (e) => { e.preventDefault(); isDragging = true; activePoint = 'P'; });
    pointP.addEventListener('touchstart', (e) => { e.preventDefault(); isDragging = true; activePoint = 'P'; });

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', dragTouch, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // 初始化校正点位置
    forcePointOnCircle('P');
    updateTheorem5();
}

// 强制点在圆周上
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

// 更新P点标签位置，永远在圆外侧
function updateLabelPosition(pointKey, x, y) {
    const label = document.getElementById(`label${pointKey}`);
    const dx = x - svgConfig.cx;
    const dy = y - svgConfig.cy;
    let offsetX = 20, offsetY = 20;

    // 根据P点在圆的位置调整标签偏移
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

// 限制点在圆周上
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

// 核心更新函数
function updateTheorem5() {
    const O = { x: svgConfig.cx, y: svgConfig.cy };
    const P = getPointCoords('pointP');

    // 1. 更新半径线 OP
    updateLine('radiusLine', O, P);

    // 2. 核心向量计算
    const dx = P.x - O.x; // 从O指向P的X分量
    const dy = P.y - O.y; // 从O指向P的Y分量
    const len = Math.hypot(dx, dy);

    // 单位向量：从P指向圆心O（半径方向）
    const unitRadiusToO = { x: -dx / len, y: -dy / len };
    // 单位向量：切线方向（半径逆时针旋转90度，正确公式）
    const unitTangent = { x: -dy / len, y: dx / len };

    // 3. 更新切线（贯穿画布）
    const tangentStart = {
        x: P.x + unitTangent.x * tangentLength,
        y: P.y + unitTangent.y * tangentLength
    };
    const tangentEnd = {
        x: P.x - unitTangent.x * tangentLength,
        y: P.y - unitTangent.y * tangentLength
    };
    updateLine('tangentLine', tangentStart, tangentEnd);

    // 4. 【100%匹配示例图】更新正方形直角标记
    updateRightAngleMark(P, dx, dy, len);

    // 5. 更新90°文本位置，永远在直角旁边
    updateAngleTextPosition(P, unitRadiusToO, unitTangent);
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

// 【核心匹配示例图】正方形直角标记计算
function updateRightAngleMark(P, dx, dy, len) {
    const mark = document.getElementById('rightAngleMark');
    // 计算半径OP的旋转角度（从X轴正方向逆时针旋转的角度）
    const rotateAngle = Math.atan2(dy, dx) * 180 / Math.PI;

    // 设置正方形的位置：右下角顶点刚好在P点
    mark.setAttribute('x', P.x - rightAngleSize);
    mark.setAttribute('y', P.y - rightAngleSize);
    // 设置旋转：以P点为旋转中心，旋转角度和半径OP一致
    mark.setAttribute('transform', `rotate(${rotateAngle} ${P.x} ${P.y})`);
}

// 辅助函数：更新90°文本位置，永远不遮挡
function updateAngleTextPosition(P, unitRadiusToO, unitTangent) {
    const text = document.getElementById('angleText');
    // 文本放在直角的角平分线上，圆的外侧
    const bisectorX = unitRadiusToO.x + unitTangent.x;
    const bisectorY = unitRadiusToO.y + unitTangent.y;
    const textOffset = 35;
    text.setAttribute('x', P.x + bisectorX * textOffset);
    text.setAttribute('y', P.y + bisectorY * textOffset);
    document.getElementById('angleValue').textContent = '90°';
}