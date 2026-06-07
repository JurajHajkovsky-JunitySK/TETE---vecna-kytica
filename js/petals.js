const canvas = document.getElementById('petals-canvas');
const ctx = canvas.getContext('2d');

const PETALS = ['🌸', '🌺', '🌷', '💮', '🌼', '🌻', '🪷', '🌹', '💐', '🏵️', '🌾', '🫧'];
const COUNT = 22;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const petals = Array.from({ length: COUNT }, () => {
  const dir = Math.random() * Math.PI * 2;
  const speed = 0.3 + Math.random() * 0.5;
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 24 + Math.random() * 28,
    speedX: Math.cos(dir) * speed,
    speedY: Math.sin(dir) * speed,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.012,
    symbol: PETALS[Math.floor(Math.random() * PETALS.length)],
    opacity: 0.25 + Math.random() * 0.35,
  };
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.angle += p.spin;

    if (p.x > canvas.width + 30)  p.x = -30;
    if (p.x < -30)                p.x = canvas.width + 30;
    if (p.y > canvas.height + 30) p.y = -30;
    if (p.y < -30)                p.y = canvas.height + 30;

    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.font = `${p.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.symbol, 0, 0);
    ctx.restore();
  });

  requestAnimationFrame(draw);
}

draw();
