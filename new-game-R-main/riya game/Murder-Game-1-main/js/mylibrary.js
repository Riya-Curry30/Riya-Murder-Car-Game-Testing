function spawnCitizens() {
    //write code here to spawn the clouds
    if (frameCount % 50 === 0) {
      var citizen = createSprite(random(displayWidth-300,displayWidth/-5),displayHeight-300,40,10);
      citizen.y = Math.round(random(100,-3900));
      citizen.addImage(citizenImage);
      citizen.scale = 0.1;
      
      
       //assign lifetime to the variable
      //citizen.lifetime = 300;
      //add each citizen to the group
      citizensGroup.add(citizen);
    }
    
  }