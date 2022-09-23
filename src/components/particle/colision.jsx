class Collision {

  constructor() {}

  static ballBall(ball1, ball2, time) {

    const x1 = ball1.startX + ball1.vx * time;
    const y1 = ball1.startY + ball1.vy * time;

    const x2 = ball2.startX + ball2.vx * time;
    const y2 = ball2.startY + ball2.vy * time;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Calculate angle, sine, and cosine
    const angle = Math.atan2(dy, dx);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    // Rotate ball1's position
    const x1S = 0;
    const y1S = 0;

    // Rotate ball2's position
    const x2S = utils.rotateX(dx, dy, sin, cos, true);
    const y2S = utils.rotateY(dx, dy, sin, cos, true);

    // Rotate ball1's velocity
    const vx1S = utils.rotateX(ball1.vx, ball1.vy, sin, cos, true);
    const vy1S = utils.rotateY(ball1.vx, ball1.vy, sin, cos, true);

    // Rotate ball2's velocity
    const vx2S = utils.rotateX(ball2.vx, ball2.vy, sin, cos, true);
    const vy2S = utils.rotateY(ball2.vx, ball2.vy, sin, cos, true);

    // Collision reaction (Pr = post-reaction)
    const vxTotal = vx1S - vx2S;
    const vx1Pr = ((ball1.mass - ball2.mass) * vx1S + 2 * ball2.mass * vx2S) /
                   (ball1.mass + ball2.mass);
    const vx2Pr = vxTotal + vx1Pr;

    // // Update position - to avoid objects becoming stuck together
    // const absV = Math.abs(vx0Pr) + Math.abs(vx2Pr);
    // const overlap = (ball1.radius + ball2.radius) - Math.abs(x1S - x2S);
    // const x1Pr = x1S + vx1Pr / absV * overlap;
    // const x2Pr = x2S + vx2Pr / absV * overlap;

    // // Rotate positions back
    // const x1F = utils.rotateX(x1Pr, y1S, sin, cos, false);
    // const y1F = utils.rotateY(x1Pr, y1S, sin, cos, false);
    // const x2F = utils.rotateX(x2Pr, y2S, sin, cos, false);
    // const y2F = utils.rotateY(x2Pr, y2S, sin, cos, false);

    // Rotate velocities back
    const vx1F = utils.rotateX(vx1Pr, vy1S, sin, cos, false);
    const vy1F = utils.rotateY(vx1Pr, vy1S, sin, cos, false);
    const vx2F = utils.rotateX(vx2Pr, vy2S, sin, cos, false);
    const vy2F = utils.rotateY(vx2Pr, vy2S, sin, cos, false);

    ball1.startX = time*(ball1.vx - vx1F) + ball1.startX;
    ball1.startY = time*(ball1.vy - vy1F) + ball1.startY;
    ball2.startX = time*(ball2.vx - vx2F) + ball2.startX;
    ball2.startY = time*(ball2.vy - vy2F) + ball2.startY;

    ball1.vx = vx1F;
    ball1.vy = vy1F;
    ball2.vx = vx2F;
    ball2.vy = vy2F;
  }

  static timeUntilBallBall(ball1, ball2, time) {
    // { startX, startY, vx, vy, radius }
    const dVX = ball1.vx - ball2.vx;
    const dVY = ball1.vy - ball2.vy;
    const dX = ball1.startX - ball2.startX;
    const dY = ball1.startY - ball2.startY;
    const sigma = ball1.radius + ball2.radius;

    const dot = dVX*dX + dVY*dY;
    const dVSQ = dVX*dVX + dVY*dVY;
    const dXSQ = dX*dX + dY*dY;

    // quadratic equation solver
    const a = dVSQ;
    const b = 2*dot;
    const c = dXSQ - sigma*sigma;

    if ((b*b - 4*a*c) <= 0) return null;
    if (a == 0) return null;

    const t1 = (-b + Math.sqrt(b*b - 4*a*c)) / (2*a);
    const t2 = (-b - Math.sqrt(b*b - 4*a*c)) / (2*a);

    const epsilon = time - 1;

    // balls are currently intersecting
    if (t2 < epsilon && t1 > epsilon) return null;

    if (t2 > epsilon) return t2;
    if (t1 > epsilon) return t1;
    return null;
  }

  static wallBall(wall, ball, time) {
    // Get angle of wall
    const dxWall = wall.endX - wall.startX;
    const dyWall = wall.endY - wall.startY;
    const wallAngle = Math.atan2(-dyWall, dxWall);

    // Get incident angle of ball
    const ballAngle = Math.atan2(-ball.vy, ball.vx);

    // Get reflected angle of ball
    const reflectionAngle = -ballAngle+ 2*wallAngle;

    const ballSpeed = Math.sqrt(ball.vx*ball.vx + ball.vy*ball.vy);
    const vx = ballSpeed*Math.cos(reflectionAngle);
    const vy = -ballSpeed*Math.sin(reflectionAngle);

    ball.startX = time*(ball.vx - vx) + ball.startX;
    ball.startY = time*(ball.vy - vy) + ball.startY;

    ball.vx = vx;
    ball.vy = vy;
  }

  static timeUntilWallBall(wall, { startX, startY, vx, vy, radius }) {

    // Transform the reference frame such that the wall extends from the origin along the x-axis

    // Translate
    const tStartX = startX - wall.startX;
    const tStartY = startY - wall.startY;

    // Rotate
    const cos = Math.cos(-wall.angle);
    const sin = Math.sin(-wall.angle);
    const rStartX = utils.rotateX(tStartX, tStartY, sin, cos);
    const rStartY = utils.rotateY(tStartX, tStartY, sin, cos);

    const ballAngle = Math.atan2(vy, vx);
    const ballSpeed = Math.sqrt(vx*vx + vy*vy);
    const rVx = ballSpeed * Math.cos(ballAngle - wall.angle);
    const rVy = ballSpeed * Math.sin(ballAngle - wall.angle);

    // console.log("wall.startX", wall.startX);
    // console.log("wall.startY", wall.startY);
    // console.log("wall.endX", wall.endX);
    // console.log("wall.endY", wall.endY);
    // console.log("ball startX", startX);
    // console.log("ball startY", startY);
    // console.log("ball rStartX", rStartX);
    // console.log("ball rStartY", rStartY);
    // console.log("wall angle", wall.angle / Math.PI);
    // console.log("ball angle", ballAngle / Math.PI);
    // console.log("X velociy", vx, rVx);
    // console.log("Y velocity", vy, rVy);
    // console.log("Wall length", wall.length);

    // The ball is not moving toward the wall.
    if (rVy === 0 || Math.sign(rStartY) === Math.sign(rVy)) {

      // console.log("The ball is not moving toward the wall.");
      // console.log("rStartY", rStartY);
      // console.log("rVy", rVy);
      // console.log();

      return Infinity;
    }

    // Time until ball's y position is a radius length from the wall.
    const time = (Math.abs(rStartY) - radius) / Math.abs(rVy);

    // Get the ball's x coordinate at time of (potential) collision
    
    const xIntercept = rStartX + time * rVx;

    // The ball might miss the wall.
    if (xIntercept < 0 || xIntercept > wall.length) {

      // TODO Check for special cases
      //    where ball hits an endpoint of the line segment
      //    possible solution, consider a line segment 2*radius in length that covers each endpoint

      // console.log("The ball misses the wall.");
      // console.log();

      return Infinity;
    }

    // console.log("time", time);
    // console.log();

    return time;
  }
}