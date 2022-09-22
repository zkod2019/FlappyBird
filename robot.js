function Robot(p, img) {
  this.p = p;
  this.img = img;
  this.y = p.height / 2;
  this.x = 80;

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;

  this.show = function () {
    // fill(255);
    // ellipse(this.x, this.y, 32, 32);
    // Top-left corner of the img is at (x, y)
    // Width and height are 60x60
    this.p.image(img, this.x, this.y, 60, 60);
  };

  this.up = function () {
    this.velocity += this.lift;
  };

  this.update = function () {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > this.p.height) {
      this.y = this.p.height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}
