class Ball {
    constructor(x, y, sprite, shadow, bounds) {
        this.sprite = sprite;
        this.shadow = shadow;
        this.bounds = bounds;

        this.pos = { x, y };
        this.vel = { x: 8, y: 0 };
        this.radius = 8;

        this.z = 0;
        this.zVel = 0;
        this.gravity = 30;

        this.spin = 0;
    }

    update(dt) {
        this.vel.y += this.spin * dt;
        this.vel.y *= 0.99;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.zVel -= this.gravity * dt;
        this.z += this.zVel;

        if (this.z < 0) {
            this.z = 0;
            this.zVel *= -0.6;
        }

        if (this.pos.y < this.bounds.top || this.pos.y > this.bounds.bottom) {
            this.vel.y *= -1;
            this.spin *= 0.5;
        }
    }

    hitByPaddle(paddle) {
        const dx = Math.abs(this.pos.x - paddle.pos.x);
        const dy = Math.abs(this.pos.y - paddle.pos.y);

        if (dx < this.radius + paddle.width / 2 &&
            dy < paddle.height / 2 &&
            this.z < 12) {

            this.vel.x *= -1.05;
            this.vel.y += paddle.swingSpeed * 0.2;
            this.zVel = Math.abs(paddle.swingSpeed) * 4;
            this.spin = paddle.swingSpeed * 0.02;
        }
    }

    draw(ctx) {
        ctx.globalAlpha = 0.3;
        ctx.drawImage(
            this.shadow,
            Math.round(this.pos.x - this.radius),
            Math.round(this.pos.y + 6),
            this.radius * 2,
            this.radius
        );
        ctx.globalAlpha = 1;

        ctx.drawImage(
            this.sprite,
            Math.round(this.pos.x - this.radius),
            Math.round(this.pos.y - this.radius - this.z),
            this.radius * 2,
            this.radius * 2
        );
    }
}
