class Wall {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;

    this.dx = this.endX - this.startX;
    this.dy = this.endY - this.startY;
    this.angle = Math.atan2(this.dy, this.dx);
    this.length = Math.sqrt(this.dx*this.dx + this.dy*this.dy);

    this.color = utils.parseColor("#e6e6e6");
    this.padding = 2;
  }

  draw(context, color=undefined) {
    context.save();
    context.strokeStyle = color ? color : this.color;
    context.lineWidth = 2*this.padding - 1;
    context.beginPath();
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.stroke();
    context.restore();
  }
}