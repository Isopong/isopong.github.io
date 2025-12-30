class Paddle {
    constructor(side, table) {
        this.table = table;

        this.width = 20;
        this.height = 60;

        this.side = side === "left" ? 1 : -1;

        this.x = side === "left"
            ? table.x + 20
            : table.x + table.width - 20;

        this.y = table.y + table.height / 2;
        this.prevY = this.y;
        this.vy = 0;

        // ✅ Proper image object
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/paddle.png";
    }

    update(dt) {
        this.prevY = this.y;

        // TEMP AI / test movement
        if (window.game && this.side === -1) {
            const targetY = window.game.ball.y;
            const diff = targetY - this.y;
            this.y += Math.max(Math.min(diff * 0.08, 6), -6);
        }

        // Velocity (used for hit strength)
        this.vy = this.y - this.prevY;

        // Clamp inside table
        const top = this.table.y + this.height / 2;
        const bottom = this.table.y + this.table.height - this.height / 2;
        this.y = Math.max(top, Math.min(bottom, this.y));
    }

    draw(ctx) {
        // ✅ Safe draw — only if image is ready
        if (!this.sprite.complete) return;

        ctx.drawImage(
            this.sprite,
            Math.round(this.x - this.width / 2),
            Math.round(this.y - this.height / 2),
            this.width,
            this.height
        );
    }
}
