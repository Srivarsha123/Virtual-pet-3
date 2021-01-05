class Foods{
    constructor(){
        this.image = loadImage("images/Milk.png")
        this.addFood = createButton("Add Food");
        this.feedDog = createButton("Feed the dog");
        //this.foodCount = 0;
    }

    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
         //console.log("Hi")
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }

    addingFood(count){
      database.ref('/').update({
      Food:count
       })
      //console.log(count)
      }

    display(){
      var x=10,y=50;
        if(foodS!=0){
            for(var i=0;i<foodS;i++){
                 if(i%10==0){
                       x=10;
                       y=y+90;
                  }
            image(this.image,x,y,90,90);
            x=x+30;
            }
        }

      //console.log(gameState)
      dog.addImage(sad);
      this.addFood.position(360, 55);
      this.addFood.mousePressed(()=> {
        foodCount +=1
        foodObj.addingFood(foodCount)
      });
      this.addFood.size(100,35)
      this.addFood.style('font-size', '15px');
      this.addFood.style('font-color', 'white');
      this.addFood.style('border-radius', '100%')
      this.addFood.style('background-color','color(25, 23, 200, 50)')
      this.addFood.style("font-family","Comic Sans MS");

      this.feedDog.position(780, 55);
      if(foodS != 0){
      this.feedDog.mousePressed(()=> {
        foodObj.writeStock(foodS)
        dog.addImage(happyDogImg)
      });
      }
      this.feedDog.size(110,35)
      this.feedDog.style('font-size', '15px');
      this.feedDog.style('border-radius', '100%');
      this.feedDog.style('background-color','color(25, 23, 200, 50)');
      this.feedDog.style("font-family","Comic Sans MS");
    }

  
  writeStock(x){
    if(x<=0){
      x = 0
    }
    else{
      x = x - 1
    }

    database.ref('/').update({
       Food:x,
       lastFed:hour()
    })
  }

  bedroom(){
    background(bedroom);
  }

  washroom(){
    background(washroom);
  }

  garden(){
    background(garden);
  }

  
  hide(){
    this.addFood.hide();
    this.feedDog.hide();
  }

  show(){
    this.addFood.show();
    this.feedDog.show();
  }

}
