let isDragging = false;
let activePoint = null;

const svgConfig = {
    cx: 300,
    cy: 300,
    r: 200
};

document.addEventListener('DOMContentLoaded', function () {
    initTheorem2Interaction();
});

function initTheorem2Interaction() {
    const svg = document.getElementById('theoremSvg');
    const pointC = document.getElementById('pointC');

    pointC.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        activePoint = 'C';
    });

    svg.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    pointC.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDragging = true;
        activePoint = 'C';
    });

    svg.addEventListener('touchmove', dragTouch);
    document.addEventListener('touchend', endDrag);

    updateTheorem2();
}

function drag(e) {
    if (!isDragging || activePoint !== 'C') return;
    const svg = document.getElementById('theoremSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setPointOnCircle(p.x, p.y);
}

function dragTouch(e) {
    if (!isDragging || activePoint !== 'C') return;
    e.preventDefault();
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

    const c = document.getElementById('pointC');
    c.setAttribute('cx', nx);
    c.setAttribute('cy', ny);

    const lbl = document.getElementById('labelC');
    lbl.setAttribute('x', nx + (nx < svgConfig.cx ? -15 : 15));
    lbl.setAttribute('y', ny + (ny < svgConfig.cy ? -10 : 25));

    updateTheorem2();
}

function updateTheorem2() {
    const A = { x: 100, y: 300 };
    const B = { x: 500, y: 300 };
    const C = getPoint('pointC');

    const angle = calculateAngle(C, A, B);
    document.getElementById('angleC').textContent = Math.round(angle) + '°';

    setLine('lineAB', A, B);
    setLine('lineAC', A, C);
    setLine('lineBC', B, C);
    drawAngleArc(C, A, B, 25);
}

function getPoint(id) {
    const el = document.getElementById(id);
    return {
        x: parseFloat(el.getAttribute('cx')),
        y: parseFloat(el.getAttribute('cy'))
    };
}

function setLine(id, p1, p2) {
    const line = document.getElementById(id);
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
}

function calculateAngle(vertex, p1, p2) {
    const u1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const u2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
    const dot = u1.x * u2.x + u1.y * u2.y;
    const det = u1.x * u2.y - u1.y * u2.x;
    let a = Math.atan2(det, dot);
    if (a < 0) a += 2 * Math.PI;
    return a * 180 / Math.PI;
}

function drawAngleArc(v, p1, p2, r) {
    const a1 = Math.atan2(p1.y - v.y, p1.x - v.x);
    const a2 = Math.atan2(p2.y - v.y, p2.x - v.x);
    const x1 = v.x + r * Math.cos(a1);
    const y1 = v.y + r * Math.sin(a1);
    const x2 = v.x + r * Math.cos(a2);
    const y2 = v.y + r * Math.sin(a2);
    let d = a2 - a1;
    if (d < 0) d += 2 * Math.PI;
    const large = d > Math.PI ? 1 : 0;
    document.getElementById('arcAngle').setAttribute('d',
        `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
    );
}