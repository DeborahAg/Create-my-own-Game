var girlOnMotor, girlOnMotorImg
var obstacles , fencewood ,groundwood
var bottomGround
var background, bgImg
var gameOver, gameOverImg
var restart, restartImg

var score = 0

var PLAY = 1
var END = 0
var gameState = PLAY


function preload(){
  girlOnMotorImg = loadImage("assets/girl on bike1.png")
  fencewood = loadImage("assets/fencewood.png")
  groundwood = loadImage("assets/groundwood.png")
  bgImg = loadImage("assets/road1.png")
  gameOverImg = loadImage("assets/GameOver.png")
  restartImg = loadImage("assets/Restart.png")
}
function setup() {
  createCanvas(800,400);
  background = createSprite(200,150,100,6);
  background.addImage(bgImg)
  background.scale = 3.5
  background.velocityX = -4
  


  girlOnMotor = createSprite(100,290,100,100);
  girlOnMotor.addAnimation("girlOnMotor",girlOnMotorImg);
  girlOnMotor.scale = 0.15

  bottomGround = createSprite(200,400,400,20);
  bottomGround.visible = false
  bottomGround.x = bottomGround.width/2
  bottomGround.velocityX = -4

  gameOver = createSprite(200,200)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.2
  gameOver.visible = false

  restart = createSprite(200,200)
  restart.addImage(restartImg)
  restart.scale = 0.2
  restart.visible = false



}

function draw() {
    
  drawSprites();
  
  console.log(girlOnMotor.y)
  if(gameState === PLAY){

  if(keyDown("space")){
    girlOnMotor.velocityY = -10;

  }
  girlOnMotor.velocityY = girlOnMotor.velocityY + 0.8

  if(girlOnMotor.isTouching(obstacles)){
    gameState = END
  }
}
  if(background.x <0){
    background.x = background.width/2
  }

  if(bottomGround.x <0){
    bottomGround.x = bottomGround.width/2
  }

  girlOnMotor.collide(bottomGround)

  if(gameState === END){
    gameOver.visible = true
    gameOver.depth = gameOver.depth+1
    restart.visible = true
    restart.depth = restart.depth+1

    girlOnMotor.velocityX = 0
    girlOnMotor.velocityY = 0
    obstacles.setVelocityXEach(0)
    obstacles.setVelocityYEach(0)

    obstacles.setLifetimeEach(-1)

    girlOnMotor.x = 100
    
    if(mousePressedOver(restart)){
      reset()
    }
  }

  spawnObstacles()



}

function spawnObstacles(){
  if(World.frameCount % 60 === 0){
    obstacles = createSprite(400,370,50,50);
    obstacles.scale = 0.2 
    obstacles.velocityX = -4

    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: obstacles.addImage(fencewood)
              break;
      case 2: obstacles.addImage(groundwood) 
              break;
      default: break;               
    }

    obstacles.lifetime = 100

  }
}