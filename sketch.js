var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var CloudsGroup, cloudsImage ;
var ObstaclesGroup,obstacles1, obstacles2, obstacles3,         obstacles4, obstacles5, obstacles6;
var score

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  obstacles1=loadImage("obstacle1.png")
  obstacles2=loadImage("obstacle2.png")
  obstacles3=loadImage("obstacle3.png")
  obstacles4=loadImage("obstacle4.png")
  obstacles5=loadImage("obstacle5.png")
  obstacles6=loadImage("obstacle6.png")
  
  groundImage = loadImage("ground2.png")
cloudImage=loadImage("cloud.png")



}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  score = 0
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  CloudsGroup=new Group();
  ObstaclesGroup=new Group();

}
function draw() {
  background(180);
  
  score=score+Math.round(getFrameRate()/60);
text("score: "+score,500,50);
                         
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  drawSprites();
  
  spawnClouds();
  spawnObstacles();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
switch(rand){
    case 1:obstacle.addImage(obstacles1);
    break;
    case 2:obstacle.addImage(obstacles2);
    break;
    case 3:obstacle.addImage(obstacles3);
    break;
    case 4:obstacle.addImage(obstacles4);
    break;
    case 5:obstacle.addImage(obstacles5);
    break;
    case 6:obstacle.addImage(obstacles6);
    break;
    default:break;
}

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
ObstaclesGroup.add(obstacle);
  }
}

