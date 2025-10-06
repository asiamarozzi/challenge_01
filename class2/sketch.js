let xMax = 500;
let yMax = 700;

// posizione base pendolo
let xpendolo = xMax/2;
let ypendolo = yMax/2;

// variabili per orologio
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

function setup() {
  createCanvas(xMax, yMax);
  frameRate (30);
  angleMode(DEGREES);
}

function draw() {
  background("#c5e384");
  // mostrare testo bianco che 
  // dice le coordinate del mouse 
  // sul foglio da disegno
  fill (255); //bianco
  noStroke();

  // stringa, x, y
  text ("mouseX:"+mouseX + ", mouseY:"+mouseY, 20, 20);


// base pendolo
push();

  // corpo centrale pendolo
  fill("#8a3b08");
  rectMode(CENTER);
  rect (xpendolo, ypendolo, 160, 420,);

  // parte superiore del pendolo
  arc(xpendolo, ypendolo-210, 160, 100, PI, 0);
  
   // piedi  del pendolo
  rectMode(CENTER);
  rect (xpendolo-70, ypendolo+220, 20, 20,);
  rectMode(CENTER);
  rect (xpendolo+70, ypendolo+220, 20, 20,);

pop();

// pendolo
push();

  fill("#e59d2c");

  // oscillazione tra -8 e +8 gradi 
  // intorno al punto di attacco del pendolo 
  // (centro del cerchio dell'orologio)
  let angle = sin(frameCount*3.5) * 8; 
  translate(xpendolo, ypendolo-120);
  rotate(angle); 
  
  // asta
  rectMode(CORNER);
  rect (-5, 0, 10, 250,);

  // massa
  ellipse(0, 250, 50, 50,);

pop(); 


// orologio
  // Set radius for each shape based on canvas dimensions
  let radius = min(width, height) / 7.5;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

push();

// traslazione del centro dell'orologio
translate(xpendolo, ypendolo-150);

// sfondo orlogio
stroke('#2e4365');
strokeWeight(5)
fill("#ebddc5");
ellipse(0, 0, clockDiameter, clockDiameter);

// calcolo degli angoli per le lancette
let secondAngle = map(second(), 0, 60, 0, 360);
let minuteAngle = map(minute(), 0, 60, 0, 360);
let hourAngle = map(hour(), 0, 12, 0, 360);

stroke('#2e4365');

  // lancetta dei secondi
  push();
  rotate(secondAngle);
  strokeWeight(0.8);
  line(0, 0, 0, -secondsRadius);
  pop();

  // lancetta dei minuti
  push();
  strokeWeight(1.5);
  rotate(minuteAngle);
  line(0, 0, 0, -minutesRadius);
  pop();

  // lancetta delle ore
  push();
  strokeWeight(3);
  rotate(hourAngle);
  line(0, 0, 0, -hoursRadius);
  pop();

   // Tick markers around perimeter of clock
   push();
   strokeWeight(2);
   for (let ticks = 0; ticks < 60; ticks += 1) {
     point(0, -secondsRadius);
     rotate(6);
   }
   pop();

pop();


// vetro
push();
  fill(255, 255, 255, 50);
  arc(xpendolo, ypendolo-200, 120, 70, 180, 0);
  rectMode(CENTER);
  rect (xpendolo, ypendolo-5, 120, 390,);

pop(); 


// pavimento
push();

  fill("#8db53e");
  stroke("#8db53e");
  rectMode(CENTER);
  rect (xpendolo, yMax, xMax, 240,);

pop();

}
