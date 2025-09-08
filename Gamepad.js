class Gamepad {
  constructor() {
    this.axes = null;
  }

  update() {
    const gps = navigator.getGamepads();
    if (gps[0]) {
      this.axes = gps[0].axes;
    }
  }

  draw(ctx) {
    if (this.axes) {
      const centerX = ctx.canvas.width / 2;
      const bottomY = ctx.canvas.height - 80;
      const lineWidth = 60;

      // --- Right stick (blue) ---
      const rightCenterX = centerX + 80;
      const rightCenterY = bottomY;
      const rx = rightCenterX + (this.axes[0] || 0) * 50;
      const ry = rightCenterY + (this.axes[1] || 0) * -50;

      // Draw cross lines for right stick
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rightCenterX - lineWidth, rightCenterY);
      ctx.lineTo(rightCenterX + lineWidth, rightCenterY);
      ctx.moveTo(rightCenterX, rightCenterY - lineWidth);
      ctx.lineTo(rightCenterX, rightCenterY + lineWidth);
      ctx.stroke();

      // Draw stick circle
      ctx.beginPath();
      ctx.arc(rx, ry, 10, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();

      // --- Left stick (red) ---
      const leftCenterX = centerX - 80;
      const leftCenterY = bottomY;
      const lx = leftCenterX + (this.axes[4] || 0) * 50;
      const ly = leftCenterY + (this.axes[3] || 0) * -50;

      // Draw cross lines for left stick
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(leftCenterX - lineWidth, leftCenterY);
      ctx.lineTo(leftCenterX + lineWidth, leftCenterY);
      ctx.moveTo(leftCenterX, leftCenterY - lineWidth);
      ctx.lineTo(leftCenterX, leftCenterY + lineWidth);
      ctx.stroke();

      // Draw stick circle
      ctx.beginPath();
      ctx.arc(lx, ly, 10, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}
