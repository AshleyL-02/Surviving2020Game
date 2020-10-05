// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global pImages, sfx, lsImages, DialogueInfo, createSprite, keyIsDown, Level0, bgm, userStartAudio, loop, PLAYER_NAME, dialogueEncounterManager, sceneManager, LevelSelect, push, pop, noLoop, Game, SceneManager, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */


class Door{  //try moving door around; block pushing puzzle
  constructor(baseX, baseY, currentLevel, isUnlocked = false, fnLeaveScene, isLevelDoor = false){  //base center of door
    this.unlockedImage = lsImages.door;
    this.lockedImage = lsImages.doorBlue;
    let y = baseY - this.unlockedImage.height/2;
    this.sprite = createSprite(baseX, y);
    this.sprite.depth = -1;
    
    if(isUnlocked){
      this.sprite.addImage(this.unlockedImage);
    } else{
      this.sprite.addImage(this.lockedImage);
      //setup dialogue
      
      if(isLevelDoor){
        this.dialogueInfo = new DialogueInfo("D00R");
      }
      else{
        this.dialogueInfo = new DialogueInfo("DOOR");
      }
      this.dialogueInfo.setDialogueSets(currentLevel);
    }
    
    
    this.e = 69;
    this.fnLeaveScene = fnLeaveScene;  //function to call when door is opened
    
    //mutables
    this.isUnlocked = isUnlocked;
  }
  
  canTalk(playerSprite){
    return !this.isUnlocked && this.sprite.overlap(playerSprite);
  }
  talk(cameraPosition){ 
    dialogueEncounterManager.enterEncounter(PLAYER_NAME, this.dialogueInfo.name, this.dialogueInfo.getCurrentDialogueSet(), cameraPosition);
  }
  checkIfOpened(playerSprite){  //check to see if door should be opened
    if(this.isUnlocked && keyIsDown(this.e) && this.sprite.overlap(playerSprite)){
      sfx.door.play();
      this.fnLeaveScene();
    }
  }

  unlock(){
    if(!this.isUnlocked){
      this.sprite.addImage(this.unlockedImage);
      this.isUnlocked = true;
    }    
  }
}

class Box {
  constructor(baseX, baseY){  //base center of door
    let y = baseY - lsImages.box.height/2;
    this.sprite = createSprite(baseX, y);
    this.sprite.depth = -1;
    this.sprite.addImage(lsImages.box);
    
    this.dialogueInfo = new DialogueInfo("BOX");   
    this.dialogueInfo.setDialogueSets(0);
  }
  
  
  canTalk(playerSprite){
    return this.sprite.overlap(playerSprite);
  }
  talk(cameraPosition){ 
    dialogueEncounterManager.enterEncounter(PLAYER_NAME, this.dialogueInfo.name, this.dialogueInfo.getCurrentDialogueSet(), cameraPosition);
  }
}

class Purello {  //purello's not an object so don't treat them like one
  constructor(x, y, endX) {
    this.sprite = createSprite(x, y);
    this.sprite.addImage(pImages.purello);
    this.sprite.setCollider("rectangle", 0, 0, 250, pImages.purello.height);
    this.sprite.depth = 0;
    //this.sprite.debug = true;
    
    //constants
    this.speed = 3.8;
    this.playerGap = 200;
    
    //where purello stops moving
    this.endX = endX;
    
    this.shouldMove = true;  //false if at end point

    this.dialogueInfo = new DialogueInfo("PURELLO");   
    this.dialogueInfo.setDialogueSets(0);
  }

  update(playerPosX) {  //called every frame
      if(playerPosX > this.sprite.position.x){
      this.sprite.mirrorX(1);
        
      if(this.shouldMove){
        this.sprite.velocity.x = 0;
        if(playerPosX > this.sprite.position.x + this.playerGap){
          this.sprite.velocity.x = this.speed;
        }
        if(this.sprite.position.x > this.endX){
          this.sprite.velocity.x =0;
          this.shouldMove = false;
        }
      }     
    } else{
      this.sprite.mirrorX(-1);
      if(this.shouldMove){
        this.sprite.velocity.x = 0;
      }      
    }
       
  }
  checkBGCollision(bgSpriteGroup) {  //called every frame
    this.sprite.collide(bgSpriteGroup);
  }
  talk(cameraPosition){ 
    dialogueEncounterManager.enterEncounter(PLAYER_NAME, this.dialogueInfo.name, this.dialogueInfo.getCurrentDialogueSet(), cameraPosition);
  }
}