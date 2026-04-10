const questionBank = {

easy: [

{
id:1,
question:"The angle at the center of a circle is ____ the angle at the circumference.",
options:["half","equal to","twice","three times"],
answer:"twice",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="230"  y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="70" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:2,
question:"A line from the center to the circle is called a ____.",
options:["diameter","radius","chord","arc"],
answer:"radius",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:3,
question:"A line passing through the center and touching both sides of the circle is a ____.",
options:["radius","arc","diameter","tangent"],
answer:"diameter",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:4,
question:"A line that touches the circle at exactly one point is called a ____.",
options:["tangent","diameter","chord","radius"],
answer:"tangent",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="20" y1="250" x2="280" y2="250" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:5,
question:"All radii of the same circle are ____.",
options:["different","equal","random","curved"],
answer:"equal",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="70" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:6,
question:"A straight line joining two points on a circle is called a ____.",
options:["chord","radius","tangent","arc"],
answer:"chord",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="80" x2="220" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:7,
question:"Half of a circle is called a ____.",
options:["arc","radius","semicircle","chord"],
answer:"semicircle",
svg:`<svg viewBox="0 0 300 300">
<path d="M50 150 A100 100 0 0 1 250 150" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:8,
question:"The distance around a circle is called ____.",
options:["diameter","area","circumference","radius"],
answer:"circumference",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#f59e0b" stroke-width="4" fill="none"/>
</svg>`
},

{
id:9,
question:"The center of a circle is the point ____.",
options:["on the edge","in the middle","outside","on a line"],
answer:"in the middle",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<circle cx="150" cy="150" r="6" fill="#4f46e5"/>
</svg>`
},

{
id:10,
question:"Two radii form an angle at the ____.",
options:["edge","center","diameter","arc"],
answer:"center",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="230" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="150" y1="150" x2="80" y2="80" stroke="#f59e0b" stroke-width="3"/>
</svg>`
}

],

medium:[

{
id:1,
question:"Angles in the same segment of a circle are ____.",
options:["equal","double","random","half"],
answer:"equal",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="70" y1="80" x2="230" y2="80" stroke="#4f46e5" stroke-width="3"/>
</svg>`
},

{
id:2,
question:"The angle in a semicircle is ____.",
options:["45°","60°","90°","180°"],
answer:"90°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#4f46e5" stroke-width="3"/>
</svg>`
},

{
id:3,
question:"A tangent is ____ to the radius at the point of contact.",
options:["parallel","equal","perpendicular","random"],
answer:"perpendicular",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#4f46e5" stroke-width="3"/>
<line x1="250" y1="150" x2="250" y2="50" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:4,
question:"Opposite angles of a cyclic quadrilateral sum to ____.",
options:["90°","180°","270°","360°"],
answer:"180°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:5,
question:"Equal chords are ____ from the center.",
options:["nearer","equidistant","random","farther"],
answer:"equidistant",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="80" x2="220" y2="80" stroke="#f59e0b" stroke-width="3"/>
<line x1="80" y1="220" x2="220" y2="220" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:6,
question:"The perpendicular from the center to a chord ____ the chord.",
options:["bisects","touches","crosses","extends"],
answer:"bisects",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="80" y1="100" x2="220" y2="100" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:7,
question:"Angles subtended by the same arc are ____.",
options:["equal","double","random","half"],
answer:"equal",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:8,
question:"The longest chord of a circle is the ____.",
options:["arc","radius","diameter","tangent"],
answer:"diameter",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:9,
question:"A diameter divides the circle into ____ equal parts.",
options:["1","2","3","4"],
answer:"2",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
},

{
id:10,
question:"The radius is ____ the diameter.",
options:["half of","equal to","twice","triple"],
answer:"half of",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="3"/>
</svg>`
}

],

hard:[

{
id:1,
question:"If the central angle is 120°, the angle at the circumference is ____.",
options:["30°","60°","90°","120°"],
answer:"60°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:2,
question:"Angles in the same segment are ____.",
options:["equal","double","random","opposite"],
answer:"equal",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:3,
question:"If radius is 5, diameter is ____.",
options:["5","8","10","12"],
answer:"10",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="80" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:4,
question:"The angle between tangent and radius is ____.",
options:["30°","60°","90°","120°"],
answer:"90°",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:5,
question:"The diameter is ____ the radius.",
options:["half","equal","twice","triple"],
answer:"twice",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:6,
question:"The center of a circle is equidistant from all ____.",
options:["points on the circle","lines","diameters","angles"],
answer:"points on the circle",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:7,
question:"An arc is part of the ____.",
options:["circle","radius","diameter","center"],
answer:"circle",
svg:`<svg viewBox="0 0 300 300">
<path d="M80 220 A100 100 0 0 1 220 220" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:8,
question:"Two diameters always intersect at the ____.",
options:["edge","center","arc","random point"],
answer:"center",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
<line x1="50" y1="150" x2="250" y2="150" stroke="#f59e0b"/>
<line x1="150" y1="50" x2="150" y2="250" stroke="#f59e0b"/>
</svg>`
},

{
id:9,
question:"A tangent touches the circle at ____ point.",
options:["one","two","three","four"],
answer:"one",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
},

{
id:10,
question:"If diameter is 20, radius is ____.",
options:["5","10","15","20"],
answer:"10",
svg:`<svg viewBox="0 0 300 300">
<circle cx="150" cy="150" r="100" stroke="#4f46e5" stroke-width="3" fill="none"/>
</svg>`
}

]

};
