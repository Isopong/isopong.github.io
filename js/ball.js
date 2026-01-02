class Ball {
    constructor(paddle) {
        this.radius = 6;

        this.reset(paddle);

        this.gravity = -900;

        this.sprite = new Image();
        this.sprite.src = "assets/sprites/ball.png";

        this.shadow = new Image();
        this.shadow.src = "assets/sprites/shadow.png";
    }

    reset(paddle) {
        this.x = paddle.x + 50; // start near paddle
        this.y = paddle.y;
        this.z = 0;    // height above table
        this.vx = 240; // horizontal
        this.vy = 0;   // vertical on table
        this.vz = 320; // upward
    }

    update(dt, paddle) {
        // Ball physics
        this.vz += this.gravity * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.z += this.vz * dt;

        // Bounce on table
        if (this.z <= 0) {
            this.z = 0;
            this.vz *= -0.75;
        }

        // Paddle collision
        if (
            this.x + this.radius > paddle.x - paddle.width / 2 &&
            this.x - this.radius < paddle.x + paddle.width / 2 &&
            this.y + this.radius > paddle.y - paddle.height / 2 &&
            this.y - this.radius < paddle.y + paddle.height / 2 &&
            this.z <= 10 // only near table
        ) {
            this.vx *= -1; // reverse horizontal
            this.vy += (this.y - paddle.y) * 3; // reflect vertical based on where it hit
            this.vz = Math.max(this.vz, 200); // small upward boost
        }
    }

    draw(ctx) {
        // Shadow on table
        ctx.globalAlpha = 0.5;
        ctx.drawImage(this.shadow, this.x - 10, this.y - 4, 20, 8);
        ctx.globalAlpha = 1;

        // Ball
        ctx.drawImage(this.sprite, this.x - this.radius, this.y - this.z - this.radius, this.radius*2, this.radius*2);
    }
}
