init();

function init() {
  const canvas = document.querySelector('#c');
  const ctx = canvas.getContext('2d');
  draw(ctx);
}

function draw(ctx) {
  step();

  function step() {
    drawDial(ctx);
    drawAllHands(ctx);
    requestAnimationFrame(arguments.callee);
  };
}

function drawAllHands(ctx) {
  const time = new Date();

  const s = time.getSeconds();
  const m = time.getMinutes();
  const h = time.getHours();

  const PI = Math.PI;

  // 1pi = 180°  2pi = 360° 360/60 = 6° => PI / 180 * 6 6°(一小格)的弧长
  const secRad = PI / 180 * 6 * s;
  const minRad = PI / 180 * 6 * m + secRad / 60;
  // 360°/12 => PI / 180 * 30 
  const hRad = PI / 180 * 30 * h + minRad / 12;

  drawHand(hRad, 120, 12, 'rgb(100,0,0)', ctx);
  drawHand(minRad, 180, 8, 'rgb(0,100,0)', ctx);
  drawHand(secRad, 260, 2, 'rgb(0,0,100)', ctx);
}

function drawHand(radian, length, width, color, ctx) {
  ctx.save();
  ctx.translate(400, 300);
  ctx.rotate(-Math.PI / 2 + radian);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(length, 0);
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawDial(ctx) {
  const PI = Math.PI;
  ctx.clearRect(0, 0, 800, 600);
  ctx.save();
  ctx.translate(400, 300);
  ctx.beginPath();
  ctx.arc(0, 0, 298, 0, 2 * PI);
  ctx.closePath();
  ctx.stroke();

  for (let i = 0; i < 60; i++) {
    ctx.save();
    //2 * PI / 360 * (360/60) => PI / 30 
    ctx.rotate(-PI / 2 + i * PI / 30);
    ctx.beginPath();
    ctx.moveTo(250, 0);
    ctx.lineTo(280, 0);
    // i % 5 ? '' : ctx.fillText(Math.floor(i / 5) + 1, 230, 0);
    ctx.lineWidth = i % 5 ? 2 : 4;
    ctx.strokeStyle = i % 5 ? 'rgb(100,100,100)' : 'rgb(200,0,100)';
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}