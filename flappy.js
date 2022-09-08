var robot;
var block = [];

let img;

function preload() {
  img = loadImage("./robo.png");
  imgTools = loadImage("./tools.png");
}

function setup() {
  createCanvas(700, 500);
  robot = new Robot(img);
  block.push(new Block(imgTools));
}

function draw() {
  background(0);

  for (var i = block.length - 1; i >= 0; i--) {
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
    block.push(new Block(imgTools));
  }
}

function keyPressed() {
  if (key == " ") {
    robot.up();
  }
}
