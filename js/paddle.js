class Paddle {
    constructor(x, y, sprite, isAI = false, skill = 1) {
        this.sprite = sprite;
        this.isAI = isAI;
        this.skill = skill;

        this.pos = { x, y };
        this.width = 48;
        this.height = 16;

        this.swingSpeed = 0;
        this.target = null;
    }

    update(dt) {
        if (this.isAI && this.target) {
            const error = (Math.random() - 0.5) * (1 - this.skill) * 80;
            const targetX = this.target.pos.x + error;

            this.swingSpeed = (targetX - this.pos.x) * 0.05 * this.skill;
            this.pos.x += this.swingSpeed;
        } else {
            // Player mouse control
            window.addEventListener("mousemove", e => {
                const rect = document.body.getBoundingClientRect();
                this.pos.x = e.clientX - rect.left;
            });
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.sprite,
            this.pos.x - this.width / 2,
            this.pos.y - this.height / 2,
            this.width,
            this.height
        );
    }
}
