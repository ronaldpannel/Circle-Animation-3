class Particle {
  constructor(effect) {
    this.x = effect.width / 2;
    this.y = effect.height / 2;
    this.radius = 20;
    this.vx = Math.floor(Math.random() * (5 - -5 + 1) + -5);
    this.vy = Math.floor(Math.random() * (5 - -5 + 1) + -5);

    this.acc = 0;
    this.hue = 0;
    this.timer = 0;
    this.interval = 1000 / 200;
  }
  update() {
    // this.vx += this.acc;
    this.vy += this.acc;

    this.x += this.vx;
    this.y += this.vy;
    this.acc = constrain(this.acc, -1, 2);

    this.hue += 1;
  }
  draw(ctx, deltaTime) {
    if (this.timer > this.interval) {
      ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
  }
  applyForce(force) {
    this.acc += force;
  }
  collision() {
    let dx = this.x - effect.circle.x;
    let dy = this.y - effect.circle.y;
    let distance = Math.hypot(dx, dy);

    if (distance > effect.circle.radius) {
      const normalAngle = Math.atan2(dy, dx);
      const randomOffset = (Math.random() - 0.5) * (Math.PI / 2);
      const bounceAngle = normalAngle + randomOffset;

      const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);

      // Set the new velocity to reflect away from the circle
      this.vx = -Math.cos(bounceAngle) * speed;
      this.vy = -Math.sin(bounceAngle) * speed;

      // Correct the position so it stays within the boundary
      this.x = effect.circle.x + Math.cos(normalAngle) * effect.circle.radius;
      this.y = effect.circle.y + Math.sin(normalAngle) * effect.circle.radius;

      let note = Math.floor(Math.random() * soundFrequencies.length);
      playSound(soundFrequencies[note]);
      if (this.y > 569 && this.vy < 1 && this.vy > -1) {
        effect.reset(ctx);
      }
      console.log(this.vy)

      //  this.radius += .5
    }
  }
}
