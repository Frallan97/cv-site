class Ball {
  constructor (borders, radius=undefined, color=undefined, eventQueue=undefined, id=undefined) {
    if (radius === undefined) radius = 40;
    if (color  === undefined) color  = "#ff0000";

    this.id = id;
    this.borders = borders;
    this.radius = radius;

    this.x = Math.random() * 0.9 * this.borders.right;
    this.y = Math.random() * 0.9 * this.borders.bottom;
    this.vx = 1 * (0.5 - Math.random());
    this.vy = 1 * (0.5 - Math.random());

    this.mass = 1;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = utils.parseColor(color);
    this.lineWidth = 1;

    this.startX = Math.random() * (this.borders.right - this.borders.left - 4*this.radius) + this.borders.left + 2*this.radius;
    this.startY = Math.random() * (this.borders.bottom - this.borders.top - 4*this.radius) + this.borders.top + 2*this.radius;
    this.eventList = new EventList(id, eventQueue);

    this.binIndices = null;
  }

  update(borders) {
    if (this.ax && this.ay) {
      this.vx += this.ax;
      this.vy += this.ay;
    }

    // ball bounces off the walls
    if (borders) {
      const { left, top, right, bottom } = borders;
      if (this.x + this.radius > right) {
        this.x = right - this.radius;
        this.vx *= -1;
      } else if (this.x - this.radius < left) {
        this.x = left + this.radius;
        this.vx *= -1;
      }
      if (this.y + this.radius > bottom) {
        this.y = bottom - this.radius;
        this.vy *= -1;
      } else if (this.y - this.radius < top) {
        this.y = top + this.radius;
        this.vy *= -1;
      }
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(context, time=undefined) {
    const x = time ? this.vx * time + this.startX : this.x;
    const y = time ? this.vy * time + this.startY : this.y;

    context.save();
    context.translate(x, y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    // x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) context.stroke();
    // context.fillText(this.id, 10, 10);
    context.restore();
  }

  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
}
