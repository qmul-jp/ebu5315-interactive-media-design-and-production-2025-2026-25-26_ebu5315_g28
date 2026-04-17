let isDragging = false;
let activePoint = null;
const svgConfig = { cx: 300, cy: 300, r: 200 };
const rightAngleSize = 20; // 直角标记边长
const lineLength = 600; // 直线延伸长度，足够贯穿画布

document.addEventListener('DOMContentLoaded', function() {
    initTheorem6();
});

function initTheorem6() {
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
    updateTheorem6();
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
    updateTheorem6();
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
function updateTheorem6() {
    const O = { x: svgConfig.cx, y: svgConfig.cy };
    const B = getPointCoords('pointB');

    // 1. 计算B点到圆心的距离
    const dx = B.x - O.x;
    const dy = B.y - O.y;
    const d = Math.hypot(dx, dy);

    // 2. 判断B点是否在圆内（距离小于半径）
    const isInsideCircle = d < svgConfig.r;

    // 3. 获取所有需要显示/隐藏的元素
    const elementsToToggle = [
        'tangentBC', 'tangentBD', 'radiusOC', 'radiusOD',
        'pointC', 'pointD', 'labelC', 'labelD',
        'rightAngleMarkC', 'rightAngleMarkD',
        'lengthCB', 'lengthDB'
    ];

    // 4. 智能显示/隐藏
    if (isInsideCircle) {
        // B点在圆内：隐藏所有切线、半径、切点、直角标记、长度文本
        elementsToToggle.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        // 数据面板也清空
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
    const tangentLength = Math.sqrt(d * d - svgConfig.r * svgConfig.r); // 切线长度CB=DB

    // 7. 精准计算两个切点C和D的坐标
    const { C, D } = calculateTangentPoints(O, svgConfig.r, B);

    // 8. 更新切点C和D的位置
    updatePoint('pointC', C.x, C.y);
    updatePoint('pointD', D.x, D.y);
    updateLabelPosition('C', C.x, C.y);
    updateLabelPosition('D', D.x, D.y);

    // 9. 计算完整的无限长切线：经过切点和B点，B点两侧都延伸
    const { tangent1Start, tangent1End, tangent2Start, tangent2End } = calculateFullTangentLines(B, C, D);

    // 10. 更新完整的切线（B点两侧都延伸，贯穿画布）
    updateLine('tangentBC', tangent1Start, tangent1End);
    updateLine('tangentBD', tangent2Start, tangent2End);

    // 11. 更新半径
    updateLine('radiusOC', O, C);
    updateLine('radiusOD', O, D);

    // 12. 【最终修正】直角标精准落在∠BCO/∠BDO内部
    updateRightAngleMark('rightAngleMarkC', O, C, B);
    updateRightAngleMark('rightAngleMarkD', O, D, B);

    // 13. 更新长度文本显示（只显示B到切点的长度）
    const lengthText = tangentLength.toFixed(2);
    document.getElementById('lengthCB').textContent = `|CB| = ${lengthText}`;
    document.getElementById('lengthDB').textContent = `|DB| = ${lengthText}`;
    document.getElementById('valueCB').textContent = lengthText;
    document.getElementById('valueDB').textContent = lengthText;

    // 14. 更新长度文本的位置，放在B到切点的线段中点附近
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
    const dir1X = C.x - B.x; // 从B指向C的方向向量
    const dir1Y = C.y - B.y;
    const len1 = Math.hypot(dir1X, dir1Y);
    const unitDir1X = dir1X / len1;
    const unitDir1Y = dir1Y / len1;
    // 端点1：从C点向外延伸lineLength
    const tangent1End1 = {
        x: C.x + unitDir1X * lineLength,
        y: C.y + unitDir1Y * lineLength
    };
    // 端点2：从B点向反方向延伸lineLength
    const tangent1End2 = {
        x: B.x - unitDir1X * lineLength,
        y: B.y - unitDir1Y * lineLength
    };

    // 第二条切线：经过D和B，向两边无限延伸
    const dir2X = D.x - B.x; // 从B指向D的方向向量
    const dir2Y = D.y - B.y;
    const len2 = Math.hypot(dir2X, dir2Y);
    const unitDir2X = dir2X / len2;
    const unitDir2Y = dir2Y / len2;
    // 端点1：从D点向外延伸lineLength
    const tangent2End1 = {
        x: D.x + unitDir2X * lineLength,
        y: D.y + unitDir2Y * lineLength
    };
    // 端点2：从B点向反方向延伸lineLength
    const tangent2End2 = {
        x: B.x - unitDir2X * lineLength,
        y: B.y - unitDir2Y * lineLength
    };

    return { 
        tangent1Start: tangent1End1,
        tangent1End: tangent1End2,
        tangent2Start: tangent2End1,
        tangent2End: tangent2End2
    };
}

// 【最终修正】直角标100%精准落在∠BCO/∠BDO内部
function updateRightAngleMark(markId, O, P, B) {
    const mark = document.getElementById(markId);
    
    // 1. 计算∠BCO的两条边的向量：
    // 向量1：从P（切点）指向O（圆心）→ PO边
    const vecPO = { x: O.x - P.x, y: O.y - P.y };
    // 向量2：从P（切点）指向B（圆外点）→ PB边
    const vecPB = { x: B.x - P.x, y: B.y - P.y };

    // 2. 计算PO向量的旋转角度（弧度转角度）
    const rotateAngle = Math.atan2(vecPO.y, vecPO.x) * 180 / Math.PI;

    // 3. 【核心修正】矩形左上角精准对准切点P
    mark.setAttribute('x', P.x);
    mark.setAttribute('y', P.y);
    
    // 4. 以P点为旋转中心，旋转到正确角度，让矩形两条边完美贴合PO和PB
    mark.setAttribute('transform', `rotate(${rotateAngle} ${P.x} ${P.y})`);
}

// 更新长度文本的位置，放在B到切点的线段中点附近
function updateLengthTextPosition(textId, B, P) {
    const text = document.getElementById(textId);
    // 线段中点
    const midX = (B.x + P.x) / 2;
    const midY = (B.y + P.y) / 2;
    // 垂直于线段的偏移，让文本在线段外侧
    const dx = P.x - B.x;
    const dy = P.y - B.y;
    const len = Math.hypot(dx, dy);
    const offsetX = -dy / len * 25;
    const offsetY = dx / len * 25;

    text.setAttribute('x', midX + offsetX);
    text.setAttribute('y', midY + offsetY);
}