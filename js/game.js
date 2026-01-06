class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;

        this.table = new Table(canvas);

        this.ball = new Ball(
            this.table.centerX,
            this.table.centerY
        );

        // Place paddle on LEFT side
        this.paddle = new Paddle(
            this.table.minX - 30,
            this.table.centerY
        );

        this.mouse = { x: 0, y: 0 };

        canvas.addEventListener("mousemove", e => {
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.lastTime = performance.now();
    }

    loop() {
        const now = performance.now();
        const dt = (now - this.lastTime) / 1000;
        this.lastTime = now;

        this.update(dt);
        this.draw();

        requestAnimationFrame(() => this.loop());
    }

    update(dt) {
        this.paddle.update(this.mouse);
        this.ball.update(dt, this.table);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.table.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.paddle.draw(this.ctx);
    }
}
