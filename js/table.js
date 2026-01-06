// js/table.js
class Table {
    constructor(cx, cy) {
        const PPM = 100;

        this.centerX = cx;
        this.centerY = cy;

        // REAL table dimensions
        this.length = 2.74 * PPM;   // X axis
        this.width  = 1.525 * PPM;  // Y axis

        this.minX = cx - this.length / 2;
        this.maxX = cx + this.length / 2;

        this.minY = cy - this.width / 2;
        this.maxY = cy + this.width / 2;

        this.surfaceZ = 0;
    }

    contains(x, y) {
        return (
            x >= this.minX &&
            x <= this.maxX &&
            y >= this.minY &&
            y <= this.maxY
        );
    }

    draw(ctx) {
        ctx.fillStyle = "#1f6b4f"; // professional table green
        ctx.fillRect(
            this.minX,
            this.minY,
            this.length,
            this.width
        );
    }
}
