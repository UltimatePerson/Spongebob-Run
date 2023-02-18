var spongebob, spongebobSad;
var invisibleGround
var obstacle, obstaclesGroup, obstacle1, obstacle2, obstacle3;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImage, restartImage;
var gameOver, restart;




function preload() {
  groundImage = loadImage("ground.png");

  spongebobImage = loadImage("Spongebob.png");
  spongebobSadImage = loadImage("sad_spongebob.png");

  obstacle1 = loadImage("rock.png");
  obstacle2 = loadImage("jellyfish.png");
  obstacle3 = loadImage("kelp.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("game_over.png");




}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ground = createSprite(width /2, height /2, width, height);
  ground.addImage(groundImage);
  ground.x = ground.width / 2;
  ground.scale = 6;


  spongebob = createSprite(50, height - 35, 7, 7);
  spongebob.addImage("player", spongebobImage);
  spongebob.addImage("sad", spongebobSadImage)
  spongebob.scale = 0.05;
  spongebob.changeImage("player")

  invisibleGround = createSprite(width / 2, height - 35, width, 10);
  invisibleGround.visible = false;

  restart = createSprite(width / 2, height / 2 - 30);
  restart.addImage(restartImg);
  restart.scale = 0.05;

  gameOver = createSprite(width / 2, height / 2 - 30);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.25;

  obstaclesGroup = new Group();

}



function draw() {
  background(150, 150, 150);

  textSize(20);
  fill("white");
  text("Score: " + score, 50, 50);

  if (gameState == PLAY){
    gameOver.visible = false;
    restart.visible = false;

    score = score + Math.round(getFrameRate()/60);
  }

  if ((touches.length > 0 || keyDown("space")) && spongebob.y >= height / 2 + 300){
    spongebob.velocityY = -12;
    touches = [];
  }

  spongebob.velocityY = spongebob.velocityY + 0.9; 

  spawnObsticle();

  if (obstaclesGroup.isTouching(spongebob)){
    gameState = END;
  } else if(gameState == END){
    ground.velocityX = 0
    obstaclesGroup.setVelocityEach(0)
    obstaclesGroup.setLifetimeEach(1);
    gameOver.visible = true;
    restart.visible = true;
    spongebob.changeImage("sad");
    spongebob.scale = 0.5
    if (mousePressedOver(restart) || touches.length > 0){
      reset();
      touches = [];
    }
  }

  spongebob.collide(invisibleGround);
  drawSprites()
}

function spawnObsticle(){
  if (frameCount % 60 == 0){
    obstacle = createSprite(width, height - 45, 5, 5);
    obstacle.velocityX = -(4 + 3 * score / 100);

    var rand = Math.round(random(1, 3));
    switch (rand){
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      default:
        break;
    }
    obstacle.scale = 0.25;
    obstacle.lifetime = 500;

    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  score = 0;
  spongebob.changeImage("player");
  obstaclesGroup.destroyEach();
}