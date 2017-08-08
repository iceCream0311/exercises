var canvas = document.getElementById("rating"),
  ctx = canvas.getContext("2d"),
  //   所占分数
  percent = 50,
  circleX = canvas.width / 2, // 中心x坐标
  circleY = canvas.height / 2, // 中心y坐标
  radius = 120, // 圆环半径
  lineWidth = 15, // 圆形线条的宽度
  fontSize = 50; // 字体大小

let lineWidthL = 10

// 画弧圆
function circle(cx, cy, r) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = '#90ece6';
  ctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25);
  ctx.stroke();
}

// 画弧线
function sector(cx, cy, r, startAngle, endAngle, anti) {
  ctx.beginPath();
  ctx.lineWidth = lineWidthL;

  // 渐变色 - 可自定义
  var linGrad = ctx.createLinearGradient(
    circleX, circleY - radius - lineWidth, circleX, circleY + radius + lineWidth
  );
  linGrad.addColorStop(0.00, '#ffba4d'); // 绿色
  linGrad.addColorStop(1.00, '#ff7163'); // 红色
  ctx.strokeStyle = linGrad;

  // 圆弧两端的样式
  ctx.lineCap = 'round';

  // 圆弧
  ctx.arc(cx, cy, r, startAngle, endAngle * (Math.PI / 180.0) + Math.PI * 0.75)
  ctx.stroke();
}

// 画圆圈
function point(angle) {
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  let x = circleX + radius * Math.cos(angle)
  let y = circleY + radius * Math.sin(angle)
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
}

// 刷新
function loading() {
  if (process >= percent) {
    clearInterval(circleLoading);
  }
  // 清除canvas内容
  ctx.clearRect(0, 0, circleX * 2, circleY * 2);
  // 弧圆
  circle(circleX, circleY, radius);
  // 圆弧
  sector(circleX, circleY, radius, Math.PI * 0.75, process / 100 * 270);
  point((process / 100 * 270 + 135 -1)/180 * Math.PI)

  // 控制结束时动画的速度
  if (process / percent > 0.90) {
    process += 0.30;
  } else if (process / percent > 0.80) {
    process += 0.55;
  } else if (process / percent > 0.70) {
    process += 0.75;
  } else {
    process += 1.0;
  }
}

var process = 0.0; // 进度
var circleLoading = window.setInterval(function () {
  loading();
}, 20);
