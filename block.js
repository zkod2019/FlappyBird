function Block(p, imgTools) {
    this.p = p;
    this.imgTools = imgTools;
    this.spacing = 175;
    this.top = p.random(p.height / 5, 3 / 5 * p.height);
    this.bottom = p.height - (this.top + this.spacing);
    this.x = p.width;
    this.w = 80;
    this.speed = 6;
  
    this.highlight = false;
  
    this.hits = function(robot) {
      if (robot.y < this.top || robot.y > this.p.height - this.bottom) {
        if (robot.x > this.x && robot.x < this.x + this.w) {
          this.highlight = true;
          return true;
        }
      }
      this.highlight = false;
      return false;
    }
  
    this.show = function() {
      this.p.image(imgTools, this.x, 0, this.w, this.top);
      this.p.image(imgTools, this.x, this.p.height - this.bottom, this.w, this.bottom);
      //rect(this.x, 0, this.w, this.top);
     // rect(this.x, height - this.bottom, this.w, this.bottom);
    }
  
    this.update = function() {
      this.x -= this.speed;
    }
  
    this.offscreen = function() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
  }