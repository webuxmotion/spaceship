class Ground {
    constructor(ctx) {
        this.x1 = 0;
        this.y1 = ctx.canvas.height - 50;
        this.x2 = ctx.canvas.width;
        this.y2 = ctx.canvas.height;
        this.groundLevel = this.y1;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "#737373ff";
        ctx.fillRect(this.x1, this.y1, this.x2, this.y2);
        ctx.restore();
    }
}