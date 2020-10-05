// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global allSprites, camera, frameCount, Level1, Player, Door, loadAnimation,bgm, dialogueEncounterManager, PLAYER_NAME, DialogueInfo, dialogueBox, BOLDITALIC,push, pop, createGraphics, keyIsDown,sceneManager, Level0, drawSprites, Group, createSprite, Menu, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, CENTER,sfx, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

//ask about uncaught type error due to music, undefined (line 29)

//mr lysol

//animate deskie, door class
//camera doesn't follow player here
//let's talk about doors
//TODO: win conditions, userStartAudio(), credits
// TODO: story manager (contains story booleans), level select npcs, backroom
// TODO: animate deskie, add removeAllSprites to all scenes
let currentLevel = 0;

let lsImages = {
  bg: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FwaitingRoomBG.png?v=1595815019098",
  floor: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FwaitingRoomFloor.png?v=1595815009138",
  door: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fdoor.png?v=1595818925542",
  doorBlue: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fdoor2.png?v=1596073949341",
  deskie: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fdeskie_01.png?v=1595819443153",
  deskieBlink: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fdeskie_02.png?v=1596060815098",
  player: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FdocMario2.png?v=1596136141897",
  box: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fbox.png?v=1596179852903",
  
  loadAll: function(){ 
    this.bg = loadImage(this.bg, img => {this.bg.resize(750, 0)}); 
    this.floor = loadImage(this.floor, img => {this.floor.resize(750, 0)});
    this.door = loadImage(this.door);
    this.doorBlue = loadImage(this.doorBlue);
    this.deskie = loadImage(this.deskie);
    this.deskieBlink = loadImage(this.deskieBlink);  
    this.player = loadImage(this.player, img => {this.player.resize(100, 0)});
    this.box = loadImage(this.box);  
  },
}

function LevelSelect() {
  const selectKey = 69;  //keyCode of E key... , make sure it's the code 

  //sprites  
  let bgSprites;  //background spriteGroup, will collide
  let player;
  let speed = 10;  
  let door;  
  let deskie = {  
    sprite: undefined,
    dialogueInfo: undefined,
    update: function(){  //over-complicated blinking
      //use frameCount mode 148; <140
      if(frameCount % 150 < 140){
        deskie.sprite.addImage(lsImages.deskie);
      } else {
        deskie.sprite.addImage(lsImages.deskieBlink); 
      }   
    },
  };
  
  //mutables
  //let currentLevel = 1;  //starts at 0 //moved to global
  
  this.preload = function(){
    //LOAD ALL IMAGES
    lsImages.loadAll();
    
  }
  this.setup = function() {
    deskie.dialogueInfo = new DialogueInfo("DESKIE");  
    
  }
  this.enter = function(){  
    camera.position.x =width/2;
    camera.position.y =height/2;
    //create sprites
    createAllSprites();
    //alter player sprite
    player.sprite.addImage(lsImages.player);
    player.sprite.setCollider("rectangle", 0, 18, 30, 100);
    
    dialogueEncounterManager.reset();
    //set dialogue sets
    deskie.dialogueInfo.setDialogueSets(currentLevel);
    //set music
    bgm.levelSelect.play();
  }
  
  this.draw = function() {
    drawBackground();
    dialogueEncounterManager.update();  //must be at top
    
   deskie.update();
    player.update();
    
    //check collisions, except dialogue
    player.checkBGCollision(bgSprites);
    
    
    //SECOND LAST: draw everything
    drawSprites();
    
    //LAST: check dialogue collisions (npcs with dialogue)
    checkDeskieInteract();
    checkDoorInteract();
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
  
  //SPRITE METHODS
  function createBgSprites(){
    let boundWidth = 20;
    bgSprites = Group();
    
    let floorSprite = createSprite(width/2, height- (lsImages.floor.height/2));
    floorSprite.addImage(lsImages.floor);
    floorSprite.width = width;
    bgSprites.add(floorSprite);
    
    //create left and right bounds
    bgSprites.add(createSprite(-boundWidth/2, height/2, boundWidth, height));
    bgSprites.add(createSprite(width + boundWidth/2, height/2, boundWidth, height));
    //top bound
    bgSprites.add(createSprite(width/2, -boundWidth/2, width, boundWidth));
  }
  function createDeskie(){
    let deskieY = height - lsImages.floor.height - lsImages.deskie.height/2;
    deskie.sprite = createSprite(width-80, deskieY);
    deskie.sprite.addImage(lsImages.deskie);
    //deskie.sprite.addAnimation("IDLE", lsImages.deskie.animation);
    deskie.sprite.depth = -1;
    // deskie.sprite.addAnimation("b", lsImages.dAnim);
    // deskie.sprite.animation.play();
    // deskie.sprite.frameDelay = 20;
  }
  function createDoor(){
    door = new Door(80, height - lsImages.floor.height, currentLevel, false, enterCurrentLevel);
  }
  
  function createAllSprites(){
    player = new Player(80, height-lsImages.floor.height, false);
    createBgSprites();
    createDoor();
    createDeskie();
  } 
  
  function checkDeskieInteract(){
    if(dialogueEncounterManager.canTalk() && deskie.sprite.overlap(player.sprite)){
      door.unlock();
      dialogueEncounterManager.enterEncounter(PLAYER_NAME, deskie.dialogueInfo.name, deskie.dialogueInfo.getCurrentDialogueSet());
    }
  }
  function checkDoorInteract(){
    if(dialogueEncounterManager.canTalk() && door.canTalk(player.sprite)){
      door.talk();
      sfx.knock.play();
    }
    else
    {
      door.checkIfOpened(player.sprite);
    }
  }
  
  // OTHER METHODS
  function enterCurrentLevel(){
    allSprites.removeSprites();   
    bgm.levelSelect.stop();
    
    let level = currentLevel;
    currentLevel++;
    switch(level) {
      case 0:
        sceneManager.showScene(Level0);
        break;
      case 1:
        //story block for deskie telepathy
        if(deskie.dialogueInfo.dialogueIndex >12){
          storyData.isTelepathic = true;
        }
        sceneManager.showScene(Level1);
        break;
      case 2:
        if(storyData.getIsTrueEnding()){
          sceneManager.showScene(TrueEnd);
        } else{
          sceneManager.showScene(GameEnd);
        }       
        break;
      default:
        console.log("ERROR: reached the end of levels");
    }
    
  }

  function drawBackground() {
    image(lsImages.bg, 0, 0);
  }
}





