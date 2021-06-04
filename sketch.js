var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var iblockGroup, iblock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  iblockGroup = new Group();
}

function draw() {
  background(0);
  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300;
    }
    if (keyDown("left_Arrow")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("right_Arrow")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
       spookySound.play()
    ghost.velocityY=ghost.velocityY+0.8
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (iblockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState="end"
    }
    spawnDoors();
      drawSprites();
  }
  if(gameState==="end"){
    textSize(50)
    fill("red")
    text("GAME OVER",200,250)
     spookySound.stop()
  }


}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200, 10);
    iblock = createSprite(200, 15);
    iblock.width = climber.width;
    iblock.height = 2;

    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    iblock.x = door.x;
    iblock.velocityY = 1;

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    doorsGroup.add(door);

    climbersGroup.add(climber);

    iblockGroup.add(iblock);
  }
}
