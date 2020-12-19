
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var survivalTime=0;
var score=0;
var gameState="PLAY";
var gameState="END";
var gameOver,gameOverImg;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg=loadImage("game-over-1.jpeg");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(50,317,10,10);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
 ground=createSprite(200,350,800,10);
  ground.velocityX=-6;
  
  obstaclesGroup=new Group();
  FoodGroup=new Group();
  
   gameOver=createSprite(-200,-200,400,400);
  gameOver.addImage(gameOverImg);
}


function draw() {
  gameState="PLAY";
  if(gameState==="PLAY"){
  background("lightblue");
  fill("black");
  textSize(18);
  text("SURVIVAL  TIME : "+survivalTime,100,30);
  
  fill("black");
  textSize(18);
  text("SCORE : "+score,140,50);
  ground.depth=monkey.depth-1;
  if(ground.x<100) {
    ground.x=400;
  }
  if(frameCount % 4===0) {
    survivalTime+=1;
  }
  if(monkey.collide(ground) && keyDown("space")) {
    monkey.velocityY=-14;
  }
  
  monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
   if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
     score+=1;
    }
  if(obstaclesGroup.isTouching(monkey)) {
    gameState="END";
  }
  obstacles();
  Banana();
}
  if(gameState==="END") {
    createCanvas(400,300);
    gameOver.x=200;
    gameOver.y=200;
    monkey.destroy();
    ground.destroy();
    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
    fill("yellow");
    textSize(18);
    text("GAME  OVER",150,180);
  }
  drawSprites();
}

function obstacles() {
  if(frameCount % 200 === 0 ) {
    obstacle=createSprite(500,316,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-6;
    obstacle.lifetime=300;
    obstacle.setCollider("rectangle",0,0,300,200);
    obstacle.depth=gameOver-10;
    obstaclesGroup.add(obstacle);
    if(gameOver.x===200) {
      obstacle.velocityX=5;
      obstacle.destroy();
    }
  }
}
function Banana() {
  if(frameCount % 80 === 0 ) {
    banana=createSprite(450,random(150,225),10,10);
    banana.lifetime=300;
    banana.addImage(bananaImage);
    banana.scale=random(0.1,0.2);
    banana.velocityX=-7;
    if(gameOver.x===200) {
      banana.velocityX=5;
      banana.destroy();
    }
    FoodGroup.add(banana);
}
}