const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope,rope2,rope3;
var fruit_con,fruit_con2,fruit_con3;
var bg, food, rabbit;
var bunny;
var button,button2,button3;
var blink,eat,sad;
var airSound,eatingSound,ropecutSound,bgSound;
var balloon;
var airButton;
var soundButton;
var sadSound;
var canvasW,canvasH;


function preload(){
  bg=loadImage("background.png");
  rabbit=loadImage("Rabbit-01.png");
  food = loadImage("melon.png");
  balloon = loadImage("balloon.png")

  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  
  airSound= loadSound("air.wav");
  eatingSound = loadSound("eating_sound.mp3");
  ropecutSound=loadSound("rope_cut.mp3");
  bgSound= loadSound("sound1.mp3");
  sadSound=loadSound("sad.wav")

  blink.playing=true;
  eat.playing=true;
  eat.looping = false;
  sad.looping =false;

}
function setup() 
{
  var mobileType=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(mobileType){
    canvasW=displayWidth
    canvasH=displayHeight
    createCanvas(displayWidth,displayHeight);

  }
  else{
    canvasW=windowWidth
    canvasH=windowHeight
    createCanvas(windowWidth,windowHeight-5);

  }
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  blink.frameDelay=20
  sad.frameDelay=20
  eat.frameDelay=30
  bunny=createSprite(400,canvasH-80,100,100)
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("sad",sad)
  bunny.addAnimation("eat",eat)
  bunny.scale=0.2

  button=createImg("cut_btn.png")
  button.position(220,40)
  button.size(50,50)
  button.mouseClicked(drop)

  button2=createImg("cut_btn.png")
  button2.position(40,30)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3=createImg("cut_btn.png")
  button3.position(360,190)
  button3.size(50,50)
  button3.mouseClicked(drop3)

  ground = new Ground(canvasW/2,canvasH,canvasW,30);  


  soundButton=createImg("mute.png")
  soundButton.position(460,0)
  soundButton.size(40,40)
  soundButton.mouseClicked(bgButton)


  bgSound.play()
  bgSound.setVolume(0.2)

  airButton=createImg("balloon.png")
  airButton.position(10,250)
  airButton.size(150,100)
  airButton.mouseClicked(airBlow)


  

  rope = new Rope(7,{x:245,y:30});
  rope2= new Rope(8,{x:50 ,y:30});
  rope3= new Rope(5,{x:400,y:200})
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);
  


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg,width/2,height/2,width,height)
  rope2.show();
  rope3.show();
  rope.show();
  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,75,75);
  }
  
  Engine.update(engine);
  ground.show();
  
  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eat")
    eatingSound.play()
    eatingSound.setVolume(0.6)
    bgSound.stop()
  }

  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("sad")
    //console.log("bunnysad")
    sadSound.play()
    sadSound.setVolume(0.2)
    bgSound.stop()
  }
  //console.log(fruit.position.x)
  if( fruit!=null && fruit.position.x>500 ){
    World.remove(world,fruit)
    fruit=null
    bunny.changeAnimation("sad")
    bgSound.stop()
    sadSound.play()
    sadSound.setVolume(0.2)
    
  }
  
 
   drawSprites()
}

function drop(){
  ropecutSound.play()
  ropecutSound.setVolume(0.9)
  rope.break()
  fruit_con.detach()
  fruit_con=null
  button.hide()
}
function drop2(){
  ropecutSound.play()
  ropecutSound.setVolume(0.9)
  rope2.break()
  fruit_con2.detach()
  fruit_con2=null
  button2.hide()
}
function drop3(){
  ropecutSound.play()
  ropecutSound.setVolume(0.9)
  rope3.break()
  fruit_con3.detach()
  fruit_con3=null
  button3.hide()
}
function collide(body,sprite){
  if(body != null){

    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<80){
      World.remove(world,fruit)
      
      fruit=null
      return true
    }
    else{
      return false
    }
  }

}


function airBlow(){
  if(fruit != null){
    Body.applyForce(fruit,{x:0,y:0},{x:0.03 ,y:0})
  }
    
  airSound.play()
  airSound.setVolume(0.25)
}



function bgButton(){
  if(bgSound.isPlaying()){
    bgSound.stop()

  }
  else{
    bgSound.play()
  }
}