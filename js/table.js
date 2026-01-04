class Table {
  constructor() {
    // Table dimensions in world units (meters)
    this.width = 2.74;   // X-axis
    this.depth = 1.525;  // Y-axis
    this.surfaceZ = 0;   // Z = 0 plane

    // Center position (world-space)
    this.position = { x: 0, y: 0 };

    // Derived bounds for collision
    this.minX = this.position.x - this.width / 2;
    this.maxX = this.position.x + this.width / 2;
    this.minY = this.position.y - this.depth / 2;
    this.maxY = this.position.y + this.depth / 2;
  }

  // Check if a point is over the table surface (X/Y bounds only)
  isAbove(x, y) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }

  // draw table (placeholder rectangle)
  draw(ctx, camera) {
    // convert world coords to screen coords
    const screenX = camera.worldToScreenX(this.minX);
    const screenY = camera.worldToScreenY(this.minY);
    const screenWidth = camera.worldToScreenDistance(this.width);
    const screenDepth = camera.worldToScreenDistance(this.depth);

    ctx.fillStyle = "#1e6f28"; // dark green color for table surface
    ctx.fillRect(screenX, screenY, screenWidth, screenDepth);

    // draw net line
    const netScreenX = camera.worldToScreenX(this.position.x);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(netScreenX, screenY);
    ctx.lineTo(netScreenX, screenY + screenDepth);
    ctx.stroke();
  }
}
