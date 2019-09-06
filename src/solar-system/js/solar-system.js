  let cvs;
  let ctx;
  let sun = new Image();
  let moon = new Image();
  let earth = new Image();

  function init() {
    cvs = document.querySelector('#c');
    if (cvs.getContext) {
      ctx = cvs.getContext('2d');
    } else {
      alert('浏览器版本过旧，请升级至最新版本');
    }

    sun.src = '../img/sun.jpg';
    moon.src = '../img/moon.jpg';
    earth.src = '../img/earth.jpg';

    earth.onload = () => {
      draw();
    };
  }


  function draw() {
    const time = new Date();
    //每次绘画前需要先清空画布
    ctx.clearRect(0, 0, 800, 600);
    //先保存画布状态
    ctx.save();
    //开始绘画
    //画太阳
    //将太阳放在圆心，是为了让地球旋转更方便计算(rotate 的旋转是围绕画布原点旋转的)
    ctx.translate(400, 300);
    ctx.drawImage(sun, -40, -40, 80, 80); //x,y偏移量为自身大小的一半
    //地球轨道
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.arc(0, 0, 200, 0, 2 * Math.PI);
    ctx.stroke();
    //画地球
    //2 * Math.PI / 60 * time.getSeconds() 每一秒的移动
    //2 * Math.PI / 60000 * time.getMilliseconds() 每1毫秒的移动
    ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds());
    ctx.save();
    //地球自转
    ctx.translate(-200, 0);
    ctx.rotate(16 * Math.PI / 60 * time.getSeconds() + 16 * Math.PI / 60000 * time.getMilliseconds());
    ctx.drawImage(earth, -20, -20, 40, 40);
    ctx.beginPath();
    ctx.restore();
    //月球轨道
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.arc(-200, 0, 60, 0, 2 * Math.PI, false);
    ctx.stroke();
    //画月球
    //将画布原点放在月轨圆心，是为了让月球旋转更方便计算(rotate 的旋转是围绕画布原点旋转的)
    ctx.translate(-200, 0);
    ctx.rotate(8 * Math.PI / 60 * time.getSeconds() + 8 * Math.PI / 60000 * time.getMilliseconds());
    ctx.drawImage(moon, 50, 0, 20, 20);

    ctx.restore();

    requestAnimationFrame(draw);
  }

  init();