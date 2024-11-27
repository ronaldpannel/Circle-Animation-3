/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grad.addColorStop(0, "red");
grad.addColorStop(0.2, "white");
grad.addColorStop(0.4, "orange");
grad.addColorStop(0.6, "green");
grad.addColorStop(0.8, "yellow");
grad.addColorStop(1, "purple");

const playBtn = document.getElementById("btn");
const soundFrequencies = [
  1760, 1567.98, 1396.91, 1318.51, 1174.66, 1046.5, 987.77, 880, 783.99, 698.46,
  659.25, 587.33, 523.25, 493.88, 440, 392, 349.23, 329.63, 293.66, 261.63,
];

class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.g = 0.0001;
    this.gravity = Math.random() * this.g;

    //  this.gravity = Math.random() * (0.0002 - 0.0001) + 0.0001;

    this.circle = new Circle(this);
    this.particle = new Particle(this);
  }
  reset(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.circle = new Circle(this);
    this.particle = new Particle(this);
  }
  render(ctx, deltaTime) {
    this.circle.draw(ctx);
    this.particle.update();
    this.particle.collision();
    this.particle.applyForce(this.gravity);
    this.particle.draw(ctx, deltaTime);

    if (this.g > 0.0001) {
      this.g -= 0.0001;
    } else {
      this.g = 0.0001;
    }
  }
}
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
function animate(timeStamp) {
  //ctx.clearRect(0, 0, canvas.width, canvas.height)
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  effect.render(ctx, deltaTime);

  requestAnimationFrame(animate);
}
animate(0);

window.addEventListener("resize", () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
