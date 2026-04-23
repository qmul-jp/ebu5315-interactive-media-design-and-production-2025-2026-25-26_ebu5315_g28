/**
 * Circle Planet Quiz - 题目库
 * 支持中英文双语
 * 包含 Easy, Medium, Hard 三个难度等级
 * 共60题：每个难度20题
 */

const questionBank = {

easy: [

{
id:1,
question_en:"The angle at the center of a circle is ____ the angle at the circumference.",
question_zh:"圆心角的度数是圆周角的____。",
options_en:["half","equal to","twice","three times"],
options_zh:["一半","相等","两倍","三倍"],
answer_en:"twice",
answer_zh:"两倍",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="230" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="70" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:2,
question_en:"A line from the center to the circle is called a ____.",
question_zh:"从圆心到圆上的连线叫做____。",
options_en:["diameter","radius","chord","arc"],
options_zh:["直径","半径","弦","弧"],
answer_en:"radius",
answer_zh:"半径",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:3,
question_en:"A line passing through the center and touching both sides of the circle is a ____.",
question_zh:"经过圆心并与圆相交于两点的线段是____。",
options_en:["radius","arc","diameter","tangent"],
options_zh:["半径","弧","直径","切线"],
answer_en:"diameter",
answer_zh:"直径",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:4,
question_en:"A line that touches the circle at exactly one point is called a ____.",
question_zh:"只与圆相交于一点的直线叫做____。",
options_en:["tangent","diameter","chord","radius"],
options_zh:["切线","直径","弦","半径"],
answer_en:"tangent",
answer_zh:"切线",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="20" y1="250" x2="280" y2="250" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:5,
question_en:"All radii of the same circle are ____.",
question_zh:"同一个圆的所有半径都____。",
options_en:["different","equal","random","curved"],
options_zh:["不同","相等","随机","弯曲"],
answer_en:"equal",
answer_zh:"相等",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="70" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:6,
question_en:"A straight line joining two points on a circle is called a ____.",
question_zh:"连接圆上两点的直线叫做____。",
options_en:["chord","radius","tangent","arc"],
options_zh:["弦","半径","切线","弧"],
answer_en:"chord",
answer_zh:"弦",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="80" x2="220" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:7,
question_en:"Half of a circle is called a ____.",
question_zh:"圆的一半叫做____。",
options_en:["arc","radius","semicircle","chord"],
options_zh:["弧","半径","半圆","弦"],
answer_en:"semicircle",
answer_zh:"半圆",
svg:`<svg viewBox="0 0 300 300">
<path d="M50 150 A100 100 0 0 1 250 150" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:8,
question_en:"The distance around a circle is called ____.",
question_zh:"圆一周的长度叫做____。",
options_en:["diameter","area","circumference","radius"],
options_zh:["直径","面积","周长","半径"],
answer_en:"circumference",
answer_zh:"周长",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#f59e0b" stroke-width="4" fill="none"/>
</svg>`
},

{
id:9,
question_en:"The center of a circle is the point ____.",
question_zh:"圆心是____的点。",
options_en:["on the edge","in the middle","outside","on a line"],
options_zh:["在边上","在中间","在外面","在线上"],
answer_en:"in the middle",
answer_zh:"在中间",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<circle cx="150" cy="150" r="6" fill="#4f46e5"/>
</svg>`
},

{
id:10,
question_en:"Two radii form an angle at the ____.",
question_zh:"两条半径在____形成角。",
options_en:["edge","center","diameter","arc"],
options_zh:["边上","圆心","直径","弧"],
answer_en:"center",
answer_zh:"圆心",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="230" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="80" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:11,
question_en:"The diameter is ____ the radius.",
question_zh:"直径是半径的____。",
options_en:["half","equal","twice","triple"],
options_zh:["一半","相等","两倍","三倍"],
answer_en:"twice",
answer_zh:"两倍",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:12,
question_en:"The formula for circumference is ____ (r = radius).",
question_zh:"周长的公式是____ (r = 半径)。",
options_en:["πr","2πr","πr²","2r"],
options_zh:["πr","2πr","πr²","2r"],
answer_en:"2πr",
answer_zh:"2πr",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:13,
question_en:"The diameter goes through the ____ of the circle.",
question_zh:"直径穿过圆的____。",
options_en:["edge","center","arc","circumference"],
options_zh:["边缘","圆心","弧","周长"],
answer_en:"center",
answer_zh:"圆心",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
<circle cx="150" cy="150" r="5" fill="#f59e0b"/>
</svg>`
},

{
id:14,
question_en:"The radius is from the center to any point on the ____.",
question_zh:"半径是从圆心到圆____上任意一点的连线。",
options_en:["center","edge","diameter","chord"],
options_zh:["圆心","边缘","直径","弦"],
answer_en:"edge",
answer_zh:"边缘",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:15,
question_en:"An arc is part of the ____ of a circle.",
question_zh:"弧是圆____的一部分。",
options_en:["center","diameter","circumference","radius"],
options_zh:["圆心","直径","周长","半径"],
answer_en:"circumference",
answer_zh:"周长",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<path d="M100 60 A100 100 0 0 1 200 60" stroke="#f59e0b" stroke-width="4" fill="none"/>
</svg>`
},

{
id:16,
question_en:"A chord that passes through the center is called the ____.",
question_zh:"经过圆心的弦叫做____。",
options_en:["radius","tangent","diameter","arc"],
options_zh:["半径","切线","直径","弧"],
answer_en:"diameter",
answer_zh:"直径",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:17,
question_en:"How many equal parts does a diameter divide a circle into?",
question_zh:"直径把圆分成几个相等部分？",
options_en:["1","2","3","4"],
options_zh:["1","2","3","4"],
answer_en:"2",
answer_zh:"2",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:18,
question_en:"The part of a circle between two points is called an ____.",
question_zh:"圆上两点之间的部分叫做____。",
options_en:["chord","arc","sector","segment"],
options_zh:["弦","弧","扇形","弓形"],
answer_en:"arc",
answer_zh:"弧",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<path d="M80 100 A100 100 0 0 1 220 100" stroke="#f59e0b" stroke-width="3" fill="none"/>
</svg>`
},

{
id:19,
question_en:"A tangent line is always ____ to a radius at the contact point.",
question_zh:"切线在切点处总是____于半径的。",
options_en:["parallel","equal","perpendicular","parallel to diameter"],
options_zh:["平行","相等","垂直","平行于直径"],
answer_en:"perpendicular",
answer_zh:"垂直",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
<line x1="250" y1="150" x2="250" y2="50" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:20,
question_en:"The longest distance across a circle is the ____.",
question_zh:"圆上最长的距离是____。",
options_en:["radius","circumference","diameter","chord"],
options_zh:["半径","周长","直径","弦"],
answer_en:"diameter",
answer_zh:"直径",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
}

],

medium:[

{
id:1,
question_en:"Angles in the same segment of a circle are ____.",
question_zh:"同弧所对的圆周角____。",
options_en:["equal","double","random","half"],
options_zh:["相等","两倍","随机","一半"],
answer_en:"equal",
answer_zh:"相等",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="70" y1="80" x2="230" y2="80" stroke="#4f46e5" stroke-width="3"/>
</svg>`
},

{
id:2,
question_en:"The angle in a semicircle is ____.",
question_zh:"半圆所对的圆周角是____。",
options_en:["45°","60°","90°","180°"],
options_zh:["45°","60°","90°","180°"],
answer_en:"90°",
answer_zh:"90°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#4f46e5" stroke-width="3"/>
</svg>`
},

{
id:3,
question_en:"A tangent is ____ to the radius at the point of contact.",
question_zh:"切线在切点处____于半径。",
options_en:["parallel","equal","perpendicular","random"],
options_zh:["平行","相等","垂直","随机"],
answer_en:"perpendicular",
answer_zh:"垂直",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#4f46e5" stroke-width="3"/>
<line x1="250" y1="150" x2="250" y2="50" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:4,
question_en:"Opposite angles of a cyclic quadrilateral sum to ____.",
question_zh:"圆内接四边形的对角之和等于____。",
options_en:["90°","180°","270°","360°"],
options_zh:["90°","180°","270°","360°"],
answer_en:"180°",
answer_zh:"180°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:5,
question_en:"Equal chords are ____ from the center.",
question_zh:"相等的弦到圆心的距离____。",
options_en:["nearer","equidistant","random","farther"],
options_zh:["更近","相等","随机","更远"],
answer_en:"equidistant",
answer_zh:"相等",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="80" x2="220" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="80" y1="220" x2="220" y2="220" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:6,
question_en:"The perpendicular from the center to a chord ____ the chord.",
question_zh:"从圆心到弦的垂线____弦。",
options_en:["bisects","touches","crosses","extends"],
options_zh:["平分","接触","穿过","延长"],
answer_en:"bisects",
answer_zh:"平分",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="100" x2="220" y2="100" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:7,
question_en:"Angles subtended by the same arc are ____.",
question_zh:"同弧所对的圆周角____。",
options_en:["equal","double","random","half"],
options_zh:["相等","两倍","随机","一半"],
answer_en:"equal",
answer_zh:"相等",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:8,
question_en:"The longest chord of a circle is the ____.",
question_zh:"圆最长的弦是____。",
options_en:["arc","radius","diameter","tangent"],
options_zh:["弧","半径","直径","切线"],
answer_en:"diameter",
answer_zh:"直径",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:9,
question_en:"A diameter divides the circle into ____ equal parts.",
question_zh:"直径把圆分成____等份。",
options_en:["1","2","3","4"],
options_zh:["1","2","3","4"],
answer_en:"2",
answer_zh:"2",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:10,
question_en:"The radius is ____ the diameter.",
question_zh:"半径是直径的____。",
options_en:["half of","equal to","twice","triple"],
options_zh:["一半","相等","两倍","三倍"],
answer_en:"half of",
answer_zh:"一半",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:11,
question_en:"If the central angle is 80°, the angle at the circumference subtending the same arc is ____.",
question_zh:"如果圆心角是80°，则同弧所对的圆周角是____。",
options_en:["40°","80°","160°","20°"],
options_zh:["40°","80°","160°","20°"],
answer_en:"40°",
answer_zh:"40°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="230" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="70" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:12,
question_en:"The angle formed by two tangents drawn from an external point is ____ the difference of the intercepted arcs.",
question_zh:"从圆外一点作的两条切线所成的角等于____。",
options_en:["half","equal to","twice","three times"],
options_zh:["一半","相等","两倍","三倍"],
answer_en:"half",
answer_zh:"一半",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="80" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="280" y2="50" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="280" y2="250" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:13,
question_en:"Angles in opposite segments are ____.",
question_zh:"异弧所对的圆周角____。",
options_en:["equal","supplementary","complementary","vertical"],
options_zh:["相等","互补","互余","对顶"],
answer_en:"supplementary",
answer_zh:"互补",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:14,
question_en:"The angle between a tangent and a chord through the point of contact is equal to the angle in the ____.",
question_zh:"切线和过切点的弦所成的角等于____的角。",
options_en:["center","alternate segment","semicircle","opposite arc"],
options_zh:["圆心"," alternate segment（对应弧）","半圆","异弧"],
answer_en:"alternate segment",
answer_zh:"对应弧",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="250" y1="150" x2="250" y2="50" stroke="#f59e0b" stroke-width="3"/>
<line x1="250" y1="150" x2="100" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:15,
question_en:"Equal arcs subtend ____ chords.",
question_zh:"相等的弧所对的弦____。",
options_en:["unequal","equal","longer","shorter"],
options_zh:["不相等","相等","更长","更短"],
answer_en:"equal",
answer_zh:"相等",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<path d="M80 80 A100 100 0 0 1 220 80" stroke="#f59e0b" stroke-width="3" fill="none"/>
</svg>`
},

{
id:16,
question_en:"If two circles touch externally, the distance between centers equals ____ of their radii.",
question_zh:"如果两圆外切，圆心距等于它们的半径____。",
options_en:["difference","sum","product","ratio"],
options_zh:["差","和","积","比"],
answer_en:"sum",
answer_zh:"和",
svg:`<svg viewBox="0 0 300 300">
<circle cx="100" cy="150" r="50" stroke="#4f46e5" stroke-width="3" fill="none"/>
<circle cx="200" cy="150" r="50" stroke="#f59e0b" stroke-width="3" fill="none"/>
<line x1="100" y1="150" x2="200" y2="150" stroke="#22c55e" stroke-width="3"/>
</svg>`
},

{
id:17,
question_en:"The angle at the center is always ____ the angle at the circumference for the same arc.",
question_zh:"对于同一条弧，圆心角总是____圆周角。",
options_en:["half","equal to","twice","three times"],
options_zh:["一半","相等","两倍","三倍"],
answer_en:"twice",
answer_zh:"两倍",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="230" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="70" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:18,
question_en:"Equal chords subtend ____ angles at the center.",
question_zh:"相等的弦在圆心所对的角____。",
options_en:["unequal","equal","smaller","larger"],
options_zh:["不相等","相等","更小","更大"],
answer_en:"equal",
answer_zh:"相等",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="80" x2="220" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:19,
question_en:"If a radius bisects a chord, it is ____ to the chord.",
question_zh:"如果半径平分弦，则它____于弦。",
options_en:["parallel","equal","perpendicular","tangent"],
options_zh:["平行","相等","垂直","相切"],
answer_en:"perpendicular",
answer_zh:"垂直",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="100" x2="220" y2="100" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="150" y2="100" stroke="#22c55e" stroke-width="3"/>
</svg>`
},

{
id:20,
question_en:"A quadrilateral with all vertices on a circle is called a ____.",
question_zh:"四个顶点都在圆上的四边形叫做____。",
options_en:["tangent quadrilateral","cyclic quadrilateral","secant quadrilateral","chord quadrilateral"],
options_zh:["切线四边形","圆内接四边形","割线四边形","弦四边形"],
answer_en:"cyclic quadrilateral",
answer_zh:"圆内接四边形",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="80" x2="220" y2="80" stroke="#f59e0b" stroke-width="2"/>
<line x1="220" y1="80" x2="220" y2="220" stroke="#f59e0b" stroke-width="2"/>
<line x1="220" y1="220" x2="80" y2="220" stroke="#f59e0b" stroke-width="2"/>
<line x1="80" y1="220" x2="80" y2="80" stroke="#f59e0b" stroke-width="2"/>
</svg>`
}

],

hard:[

{
id:1,
question_en:"If the central angle is 120°, the angle at the circumference is ____.",
question_zh:"如果圆心角是120°，则圆周角是____。",
options_en:["30°","60°","90°","120°"],
options_zh:["30°","60°","90°","120°"],
answer_en:"60°",
answer_zh:"60°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:2,
question_en:"Angles in the same segment are ____.",
question_zh:"同弧所对的圆周角____。",
options_en:["equal","double","random","opposite"],
options_zh:["相等","两倍","随机","相反"],
answer_en:"equal",
answer_zh:"相等",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:3,
question_en:"If radius is 5, diameter is ____.",
question_zh:"如果半径是5，则直径是____。",
options_en:["5","8","10","12"],
options_zh:["5","8","10","12"],
answer_en:"10",
answer_zh:"10",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="80" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:4,
question_en:"The angle between tangent and radius is ____.",
question_zh:"切线和半径之间的夹角是____。",
options_en:["30°","60°","90°","120°"],
options_zh:["30°","60°","90°","120°"],
answer_en:"90°",
answer_zh:"90°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:5,
question_en:"The diameter is ____ the radius.",
question_zh:"直径是半径的____。",
options_en:["half","equal","twice","triple"],
options_zh:["一半","相等","两倍","三倍"],
answer_en:"twice",
answer_zh:"两倍",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:6,
question_en:"The center of a circle is equidistant from all ____.",
question_zh:"圆心到____的所有点的距离相等。",
options_en:["points on the circle","lines","diameters","angles"],
options_zh:["圆上的点","线","直径","角"],
answer_en:"points on the circle",
answer_zh:"圆上的点",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:7,
question_en:"An arc is part of the ____.",
question_zh:"弧是____的一部分。",
options_en:["circle","radius","diameter","center"],
options_zh:["圆","半径","直径","圆心"],
answer_en:"circle",
answer_zh:"圆",
svg:`<svg viewBox="0 0 300 300">
<path d="M80 220 A100 100 0 0 1 220 220" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:8,
question_en:"Two diameters always intersect at the ____.",
question_zh:"两条直径总在____相交。",
options_en:["edge","center","arc","random point"],
options_zh:["边上","圆心","弧","随机点"],
answer_en:"center",
answer_zh:"圆心",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b"/>
<line x1="150" y1="50" x2="150" y2="250" stroke="#f59e0b"/>
</svg>`
},

{
id:9,
question_en:"A tangent touches the circle at ____ point.",
question_zh:"切线与圆相切于____点。",
options_en:["one","two","three","four"],
options_zh:["一","两","三","四"],
answer_en:"one",
answer_zh:"一",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:10,
question_en:"If diameter is 20, radius is ____.",
question_zh:"如果直径是20，则半径是____。",
options_en:["5","10","15","20"],
options_zh:["5","10","15","20"],
answer_en:"10",
answer_zh:"10",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:11,
question_en:"If central angle is 36°, and circumference is 2π, the arc length is ____.",
question_zh:"如果圆心角是36°，周长是2π，弧长是____。",
options_en:["π/5","2π/5","π/10","π"],
options_zh:["π/5","2π/5","π/10","π"],
answer_en:"π/5",
answer_zh:"π/5",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<path d="M150 150 L250 150 A100 100 0 0 0 170 67" stroke="#f59e0b" stroke-width="3" fill="none"/>
</svg>`
},

{
id:12,
question_en:"The angle between two tangents from an external point is 60°, the measure of the intercepted arc is ____.",
question_zh:"从圆外一点作的两条切线夹角为60°，则所截弧的度数是____。",
options_en:["60°","120°","180°","300°"],
options_zh:["60°","120°","180°","300°"],
answer_en:"120°",
answer_zh:"120°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="80" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="280" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="280" y2="220" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:13,
question_en:"If two chords intersect inside a circle, the products of the segments are ____.",
question_zh:"如果两弦在圆内相交，则两弦分段长度的乘积____。",
options_en:["equal","different","zero","infinite"],
options_zh:["相等","不相等","为零","无穷"],
answer_en:"equal",
answer_zh:"相等",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="100" x2="220" y2="200" stroke="#f59e0b" stroke-width="3"/>
<line x1="80" y1="200" x2="220" y2="100" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:14,
question_en:"The area of a circle with radius 7 is ____ (use π = 22/7).",
question_zh:"半径为7的圆面积是____（π取22/7）。",
options_en:["44","154","308","616"],
options_zh:["44","154","308","616"],
answer_en:"154",
answer_zh:"154",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:15,
question_en:"If two secants intersect outside a circle, the external segment times whole secant of one equals ____ of the other.",
question_zh:"如果两割线在圆外相交，则一条割线的外段乘整条割线____另一条割线的相应乘积。",
options_en:["is greater than","is less than","equals","is unrelated to"],
options_zh:["大于","小于","等于","无关"],
answer_en:"equals",
answer_zh:"等于",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="80" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="280" y1="150" x2="150" y2="150" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="80" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:16,
question_en:"The angle subtended by a semicircle at the circumference is ____.",
question_zh:"半圆在圆周上所成的角是____。",
options_en:["45°","90°","180°","360°"],
options_zh:["45°","90°","180°","360°"],
answer_en:"90°",
answer_zh:"90°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#4f46e5" stroke-width="3"/>
</svg>`
},

{
id:17,
question_en:"If the circumference is 44 units, the diameter is ____ (π = 22/7).",
question_zh:"如果周长是44单位，则直径是____（π = 22/7）。",
options_en:["7","14","21","28"],
options_zh:["7","14","21","28"],
answer_en:"14",
answer_zh:"14",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:18,
question_en:"The angle between a tangent and a chord equals the angle in the alternate ____.",
question_zh:"切线和弦的夹角等于异侧弧所对的____。",
options_en:["semicircle","segment","arc","sector"],
options_zh:["半圆","segment（弓形）","弧","扇形"],
answer_en:"segment",
answer_zh:"弓形",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="250" y1="150" x2="250" y2="50" stroke="#f59e0b" stroke-width="3"/>
<line x1="250" y1="150" x2="100" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:19,
question_en:"Equal chords are ____ from the center.",
question_zh:"相等的弦到圆心的距离____。",
options_en:["nearer","farther","equidistant","variable"],
options_zh:["更近","更远","相等","不相等"],
answer_en:"equidistant",
answer_zh:"相等",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="70" y1="100" x2="230" y2="100" stroke="#f59e0b" stroke-width="3"/>
<line x1="70" y1="200" x2="230" y2="200" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:20,
question_en:"If a chord is 24 units from the center and radius is 13, the chord length is ____.",
question_zh:"如果弦到圆心的距离是24，半径是13，则弦长是____。",
options_en:["5","10","12","24"],
options_zh:["5","10","12","24"],
answer_en:"10",
answer_zh:"10",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="130" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="100" y1="150" x2="200" y2="150" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="150" y2="120" stroke="#22c55e" stroke-width="2"/>
</svg>`
}

]

};
