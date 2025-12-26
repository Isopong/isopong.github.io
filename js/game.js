class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;

        // Load images
        this.tableImg = new Image();
        this.tableImg.src = 'assets/sprites/table.png';

        this.ballImg = new Image();
        this.ballImg.src = 'assets/sprites/ball.png';

        this.shadowImg = new Image();
        this.shadowImg.src = 'assets/sprites/shadow.png';

        this.paddleImg = new Image();
        this.paddleImg.src = 'assets/sprites/paddle.png';

        // Game objects
        this.ball = null;
        this.player = null;
        this.ai = null;
        this.camera = null;

        // Table bounds
        this.tableBounds = {
            xMin: 50,
            xMax: canvas.width - 50,
            yMin: 50,
            yMax: canvas.height - 50
        };

        // Score
        this.score = { player: 0, ai: 0 };

        // Paddle animation
        this.paddleFrames = [this.paddleImg.src];
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameInterval = 0.2;
    }

    init() {
        const tableCenterX = (this.tableBounds.xMin + this.tableBounds.xMax) / 2;
        const tableCenterY = (this.tableBounds.yMin + this.tableBounds.yMax) / 2;

        this.ball = new Ball(tableCenterX, tableCenterY, this.ballImg, this.shadowImg, this.tableBounds);

        this.player = new Paddle(tableCenterX, this.tableBounds.yMax - 50, this.paddleImg, false, 0.8);
        this.ai = new Paddle(tableCenterX, this.tableBounds.yMin + 50, this.paddleImg, true, 0.7);
        this.ai.target = this.ball;

        this.camera = new Camera(this.canvas);
        this.camera.target = this.ball;
    }

    update(dt) {
        this.ball.update(dt);
        this.player.update(dt);
        this.ai.update(dt);

        // Ball hits paddles
        this.ball.hitByPaddle(this.player);
        this.ball.hitByPaddle(this.ai);

        // Camera follows ball
        this.camera.update();

        // Paddle animation (even if single frame)
        this.frameTimer += dt;
        if (this.frameTimer > this.frameInterval) {
            this.currentFrame = (this.currentFrame + 1) % this.paddleFrames.length;
            this.paddleImg.src = this.paddleFrames[this.currentFrame];
            this.frameTimer = 0;
        }

        // Check for scoring
        if (this.ball.pos.y < this.tableBounds.yMin) { this.score.player++; this.ballReset(); }
        if (this.ball.pos.y > this.tableBounds.yMax) { this.score.ai++; this.ballReset(); }
    }

    ballReset() {
        const tableCenterX = (this.tableBounds.xMin + this.tableBounds.xMax) / 2;
        const tableCenterY = (this.tableBounds.yMin + this.tableBounds.yMax) / 2;
        this.ball.pos = { x: tableCenterX, y: tableCenterY };
        this.ball.z = 0;
        this.ball.vel = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
        this.ball.zVel = 0;
        this.ball.spin = { x: 0, y: 0 };
    }

    draw() {
        const ctx = this.ctx;
        ctx.save();

        // Camera transform
        this.camera.apply(ctx);

        // Draw table
        ctx.drawImage(this.tableImg, this.tableBounds.xMin, this.tableBounds.yMin, 
                      this.tableBounds.xMax - this.tableBounds.xMin, 
                      this.tableBounds.yMax - this.tableBounds.yMin);

        // Draw paddles
        this.player.draw(ctx);
        this.ai.draw(ctx);

        // Draw ball trail
        this.drawBallTrail(ctx);

        // Draw ball
        this.ball.draw(ctx);

        ctx.restore();

        // Draw score
        ctx.fillStyle = "white";
        ctx.font = "24px sans-serif";
        ctx.fillText(`Player: ${this.score.player}`, 20, 30);
        ctx.fillText(`AI: ${this.score.ai}`, this.canvas.width - 120, 30);
    }

    drawBallTrail(ctx) {
        const trailCount = 5;
        for (let i = trailCount; i > 0; i--) {
            const alpha = i / trailCount * 0.3;
            ctx.globalAlpha = alpha;
            const offsetX = this.ball.vel.x * i * 0.05;
            const offsetY = this.ball.vel.y * i * 0.05;
            ctx.drawImage(this.ball.sprite, this.ball.pos.x - this.ball.radius - offsetX, 
                          this.ball.pos.y - this.ball.radius - this.ball.z - offsetY, 
                          this.ball.radius * 2, this.ball.radius * 2);
        }
        ctx.globalAlpha = 1;
    }
}
