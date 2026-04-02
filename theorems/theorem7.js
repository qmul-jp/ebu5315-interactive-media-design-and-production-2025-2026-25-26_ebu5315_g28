let isDragging = false;
let activePoint = null;
const svgConfig = { cx: 300, cy: 300, r: 200 };
const arcRadius = 35; // 角扇形的半径
const lineLength = 600; // 切线延伸长度，足够贯穿画布

document.addEventListener('DOMContentLoaded', function() {
    initTheorem7();
});

function initTheorem7() {
    const svg = document.getElementById('theoremSvg');
    const pointB = document.getElementById('pointB');

    // 绑定拖拽事件（仅B点可拖动）
    pointB.addEventListener('mousedown', (e) => { e.preventDefault(); isDragging = true; activePoint = 'B'; });
    pointB.addEventListener('touchstart', (e) => { e.preventDefault(); isDragging = true; activePoint = 'B'; });

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', dragTouch, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // 初始化
    updateTheorem7();
}

// 桌面端拖拽
function drag(e) {
    if (!isDragging || !activePoint) return;
    const svg = document.getElementById('theoremSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPointBPosition(p.x, p.y);
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
    setPointBPosition(p.x, p.y);
}

// 结束拖拽
function endDrag() {
    isDragging = false;
    activePoint = null;
}

// B点完全自由拖动，无限制
function setPointBPosition(x, y) {
    const pointB = document.getElementById('pointB');
    pointB.setAttribute('cx', x);
    pointB.setAttribute('cy', y);
    updateLabelPosition('B', x, y);

    // 实时更新整个图形
    updateTheorem7();
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

// 核心更新函数
function updateTheorem7() {
    const O = { x: svgConfig.cx, y: svgConfig.cy };
    const B = getPointCoords('pointB');

    // 1. 计算B点到圆心的距离
    const dx = B.x - O.x;
    const dy = B.y - O.y;
    const OB_length = Math.hypot(dx, dy);

    // 2. 判断B点是否在圆内（距离小于半径）
    const isInsideCircle = OB_length < svgConfig.r;

    // 3. 获取所有需要显示/隐藏的元素
    const elementsToToggle = [
        'tangentBC', 'tangentBD', 'radiusOC', 'radiusOD', 'lineOB',
        'pointC', 'pointD', 'labelC', 'labelD',
        'arcAngleCBO', 'arcAngleDBO',
        'angleCBO', 'angleDBO', 'lengthCB', 'lengthDB'
    ];

    // 4. 智能显示/隐藏
    if (isInsideCircle) {
        // B点在圆内：隐藏所有元素
        elementsToToggle.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        // 数据面板清空
        document.getElementById('valueCBO').textContent = '--';
        document.getElementById('valueDBO').textContent = '--';
        document.getElementById('valueCB').textContent = '--';
        document.getElementById('valueDB').textContent = '--';
        return;
    }

    // 5. B点在圆外：显示所有组件
    elementsToToggle.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block';
    });

    // 6. 计算核心参数
    const tangentLength = Math.sqrt(OB_length * OB_length - svgConfig.r * svgConfig.r); // 切线长度CB=DB
    const angleCBO = Math.asin(svgConfig.r / OB_length) * 180 / Math.PI; // ∠CBO=∠DBO

    // 7. 精准计算两个切点C和D的坐标
    const { C, D } = calculateTangentPoints(O, svgConfig.r, B);

    // 8. 更新切点C和D的位置
    updatePoint('pointC', C.x, C.y);
    updatePoint('pointD', D.x, D.y);
    updateLabelPosition('C', C.x, C.y);
    updateLabelPosition('D', D.x, D.y);

    // 9. 计算完整的无限长切线
    const { tangent1Start, tangent1End, tangent2Start, tangent2End } = calculateFullTangentLines(B, C, D);

    // 10. 更新切线、半径、角平分线OB
    updateLine('tangentBC', tangent1Start, tangent1End);
    updateLine('tangentBD', tangent2Start, tangent2End);
    updateLine('radiusOC', O, C);
    updateLine('radiusOD', O, D);
    updateLine('lineOB', O, B);

    // 11. 绘制两个角的扇形标记
    drawAngleArc('arcAngleCBO', B, C, O, arcRadius, 'CBO');
    drawAngleArc('arcAngleDBO', B, D, O, arcRadius, 'DBO');

    // 12. 更新角度和长度文本
    const angleText = angleCBO.toFixed(1);
    const lengthText = tangentLength.toFixed(2);
    // 角度文本
    document.getElementById('angleCBO').textContent = `${angleText}°`;
    document.getElementById('angleDBO').textContent = `${angleText}°`;
    document.getElementById('valueCBO').textContent = `${angleText}°`;
    document.getElementById('valueDBO').textContent = `${angleText}°`;
    // 长度文本
    document.getElementById('lengthCB').textContent = `|CB| = ${lengthText}`;
    document.getElementById('lengthDB').textContent = `|DB| = ${lengthText}`;
    document.getElementById('valueCB').textContent = lengthText;
    document.getElementById('valueDB').textContent = lengthText;

    // 13. 更新角度文本的位置
    updateAngleTextPosition('angleCBO', B, C, O, arcRadius);
    updateAngleTextPosition('angleDBO', B, D, O, arcRadius);
    // 更新长度文本的位置
    updateLengthTextPosition('lengthCB', B, C);
    updateLengthTextPosition('lengthDB', B, D);
}

// 辅助函数：获取点坐标
function getPointCoords(id) {
    const el = document.getElementById(id);
    return {
        x: parseFloat(el.getAttribute('cx')),
        y: parseFloat(el.getAttribute('cy'))
    };
}

// 辅助函数：更新点位置
function updatePoint(id, x, y) {
    const el = document.getElementById(id);
    el.setAttribute('cx', x);
    el.setAttribute('cy', y);
}

// 辅助函数：更新线段
function updateLine(id, p1, p2) {
    const line = document.getElementById(id);
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
}

// 精准计算圆外一点到圆的两个切点坐标
function calculateTangentPoints(O, r, B) {
    const dx = B.x - O.x;
    const dy = B.y - O.y;
    const d = Math.hypot(dx, dy);
    
    // 单位向量OB（从O指向B）
    const ux = dx / d;
    const uy = dy / d;
    
    // 切线与OB的夹角
    const theta = Math.acos(r / d);
    
    // 旋转矩阵，计算两个切点的方向
    const c1x = Math.cos(theta);
    const c1y = -Math.sin(theta);
    const c2x = Math.cos(theta);
    const c2y = Math.sin(theta);
    
    // 计算切点坐标
    const C = {
        x: O.x + r * (ux * c1x - uy * c1y),
        y: O.y + r * (ux * c1y + uy * c1x)
    };
    const D = {
        x: O.x + r * (ux * c2x - uy * c2y),
        y: O.y + r * (ux * c2y + uy * c2x)
    };

    return { C, D };
}

// 计算完整的无限长切线：经过切点和B点，B点两侧都延伸
function calculateFullTangentLines(B, C, D) {
    // 第一条切线：经过C和B，向两边无限延伸
    const dir1X = C.x - B.x;
    const dir1Y = C.y - B.y;
    const len1 = Math.hypot(dir1X, dir1Y);
    const unitDir1X = dir1X / len1;
    const unitDir1Y = dir1Y / len1;
    const tangent1End1 = { x: C.x + unitDir1X * lineLength, y: C.y + unitDir1Y * lineLength };
    const tangent1End2 = { x: B.x - unitDir1X * lineLength, y: B.y - unitDir1Y * lineLength };

    // 第二条切线：经过D和B，向两边无限延伸
    const dir2X = D.x - B.x;
    const dir2Y = D.y - B.y;
    const len2 = Math.hypot(dir2X, dir2Y);
    const unitDir2X = dir2X / len2;
    const unitDir2Y = dir2Y / len2;
    const tangent2End1 = { x: D.x + unitDir2X * lineLength, y: D.y + unitDir2Y * lineLength };
    const tangent2End2 = { x: B.x - unitDir2X * lineLength, y: B.y - unitDir2Y * lineLength };

    return { 
        tangent1Start: tangent1End1,
        tangent1End: tangent1End2,
        tangent2Start: tangent2End1,
        tangent2End: tangent2End2
    };
}

// 绘制角的扇形弧
function drawAngleArc(arcId, vertex, p1, p2, radius, angleType) {
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

// 更新角度文本的位置
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
    const textOffset = radius + 15;
    text.setAttribute('x', vertex.x + unitBisector.x * textOffset);
    text.setAttribute('y', vertex.y + unitBisector.y * textOffset);
}

// 更新长度文本的位置
function updateLengthTextPosition(textId, B, P) {
    const text = document.getElementById(textId);
    const midX = (B.x + P.x) / 2;
    const midY = (B.y + P.y) / 2;
    const dx = P.x - B.x;
    const dy = P.y - B.y;
    const len = Math.hypot(dx, dy);
    const offsetX = -dy / len * 25;
    const offsetY = dx / len * 25;

    text.setAttribute('x', midX + offsetX);
    text.setAttribute('y', midY + offsetY);
}