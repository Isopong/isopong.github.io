class Paddle {
    constructor() {
        this.x = 120; // starting position
        this.y = 270;
        this.width = 16;
        this.height = 96;

        this.image = new Image();
        this.image.src = "assets/sprites/paddle.png";

        // For tracking mouse
        this.targetX = this.x;
        this.targetY = this.y;

        // Listen to mouse move
        window.addEventListener("mousemove", (e) => {
            const rect = e.target.getBoundingClientRect();
            this.targetX = e.clientX - rect.left;
            this.targetY = e.clientY - rect.top;
        });
    }

    update(dt) {
        // Smoothly follow cursor
        const speed = 1000; // pixels/sec
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;

        this.x += Math.max(Math.min(dx, speed * dt), -speed * dt);
        this.y += Math.max(Math.min(dy, speed * dt), -speed * dt);

        // Clamp to table bounds
        const left = 160 + this.width / 2;
        const right = 800 - this.width / 2;
        const top = 80 + this.height / 2;
        const bottom = 460 - this.height / 2;

        this.x = Math.max(left, Math.min(right, this.x));
        this.y = Math.max(top, Math.min(bottom, this.y));
    }

    draw(ctx) {
        if (!this.image.complete) return;
        ctx.drawImage(
            this.image,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
    }
}
