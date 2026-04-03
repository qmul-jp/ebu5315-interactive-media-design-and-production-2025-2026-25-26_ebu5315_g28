let isDragging = false;
let activePoint = null;
const svgConfig = { cx: 300, cy: 300, r: 200 };
const arcRadius = 30; // 角度弧的半径
const tangentLength = 400; // 切线延伸长度，足够贯穿画布

document.addEventListener('DOMContentLoaded', function() {
    initTheorem8();
});

function initTheorem8() {
    const svg = document.getElementById('theoremSvg');
    const draggablePoints = ['A', 'B', 'C'];

    // 绑定三个点的拖拽事件
    draggablePoints.forEach(pointKey => {
        const point = document.getElementById(`point${pointKey}`);
        point.addEventListener('mousedown', (e) => { 
            e.preventDefault(); 
            isDragging = true; 
            activePoint = pointKey; 
        });
        point.addEventListener('touchstart', (e) => { 
            e.preventDefault(); 
            isDragging = true; 
            activePoint = pointKey; 
        });
    });

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', dragTouch, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // 初始化校正所有点的位置，确保都在圆上
    draggablePoints.forEach(pointKey => forcePointOnCircle(pointKey));
    updateTheorem8();
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

// 更新标签位置，永远在点的外侧不遮挡
function updateLabelPosition(pointKey, x, y) {
    const label = document.getElementById(`label${pointKey}`);
    const dx = x - svgConfig.cx;
    const dy = y - svgConfig.cy;
    let offsetX = 15, offsetY = -10;

    if (Math.abs(dx) > Math.abs(dy)) {
        offsetX = dx > 0 ? 15 : -30;
    } else {
        offsetY = dy > 0 ? 25 : -15;
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

    updateTheorem8();
}

// 核心更新函数
function updateTheorem8() {
    const O = { x: svgConfig.cx, y: svgConfig.cy };
    const A = getPointCoords('pointA');
    const B = getPointCoords('pointB');
    const C = getPointCoords('pointC');

    // 1. 更新三角形的三条弦
    updateLine('lineAB', A, B);
    updateLine('lineAC', A, C);
    updateLine('lineBC', B, C);

    // 2. 计算并更新过A点的切线（垂直于半径OA）
    const dxOA = A.x - O.x;
    const dyOA = A.y - O.y;
    // 切线方向：垂直于OA，向量为(-dyOA, dxOA)
    const tangentDirX = -dyOA;
    const tangentDirY = dxOA;
    const lenTangent = Math.hypot(tangentDirX, tangentDirY);
    const unitTangentX = tangentDirX / lenTangent;
    const unitTangentY = tangentDirY / lenTangent;
    // 切线的两个端点，从A点向两边无限延伸
    const tangentStart = {
        x: A.x + unitTangentX * tangentLength,
        y: A.y + unitTangentY * tangentLength
    };
    const tangentEnd = {
        x: A.x - unitTangentX * tangentLength,
        y: A.y - unitTangentY * tangentLength
    };
    updateLine('tangentLine', tangentStart, tangentEnd);

    // 3. 计算四个核心角度
    // 弦切角1：切线与AB的夹角
    const angleTangentAB = calculateAngle(A, tangentStart, B);
    // 弦切角2：切线与AC的夹角
    const angleTangentAC = calculateAngle(A, tangentEnd, C);
    // 圆周角B：∠ABC
    const angleABC = calculateAngle(B, A, C);
    // 圆周角C：∠ACB
    const angleACB = calculateAngle(C, A, B);

    // 4. 绘制四个角度的弧
    drawAngleArc('arcTangent1', A, tangentStart, B, arcRadius);
    drawAngleArc('arcTangent2', A, tangentEnd, C, arcRadius);
    drawAngleArc('arcAngleB', B, A, C, arcRadius);
    drawAngleArc('arcAngleC', C, A, B, arcRadius);

    // 5. 更新角度文本显示
    const textTangent1 = angleTangentAB.toFixed(0);
    const textTangent2 = angleTangentAC.toFixed(0);
    const textAngleB = angleABC.toFixed(0);
    const textAngleC = angleACB.toFixed(0);

    // SVG内的角度文本
    document.getElementById('textTangent1').textContent = `${textTangent1}°`;
    document.getElementById('textTangent2').textContent = `${textTangent2}°`;
    document.getElementById('textAngleB').textContent = `${textAngleB}°`;
    document.getElementById('textAngleC').textContent = `${textAngleC}°`;

    // 数据面板的角度文本
    document.getElementById('valueTangent1').textContent = `${textTangent1}°`;
    document.getElementById('valueTangent2').textContent = `${textTangent2}°`;
    document.getElementById('valueAngleB').textContent = `${textAngleB}°`;
    document.getElementById('valueAngleC').textContent = `${textAngleC}°`;

    // 6. 更新角度文本的位置
    updateAngleTextPosition('textTangent1', A, tangentStart, B, arcRadius);
    updateAngleTextPosition('textTangent2', A, tangentEnd, C, arcRadius);
    updateAngleTextPosition('textAngleB', B, A, C, arcRadius);
    updateAngleTextPosition('textAngleC', C, A, B, arcRadius);
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

// 计算两个向量的夹角（顶点在vertex，边为p1-vertex-p2），返回角度值
function calculateAngle(vertex, p1, p2) {
    const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
    const dot = v1.x * v2.x + v1.y * v2.y;
    const det = v1.x * v2.y - v1.y * v2.x;
    let angle = Math.atan2(det, dot);
    if (angle < 0) angle += 2 * Math.PI;
    const degree = angle * 180 / Math.PI;
    // 取小于180°的角
    return degree > 180 ? 360 - degree : degree;
}

// 绘制角度弧（扇形）
function drawAngleArc(arcId, vertex, p1, p2, radius) {
    const arc = document.getElementById(arcId);
    
    // 计算两个边的向量
    const vec1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const vec2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
    
    // 计算起始和结束角度
    let startAngle = Math.atan2(vec1.y, vec1.x);
    let endAngle = Math.atan2(vec2.y, vec2.x);
    
    // 处理角度差，确保绘制的是小角
    let angleDiff = endAngle - startAngle;
    if (angleDiff < 0) angleDiff += 2 * Math.PI;
    if (angleDiff > Math.PI) {
        [startAngle, endAngle] = [endAngle, startAngle];
        angleDiff = 2 * Math.PI - angleDiff;
    }

    // 计算弧的两个端点
    const x1 = vertex.x + radius * Math.cos(startAngle);
    const y1 = vertex.y + radius * Math.sin(startAngle);
    const x2 = vertex.x + radius * Math.cos(endAngle);
    const y2 = vertex.y + radius * Math.sin(endAngle);

    // 生成扇形路径
    const largeArcFlag = angleDiff > Math.PI ? 1 : 0;
    const sweepFlag = 1;
    const pathData = `M ${vertex.x} ${vertex.y} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z`;
    
    arc.setAttribute('d', pathData);
}

// 更新角度文本的位置，放在角平分线上
function updateAngleTextPosition(textId, vertex, p1, p2, radius) {
    const text = document.getElementById(textId);
    
    // 计算角平分线方向
    const vec1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const vec2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
    
    // 单位化向量
    const len1 = Math.hypot(vec1.x, vec1.y);
    const len2 = Math.hypot(vec2.x, vec2.y);
    const unitVec1 = { x: vec1.x / len1, y: vec1.y / len1 };
    const unitVec2 = { x: vec2.x / len2, y: vec2.y / len2 };
    
    // 角平分线向量
    const bisector = { x: unitVec1.x + unitVec2.x, y: unitVec1.y + unitVec2.y };
    const bisectorLen = Math.hypot(bisector.x, bisector.y);
    const unitBisector = { x: bisector.x / bisectorLen, y: bisector.y / bisectorLen };
    
    // 文本位置：角平分线上，弧的外侧
    const textOffset = radius + 12;
    text.setAttribute('x', vertex.x + unitBisector.x * textOffset);
    text.setAttribute('y', vertex.y + unitBisector.y * textOffset);
}