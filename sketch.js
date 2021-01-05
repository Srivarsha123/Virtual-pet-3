var  dog, happyDog, database, foodS, foodStock, dogImg, happyDogImg, milk, milkImg, bgImg;
var addFood, feedDog, foodObj, lastfed, feed;
var foodCount = 0;
var gameState;
var bedroom, garden, washroom, sad;

function preload(){
  //dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/Milk.png");
  bgImg = loadImage("images/bg.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  sad = loadImage("images/vaccination.png");
}

function setup() {
  foodObj = new Foods();
  createCanvas(550, 500);

  database = firebase.database();
  
  dog = createSprite(425, 400);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(bgImg);

  foodObj.display();

  textSize(20)
  fill("black")
  stroke(3)

  if(foodS !== 0){
    dog.addImage(sad)
    dog.scale = 0.3;
  }
  else{
    dog.scale = 0.3;
  }

  if(foodS === undefined){
    foodS = 0
  }

  if(gameState === "hungry"){
    foodObj.show();
    dog.visible = true;
    text("Food Remaining: "+foodS, 190, 50);
  }
  else if(gameState != "hungry"){
    foodObj.hide();
    dog.visible = false;
  }

  if(hour()===lastfed+1){
    foodObj.garden();
    foodObj.update("playing")
  }

  else if(hour()===lastfed+2){
    foodObj.bedroom();
    foodObj.update("sleeping")
  }

  else if(hour()===lastfed+3){
    foodObj.washroom();
    foodObj.update("bathing")
  }

  else{
  foodObj.update("hungry")
  }

  feed = database.ref('lastFed')
  feed.on("value", (data)=>{
    lastfed = data.val();
  })
  if(lastfed!=undefined){
  if(lastfed>12){
    text("Last Feed: "+lastfed%12 + " PM", 200, 80);
  }
  else if(lastfed===0){
    text("Last Feed: 12 AM", 200, 80);
  }

  else if(lastfed===12){
    text("Last Feed: 12 PM", 200, 80);
  }
  else{
    text("Last Feed: "+lastfed + " AM", 200, 80);
  }}

  drawSprites();
  foodObj.getState();
  foodCount = foodS

  //console.log(gameState);
}


function readStock(data){
  foodS = data.val();
}




