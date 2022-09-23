// Lawrence Hook

let time = 0;

const canvas = document.getElementById("canvas");
const resolution = 3;
canvas.width = resolution * getComputedStyle(canvas).width.replace("px", "");
canvas.height = resolution * getComputedStyle(canvas).height.replace("px", "");

const context = canvas.getContext('2d');

const borders = {
  top    : 0.01*canvas.height,
  left   : 0.01*canvas.width,
  bottom : 0.99*canvas.height,
  right  : 0.99*canvas.width
};

const walls = [
  new Wall(borders.left, borders.top, borders.left, borders.bottom),
  new Wall(borders.left, borders.top, borders.right, borders.top),
  new Wall(borders.left, borders.bottom, borders.right, borders.bottom),
  new Wall(borders.right, borders.top, borders.right, borders.bottom),

  // new Wall(0.55*borders.right, 0.495*borders.bottom, 0.8*borders.right, 0.95*borders.bottom),
  // new Wall(0.55*borders.right, 0.505*borders.bottom, 0.8*borders.right, 0.05*borders.bottom),

  // new Wall(0.5*borders.right, 0.05*borders.bottom, 0.5*borders.right, 0.95*borders.bottom),
  // new Wall(0.25*borders.right, 0.25*borders.bottom, 0.75*borders.right, 0.75*borders.bottom),
  // new Wall(0.25*borders.right, 0.25*borders.bottom, 0.25*borders.right, 0.75*borders.bottom),
  // new Wall(0.25*borders.right, 0.25*borders.bottom, 0.75*borders.right, 0.25*borders.bottom),
  // new Wall(0.25*borders.right, 0.75*borders.bottom, 0.75*borders.right, 0.75*borders.bottom),
  // new Wall(0.75*borders.right, 0.25*borders.bottom, 0.75*borders.right, 0.75*borders.bottom),
];

const timeStep = 0.5;
const maxEventsPerStep = 100;

const numBalls = 1000;
const speed = 0.9 * resolution;
const ballRadius = 1.3 * resolution;
// const ballColor = "#ffffff"; // white
const ballColor = "#e0ffff"; // lightcyan

const balls = [];
const eventQueue = new Heap(null, true);

const activeWidth = borders.right - borders.left;
const activeHeight = borders.bottom - borders.top;

for (let i = 0; i < numBalls; i++) {
  // const ball = new Ball(borders, ballRadius, utils.randomColor(), eventQueue, i);
  const ball = new Ball(borders, ballRadius, ballColor, eventQueue, i);
  const angle = Math.random() * 2 * Math.PI;
  ball.startX = borders.left + ballRadius + (Math.random() * (activeWidth - 2*ballRadius));
  ball.startY = borders.top + ballRadius + (Math.random() * (activeHeight - 2*ballRadius));

  ball.vx = speed * Math.cos(angle);
  ball.vy = speed * Math.sin(angle);
  // ball.mass = 1 + Math.random() * 25;
  // ball.radius = Math.sqrt(ball.mass) * ballRadius;
  ball.lineWidth = 0;
  balls.push(ball);
}

// const ballColor = "#ff00ff";
// const ball1 = new Ball(borders, 5*ballRadius, ballColor, eventQueue, 1);
// ball1.startX = 0.75*borders.right;
// ball1.startY = 0.5*borders.bottom;
// ball1.vx = 0;
// ball1.vy = 0;
// balls.push(ball1);

// const ball2 = new Ball(borders, ballRadius, "#ffff00", eventQueue, 2);
// ball2.startX = 0.15*borders.right;
// ball2.startY = 0.5*borders.bottom;
// ball2.vx = -1;
// ball2.vy = 0;
// balls.push(ball2);

// const ball3 = new Ball(borders, ballRadius, ballColor, eventQueue, 3);
// ball3.startX = 50;
// ball3.startY = 50;
// ball3.vx = 1;
// ball3.vy = -2;
// balls.push(ball3);

const findEvents = ball => {
  walls.forEach(wall => {
    const priority = Collision.timeUntilWallBall(wall, ball);
    if (priority <= time) return;
    const event = { priority, wall, ball1: ball };

    ball.eventList.add(event);
  });

  balls.forEach(b => {
    if (ball === b) return;
    const priority = Collision.timeUntilBallBall(ball, b, time);
    if (priority <= time) return;
    const event = { priority, ball1: ball, ball2: b };

    ball.eventList.add(event);
    b.eventList.add(event);
  });
};

// Initialize events
balls.forEach(findEvents);

// Hotfix bug where heap isn't properly sorted at the start.
eventQueue.heapify();

const handleEvent = event => {
  const { priority, wall, ball1, ball2 } = event;

  // 1. Event reaction
  if (wall) {
    if (walls.length) Collision.wallBall(wall, ball1, priority);
  } else {
    Collision.ballBall(ball1, ball2, priority);
  }

  // 2. Update time, so that subsequent events within this step
  //    knows when "now" is.
  time = priority;

  // 3. Find new events
  ball1.eventList.clear();
  findEvents(ball1);

  if (ball2) {
    ball2.eventList.clear()
    findEvents(ball2);
  }
};

const update = () => {
  const beginTime = time;
  const endTime = beginTime + timeStep;

  let eventCount = 0;
  while (endTime >= eventQueue.peek().priority) {
    handleEvent(eventQueue.peek().get());
    eventCount++;
    if (eventCount > maxEventsPerStep) {
      console.log("Too many events!");
      return;
    }
  }

  // if ((time / timeStep | 0) % 20 == 0) Collision.wallBall(walls[0], balls[0], time);

  time = endTime;
};

const draw = (context) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const lightness = Math.sin((time / (50*timeStep)) % Math.PI);
  const wallColor = utils.hsl2rgb(0, 0, 0.2 + 0.7*lightness);
  walls.forEach(wall => wall.draw(context, wallColor));

  balls.forEach(ball => ball.draw(context, time));
};

const nextFrame = () => {
  update();
  draw(context);
  window.requestAnimationFrame(nextFrame);
};

// animate!
nextFrame();

// Disperse when clicked
canvas.addEventListener("click", function clickHandler() {
  const oldRectangle = canvas.getBoundingClientRect();

  canvas.classList.add("background_canvas");
  const newRectangle = canvas.getBoundingClientRect();
  canvas.width = resolution * getComputedStyle(canvas).width.replace("px", "");
  canvas.height = resolution * getComputedStyle(canvas).height.replace("px", "");

  balls.forEach(ball => {
    ball.startX += (oldRectangle.x - newRectangle.x) * resolution;
    ball.startY += (oldRectangle.y - newRectangle.y) * resolution;
  });

  walls.length = 0;

  canvas.removeEventListener("click", clickHandler);
});
