
function preload() {
  
    spaceshipimg1 = loadImage('spaceship1.png');
    spaceshipimg2 = loadImage('spaceship2.png');
    spaceshipimg3 = loadImage('spaceship3.png');
    spaceshipimg4 = loadImage('spaceship4.png');

    playerspaceshipimg = loadImage('player.jpg');

    rightbuttonimg = loadImage('buttonright.jpg');
    leftbuttonimg = loadImage('buttonleft.jpg');

    asteroidsimg = loadImage('asteroid.png');
    rock_img = loadImage('spacerock.png')
    
    blastimg = loadImage('blast.png');

    backgroundimg = loadImage('spacebackground.png');

    fireupimg = loadImage('spacefiredown.png');
    firedownimg = loadImage('spacefireup.png');

    home_backgroundimg = loadImage('splash.png');

    logoimg = loadImage('bg.png');

    livesimg = loadImage('lives.png');

    buttonimg = loadImage('Picture1.png');

    planetimg = loadImage('Picture2.png')

}

function setup() {
  createCanvas(windowWidth,windowHeight);


  bg = createSprite(width/2,height/2,20,20);
  bg.visible = false;
  bg.addImage(backgroundimg);
  bg.scale = 4;
  bg.velocityY = 8;

  enemyGroup = new Group();
  playerBulletGroup = new Group();
  planetGroup = new Group();

  player = createSprite(width-100,height-100,50,50);
  player.addImage(playerspaceshipimg);
  player.scale = 0.2;

  player_Lifes = 10;
  player_Friend_Life = 10;

  computerplayer = createSprite(width-1400,height-100,50,50);
  computerplayer.addImage(playerspaceshipimg);
  computerplayer.scale = 0.2;

  PLAY_BUTTON = createSprite(width/1.5,height-300,130,70);
  PLAY_BUTTON.shapeColor = "blue"
  PLAY_BUTTON.addImage(buttonimg);
  PLAY_BUTTON.scale = 0.3;



  ok_BUTTON = createSprite(width/2,width-200,20,20);
  ok_BUTTON.visible = false;


  computerplayer.visible = false;
  player.visible = false;


  GAMESTATE = 0;
  HOME = 0;
  PLAY = 2;
  RESTART = 3;
  play_INSTRUCTION = 4;

  logo = createSprite(width/2,height-550,20,20);
  logo.addImage(logoimg);
  logo.scale = 0.8;
  logo.visible = false;

}

function draw() {
  



  if(mousePressedOver(PLAY_BUTTON)) {
    GAMESTATE = PLAY;
    PLAY_BUTTON.visible = false;
  }

  if(GAMESTATE === HOME) {
    background(home_backgroundimg);
  

    logo.visible = true;

 

    if(mouseIsOver(PLAY_BUTTON)) {
         PLAY_BUTTON.scale = 0.4
    } else{
      PLAY_BUTTON.scale = 0.3
    }
  }

  if(GAMESTATE === PLAY) {
    background(backgroundimg); 

    spawnSpaceShip();
    spawnBullet();
    spawnPlanets()

    bg.visible = true;
    
    /*player.depth > bg.depth;
    computerplayer.depth > bg.depth;*/

    player.visible = true;
    computerplayer.visible = true;

    logo.visible = false

    //console.log(bg.y)

    if(bg.y > 1600) {
      bg.y = -10
    }

  if(keyDown(RIGHT_ARROW)) {
     player.x = player.x+7
  }

  if(player_Lifes === 10) {
    for (var i = 50; i < 500; i=i+50) 
       {
            var lives = createSprite(i, 50, 20, 20);
            lives.addImage(livesimg);
            lives.scale = 0.1;
            lives.depth > enemyGroup.depth;
       }
  }



  if(keyDown(LEFT_ARROW)) {
    player.x = player.x - 7
  }

  if(keyDown(ENTER) && frameCount % 5 === 0) {
    spawnPlayerBullet()
  }

  if(playerBulletGroup.isTouching(enemyGroup)) {
     enemyGroup.destroyEach();
  }

 }

drawSprites();

      if(GAMESTATE === HOME) {
        fill("blue");
        textSize(25);
        textFont('Georgia');
        text("PLAY",PLAY_BUTTON.x-20,PLAY_BUTTON.y);
      }

}


 function spawnSpaceShip() {
    if(frameCount % 80 === 0) {
      var enemy = createSprite(width/2,height-height,10,40);
          enemy.x = Math.round(random(width/0.5,3.3))

      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: enemy.addImage(spaceshipimg1);
                enemy.scale = 0.3
                break;
        case 2: enemy.addImage(spaceshipimg2);
                enemy.scale = 0.150
                break;
        case 3: enemy.addImage(spaceshipimg3);
                enemy.scale = 0.5
                break;
        case 4: enemy.addImage(spaceshipimg4);
                enemy.scale = 0.450
                break;
        default: break;
      }
      enemy.velocityY = 9;
      enemy.lifetime = 90;
      enemyGroup.add(enemy);

    }
    }

    function spawnBullet() {
      if(frameCount % 50 === 0) {
        var bullet = createSprite(Math.round(random(width/0.5,3.3)),height-height-30,20,20);
        bullet.addImage(firedownimg);
        bullet.velocityY = 20;
        bullet.scale = 0.050
        bullet.lifetime = 50;
      }
    }

    function spawnPlanets() {
      if(frameCount % 370 === 0) {
        var planet = createSprite(width/6,-300,20,20);
        planet.addImage(planetimg);
        planet.velocityY = 5;
        planet.scale = 3
        planet.depth = player.depth;
        player.depth = player.depth+1
        planet.lifetime = 300;
        planetGroup.add(planet);
      }
    }

    function spawnPlayerBullet() {
      var playerbullet = createSprite(player.x,player.y,10,10);
      playerbullet.addImage(firedownimg);
      playerbullet.scale = 0.050;
      playerbullet.depth < player.depth;
      playerbullet.velocityY = -10;
      playerbullet.lifetime = 80;
      playerBulletGroup.add(playerbullet);
    }

    