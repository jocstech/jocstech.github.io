debugMode = false;

// system:
var doc,
    win,
    canvas;

var winW,
    winH;

// webgl:

var canvas,
    ctx;

var id;
var timerId;
var count=0;

// game styles

var color = ['Blue','BlueViolet','Coral','DarkGreen','Gold','LightSeaGreen','Lime','YellowGreen','Turquoise','SteelBlue','Salmon','PowderBlue'];

var bgm;
var sounde;

// characters:

var bird,
    bx,
    by,
    angle,
    size,
    V0,
    acc,
    gravity;


var gap;

// logics:

var dead;

var obs1 = {x:0,height:0,color1:'white',color2:'white'};
var obs2 = {x:0,height:0,color1:'white',color2:'white'};
var obs3 = {x:0,height:0,color1:'white',color2:'white'};
var obs4 = {x:0,height:0,color1:'white',color2:'white'};

var mvSpeed;
var fps;
var time;

// player info

var username;
var score;

var got1 = {x:window.innerWidth/4-80,y:-20};
var got2 = {x:window.innerWidth/4-40,y:-20};

// Main Function:
(function(){
    //buildGame();
    homePage();
})();

function homePage(){
    push('body','<div id="home"><div>');
    push('#home','<h1>Welcome to Yulong\'s Flappy Bird</h1>');
    push('#home','<div id="prom"><div>')
    push('#prom','<h1>Type Your Name:</h1>');
    push('#prom','<form id="form" method="#" action="#"></form>');
    push('#form','<input id="name" type="text"><br>');
    push('#form','<input id="enterbtn" value="Enter Game" type="submit" onclick="buildGame()">');
     push('#prom','<img id="logo" src="assets/images/bird002.svg" alt="">');
    
    
    // properties
    $('#home').css('width','100%').css('height','100%').css('text-align','center');
    $('#prom').css('width','50%')
              .css('height','70%')
              .css('background','black')
              .css('margin-left','25%')
              .css('text-align','center')
              .css('border','1px solid black');
    $('#prom h1').css('color','white');
    $('#enterbtn').css('width','130').css('height','200');
    $('#logo').css('width','50%').css('height','70%');
    
}

function buildGame(){
    username = $('#name').val();
    $('#home').remove();
    init();
    DivInit();
    setup();
    webglInit();
    draw();
    EventListener();
    startAnimation();
}


// Functions:
function init(){
    doc = document;
    win = window;
    winW = window.innerWidth;
    winH = window.innerHeight;
    
    bgm = $('#bgm')[0];
    sounde = $('#sounde')[0];
    
    bird = new Image();
    bird.src='assets/images/bird002.svg';
    size = 20;
    gravity = 0.09;
    
    // initial speed
    V0 = 0;
    bx = (winW/8)-(size/2);
    by = 0;
    angle = 0;
    dead = false;
    
    // obs
    gap = 100;
    mvSpeed = 0.5;
    fps = 1;
    obs1.x = winW/2;
    obs1.height = getRandomInt(2,winH/3);
    
    obs2.x = obs1.x+winW/4;
    obs2.height = getRandomInt(2,winH/3);
    
    score = 0;
}

function update(){  
    winW = window.innerWidth;
    winH = window.innerHeight;
    collisionCheck();
    draw();
}

function DivInit(){
    //push('body','<h1>New Canvas</h1>');
    push('body','<canvas id="canvas"></canvas>')    
}

function setup(){
    $('#canvas').attr('width',winW).attr('height',winH);
}

function webglInit(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    //Retina sup
    ctx.scale(2,2)
}

function drawScene(){
    winW = window.innerWidth;
    winH = window.innerHeight;
    ctx.fillRect(0,0,winW,winH);
}

 
function draw(){
    drawScene();
    drawObs();
    drawImgAngle(bx,by,size,angle,bird);
    screenCheck();
}

function controlUpdate(){
    V0 += -9;
    angle= 0.6;
}


function EventListener(){
    $(window).on('resize',function(){
        //update();
    });
    
    $(window).on('tap',function(){
        controlUpdate();
    });
    
    $(window).click(function(e){
        controlUpdate();
    });
    
    $(window).keypress(function(e){
        var key = e.keyCode ? e.keyCode : e.which;
        // spacebar
        if(key == 32) {
            controlUpdate();
        }
    });
    
    
    $(window).keydown(function(e){
        var key = e.keyCode ? e.keyCode : e.which;
        
        if (key == 68 || key == 39 || key == 100) {
            mvSpeed = 1;
        }
    });
    
    $(window).keyup(function(e){
         var key = e.keyCode ? e.keyCode : e.which;
         if(key == 32) {
             //V0 = 0.5;
        }
        
        if (key == 68 || key == 39 || key == 100){
            mvSpeed = 0.5;
        }
        
    });
    
}

function screenCheck(){
    // always on:
    drawScore();
    // when game over:
    if(dead){
        drawGameOver();
        console.log("Player Dead!");
    }
}

function screenCheckAnimation(){
    if(got1.y<(window.innerHeight/4))
        got1.y+=0.5;
    if(got2.y<(window.innerHeight/4+20))
        got2.y+=0.2;
    update();
}

function startAnimation(){
    // animation
    id = setInterval(frame, 1);
}


function frame() {
    
    time++;
    
    if (dead) {
        
        bgm.pause();
        bgm.currentTime = 0;
        
        clearInterval(id);
        id = setInterval(screenCheckAnimation,1);
    } else {
        // update frames here

        if(angle>0 && V0>0) angle-=0.005;
        
        moving();
        
        if(size<40){
            size+=0.5;
            bx = (winW/8)-(size/2);
        }
        
        obsAnimation();
        count++;
        update();
    }
}

function moving(){
    if(by<winH/2-size+10){
       V0+=gravity;
       V0*=0.9;
       by+=V0*fps;
    } else {
        dead = true;
    }
}

function obsAnimation() {
    if (!dead) {
        if (obs1.x > -15) {
            obs1.x -= mvSpeed * fps;
            if(Math.floor(obs1.x/bx)==1){
                sounde.currentTime = 0;
                sounde.play();
                score++;
            }
        } else {
            obs1.height = getRandomInt(10, winH / 3);
            var num = getRandomInt(0,11);
            obs1.color1 = color[num];
            obs1.color2 = color[11-num];
            obs1.x = winW / 2;
        }
        if (obs2.x > -15) {
            obs2.x -= mvSpeed * fps;
            if(Math.floor(obs2.x/bx)==1) {
                sounde.currentTime = 0;
                sounde.play();
                score++;
            }
        } else {
            obs2.height = getRandomInt(10, winH / 3);
            var num = getRandomInt(0,11);
            obs2.color1 = color[num];
            obs2.color2 = color[11-num];
            obs2.x = winW / 2;
        }
    }
}
function drawGameOver(){
    ctx.save()
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over!", got1.x,got1.y);
    ctx.font = "15px Arial";
    ctx.fillText("Best Score: "+score, got2.x,got2.y);
    ctx.restore();
}

function drawScore(){
    ctx.save()
    ctx.font = "10px Arial";
    ctx.fillStyle = "gray";
    ctx.fillText("Score: "+score,21,21);
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score,20,20);
    ctx.fillText(username,winW/4-10,20);
    ctx.restore();
}

function drawObs(){    
    fillRect(obs1.x,0,15,obs1.height,5,obs1.color1);
    fillRect(obs1.x,obs1.height+gap,15,winH/2-obs1.height-gap,5,obs1.color2);
    
    
    
    fillCircle(obs1.x+15/2,obs1.height-13,obs1.color1);
    fillCircle(obs1.x+15/2,obs1.height+gap+13,obs1.color2);
    
    fillRect(obs2.x,0,15,obs2.height,5,obs2.color1);
    fillRect(obs2.x,obs2.height+gap,15,winH/2-obs2.height-gap,5,obs2.color2);
    
    fillCircle(obs2.x+15/2,obs2.height-13,obs2.color1);
    fillCircle(obs2.x+15/2,obs2.height+gap+13,obs2.color2);
    
    if(obs1.x+15/2>bx)
        drawFuzzyLines(obs1.x+15/2,obs1.height-13,obs1.x+15/2,obs1.height+gap+13);
    if(obs2.x+15/2>bx)
    drawFuzzyLines(obs2.x+15/2,obs2.height-13,obs2.x+15/2,obs2.height+gap+13);
    
    
}

function drawFuzzyLines(x1,y1,x2,y2){
    
    var wide = 20;
    var p1x,p1y,p2x,p2y;
    
    ctx.save;
    ctx.strokeStyle = 'PaleGoldenRod';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for(var i = 0 ; i <3 ; i++){
        p1x = getRandomInt(x1-wide,x2+wide);
        p1y = getRandomInt(y1,y2);
        p2x = getRandomInt(x1-wide,x2+wide);
        p2y = getRandomInt(y1,y2);
        ctx.quadraticCurveTo(p1x,p1y,p2x,p2y);
    }
    ctx.quadraticCurveTo(p2x,p2y,x2,y2);
    ctx.closePath;
    ctx.stroke();
    ctx.restore;
    
    
    
}

function drawImgAngle(x,y,size,angle,imageObj){
    if(debugMode) drawRect(x,y,size,size,2,"green")
    ctx.save();
    ctx.translate(x+size/2, y+size/2);
    ctx.rotate(angle);
    ctx.drawImage(imageObj, -size/2, -size/2,size,size);  
    ctx.restore();
}

function drawRect(x,y,width,height,lineWidth,color){
    ctx.save();
    ctx.beginPath(); 
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(x,y);
    ctx.lineTo(x+width,y);
    ctx.lineTo(x+width,y+height);
    ctx.lineTo(x,y+height);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function fillRect(x,y,width,height,lineWidth,color){
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
    ctx.restore();
}

function fillCircle(centerX,centerY,color){
    var radius = 15;
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.closePath;
    ctx.fill();
    ctx.restore();
    
    radius = 10;
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.closePath;
    ctx.fill();
    ctx.restore();
}

function drawImg(x,y,size,url){
    var imageObj = new Image();
    imageObj.src = url;
    ctx.drawImage(imageObj, x, y,size,size);   
}

function drawLine(fromx, fromy, tox, toy){
    ctx.save;
    ctx.strokeStyle = 'white';
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();
    ctx.restore;
}


function collisionCheck(){
    // bx , by
    //obs1.x obs1.y
    //obs2.x obs2.y
    
    if((bx+size)>obs1.x && (bx+size)<obs1.x+15){
        if(((by)< obs1.height)||((by+size/2) > obs1.height+gap)) dead = true;
    }
    
    if((bx+size)>obs2.x && (bx+size)<obs2.x+15){
        if(((by)< obs2.height)||((by+size/2) > obs2.height+gap)) dead = true;
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function push(div,elm){
    $(div).append(elm);
}

function debug(msg){
    console.log(msg);
}