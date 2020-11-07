let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');
let circle1 = [];
let circle2 = [];
let circle3 = [];
let circle4 = [];
let circle5 = [];
let circle6 = [];
let circle7 = [];
let circle8 = [];
let speed = 50;
let frameCount = 0;
let r = 400
const applyHSL = true;
const magicNB = 1.417


function setup () {
    canvas.width = 2 * r + 5;
    canvas.height = 2 * r + 5;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.centerX = canvas.width / 2
    canvas.centerY = canvas.height / 2;
}

function loop() {
    frameCount++;
    ctx.clearRect(-canvas.width, -canvas.height,canvas.width * 2,canvas.height * 2);
    
    calcPoints(circle1, false, Math.PI, 'white', canvas.centerX, canvas.centerY + r);
    calcPoints(circle2, true, 90 * Math.PI / 180, 'white', canvas.centerX - r, canvas.centerY);
    calcPoints(circle3, true, -90 * Math.PI / 180, 'red', canvas.centerX + r, canvas.centerY);
    calcPoints(circle4, false, 2 * Math.PI, 'red', canvas.centerX, canvas.centerY - r);
    calcPoints(circle5, true, 45 * Math.PI / 180, 'green', canvas.centerX - r / magicNB, canvas.centerY + r / magicNB);
    calcPoints(circle6, false , -135 * Math.PI / 180, 'green', canvas.centerX + r / magicNB, canvas.centerY + r / magicNB);
    calcPoints(circle7, false, 45 * Math.PI / 180, 'blue', canvas.centerX - r / magicNB, canvas.centerY - r / magicNB);
    calcPoints(circle8, true , -135 * Math.PI / 180, 'blue', canvas.centerX + r / magicNB, canvas.centerY - r / magicNB);
    
    draw(circle1);
    draw(circle2);
    draw(circle3);
    draw(circle4);
    draw(circle5);
    draw(circle6);
    draw(circle7);
    draw(circle8);

    window.requestAnimationFrame(loop);
}

function newPoints(x, y, endAt, size = 3, color = 'white') {
    return { x, y, endAt, color, size };
}

function calcPoints(points, clockwise = true, offsetAngle = 0, color, offsetX, offsetY ) {
    let angle = clockwise
        ? (frameCount / speed) + offsetAngle
        : (-frameCount / speed) - offsetAngle;
    let vector2 = vectorFromAngle(angle, r, offsetX, offsetY);
    let point = newPoints(vector2.x, vector2.y, frameCount + 100 + speed, 3, color)

    if(distanceFromCenter(point.x, point.y) < magicNB * r + 2) {
        if (applyHSL)
            point.color = setColor(frameCount);
        points.push(point);
    }

    while(points[0] && points[0].endAt < frameCount) {
        points.shift();
    }

    return points;
}

function setColor(val) {
    return`hsl(${val * 2 % 360}, 50%, 50%)`;
}

function draw(points) {
    for(let i = 1; i < points.length; i++) {
        let p = points[i];
        ctx.beginPath();
        ctx.moveTo(points[i-1].x, points[i-1].y)
        ctx.strokeStyle = p.color
        ctx.lineWidth = p.size
        if ( i % 60 === 0 )
            ctx.lineWidth = p.size + 5;
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }
}


function vectorFromAngle(angle, length, offsetX = 0, offsetY = 0) {
    return {
        x: length * Math.cos(angle) + offsetX,
        y: length * Math.sin(angle) + offsetY
    };
}

function distanceFromCenter(x,y) {
    return Math.sqrt(Math.pow((x - canvas.centerX),2) + Math.pow((y - canvas.centerY),2));
}

setup();
loop();