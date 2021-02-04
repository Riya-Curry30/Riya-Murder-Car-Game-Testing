var gameState = 0;
var playerCount;
var allPlayers = [];
var distance = 0;
var database;
var finishedPlayers = 0;

var form, player, game;

var cars, car1, car2, car3, car4;
var car1_Image, car2_Image, car3_Image, car4_Image;
var ground_Image, track_Image;
var bronze, silver, gold;
var citizenImage,citizensGroup;
var passedFinish;
var citizen1, citizen2, citizen3, citizen4, citizen5, citizen6, citizen7, citizen8, citizen9, citizen10;
var police_Image;
var police1, police2, police3, police4;
var citizen;
var killButtonImage, killButton;
var reportButtonImage, reportButton;
var murdererCar;
function preload()
{
   /*car1_Image = loadImage("images/car1.png");
   car2_Image = loadImage("images/car2.png");
   car3_Image = loadImage("images/car3.png");
   car4_Image = loadImage("images/car4.png");
   ground_Image = loadImage("images/ground.png");
   
   bronze = loadImage("images/bronze.png");
   silver = loadImage("images/silver.png");
   gold = loadImage("images/gold.png");*/
   track_Image = loadImage("images/track.jpg");

   citizenImage = loadImage("citizen/citizen1.png");
   

   police_Image = loadImage("policeCar.png");
   
  killButtonImage = loadImage("Among Us Kill Button.png");
  reportButtonImage = loadImage("Among Us Report Button.png");
  



}

function setup()
{
  canvas = createCanvas(displayWidth - 20, displayHeight-30);

  database = firebase.database();
  citizensGroup = new Group();
  game = new Game();
  game.getState();
  game.start();


  
}


function draw()
{
  background("lightgrey");
  if(playerCount === 4 && finishedPlayers === 0)
  {
    game.update(1);
  }

  if(gameState === 1)
  {
    clear();
    game.play();
  }

  if(finishedPlayers === 4)
  {
    game.update(2);
  }

  if(gameState === 2 && finishedPlayers === 4)
  {
    game.displayRanks();
  }

  
}

