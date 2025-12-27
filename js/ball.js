class Ball {
    constructor(table) {
        this.table = table;

        // Position (x,y on table plane) and z height
        this.x = table.x + table.width/2;
        this.y = table.y + table.height/2;
        this.z = 0.5;

        this.vx = 5;
        this.vy = 0;
        this.vz = 6;

        this.radius = 8;

        this.sprite = new Image();
        this.sprite.src = "assets/sprites/ball.png";

        this.shadow = new Image();
        this.shadow.src = "assets/sprites/shadow.png";
    }

    update(dt) {
        // Gravity
        this.vz -= 40 * dt;
        this.z += this.vz * dt;

        // Move on table
        this.x += this.vx * dt * 60;
        this.y += this.vy * dt * 60;

        // Bounce ONLY if over playable table surface
        if (this.z <= 0 && this.isOverTable()) {
            this.z = 0;
            this.vz = -this.vz * 0.82; // realistic bounce
            this.vx *= 0.995;
            this.vy *= 0.995;
        }
    }

    isOverTable() {
        return (
            this.x > this.table.x &&
            this.x < this.table.x + this.table.width &&
            this.y > this.table.y &&
            this.y < this.table.y + this.table.height
        );
    }

    leaveTable() {
        // Ball fell off table: prevent rolling on invisible plane
        if (this.z < 0) this.vz = -8;
    }

    checkPaddleCollision(paddle) {
        const dx = this.x - paddle.x;
        const dy = this.y - paddle.y;

        if (Math.abs(dx) < this.radius + paddle.width/2 &&
            Math.abs(dy) < this.radius + paddle.height/2 &&
            this.z <= 0.8) {

            const hitOffset = (this.y - paddle.y) / (paddle.height/2);
            const power = paddle.vy * 0.6;

            this.vx = paddle.side * (6 + Math.abs(power));
            this.vy += hitOffset * 5;
            this.vz = 6 + Math.abs(power);
        }
    }

    drawShadow(ctx) {
        if (!this.isOverTable()) return;
        ctx.globalAlpha = 0.35;
        ctx.drawImage(
            this.shadow,
            Math.round(this.x - this.radius),
            Math.round(this.y + 4),
            this.radius*2,
            this.radius
        );
        ctx.globalAlpha = 1;
    }

    draw(ctx) {
        ctx.drawImage(
            this.sprite,
            Math.round(this.x - this.radius),
            Math.round(this.y - this.radius - this.z*50),
            this.radius*2,
            this.radius*2
        );
    }
}
