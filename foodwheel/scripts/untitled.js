// Global variables

var colour=[]; // predifined colour set
var itmes=[]; // items on the wheel
var slices;
var sliceAngle;
var angle;
var speed;
var slowDownRand;
var wheelCanvas; // wheel canvas
var size; // wheel size
var center; // center point
var stop;
var lock;

var index;
var result;


// constructor
function createWheel(list) {
    itmes = list;
    initialize();
    animation();
    eventsListenner();
}


// initialization
function initialize() {
    for(index=0;index<itmes.length;index++){
        colour[index] = getRandColour();
    }
    slices = colour.length;
    sliceAngle = 360/slices;
    angle = rand(0, 360);
    speed = 0;
    slowDownRand = 0;
    wheelCanvas = canvas.getContext('2d');
    size = canvas.width; // size
    center = size/2;      // center
    stop = false;
    lock = false;
    
}

function eventsListenner() {
    $("#canvas").click(function(){
  stop = true;
    });
}

function animation() {
  angle += speed;
  angle %= 360;

  // Increment speed
  if(!stop && speed<3){
    speed = speed+1 * 0.1;
  }
  // Decrement Speed
  if(stop){
    if(!lock){
      lock = true;
      slowDownRand = rand(0.994, 0.999);
    } 
    speed = speed>0.2 ? speed*=slowDownRand : 0;
  }
  // Stopped!
  if(lock && !speed){
    var decisionIndex = Math.floor(((360 - angle - 180) % 360) / sliceAngle); // angle 2 Array Index
    decisionIndex = (slices+decisionIndex)%slices;
    result = itmes[decisionIndex];
    return $('#result').html("You got:</br>"+result); // Get Array Item from end Degree
  }

  drawWheel();
  window.requestAnimationFrame(animation);
}


// Main Components

function drawSlice(angle, colour) {
  wheelCanvas.beginPath();
  wheelCanvas.fillStyle = colour;
  wheelCanvas.moveTo(center, center);
  wheelCanvas.arc(center, center, width/2, degreeToRadius(angle), degreeToRadius(angle+sliceAngle));
  wheelCanvas.lineTo(center, center);
  wheelCanvas.fill();
}

function drawText(angle, text) {
    wheelCanvas.save();
    wheelCanvas.translate(center, center);
    wheelCanvas.rotate(degreeToRadius(angle));
    wheelCanvas.textAlign = "center";
    wheelCanvas.fillStyle = "#fff";
    wheelCanvas.font = 'bold '+getFontSize(text)+'px sans-serif';
    wheelCanvas.shadowColor = "#111";
    wheelCanvas.shadowOffsetX = 4; 
    wheelCanvas.shadowOffsetY = 4; 
    wheelCanvas.shadowBlur = 10;
    wheelCanvas.fillText(text, 130, 10);
    wheelCanvas.restore();
}

function drawWheel() {
  wheelCanvas.clearRect(0, 0, size, size);
  for(var i=0; i<slices; i++){
    drawSlice(angle, colour[i]);
    drawText(angle+sliceAngle/2, itmes[i]);
    angle += sliceAngle;
  }
   
}

// Utilities


function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function degreeToRadius(angle) {
  return angle * Math.PI/180;
}


function getRandColour() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 3; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function getFontSize(text) {
    return 200*(1/text.length)+5;
}

function getCanvas() {
    return this.wheelCanvas;
}





