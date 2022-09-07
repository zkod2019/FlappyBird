var robot;
var block = [];

function setup() {
  createCanvas(700, 500);
  robot = new Robot();
  block.push(new Block());
}

function draw() {
  background(0);

  for (var i = block.length-1; i >= 0; i--) {
    block[i].show();
    block[i].update();

    if (block[i].hits(robot)) {
      console.log("HIT");
    }

    if (block[i].offscreen()) {
        block.splice(i, 1);
    }
  }

  robot.update();
  robot.show();

  if (frameCount % 75 == 0) {
    block.push(new Block());
  }
}

function keyPressed() {
  if (key == ' ') {
    robot.up();
  }
}
