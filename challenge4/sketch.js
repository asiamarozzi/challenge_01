// dichiaro le variabili globali
let tableAlfa, tableBravo, tableCharlie;
let titleHeight = 50;

let colorAlfa, colorBravo, colorCharlie;
let xMin, xMax, yMin, yMax;

// carico i dataset
function preload() {
    tableAlfa = loadTable("assets/drone_alfa_data.csv", "csv", "header");
    tableBravo = loadTable("assets/drone_bravo_data.csv", "csv", "header");
    tableCharlie = loadTable("assets/drone_charlie_data.csv", "csv", "header");
}

// disegna il grafico
function drawChart(list_x_Alfa, list_y_Alfa, list_x_Bravo, list_y_Bravo, list_x_Charlie, list_y_Charlie) {
  
  //linee asse x e asse y
  push();
  stroke(200);
  strokeWeight(2);

  //asse x
  line(xMin, yMax, xMax, yMax);
  //asse y
  line(xMin, yMax, xMin, yMin);

  //aggiungo il nome dell'asse y ruotato
  push();
  fill(200);
  noStroke();
  textSize(20);
  translate(xMin - 10, yMin + 90);
  rotate(-90);
  text("Posizione y", 0,0);
  pop();
  
  // aggiungo il nome dell'asse x
  noStroke();
  fill(200);
  textSize(20);
  text("Posizione x", xMax - 60, yMax + 25);

  // disegno la linea per Alfa
  drawTraiettoria(list_x_Alfa, list_y_Alfa, colorAlfa);
  // disegno la linea per Bravo
  drawTraiettoria(list_x_Bravo, list_y_Bravo, colorBravo);
  // disegno la linea per Charlie
  drawTraiettoria(list_x_Charlie, list_y_Charlie, colorCharlie);
}

// disegna la traiettoria del drone
function drawTraiettoria(list_x, list_y, color) {
  push();
  stroke(color);
  noFill();

  beginShape();
  for (let i = 0; i < list_x.length; i++) {
    let xPos = map(list_x[i], min(list_x), max(list_x), xMin + 5, xMax);
    let yPos = map(list_y[i], min(list_y), max(list_y), yMax, yMin);
    vertex(xPos, yPos);
  }
  endShape();
  pop();
}

// legenda
function drawLegenda() {
  let legendaWidth = 160;
  let legendaHeight = 85;
  let spacing = 25;

  // posizione fissa a destra
  let xLegenda = width - legendaWidth - 40;
  let yLegenda = 50; // margine dall'alto

  // sfondo
  fill(255);
  stroke(180);
  rect(xLegenda - 10, yLegenda - 10, legendaWidth, legendaHeight, 8);

  textAlign(LEFT, CENTER);
  textSize(16);
  noStroke();

  // Alfa
  fill(colorAlfa);
  rect(xLegenda, yLegenda, 15, 15);
  fill(0);
  text("Drone Alfa", xLegenda + 30, yLegenda + 8);

  // Bravo
  fill(colorBravo);
  rect(xLegenda, yLegenda + spacing, 15, 15);
  fill(0);
  text("Drone Bravo", xLegenda + 30, yLegenda + spacing + 8);

  // Charlie
  fill(colorCharlie);
  rect(xLegenda, yLegenda + spacing * 2, 15, 15);
  fill(0);
  text("Drone Charlie", xLegenda + 30, yLegenda + spacing * 2 + 8);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // colori linee
  colorAlfa = color(0, 0, 255);
  colorBravo = color(255, 0, 0);
  colorCharlie = color(255, 255, 0);

  // limiti grafico globali
  xMin = 50;
  xMax = windowWidth - 50;
  yMin = 200;
  yMax = windowHeight - 50;
}

function draw() {
  background(60);
  fill(0); // testo di colore nero

  let margin = 40;
  let legendaWidth = 160;

  // titolo 
  fill(255);
  textSize(30);
  textAlign(LEFT, TOP);
  textWrap(WORD);
  let titoloMaxWidth = width - legendaWidth - margin * 3; // spazio occupato dal titolo
  text("VISUALIZZAZIONE DALL'ALTO DELLE TRAIETTORIE NELL'AREA DI VOLO", margin, 50, titoloMaxWidth);

  // legenda
  drawLegenda();

   // dati Alfa
   let listXAlfa = tableAlfa.getColumn("x_pos");
   let listYAlfa = tableAlfa.getColumn("y_pos"); 
   
   // dati Bravo
   let listXBravo = tableBravo.getColumn("x_pos"); 
   let listYBravo = tableBravo.getColumn("y_pos"); 
   
   // dati Charlie
   let listXCharlie = tableCharlie.getColumn("x_pos"); 
   let listYCharlie = tableCharlie.getColumn("y_pos");

  drawChart(listXAlfa, listYAlfa, listXBravo, listYBravo, listXCharlie, listYCharlie);
}