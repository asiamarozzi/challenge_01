//variables for canva
let xMax = 400;
let yMax = 600;
//variables for rocket initial position
let xRocket = xMax/2;
let yRocket = yMax*0.6;
let rocketHeight = 180;
let rocketWidth = 80;
//other global variables
let table;
let star_img;
let stars_valid = []; //la variabile è un'array

//learn to interact with DOM
let buttonText;
let buttonRolling;
let greeting;
let inpuText;
let bckgcolor = "#C0E1FC"
let sliderColor;
let rocketBodyColor = 220;


let colors = [ "red", "green", "pink", "blue", 
  "orange", "yellow" , "#C0E1FC", 220];

function isStarSizeValid(value){
  //se il dato in ingresso è corretto o meno 
  //restituire un booleano
  return value>0;
}

function preload() {
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
  //filtrare i dati 
  //tramite isStarSizeValid

  //applichiamo la funzione di filtro

  //scorriamo i vaori con un ciclo
  //e filtriamo
  for(let i=0; i<table.getRowCount(); i++){
    let star_value = table.getNum(i, "starSize");
    if(isStarSizeValid(star_value)){
      stars_valid.push(star_value); //aggiunge in coda il nuovo valore dell'array
    }else{

    }
  }


  greeting = createElement('h2', 'What do you want to display?');
  greeting.style('color', 'deeppink');
  greeting.position(20, yMax - 50);

  // min, max, default, step
  sliderColor = createSlider(0, 7, 7, 1);
  sliderColor.position(20, yMax);
  sliderColor.size(100);

  inpuText = createInput();
  inpuText.position(20, yMax -  65);


  
}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}


function draw() {
  background(bckgcolor);
  rocketBodyColor = colors[ceil(sliderColor.value())];
  fill(0); //nero
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);

    //disegnare la stella più piccola 
    //e la stella più grande
    //stars_valid
    image(star_img, 50, 50, min(stars_valid), min(stars_valid));
    image(star_img, 100, 100, max(stars_valid), max(stars_valid));


}



function rollColor(){
  let  idx = random(0,7);
  //vogliamo solo numeri interi
  //intero inferiore, 1.1 --> 1
  // bckgcolor = floor(idx);
  //intero superiore, 1.1 --> 2
  //un numero intero
  //tra 1 e 7
  //indice per accedere all'array
  bckgcolor = colors[ceil(idx)];
  //redraw();
}


function newTextFunc(){
  let text = inpuText.value();
  greeting.html("The text now is " + text);
}