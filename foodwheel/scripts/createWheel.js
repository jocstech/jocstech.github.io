// globle variables:
var colour = [];
var itmes = [];
var slices = colour.length;
var sliceDeg = 360/slices;
var deg = rand(0, 360);
var ctx = canvas.getContext('2d');
var width = canvas.width;
var center = width/2;
var lock = false;
var isStopped = false;
var started = false;
var speed = 0;
var slowDownRand = 0;

// main function:
function createWheelCanvas(itmes,demoData){

    var length = itmes.length;
    
    
    
    
    return this.ctx;
}


// Wheel canvas variables

for( var i = 0 ; i < 7 ; i++ ){
    colour[i] = getRandomColor();
    itmes[i] = getRandomItmes();
}


function degToRad(deg) {
  return deg * Math.PI/180;
}

function drawSlice(deg, colour) {
  ctx.beginPath();
  ctx.fillStyle = colour;
  ctx.moveTo(center, center);
  ctx.arc(center, center, width/2, degToRad(deg), degToRad(deg+sliceDeg));
  ctx.lineTo(center, center);
  ctx.fill();
}

function drawText(deg, text) {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(degToRad(deg));
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = 'bold 35px sans-serif';
  ctx.fillText(text, 130, 10);
  ctx.restore();
}

function drawWheel() {
  ctx.clearRect(0, 0, width, width);
  for(var i=0; i<slices; i++){
    drawSlice(deg, colour[i]);
    drawText(deg+sliceDeg/2, itmes[i]);
    deg += sliceDeg;
  }
}

(function anim() {
  deg += speed;
  deg %= 360;

  // Increment speed
  if(!isStopped && speed<3){
    speed = speed+1 * 0.1;
  }
  // Decrement Speed
  if(isStopped){
    if(!lock){
      lock = true;
      slowDownRand = rand(0.994, 0.998);
    } 
    speed = speed>0.2 ? speed*=slowDownRand : 0;
  }
  // Stopped!
  if(lock && !speed){
    var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
    ai = (slices+ai)%slices; // Fix negative index
    return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
  }

  drawWheel();
  window.requestAnimationFrame( anim );
}());


// Utilities:


function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 3; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomItmes() {
  var countries = ["Canadian", "American", "Chinese", "Thai", "Japanese",
                    "Greek", "Russian", "Arabic", "Persian", "Mexican"];
  var itme = countries[Math.floor(Math.random() * 10)];
  return itme;
}

// some example datas:
function getRandomFood() {
  var variety = ["Burger", "Sushi", "Chow Mein", "Steak", "Chicken Parmesan",
                    "Hot Dog", "Pizza", "Rice", "Kebab", "Spaghetti meatballs"];
  var food = variety[Math.floor(Math.random() * 10)];
  return food;
}