// variabili globali
let xMax = 1000;
let yMax = 700;
let heightPavimento = 120;
let yPavimento = yMax-heightPavimento;

// variabili per orologio
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

// funzione che disegna il pendolo interamente
function drawPendolo(xPendolo, widthPendolo, heightPendolo, heightPiedi, pendoloSpeed, oscillazione, followMouse, radiusSpeed){
// definisco variabili utili
  // definisco la funzione che calcola 
  // l'altezza del pendolo in modo che poggi sul pavimento
  let yPendolo = yMax-heightPavimento-heightPiedi-heightPendolo/2;
  // definisco la funzione che calcola 
  // la dimensione del raggio dell'orologio in funzione della larghezza del pendolo
  let radius = widthPendolo/2.5;
  // posizione piedi del pendolo in modo che tocchino il pavimento
  let xPiedeSx = xPendolo-(widthPendolo/2-10);
  let xPiedeDx = xPendolo+(widthPendolo/2-10);
  let yPiedi = yPavimento - heightPiedi/2;
  // posizione degli archi
  let yArcoBase = yPendolo - heightPendolo / 2;
  let yArcoVetro = (yPendolo-5) - (heightPendolo-30)/2;

  
//base pendolo
  push();
  // corpo centrale pendolo
  fill("#8a3b08");
  rectMode(CENTER);
  rect (xPendolo, yPendolo, widthPendolo, heightPendolo);

  // parte superiore del pendolo
  arc(xPendolo, yArcoBase, widthPendolo, 100, PI, 0);
  
  // piedi  del pendolo
  rect (xPiedeDx, yPiedi, 20, heightPiedi);
  rect (xPiedeSx, yPiedi, 20, heightPiedi);
  pop();

// vetro
  push();
  fill(255, 255, 255, 50);
  arc(xPendolo, yArcoVetro, widthPendolo-40, 70, 180, 0);
  rectMode(CENTER);
  rect (xPendolo, yPendolo-5, widthPendolo-40, heightPendolo-30);
  pop(); 

// pendolo 
  push();
  fill("#e59d2c");
  // oscillazione intorno al punto di attacco del pendolo (centro del cerchio dell'orologio)
  let angle = sin(frameCount*pendoloSpeed) * oscillazione; 
  translate(xPendolo, yPendolo-120);
  rotate(angle); 
  // asta
  rectMode(CORNER);
  rect (-5, 0, 10, heightPendolo/1.8);
  // massa
  ellipse(0, heightPendolo/1.8, radius/1.25, radius/1.25,);
  pop();

// orologio
  // Set radius for each shape based on canvas dimensions
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  push();
    // traslazione del centro dell'orologio
    translate(xPendolo, yPendolo-heightPendolo/2.8);
    // sfondo orlogio
    stroke('#2e4365');
    strokeWeight(5)
    fill("#ebddc5");
    ellipse(0, 0, clockDiameter, clockDiameter);
    // lancetta che segue il mouse 
    // se true segue 
    // se false segna l'orario
    if (followMouse) {
        let angleToMouse = atan2(mouseY - (yPendolo-150), mouseX - xPendolo)+ 90;
        push();
        rotate(angleToMouse);
        stroke('#2e4365');
        strokeWeight(3);
        line(0, 0, 0, -secondsRadius);
        pop();

    } else {

        // calcolo degli angoli per le lancette
        let secondAngle = map(second(), 0, 60, 0, 360);
        let minuteAngle = map(minute(), 0, 60, 0, 360);
        let hourAngle = map(hour(), 0, 12, 0, 360);

        stroke('#2e4365');

          // lancetta dei secondi
          push();
          rotate(secondAngle*radiusSpeed);
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
    }
    // Tick markers around perimeter of clock
    push();
    strokeWeight(2);
    for (let ticks = 0; ticks < 60; ticks += 1) {
        point(0, -secondsRadius);
        rotate(6);
    }
    pop();
  pop();
}
// pavimento
function drawPavimento(){
  push();
  fill("#8db53e");
  noStroke();
  /*rect (0, yPendolo+heightPendolo/2+heightPiedi, xMax, yMax);
  // pavimento che dipende dal primo pendolo */
  rect(0, yPavimento, xMax, heightPavimento)
  pop();
}

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
  drawPavimento();

  // disegna pendoli
  drawPendolo(100, 130, 400, 60, 3.5, 3, false, 2);
  drawPendolo(300, 200, 440, 5, 10, 10, true);
  drawPendolo(xMax/2, 160, 420, 20, 3.5, 8, false, 1); //pendolo centrale che segna l'ora corrente
  drawPendolo(700, 140, 300, 60, 3.5, 7, false, 3);
  drawPendolo(875, 180, 440, 30, 5, 9, true);
}
