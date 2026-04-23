let isDragging = false;
let activePoint = null;
const svgConfig = { cx:300, cy:300, r:200 };

document.addEventListener('DOMContentLoaded', function() {
    initTheorem4();
});

function initTheorem4() {
    const svg = document.getElementById('theoremSvg');
    const points = ['A','B','C','D'];
    
    points.forEach(p => {
        const el = document.getElementById(`point${p}`);
        el.addEventListener('mousedown', () => { isDragging = true; activePoint = p; });
        el.addEventListener('touchstart', (e) => { e.preventDefault(); isDragging = true; activePoint = p; });
    });

    svg.addEventListener('mousemove', drag);
    svg.addEventListener('touchmove', (e) => { e.preventDefault(); dragTouch(e); });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // 初始化时强制所有点在圆上
    points.forEach(p => forcePointOnCircle(p));
    updateTheorem4();
}

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
    let offsetX = 15, offsetY = -10;
    if (nx < svgConfig.cx) offsetX = -30;
    if (ny > svgConfig.cy) offsetY = 25;
    label.setAttribute('x', nx + offsetX);
    label.setAttribute('y', ny + offsetY);
}

function drag(e) {
    if (!isDragging || !activePoint) return;
    const svg = document.getElementById('theoremSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPointOnCircle(p.x, p.y);
}

function dragTouch(e) {
    if (!isDragging || !activePoint) return;
    const svg = document.getElementById('theoremSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.touches[0].clientX;
    pt.y = e.touches[0].clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPointOnCircle(p.x, p.y);
}

function endDrag() {
    isDragging = false;
    activePoint = null;
}

function setPointOnCircle(x, y) {
    const dx = x - svgConfig.cx;
    const dy = y - svgConfig.cy;
    const len = Math.hypot(dx, dy);
    const nx = svgConfig.cx + dx / len * svgConfig.r;
    const ny = svgConfig.cy + dy / len * svgConfig.r;
    const point = document.getElementById(`point${activePoint}`);
    point.setAttribute('cx', nx);
    point.setAttribute('cy', ny);
    const label = document.getElementById(`label${activePoint}`);
    let offsetX = 15, offsetY = -10;
    if (nx < svgConfig.cx) offsetX = -30;
    if (ny > svgConfig.cy) offsetY = 25;
    label.setAttribute('x', nx + offsetX);
    label.setAttribute('y', ny + offsetY);
    updateTheorem4();
}

function updateTheorem4() {
    const A = getPt('pointA'), B = getPt('pointB'), C = getPt('pointC'), D = getPt('pointD');
    
    const angleA = calculateAngle(A, D, B);
    const angleB = calculateAngle(B, A, C);
    const angleC = calculateAngle(C, B, D);
    const angleD = calculateAngle(D, C, A);
    
    const sumAC = Math.round(angleA + angleC);
    const sumBD = Math.round(angleB + angleD);

    document.getElementById('angleA').textContent = Math.round(angleA) + '°';
    document.getElementById('angleB').textContent = Math.round(angleB) + '°';
    document.getElementById('angleC').textContent = Math.round(angleC) + '°';
    document.getElementById('angleD').textContent = Math.round(angleD) + '°';
    document.getElementById('sumAC').textContent = sumAC + '°';
    document.getElementById('sumBD').textContent = sumBD + '°';

    updateLine('lineAB', A, B);
    updateLine('lineBC', B, C);
    updateLine('lineCD', C, D);
    updateLine('lineDA', D, A);

    drawAcuteAngleArc('arcA', A, D, B, 30);
    drawAcuteAngleArc('arcB', B, A, C, 30);
    drawAcuteAngleArc('arcC', C, B, D, 30);
    drawAcuteAngleArc('arcD', D, C, A, 30);
}

function getPt(id) {
    const el = document.getElementById(id);
    return {x:parseFloat(el.getAttribute('cx')), y:parseFloat(el.getAttribute('cy'))};
}

function updateLine(id, p1, p2) {
    const l = document.getElementById(id);
    l.setAttribute('x1', p1.x); l.setAttribute('y1', p1.y);
    l.setAttribute('x2', p2.x); l.setAttribute('y2', p2.y);
}

function calculateAngle(vertex, p1, p2) {
    const v1 = {x:p1.x-vertex.x, y:p1.y-vertex.y};
    const v2 = {x:p2.x-vertex.x, y:p2.y-vertex.y};
    const dot = v1.x*v2.x + v1.y*v2.y;
    const det = v1.x*v2.y - v1.y*v2.x;
    let a = Math.atan2(det, dot);
    if (a < 0) a += 2*Math.PI;
    const deg = a * 180 / Math.PI;
    return deg > 180 ? 360 - deg : deg;
}

function drawAcuteAngleArc(id, centre, p1, p2, radius) {
    const path = document.getElementById(id);
    if (!path) return;
    let startAngle = Math.atan2(p1.y - centre.y, p1.x - centre.x);
    let endAngle = Math.atan2(p2.y - centre.y, p2.x - centre.x);
    let angleDiff = endAngle - startAngle;
    if (angleDiff < 0) angleDiff += 2*Math.PI;
    if (angleDiff > Math.PI) {
        [startAngle, endAngle] = [endAngle, startAngle];
        angleDiff = 2*Math.PI - angleDiff;
    }
    const x1 = centre.x + radius * Math.cos(startAngle);
    const y1 = centre.y + radius * Math.sin(startAngle);
    const x2 = centre.x + radius * Math.cos(endAngle);
    const y2 = centre.y + radius * Math.sin(endAngle);
    const largeArcFlag = 0;
    const sweepFlag = 1;
    path.setAttribute('d', `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`);
}