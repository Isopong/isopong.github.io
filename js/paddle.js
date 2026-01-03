class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = 12;

    this.width = 14;
    this.height = 64;

    this.prevX = x;
    this.prevY = y;

    this.vx = 0;
    this.vy = 0;

    this.sprite = new Image();
    this.sprite.src = "assets/sprites/paddle.png";
  }

  update(mouseX, mouseY, dt) {
    // Track velocity for physics transfer
    this.prevX = this.x;
    this.prevY = this.y;

    // Paddle follows cursor directly.
    this.x = mouseX;
    this.y = mouseY;

    this.vx = (this.x - this.prevX) / dt;
    this.vy = (this.y - this.prevY) / dt;
  }

  draw(ctx, isoSkew) {
    ctx.drawImage(
      this.sprite,
      this.x - this.width / 2,
      this.y * isoSkew - this.z - this.height / 2,
      this.width,
      this.height
    );
  }
}
