function setup() {
    createCanvas(950, 800, WEBGL);//enables 3D render
  }
  
  function draw() {
    background(0);
    noFill();
    stroke(100, 100, 240);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    box(45, 45, 45);

    translate(200, 0, 0);
   // push();
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    cylinder(70, 70);
   // pop();

    translate(200, 100, 100);
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    sphere(40);

    translate(0, 200, 0);
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    cone(70, 70);

    translate(100, 200, 100);
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    torus(70, 20);
  }