class Attractor {
  constructor(x, y, z, c) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.c = c;

    this.points = [];

    this.hue = random(360);
    this.brightness = 255;

    // Spark energy
    this.spark = 0;
  }

  update() {
    let dx = (sigma * (this.y - this.x)) * dt;
    let dy = (this.x * (rho - this.z) - this.y) * dt;
    let dz = (this.x * this.y - beta * this.z) * dt;

    this.x += dx;
    this.y += dy;
    this.z += dz;

    let p = createVector(this.x, this.y, this.z);
    this.points.push(p);

    if (this.points.length > maxPoints) {
      this.points.shift();
    }
  }

  display() {
  if (this.points.length < 2) return;

  let prev = this.points[this.points.length - 2];
  let curr = this.points[this.points.length - 1];

  colorMode(HSB, 360, 100, 100, 255);
  
  stroke(
    this.hue,
    100,
    100,
    this.brightness
  );

  strokeWeight(1);

  line(
    prev.x, prev.y, prev.z,
    curr.x, curr.y, curr.z
  );

  this.spark *= 0.75;

  if (this.spark > 0.01) {

    // Soft colored glow
    stroke(
      this.hue,
      80,
      100,
      this.spark * 80
    );

    strokeWeight(
      3 + this.spark * 4
    );

    line(
      prev.x, prev.y, prev.z,
      curr.x, curr.y, curr.z
    );

    // Bright spark core
    stroke(
      this.hue,
      30,
      100,
      this.spark * 255
    );

    strokeWeight(
      1 + this.spark * 1.5
    );

    line(
      prev.x, prev.y, prev.z,
      curr.x, curr.y, curr.z
    );
  }
}

  setBrightness(brightness) {
    this.brightness = brightness;
  }
}