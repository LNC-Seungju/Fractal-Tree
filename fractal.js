const canvas = document.getElementById('canvas1');
const btnRandomize = document.getElementsByClassName('randomize');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = color2;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);

    // Curve Stem
    if(angle>0) {
        ctx.bezierCurveTo(-20, -len/2, 20, -len/2, 0, -len);
    }else {
        ctx.bezierCurveTo(20, -len/2, -20, -len/2, 0, -len);
    }
    btnRandomize[0].style.backgroundColor = color1;
    btnRandomize[0].style.color = color2;
    ctx.stroke();

    if(len < 20) {
        // Draw Leaf
        ctx.beginPath();
        ctx.arc(0, -len, 20, 0, Math.PI/2);
        ctx.fill();
        ctx.restore(); 
        return;
    }
    curve = Math.random()*15 + 10;

    // Next Branch - Recursion
    drawTree(0, -len, len * 0.85, angle + curve, branchWidth*0.7);
    drawTree(0, -len, len * 0.85, angle - curve, branchWidth*0.7);

    ctx.restore();
}

// Randomize Function
function drawRandomTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    let randomLen = Math.random()*80 + 60;
    let randomWidth = Math.random()*15 + 15;
    let randomColor1 = 'rgb('+ Math.random()*255 +','+ Math.random()*255 + ',' + Math.random()*255 + ')';
    let randomColor2 = 'rgb('+ Math.random()*255 +','+ Math.random()*255 + ',' + Math.random()*255 + ')';
    ctx.beginPath();
    drawTree(canvas.width/2, canvas.height - 80, randomLen, 0, randomWidth, randomColor1 ,randomColor2)
}
drawTree(canvas.width/2, canvas.height - 80, 100, 0, 30, 'brown', 'yellowGreen')

btnRandomize[0].addEventListener('click', drawRandomTree);