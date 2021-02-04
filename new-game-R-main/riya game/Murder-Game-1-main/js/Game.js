class Game 
{
  constructor()
  {

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    police1 = createSprite(100,200);
    police1.addImage(police_Image);
    police1.scale = 0.4;

    police2 = createSprite(300,200);
    police2.addImage(police_Image);
    police2.scale = 0.4;


    police3 = createSprite(500,200);
    police3.addImage(police_Image);
    police3.scale = 0.4;


    murdererCar = createSprite(700,200);
    murdererCar.addImage(police_Image);
    murdererCar.scale = 0.4;

    citizen1 = createSprite(300,-10,40,10);
    citizen1.addImage(citizenImage);
    citizen1.scale = 0.1;
    
    citizen2 = createSprite(450,-700,40,10)
    citizen2.addImage(citizenImage);
    citizen2.scale = 0.1;
    
    citizen3 = createSprite(500,-1300, 40,10);
    citizen3.addImage(citizenImage);
    citizen3.scale = 0.1;
    
    citizen4 = createSprite(700,-150,40,10);
    citizen4.addImage(citizenImage);
    citizen4.scale = 0.1;
    
    citizen5 = createSprite(900,-2100,40,10);
    citizen5.addImage(citizenImage);
    citizen5.scale = 0.1;

    citizen6 = createSprite(320,-2900,40,10);
    citizen6.addImage(citizenImage);
    citizen6.scale = 0.1;

    citizen7 = createSprite(740,-2500,40,10);
    citizen7.addImage(citizenImage);
    citizen7.scale = 0.1;

    citizen8 = createSprite(500,-300,40,10)
    citizen8.addImage(citizenImage);
    citizen8.scale = 0.1;

    citizen9 = createSprite(330,-1700,40,10)
    citizen9.addImage(citizenImage);
    citizen9.scale = 0.1;

    citizen10 = createSprite(660,-800,40,10)
    citizen10.addImage(citizenImage);
    citizen10.scale = 0.1;

    
    reportButton = createSprite(90,10,40,10);
    reportButton.addImage(reportButtonImage);
    reportButton.scale = 0.4;
   

    citizen = [citizen1,citizen2,citizen3,citizen4,citizen5,citizen6,citizen7,citizen8,citizen9,citizen10];
    cars = [police1, police2, police3, murdererCar];

    passedFinish = false;
  }

  play()
  { 
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();
  
    if(allPlayers !== undefined)
    {
      //var display_position = 100;
      background("#c68767");
      image(track_Image, 0, -displayHeight*4, displayWidth, displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;
  
      for(var plr in allPlayers)
      {
        //add 1 to the index for every loop
        index = index + 1 ;
        x=x+200
        //position the cars a little away from each other in x direction
        //allPlayers[plr].horizontal === (x = x+ 200);
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = allPlayers[plr].horizontal+x;
        cars[index-1].y = y;

        if(index === player.index)
        {
          //fill("red");
          //ellipse(x, y, 60, 60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }

        textAlign(CENTER);
        textSize(20);
        fill("cyan");
        text(allPlayers[plr].name, cars[index-1].x, cars[index-1].y+120);
        
       if(index === 4)
       {
        killButton = createSprite(1150,allPlayers[plr].distance,40,10);
        killButton.addImage(killButtonImage);
        killButton.scale = 0.05;

       }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passedFinish !== true)
    {
      player.distance +=20;
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null && passedFinish !== true)
    {
      player.distance -=20;
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null && passedFinish !== true)
    {
      player.horizontal -=20;
      player.update();
      
      
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null && passedFinish !== true)
    {
      player.horizontal +=20;
      player.update();
    }

    
    if(player.distance > 3860 && passedFinish === false)
    {
      Player.updateFinishedPlayers();
      player.rank = finishedPlayers;
      player.update();
      passedFinish = true;
    }
    
    
    drawSprites();
  }

  
  displayRanks()
  {
    camera.position.x = 0;
    camera.position.y = 0;
    imageMode(CENTER);
    Player.getPlayerInfo();
    image(bronze, displayWidth/-4, -100 + displayHeight/9, 200, 240);
    image(silver, displayWidth/4, -100 + displayHeight/9, 200, 240);
    image(gold, 0, -100, 200, 240);
    textAlign(CENTER);
    textSize(50);
    fill("cyan");
    
    for(var plr in allPlayers)
    {
      if(allPlayers[plr].rank === 1)
      {
        text("First: " + allPlayers[plr].name, 0, 85);
      }

      else if(allPlayers[plr].rank === 2)
      {
        text("Second: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 75);
      }

      else if(allPlayers[plr].rank === 3)
      {
        text("Third: " + allPlayers[plr].name, displayWidth/-4, displayHeight/9 + 75);
      }
      
      else
      {
        textSize(30);
        text("Honorable Mention: " + allPlayers[plr].name, 0, 230);
      }
    }
  }
}
