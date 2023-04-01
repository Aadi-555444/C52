var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
 
var score = 0;
var gameState = 1;
var life = 3;
function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
}

function draw() {
  background(0); 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-2
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+2
}
/*if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
}*/
for(var i = 0;i<zombieGroup.length;i++){
  if(zombieGroup[i].x<0){
    zombieGroup[i].destroy();
    life -= 1;

  }
  else if(zombieGroup[i].y<0){
    zombieGroup[i].y+=10;
    zombieGroup[i].velocityY = 9;
    zombieGroup[i].velocityX = -9;

  }
  //else if(zombieGroup[i].x>windowWidth){
    // zombieGroup[i].x-=10;
     //zombieGroup[i].velocityX = -5;
      //} 
  else if(zombieGroup[i].y>windowHeight){
    zombieGroup[i].y-=10;
    zombieGroup[i].velocityY = -9;
    zombieGroup[i].velocityX = -9;

 }

}

if(life == 3){
  heart3.visible = true;
  heart2.visible = false;
  heart1.visible = false;
}
else if(life == 2){
  heart3.visible = false;
  heart2.visible = true;
  heart1.visible = false;
}
else if(life == 1){
  heart3.visible = false;
  heart2.visible = false;
  heart1.visible = true;
}
else if(life == 0){
  gameState = 2;
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy();
       score += 2;
       } 
 }
}

//calling the function to spawn zombies
enemy();

drawSprites();
textSize(25);
text("Score:"+score,windowWidth/2-100,windowHeight/3-100);
if(gameState == 2){
  background("black");
  text("game over",windowWidth/2,windowHeight/2)
}


}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(500,500,40,40);

    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -9;
    zombie.velocityY = 9;
    zombie.debug= true;
    zombie.setCollider("rectangle",0,0,400,400);
    zombie.x = random(windowWidth/2,windowWidth);
    zombie.y = random(0,windowHeight);
    zombie.lifetime = 400;
   zombieGroup.add(zombie);
  }

}
