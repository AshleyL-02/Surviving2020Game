// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global mountain, Enemy, Door, eManager, Player, dialogueEncounterManager, Group, bgm, loadSound, block1, camera, player, drawSprites, createSprite, Menu, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode,sfx, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

// let forest;

//let floor;

//let startY;

function Level0() {
  //const sampleSpeed = 12;

  let forest;

  
  let sampleSprite;
  let sampleGround;
  let sampleGroundImage;

  let floor;
  let ground2;
  let ground3;
  let ground4;

  // let player1;
  let player;
  let door;
  let doorEnd;
  //let acceleration=0.15

  let bgSprites;

  // Start position

  let checkX = -20;
  let checkY = 220;

  let h;

  // Ground and Gravity

  //let GRAVITY = 6;

  const ground = 305;

  this.preload = function() {
    //called once overall, before canvas is created
    sampleGroundImage = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FsampleGround.png?v=1595812284218"
    );
    h = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FHospital.png?v=1596147201653"
    );
    
    mountain = loadImage('https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fmountain.png?v=1596212885187');
  };

  this.setup = function() {
    //called once overall, during first draw
    //load bgm
    bgm.playLevel0();
    
    // BG 
    mountain1 = createSprite(1500, 400, 500, 70);
    mountain1.addImage(mountain);
    
    bgSprites = Group();
    player = new Player(checkX, checkY, true);
    eManager.createGroups();
    createEnemies();
    door = new Door(checkX, checkY, 0, false, leaveLevel, true);
    doorEnd = new Door(3000, 466, 0, true, leaveLevel, true);
    dialogueEncounterManager.reset();
    //position set by center of sprites
     // Floor

    floor = 430;

    blocks();

    // Ground (creates ground)
    sampleGround = createSprite(-50, ground, 300, 20);
    //sampleGround.setDefaultCollider();

    // Ground 2
    ground2 = createSprite(500, 500, 800, 70);
    ground2.addImage(sampleGroundImage);
    ground3 = createSprite(500 + 1000, 500, 1000, 70);

    ground4 = createSprite(500 + 1000 + 1400, 500, 1000, 70);

    // X, Y , W, H, SPEED
    bgSprites.add(sampleGround);
    bgSprites.add(ground2);
    bgSprites.add(ground3);
    bgSprites.add(ground4);

    // Mouse

    // Player Rectangle

    // Obstacles

    //forest = loadImage("https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FBack.png?v=1595767988586");
  };
  this.enter = function() {
    //called once every time this scene is opened
    // background(220);
    // text("This is the game", width/2, height/2);
  };

  this.draw = function() {
    background(100,215,250);
    //image(forest,0,0,500, 500);
    player.displayScore();
    //player.displayLives();
    dialogueEncounterManager.update();
    player.update();
    eManager.checkCollisions(bgSprites);
    // Collision (Ground Collides with (player))
    //     // Collison Blocks
 
    //     player.sprite.collide(block1)
    //     player.sprite.collide(block2)
    //     player.sprite.collide(block3)
    //     player.sprite.collide(block4)
    //     player.sprite.collide(block5)

    //     // Section 2
    //     player.sprite.collide(block6)
    //     // Section 2 Stairs

    //     player.sprite.collide(block7)
    //     player.sprite.collide(block8)
    //     player.sprite.collide(block9)
    //     player.sprite.collide(block10)
    //     player.sprite.collide(block11)

    //     // Section 2
    //     player.sprite.collide(block12)
    //     player.sprite.collide(block13)
    //       // Ground

    //     sampleGround.displace(player.sprite);
    //     ground2.displace(player.sprite)
    //     ground3.displace(player.sprite)
    //     ground4.displace(player.sprite)

    //       // Section 3
    //     player.sprite.collide(block14)
    //     player.sprite.collide(block15)
    //     player.sprite.collide(block16)

    player.checkBGCollision(bgSprites);
  
    // sampleGround.displace(player.sprite);
    // ground2.displace(player.sprite)
    // ground3.displace(player.sprite)
    // ground4.displace(player.sprite)

    // Camera

    //camera.zoom = 1.3;

    // If falls go back to the beginning

    if (player.sprite.position.y > 500) {
      player.willRespawn = true;
    }

    // Boundary

    // if (player.sprite.position.x > 2645 + 250){
    //   player.sprite.position.x = 2645 + 250;
    // }

    // Checkpoint

    if (player.sprite.position.x > 1600) {
      player.setRespawnPoint(1600, 440);
    }

    // text(
    //   "pX: " + player.sprite.position.x,
    //   player.sprite.position.x,
    //   player.sprite.position.y - 100
    // );
    // text(
    //   "pY: " + Math.floor(player.sprite.position.y),
    //   player.sprite.position.x + 100,
    //   player.sprite.position.y - 100
    // );

    // text(`MouseY : ${mouseY}`, 0, 150)
    // text(`MouseX : ${mouseX}`, 50 * 3, 150)

    //     console.log(`PlayerX: ${player.position.x}`)
    //    console.log(`PlayerY: ${player.sprite.position.y}`)

    //second last
    drawSprites();
    checkDoorInteract();
    //last
    camera.position.x = player.sprite.position.x;
    camera.position.y = player.sprite.position.y -  50; //- 50;
    
    // Camera Does not go down
    
    if (camera.position.y > 434.5){
      camera.position.y = 434.5
    } else if (camera.position < 434.5){
      camera.position.y = player.sprite.position.y - 20; 
    }
    
    
  };

  this.keyPressed = function() {
    if (dialogueEncounterManager.isTalking) {
      dialogueEncounterManager.keyPressed(keyCode);
    } else {
      player.keyPressed(keyCode);
    }
  };
  this.keyReleased = function() {
    // if isTalking?
    dialogueEncounterManager.keyReleased(keyCode);
    return false; // prevent any default behavior
  };

  function blocks() {
    //     // Section 1
    //     let block1 = createSprite(275, floor, 50,70);
    //     let block2 = createSprite(475, floor - 25,100,20);
    //     let block3 = createSprite(625, floor - 27, 50,125);
    //     let block4 = createSprite(800, floor + 10, 50,50);

    //     // Section 2
    //     let block5 = createSprite(1100, floor - 2, 50,75);
    //     let block6 = createSprite(1100 + 400 , floor - 50, 50,275);

    //     // Section 2 Stairs

    //     let block7 = createSprite(1100 + 75 , floor - 75, 40,10);
    //     let block8 = createSprite(1100 + 140 , floor - 100 , 40,10);
    //     let block9 = createSprite(1100 + 205 , floor - 125 , 40,10);
    //     let block10 = createSprite(1100 + 270 , floor - 150 , 40,10);
    //     let block11 = createSprite(1100 + 335 , floor - 175 , 40,10);

    //     // Section 2
    //     let block12 = createSprite(1435 + 400 , floor, 50,75);
    //     let block13 = createSprite(1435 + 300 , floor + 20, 50,35);

    //     // Section 3

    //     let block14 = createSprite(2050, floor - 15, 70, 15)

    //     let block15 = createSprite(2050 + 125 + 25, floor - 15, 70, 15)
    //     let block16 = createSprite(2050 + 125 + 125 + 50, floor - 15, 70, 15)

    //     // Section 4

    //     let block17 = createSprite(3000, floor - 200, 500,500)

    // Section 1
    bgSprites.add(createSprite(275, floor, 50, 70));
    bgSprites.add(createSprite(475, floor - 25, 100, 20));
    bgSprites.add(createSprite(625, floor - 27, 50, 125));
    bgSprites.add(createSprite(800, floor + 10, 50, 50));

    // Section 2
    bgSprites.add(createSprite(1100, floor - 2, 50, 75));
    bgSprites.add(createSprite(1100 + 400, floor - 50, 50, 275));

    // Section 2 Stairs

    bgSprites.add(createSprite(1100 + 75, floor - 75, 40, 12));
    bgSprites.add(createSprite(1100 + 140, floor - 100, 40, 12));
    bgSprites.add(createSprite(1100 + 205, floor - 125, 40, 12));
    bgSprites.add(createSprite(1100 + 270, floor - 150, 40, 12));
    bgSprites.add(createSprite(1100 + 335, floor - 175, 40, 12));

    // Section 2
    bgSprites.add(createSprite(1435 + 400, floor, 50, 75));
    bgSprites.add(createSprite(1435 + 300, floor + 20, 50, 35));

    // Section 3

    bgSprites.add(createSprite(2050, floor - 15, 70, 15));

    bgSprites.add(createSprite(2050 + 125 + 25, floor - 15, 70, 15));
    bgSprites.add(createSprite(2050 + 125 + 125 + 50, floor - 15, 70, 15));

    // Section 4

    hospital = createSprite(3000, floor - 150);
    hospital.addImage(h);
    hospital.depth = -2;
    //createSprite(3000, floor - 200, 500,500);  //!
  }
  function checkDoorInteract() {
    if (dialogueEncounterManager.canTalk() && door.canTalk(player.sprite)) {
      door.talk(camera.position);
      sfx.knock.play();
    } else {
      door.checkIfOpened(player.sprite);
    }
    if (dialogueEncounterManager.canTalk() && doorEnd.canTalk(player.sprite)) {
      doorEnd.talk(camera.position);
    } else {
      doorEnd.checkIfOpened(player.sprite);
    }
  }
  function createEnemies() {
    new Enemy(470, 360);
    new Enemy(710, 430);
    new Enemy(2440, 430);
    new Enemy(629,310);
    new Enemy(270,364);
    new Enemy(1104,360);
    new Enemy(1305,268);
    new Enemy(1600,434);
    new Enemy(2200,377);
  }
  function leaveLevel() {
    bgm.level0.stop();
    if(eManager.enemySprites.toArray().length !== 0){
      storyData.killedAllViruses = false;
    }
    allSprites.removeSprites();

    sceneManager.showScene(LevelSelect);
  }
  

}