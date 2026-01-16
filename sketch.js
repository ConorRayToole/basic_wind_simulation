const movers = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++){
    movers.push(new Mover());
  }
}

function draw() {
  background(220);
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 20);
  for (let i = 0; i < 10; i++){
    movers[i].checkEdges();
    movers[i].move();
    movers[i].display();
  }
}

class Mover {
  constructor(){
    this.location = createVector(random(10,390),random(10,390));
    this.velocity = createVector();
    this.acceleration = createVector();
    this.circleColor = createVector(random(255), random(255), random(255));
  }
  
  move() {
    if (mouseIsPressed) {
      let mouseLocation = createVector(mouseX, mouseY);
      let wind = mouseLocation.sub(this.location);
      wind.x = 1/wind.x;
      wind.y = 1/wind.y;
      wind = wind.mult(-0.6);
      this.applyForces([wind]);
    }
    let friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-0.01);
    this.applyForces([friction]);
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    noStroke();
    fill(this.circleColor.x, this.circleColor.y, this.circleColor.z);
    ellipse(this.location.x, this.location.y, 20);
  }
  
  applyForces(forces) {
    forces.forEach(force => {
      this.acceleration.add(force);
    });
  }
  
  checkEdges() {
    if (this.location.x < 10 || this.location.x > 390){
      this.velocity.x *= -1;
      //this.circleColor = createVector(random(255), random(255), random(255));
    }
    if (this.location.y < 10 || this.location.y > 390){
      this.velocity.y *= -1;
      //this.circleColor = createVector(random(255), random(255), random(255));
    }
  }
}