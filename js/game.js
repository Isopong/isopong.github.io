class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.camera = new Camera();

        this.width = canvas.width;
        this.height = canvas.height;

        // Table (surface only — no legs)
        this.table = {
            x: this.width / 2 - 200,
            y: this.height / 2 - 100,
            width: 400,
            height: 200
        };

        this.ball = new Ball(this.table);
        this.leftPaddle = new Paddle("left", this.table);
        this.rightPaddle = new Paddle("right", this.table);

        window.game = this; // debug / AI access
    }

    update(dt) {
        this.ball.update(dt, this.leftPaddle, this.rightPaddle);
        this.leftPaddle.update(dt);
        this.rightPaddle.update(dt);
    }

    draw() {
        const ctx = this.ctx;

        // ✅ Reset camera safely
        this.camera.reset(ctx);

        // Background
        ctx.fillStyle = "#4aa3df";
        ctx.fillRect(0, 0, this.width, this.height);

        // Table surface
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(
            this.table.x,
            this.table.y,
            this.table.width,
            this.table.height
        );

        this.leftPaddle.draw(ctx);
        this.rightPaddle.draw(ctx);
        this.ball.draw(ctx);
    }

    loop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(dt);
        this.draw();

        requestAnimationFrame(this.loop.bind(this));
    }
}
