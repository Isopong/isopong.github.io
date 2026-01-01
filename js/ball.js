class Ball {
    constructor() {
        this.radius = 6;

        this.reset();
        this.gravity = -900;

        this.sprite = new Image();
        this.sprite.src = "assets/sprites/ball.png";

        this.shadow = new Image();
        this.shadow.src = "assets/sprites/shadow.png";
    }

    reset() {
        this.x = 480; // Start near left paddle
        this.y = 270;
        this.z = 0;    // height above table
        this.vx = 240; // towards right
        this.vy = 60;  // slight vertical
        this.vz = 320; // upward
    }

    update(dt, leftPaddle, rightPaddle) {
        // Ball physics
        this.vz += this.gravity * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.z += this.vz * dt;

        // Bounce on table surface
        if (this.z <= 0) {
            this.z = 0;
            this.vz *= -0.75;
        }

        // Paddle collisions
        [leftPaddle, rightPaddle].forEach(paddle => {
            if (
                this.x + this.radius > paddle.x - paddle.width / 2 &&
                this.x - this.radius < paddle.x + paddle.width / 2 &&
                this.y + this.radius > paddle.y - paddle.height / 2 &&
                this.y - this.radius < paddle.y + paddle.height / 2 &&
                this.z <= 10 // only hit if near table
            ) {
                // Reverse X velocity and add paddle influence
                this.vx *= -1;
                // Add a fraction of paddle dy to ball vy for "hard/soft hit"
                this.vy += paddle.dy * 0.3;
                // Optional: small height boost
                this.vz = Math.max(this.vz, 200);
            }
        });
    }

    draw(ctx) {
        // Shadow
        ctx.globalAlpha = 0.5;
        ctx.drawImage(
            this.shadow,
            this.x - 10,
            this.y - 4,
            20,
            8
        );
        ctx.globalAlpha = 1;

        // Ball
        ctx.drawImage(
            this.sprite,
            this.x - this.radius,
            this.y - this.z - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    }
}
