class Attractor {
  constructor(x, y, z, c) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.c = c;
    
    this.points = [];

    this.bassRange = 0;
    this.midRange = 0;
    this.highRange = 0;
    this.brightness = 0;
  }
  
  update() {
    let dx = (sigma * (this.y - this.x)) * dt;
    let dy = (this.x * (rho - this.z) - this.y) * dt;
    let dz = (this.x*this.y - beta*this.z) * dt;

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

    stroke(this.bassRange, this.bassRange, this.highRange, this.brightness);
    strokeWeight(1);

    line(
        prev.x, prev.y, prev.z,
        curr.x, curr.y, curr.z
    );
  }

  setColor(bass, mid, treble, brightness) {
    this.bassRange = bass;
    this.midRange = mid;
    this.highRange = treble;
    this.brightness = brightness;
  }
}