class Citizens{
    constructor(){
    this.x=0;
    this.y=0;
    this.height=50;
    this.width=50;
    
    }

    display(){
        citizen=createSprite(this.x,this.y,this.width,this.height)
        citizens.addImage(citizenImage);
    }

    getDeadcitizens(){
        var DeadcitizensRef = database.ref('Deadcitizens');
        DeadcitizensRef.on("value",(data)=>{
            Deadcitizens = data.val();
        })
      }
    
      updateDeadcitizens(count){
        database.ref('/').update({
            DeadcitizensRef : count
        });
      }

   
}
