class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");

    // --- TABLE PHYSICS GEOMETRY ---
    // Pixel-scaled real dimensions (tuned for 960x540)
    this.table = {
      centerX: 480,
      centerY: 300,

      width: 520,    // corresponds to 2.74m
      depth: 290,    // corresponds to 1.525m

      isoSkew: 0.45  // isometric Y compression
    };

    // Compute playable surface bounds (top-down space)
    this.table.left   = this.table.centerX - this.table.width / 2;
    this.table.right  = this.table.centerX + this.table.width / 2;
    this.table.top    = this.table.centerY - this.table.depth / 2;
    this.table.bottom = this.table.centerY + this.table.depth / 2;

    this.paddle = new Paddle(canvas);
    this.ball = new Ball(this.paddle, this.table);

    this.lastTime = 0;

    window.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "s") {
        this.ball.serve();
      }
    });
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    const dt = (time - this.lastTime) / 1000 || 0;
    this.lastTime = time;

    this.update(dt);
    this.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) {
    this.paddle.update(dt);
    this.ball.update(dt, this.paddle);
  }

  draw() {
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, 960, 540);

    // --- DRAW ISOMETRIC TABLE ---
    ctx.fillStyle = "#2e8b57"; // temporary felt green

    ctx.beginPath();
    ctx.moveTo(this.table.left, this.table.top * this.table.isoSkew);
    ctx.lineTo(this.table.right, this.table.top * this.table.isoSkew);
    ctx.lineTo(this.table.right, this.table.bottom * this.table.isoSkew);
    ctx.lineTo(this.table.left, this.table.bottom * this.table.isoSkew);
    ctx.closePath();
    ctx.fill();

    // Net (for reference)
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(this.table.centerX, this.table.top * this.table.isoSkew);
    ctx.lineTo(this.table.centerX, this.table.bottom * this.table.isoSkew);
    ctx.stroke();

    this.ball.draw(ctx);
    this.paddle.draw(ctx);
  }
}
