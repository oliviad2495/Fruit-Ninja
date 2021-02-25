//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;

var fruit1, fruit1Img, fruit2, fruit2Img, fruit3, fruit3Img, fruit4, fruit4Img;

var alien1Img, alien2Img;

var knifeSwoosh;

var over, overImg, gameoverS;


function preload(){
  
  knifeImage = loadImage("knife.png");
  
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  
  alienImg = loadImage("alien1.png");
  
  knifeSwoosh = loadSound("knifeSwoosh.mp3");
  
  overImg = loadImage("gameover.png");
  gameoverS = loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  
  fruitG = new Group();
  aliensG = new Group();
}

function draw() {
  background("yellow");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    aliens();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
   
    // Go to end state if knife touching enemy
      
  
  if (fruitG.isTouching(knife)) {
      score = score + 3;
    fruitG.destroyEach();
    knifeSwoosh.play();
    }
  else if(aliensG.isTouching(knife)){
    gameState = END;
    aliensG.destroyEach();
   gameoverS.play();
    }
    
    if(gameState === END){
      knife.addImage(overImg);
      knife.x = 300;
      knife.y = 300;
      
    }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}
}

function fruits(){
  
  if(World.frameCount%80 === 0){
    var fruit = createSprite(600,200,5,5);
    fruit.velocityX = -(8+(score/6));
    
    var rand = Math.round(random(1,4));
    
    if(rand == 1){
      fruit.addImage(fruit1Img);
    } 
    else if(rand==2){
      fruit.addImage(fruit2Img);
    }
    else if (rand == 3){
      fruit.addImage(fruit3Img);
    }
    else{
      fruit.addImage(fruit4Img);
    }
    fruit.y = Math.round(random(50,550));
    fruit.scale = 0.2;
    fruit.lifetime = 120;
    
    fruitG.add(fruit);
  }
}

function aliens(){
  
  if(World.frameCount%80 === 0){
    var alien = createSprite(500,200,5,5);
    alien.velocityX = -(8+(score/15));
    alien.addImage(alienImg);
    
    alien.y = Math.round(random(50,550));
    alien.lifetime = 120;
    
    aliensG.add(alien);
  }
}
