var background,backgroundImage
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, bananaGroup
var score=0, survivalTime=0
var ground,groundImage

function preload(){
  
  
  monkey_running = loadAnimation( "sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backgroundImage = loadImage("background.jpg")

}



function setup() {
  createCanvas(400,400)
  // monkey = createSprite(80,315,20,20);
  // monkey.addAnimation("moving",monkey_running);
  // monkey.scale = 0.1
  ground = createSprite(400,350,3000,10)

  background = createSprite(200,200,900,400)
  background.addImage(backgroundImage)
  background.scale=1.5

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1  
  
  FoodGroup = new Group();
  bananaGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {

    switch(score){
    case 10 : monkey.scale = 0.12
           break;
    case 20 : monkey.scale = 0.14
           break;
    case 30 : monkey.scale = 0.16
           break;
    case 40 : monkey.scale = 0.18
           break;
      default: break;
    }
  
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate())
  // text("Survival Time : "+survivalTime, 100,50)
         
  stroke("white")
  textSize(20)
  fill("black")
  // text("Score : "+score, 300,50)

  
  ground.velocityX = -4;
  ground.x = ground.width/2
  ground.visible = false
  
  background.velocityX = -4;
if (background.x < 0){
      background.x = background.width/2;
    }  
  
  if(keyDown("space")&&monkey.y >= 289.74) {
    monkey.velocityY = -16;
  }
  if(monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach()
    score = score + 10
     }
  
  if (obstacleGroup.isTouching(monkey)){
      
      score = 0
      }
  
  if(score === 0){
     monkey.scale = 0.1
     }
  
  
  console.log(monkey.y)
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground)
  food()
  obstacles()
  
  drawSprites()
  text("Survival Time : "+survivalTime, 100,50)
  text("Score : "+score, 300,50)
    
}


function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(450,200,20,20);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(120,200))
    banana.velocityX = -4
    banana.scale = 0.1
    banana.lifetime = 300
    bananaGroup.add(banana)
  }
  
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(450, 330, 20, 20)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -4
    obstacle.scale = 0.1
    obstacle.lifetime = 300
    obstacleGroup.add(obstacle)
  }
}



