// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global floatB2, block1, camera, player, drawSprites, createSprite, Menu, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, CENTER,sfx, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

// let forest;

// let block1;

// let floor;

// let checkX;
// let checkY;

// let startY;

// let groundBG;

// // Blocks

// let blockABG;
// let blockAW;
// let blockAH;

// // Float

// let floatA;
// let floatB;

// let floatW;
// let floatH;

function Level1() {
  let forest;


  let block1;

  let floor;

  let checkX;
  let checkY;

  let startY;

  let groundBG;

  // Blocks

  let blockABG;
  let blockAW;
  let blockAH;

  // Float

  let floatA;
  let floatB;

  let floatW;
  let floatH;
  
  
  ///////
  let sampleGround;

  //let player1;
  let player;
  let bgSprites;
  let door;
  let doorEnd;

  // Start position

  checkX = -25;
  checkY = 305;

  // Block
  let floatBBG;
  let groundSmallBG;
  let floatMBG;
  let blockAL;
  let blockAXL;
  let black;
  let pushBG;
  let hospital;
  let arrow;
  // Ground and Gravity


  this.preload = function() {
    blockABG = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fblocka1.png?v=1596065213087"
    );
    groundBG = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Ffloorblood1.png?v=15960653008956"
    );

    floatA = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FfloatBlockB.png?v=1596065567386"
    );
    floatB = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FfloatBlockB.png?v=1595888710160"
    );
    //called once overall, before canvas is created
    floatBBG = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FfloatBlockB.png?v=1596065567386",
      k => {
        floatBBG.resize(200, 25);
      }
    );

    groundSmallBG = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Ffloorblood1.png?v=1596065300895",
      k => {
        groundSmallBG.resize(200, 200);
      }
    );
    floatMBG = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FfloatBlockB.png?v=1596065567386",
      k => {
        floatMBG.resize(80, 15);
      }
    );

    blockAL = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fblocka1.png?v=1596065213087",
      k => {
        blockAL.resize(50, 85);
      }
    );

    blockAXL = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fblocka1.png?v=1596065213087d",
      k => {
        blockAXL.resize(50, 200);
      }
    );

    black = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FMove.png?v=1596060873155"
    );

    pushBG = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FPush.png?v=1596073655802",
      k => {
        pushBG.resize(100, 25);
      }
    );
    
    hospital = loadImage('https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FHospital2.png?v=1596148588722');

    arrow = loadImage('https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Farrow.png?v=1596152923527');
    
    tubes = loadImage('https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Ftubes.png?v=1596215424282');
    
  };
  this.setup = function() { 
    bgm.playLevel1();
    
    // Tubes
    
    tube1 = createSprite(3300,200);
    tube1.addImage(tubes);
    
    bgSprites = Group();
    bgSprites.addWC = function(sprite){
      sprite.setDefaultCollider();
      bgSprites.add(sprite);
    }
    player = new Player(350, 140, true);
    eManager.createGroups();
    
    createEnemies();
    door = new Door(350, 140, 1, false, leaveLevel, true);
    doorEnd = new Door(6050, 230, 1, true, leaveLevel, true);
    dialogueEncounterManager.reset();
    
    //called once overall, during first draw
    //position set by center of sprites

    // Floor

    floor = 430;

    blocks();

//     // Ground (creates ground)
//     let ground1 = new Ground(1000, 200);
//     sampleGround = createSprite(350, 305, ground1.w, ground1.h);
//     sampleGround.addImage(groundBG);

//     // Ground2

//     ground2 = createSprite(1450, 305, ground1.w, ground1.h);
//     ground2.addImage(groundBG);

//     ground3 = createSprite(2450, 305, ground1.w, ground1.h);
//     ground3.addImage(groundSmallBG);

//     ground4 = createSprite(3400, 305, ground1.w, ground1.h);
//     ground4.addImage(groundBG);

//     ground5 = createSprite(4650, 305, ground1.w, ground1.h);
//     ground5.addImage(groundBG);

//     ground6 = createSprite(6050, 305, ground1.w, ground1.h);
//     ground6.addImage(groundBG);
     // Ground (creates ground)
    
      // Arrow 
    
      arrow1 = createSprite (350, 85);
      arrow1.addImage(arrow)
      
      let ground1 = new Ground(1000, 200);
      sampleGround = createSprite(350, 305, ground1.w, ground1.h);
      sampleGround.addImage(groundBG);

      // Ground2

      ground2 = createSprite(1450, 305, ground1.w, ground1.h);
      ground2.addImage(groundBG);

      ground3 = createSprite(2450, 305, ground1.w, ground1.h);
      ground3.addImage(groundSmallBG);

      ground4 = createSprite(3400, 305, ground1.w, ground1.h);
      ground4.addImage(groundBG);

      ground5 = createSprite(4650, 305, ground1.w, ground1.h);
      ground5.addImage(groundBG);


      // Hospital  6050 
      
      hospital1 = createSprite(6050, 235 - 220)
      hospital1.addImage(hospital);
      hospital1.depth = (-2);
    
    
      ground6 = createSprite(6050, 305, ground1.w, ground1.h);
      ground6.addImage(groundBG);

    // Push

    push1 = createSprite(3750, 235 - blockAH, blockAW, blockAH);
    push1.addImage(pushBG);

    floatB12 = createSprite(5350, 235 - 65);
    floatB12.addImage(floatMBG);

    // Block
    blocks();

    blackA1 = createSprite(3000, 235 - 55);
    blackA1.addImage(black);
    // 45 // 215
    floatB4 = createSprite(3150, 235 - 45);
    floatB4.addImage(floatMBG);
    
    
    //add sprites to bg sprites
    bgSprites.addWC(sampleGround);
    bgSprites.addWC(ground2);
    bgSprites.addWC(ground3);
    bgSprites.addWC(ground4);
    bgSprites.addWC(ground5);
    bgSprites.addWC(ground6);
    //bgSprites.add(blackA1);
    bgSprites.addWC(floatB12);
    bgSprites.addWC(floatB4);
  };
  this.enter = function() {
    //called once every time this scene is opened

  };

  this.draw = function() {

    background(191,65,78);
    player.displayScore();
    //player.displayLives();
    dialogueEncounterManager.update();
    player.update();
    eManager.checkCollisions(bgSprites);
    
    moveBlocks();
    
    // Moveable Collisions
    player.sprite.displace(blackA1);

    blackA1.collide(blockA5);
    //floatB4.collide(blackA1);
    ground4.displace(blackA1);

    if (blackA1.position.x > 3215) {
      blackA1.position.x = 3215;
      player.sprite.collide(blackA1);
    }

    // Push Collisions
    //blockA7.collide(push1);
    player.sprite.collide(push1);
    
    player.checkBGCollision(bgSprites);
   

    // If falls go back to the beginning

    if (player.sprite.position.y > 280) {
      player.willRespawn = true;
    }

    // Boundary
    // if (player.sprite.position.x > 5900) {
    //   player.sprite.position.x = 5900;
    // }

    // Checkpoint

    if (player.sprite.position.x > 2915) {
      // checkX = 1600;
      // checkY = 180;
      player.setRespawnPoint(2915, 180);
    }
    

    // text(`MouseY : ${mouseY}`, 50, 150);
    // text(`MouseX : ${mouseX}`, 50 * 3, 150);
    
    // text('pX: ' + player.sprite.position.x, player.sprite.position.x, player.sprite.position.y -100);
    // text('pY: ' + Math.floor(player.sprite.position.y), player.sprite.position.x + 100, player.sprite.position.y - 100);

    //moveBlocks();

    //second last
    drawSprites();
    checkDoorInteract();
    
    camera.position.x = player.sprite.position.x;
    camera.position.y = 180 - 120;
  };
  
  this.keyPressed = function() {
    if(dialogueEncounterManager.isTalking){
      dialogueEncounterManager.keyPressed(keyCode);
    } else{
      player.keyPressed(keyCode);
    }
  };
  this.keyReleased = function() {  
    // if isTalking?
    dialogueEncounterManager.keyReleased(keyCode);   
    return false; // prevent any default behavior
  }

  function consoleLog() {
    // console.log(`PlayerX : ${player.sprite.position.x}`);
    // console.log(`PlayerY : ${push1.position.y}`);

    // Player

    //console.log(`PlayerX: ${player.position.x}`)
    //console.log(`PlayerY: ${player.position.y}`)
  }

  function moveBlocks() {
    floatB2.position.x += 1;

    if (floatB2.position.x < 2000) {
      floatB2.setVelocity(2, 0); // W, H
    } else if (floatB2.position.x > 2300) {
      floatB2.setVelocity(-2, 0);
    }

    floatB3.position.x += 1;

    if (floatB3.position.x > 2850) {
      floatB3.setVelocity(-2, 0); // W, H
    } else if (floatB3.position.x < 2600) {
      floatB3.setVelocity(2, 0);
    }

    // 45 // 215

    floatB4.position.y -= 1;

    if (floatB4.position.y > 190) {
      floatB4.setVelocity(0, -1);
    } else if (floatB4.position.y < 20) {
      floatB4.setVelocity(0, 1 + 1);
    }

    // < 3750 ||  > 3850

    push1.position.x += 1;

    if (push1.position.x < 3750) {
      push1.setVelocity(5, 0); // W, H
    } else if (push1.position.x > 3850) {
      push1.setVelocity(-3, 0);
    }

    // 5200 < // > 5500

    floatB12.position.x += 1;

    if (floatB12.position.x < 5200) {
      floatB12.setVelocity(2, 0); // W, H
    } else if (floatB12.position.x > 5500) {
      floatB12.setVelocity(-2, 0);
    }
  }

  function blocks() {
    blockAW = 50; // Block A Width
    blockAH = 60; // Block A Height
    

    // Section 2
    blockA1 = createSprite(1050, 235 - blockAH, blockAW, blockAH);
    blockA1.addImage(blockABG);

    blockA2 = createSprite(1450, 235 - blockAH, blockAW, blockAH);
    blockA2.addImage(blockABG);

    let floatBlockA = new FloatBlock(250, 15);

    floatB1 = createSprite(1250, 235 - 120, floatBlockA.w, floatBlockA.h);
    floatB1.addImage(floatBBG);

    // 2150
    floatB2 = createSprite(2150, 235 - 75, floatBlockA.w, floatBlockA.h);
    floatB2.addImage(floatMBG);

    // 2750 // Left 2600, Right 2850

    floatB3 = createSprite(2750, 235 - 75, floatBlockA.w, floatBlockA.h);
    floatB3.addImage(floatMBG);

    blockA3 = createSprite(1750, 235 - blockAH, blockAW, blockAH);
    blockA3.addImage(blockABG);

    // Section 4

    blockA4 = createSprite(3000, 235 - 133, blockAW, blockAH);
    blockA4.addImage(blockAL);

    blockA5 = createSprite(3250, 235 - 130, blockAW, blockAH);
    blockA5.addImage(blockAXL);

    floatB5 = createSprite(3415, 235 - 222);
    floatB5.addImage(floatA);

    blockA6 = createSprite(3578, 235 - 130, blockAW, blockAH);
    blockA6.addImage(blockAXL);

    blockA7 = createSprite(3780, 235 - blockAH, blockAW, blockAH);
    blockA7.addImage(blockABG);

    floatB7 = createSprite(3705, 235 - 102, floatBlockA.w, floatBlockA.h);
    floatB7.addImage(floatBBG);

    // Section 5

    floatB8 = createSprite(4025, 235 - 65, floatBlockA.w, floatBlockA.h);
    floatB8.addImage(floatMBG);

    floatB9 = createSprite(4320, 235 - 65, floatBlockA.w, floatBlockA.h);
    floatB9.addImage(floatMBG);

    blockA8 = createSprite(4350, 235 - 70, blockAW, blockAH);
    blockA8.addImage(blockAL);

    blockA9 = createSprite(4650, 235 - 130, blockAW, blockAH);
    blockA9.addImage(blockAXL);

    blockA10 = createSprite(4850, 235 - blockAH, blockAW, blockAH);
    blockA10.addImage(blockABG);

    floatB10 = createSprite(4450, 235 - 105, floatBlockA.w, floatBlockA.h);
    floatB10.addImage(floatMBG);

    floatB11 = createSprite(4550, 235 - 175, floatBlockA.w, floatBlockA.h);
    floatB11.addImage(floatMBG);
    
    
    //bg sprites
    bgSprites.addWC(blockA1);
    bgSprites.addWC(blockA2);
    bgSprites.addWC(blockA3);
    bgSprites.addWC(blockA4);
    bgSprites.addWC(blockA5);
    bgSprites.addWC(blockA6);
    bgSprites.addWC(blockA7);
    bgSprites.addWC(blockA8);
    bgSprites.addWC(blockA9);
    bgSprites.addWC(blockA10);
    
    bgSprites.addWC(floatB1);
    bgSprites.addWC(floatB2);
    bgSprites.addWC(floatB3);
    bgSprites.addWC(floatB5);
    bgSprites.addWC(floatB7);
    bgSprites.addWC(floatB8);
    bgSprites.addWC(floatB9);
    bgSprites.addWC(floatB10);
    bgSprites.addWC(floatB11);
  }
  //floatBBG.resize(20,20)
  class FloatBlock {
    constructor(w, h) {
      this.w = w;
      this.h = h;
    }
  }

  // class Player {
  //   constructor(x, y, w, h, speed) {
  //     this.x = x;
  //     this.y = y;
  //     this.w = w;
  //     this.h = h;
  //     this.speed = speed;
  //   }
  // }

  class Ground {
    constructor(w, h) {
      this.w = w;
      this.h = h;
    }
  }
  function checkDoorInteract(){
    if(dialogueEncounterManager.canTalk() && door.canTalk(player.sprite)){
      door.talk(camera.position);
      sfx.knock.play();
    }
    else
    {
      door.checkIfOpened(player.sprite);
    }
    if(dialogueEncounterManager.canTalk() && doorEnd.canTalk(player.sprite)){
      doorEnd.talk(camera.position);
    }
    else
    {
      doorEnd.checkIfOpened(player.sprite);
    }
  }
  function createEnemies(){
    new Enemy(1050, 114);
    new Enemy(1242, 72);
    new Enemy(1450, 114);
    new Enemy(1922, 174);
    new Enemy(2457, 174);
    new Enemy(3250, -26);
    new Enemy(3578, -26);
    new Enemy(3778, 90);
    new Enemy(4022, 132);
    new Enemy(4221, 174);
    new Enemy(4445, 92);
    new Enemy(4646, -26);
    new Enemy(4858, 114);
  }
  function leaveLevel(){
    bgm.level1.stop();
    if(eManager.enemySprites.toArray().length !== 0){
      storyData.killedAllViruses = false;
    }
    allSprites.removeSprites();
    
    sceneManager.showScene(LevelSelect);
  }
}
