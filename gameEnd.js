// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global PLAYER_NAME, Purello, Box, createSprite, lsImages, sfx, allSprites, sceneManager, camera, drawSprites, bgm, Group, Player, eManager, Door, dialogueEncounterManager, Menu, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */
let storyData = {
  isTelepathic: false,
  killedAllViruses: true,
  
  getIsTrueEnding: function(){
    return this.isTelepathic && this.killedAllViruses;
  }
};

function GameEnd() {
  let bgSprites;
  let player;
  let door;
  let box
  let doorEnd;
  
  this.setup = function() {
    
  }
  this.enter = function(){
    //load bgm
    bgm.playRoomTone();
    bgSprites = Group();
    player = new Player(200, height-40, false);
    door = new Door(200, height-40, 2, false, leaveLevel, true);
    doorEnd = new Door(width*5 + width/2, height-40, 2, true, leaveLevel, true);
    box = new Box(width*3, height -40);
    dialogueEncounterManager.reset();
    
    //create sprites
    createBgSprites();
    //alter player sprite
    player.sprite.addImage(lsImages.player);
    player.sprite.setCollider("rectangle", 0, 18, 30, 100);
    player.sprite.depth = 1;
    
    camera.position.y = 250;
  }
  this.draw = function() {
    background(250);
    dialogueEncounterManager.update();
    player.update();
    
    player.checkBGCollision(bgSprites);
    
    //second last
    drawSprites();
    checkDoorInteract();
    checkBoxInteract();

    //last
    camera.position.x = player.sprite.position.x;
    if(camera.position.x <350){  //camera pan stopper
      camera.position.x = 350;
    } else if(camera.position.x > 3850){
      camera.position.x = 3850;
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
  
  function createBgSprites(){
    let boundWidth = 20;
    bgSprites = Group();
    
    let floorSprite = createSprite(width*3, height -20, width*6, 40);
    floorSprite.shapeColor = color(170);
    bgSprites.add(floorSprite);
    
    //create left and right bounds
    bgSprites.add(createSprite(-boundWidth/2, height/2, boundWidth, height));
    bgSprites.add(createSprite(width*6 + boundWidth/2, height/2, boundWidth, height));
  }


  function checkDoorInteract() {
    if (dialogueEncounterManager.canTalk() && door.canTalk(player.sprite)) {
      door.talk(camera.position);
      sfx.knock.play();
      return true;
    }   
    doorEnd.checkIfOpened(player.sprite);
    
  }
  function checkBoxInteract(){
    if (dialogueEncounterManager.canTalk() && box.canTalk(player.sprite)) {
      box.talk(camera.position);
      return true;
    } 
  }
  function leaveLevel() {
    bgm.roomTone.stop();
    allSprites.removeSprites();
    noLoop();
    displayEndingCard();
  }
  function displayEndingCard(){
    background(240); 
    textSize(16); 
    fill('BLACK');
    text("And so I packed my bags and left the city.\nI remained dedicated to the cause of fighting the virus.\n\nSometimes I wonder what that deskie at my old job is\nup to. Maybe if I talked to them more, I would know now. ;)\n\n\n\n\nThat's a wrap, folks. Thanks for playing.",camera.position.x-width/2+60, camera.position.y-height/2+65);
  }
}


function TrueEnd() {
  let bgSprites;
  let player;
  let door;
  let box
  let doorEnd;
  
  let purello;
  let purelloEntered = false;
  let purelloTriggerX = 2500;
  let flag = false;
  
  this.setup = function() {
    
  }
  this.enter = function(){
    //load bgm
    bgm.playRoomTone();
    bgSprites = Group();
    player = new Player(200, height-40, false);
    door = new Door(200, height-40, 2, false, leaveLevel, true);
    doorEnd = new Door(width*5 + width/2, height-40, 2, true, leaveLevel, true);
    box = new Box(width*3, height -40);
    dialogueEncounterManager.reset();
    
    //create sprites
    createBgSprites();
    //alter player sprite
    player.sprite.addImage(lsImages.player);
    player.sprite.setCollider("rectangle", 0, 18, 30, 100);
    player.sprite.depth = 1;
    
    camera.position.y = 250;
    
    purelloEntered = false;
    flag = false;
  }
  this.draw = function() {
    background(250);
    dialogueEncounterManager.update();
    player.update();
    
    if(!purelloEntered && player.sprite.position.x > purelloTriggerX){
      enterPurello();
    } else if(purelloEntered){
      purello.update(player.sprite.position.x);
    }
    
    
    player.checkBGCollision(bgSprites);
    if(purelloEntered){
      purello.checkBGCollision(bgSprites);
    }
        
    //second last
    drawSprites();
    if(!checkBoxInteract() && !checkDoorInteract() && purelloEntered){
       checkPurelloInteract();
    }
    if(flag){
      dialogueEncounterManager.enterEncounter(PLAYER_NAME, undefined, [[("It sounds like someone is approaching.")],], camera.position);
      flag = false;
    }
    //last
    camera.position.x = player.sprite.position.x;
    if(camera.position.x <350){  //camera pan stopper
      camera.position.x = 350;
    } else if(camera.position.x > 3850){
      camera.position.x = 3850;
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
  
  function createBgSprites(){
    let boundWidth = 20;
    bgSprites = Group();
    
    let floorSprite = createSprite(width*3, height -20, width*6, 40);
    floorSprite.shapeColor = color(170);
    bgSprites.add(floorSprite);
    
    //create left and right bounds
    bgSprites.add(createSprite(-boundWidth/2, height/2, boundWidth, height));
    bgSprites.add(createSprite(width*6 + boundWidth/2, height/2, boundWidth, height));
  }


  function checkDoorInteract() {
    if (dialogueEncounterManager.canTalk() && door.canTalk(player.sprite)) {
      door.talk(camera.position);
      sfx.knock.play();
      return true;
    }   
    doorEnd.checkIfOpened(player.sprite);
    
  }
  function checkBoxInteract(){
    if (dialogueEncounterManager.canTalk() && box.canTalk(player.sprite)) {
      box.talk(camera.position);
      return true;
    } 
  }
  function checkPurelloInteract(){
    if (dialogueEncounterManager.canTalk() && purello.sprite.overlap(player.sprite)) {
      purello.talk(camera.position);
    } 
  }
  function leaveLevel() {
    bgm.roomTone.stop();
    allSprites.removeSprites();
    noLoop();
    displayEndingCard();
  }
  function displayEndingCard(){
    background(240); 
    textSize(16); 
    fill('BLACK');
    text("And so Purello and I went to a nice Thai place for lunch,\nand then began a new adventure fighting the pandemic\ntogether. If we're lucky, we might defeat the virus and\nsave all of humanity.\n\n\n\n\nThanks for playing.",camera.position.x-width/2+60, camera.position.y-height/2+65);
  }
  
  //purello events
  function enterPurello(){
    purelloEntered = true;
    flag = true;
    
    bgm.roomTone.stop();
    bgm.purello.play();
    
    sfx.door.play();
    
    purello = new Purello(200, height-40, width*5 + 100);    
    
  }
  
  
}
