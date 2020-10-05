// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global currentLevel, keyWentDown, keyIsDown, CANVAS_HEIGHT, BOLDITALIC,push, pop, createGraphics, noLoop, loop, saveStrings, Level0, LevelSelect, GameWon, GameLost, textFont, Menu, SceneManager, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */
let dUrls = {
  shade: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FblackTransparent.png?v=1596157919417",
  player: {
    idle: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FmarioDialogue_idle.png?v=1595971670137",
    hm: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FmarioDialogue_hm.png?v=1595993845840",
    armcross: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FmarioDialogue_armCross.png?v=1595993848876",
  },
  deskie: {
    idle: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FdeskieDialogue_idle.png?v=1596001783654",
    blink: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FdeskieDialogue_blink.png?v=1596001783298",
    squint: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FdeskieDialogue_squint.png?v=1596001783523",
    turn: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FdeskieDialogue_turn.png?v=1596001783183",
    back: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FdeskieDialogue_back.png?v=1596001783603",
  },
}

let dImages = {
  shade: undefined,
  
  PLAYER: {
    IDLE: undefined,
    HM: undefined,
    ARMCROSS: undefined,
  },
  
  DESKIE: {
    IDLE: undefined,
    BLINK: undefined, 
    SQUINT:undefined,
    TURN:undefined,
    BACK:undefined,
  },
  PURELLO: {
    IDLE: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fpurello_idle.png?v=1596185432840",
    HAPPY: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fpurello_happy.png?v=1596185432909", 
    SQUINT: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fpurello_squint.png?v=1596185432977",
  },
  DOOR: {
    IDLE: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FtransparentPixel.png?v=1596084336721",
  },
  D00R: {
    IDLE: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FtransparentPixel.png?v=1596084336721",
  },
  BOX: {
    IDLE: "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FtransparentPixel.png?v=1596084336721",
  },
  
  loadAll: function(){
    this.shade = loadImage(dUrls.shade);
    
    this.PLAYER.IDLE = loadImage(dUrls.player.idle, f => {this.PLAYER.IDLE.resize(0, 400)});
    this.PLAYER.HM = loadImage(dUrls.player.hm, f => {this.PLAYER.HM.resize(0, 400)});
    this.PLAYER.ARMCROSS = loadImage(dUrls.player.armcross, f => {this.PLAYER.ARMCROSS.resize(0, 400)}); 
    
    this.DESKIE.IDLE = loadImage(dUrls.deskie.idle);
    this.DESKIE.BLINK = loadImage(dUrls.deskie.blink);
    this.DESKIE.SQUINT = loadImage(dUrls.deskie.squint);
    this.DESKIE.TURN = loadImage(dUrls.deskie.turn);
    this.DESKIE.BACK = loadImage(dUrls.deskie.back);
    
    this.DOOR.IDLE = loadImage(this.DOOR.IDLE);
    this.D00R.IDLE = loadImage(this.D00R.IDLE);
    this.BOX.IDLE = loadImage(this.BOX.IDLE);
    
    this.PURELLO.IDLE = loadImage(this.PURELLO.IDLE);
    this.PURELLO.HAPPY = loadImage(this.PURELLO.HAPPY);
    this.PURELLO.SQUINT = loadImage(this.PURELLO.SQUINT);
  },
  getPlayerImage: function(expression){
    let e = expression.toUpperCase();
    return this.PLAYER[e];
  },
  getNPCImage: function(characterName, expression){
    let n = characterName.toUpperCase();
    let e = expression.toUpperCase();
    
    return this[n][e];
  },
}

let dColors = {
  PLAYER: "#ffe0de",
  DESKIE: "#fcf3ca",
  DOOR: "#e6dff5",
  D00R: "#e6dff5",
  BOX: "#f2dfd0",
  PURELLO: "#fcf3ca",
}


class DialogueInfo {
  constructor(name){
    //immutables
    this.name = name.toUpperCase();
    
    //mutables
    this.dialogueSets;
    this.dialogueIndex = 0;
  }
  
  //DIALOGUE METHODS
  setDialogueSets(levelIndex){  // given array of arrays of strings
    this.dialogueIndex = 0;
    this.dialogueSets = dialogueData.getSetsForLevel(this.name, levelIndex);
  }
  
  getCurrentDialogueSet(){  //returns array of strings
    //only increment if not at last index
    if(this.dialogueIndex < this.dialogueSets.length-1){
      this.dialogueIndex++; 
      return this.dialogueSets[this.dialogueIndex -1]; 
    }
    
    return this.dialogueSets[this.dialogueIndex]; 
  } 
}

let dialogueEncounterManager = {
  tintAlpha: 200,
  selectKey: 69,
  
  //mutables
  currentSet: undefined,
  messageIndex: 0,  //index of current string in set
  
  numSpeaking: 2,  //number of people in encounter  
  playerName: undefined,
  npcName: undefined,
  
  isTalking: false,
  canTalkAgain: true,
  
  graphic: undefined,
  position: undefined,
  
  isFirst: true,
  
  reset(){  //called during enter
    this.isTalking = false;
    this.canTalkAgain = true;
  },
  
  update(){//goes at top of draw function
    this.isTalking = false;
  },
  keyPressed(keyCode){
    if(this.isTalking && keyCode === this.selectKey){
      this.continue();
    }
  },
  keyReleased(keyCode){
    if(!this.isTalking && keyCode === this.selectKey){
      this.canTalkAgain = true;
    }  
  },
  canTalk(){  //called before enterEncounter
    return this.canTalkAgain && keyWentDown(this.selectKey);
  },  
  
  enterEncounter: function(playerName, npcName, dialogueSet, cameraPosition = undefined){  //array of strings  
    this.isFirst = true;
    this.graphic = createGraphics(width, height);  
    noLoop();
    this.isTalking = true;
    this.canTalkAgain = false;
    
    this.currentSet = dialogueSet;
    this.messageIndex = 0;
    
    this.playerName = playerName;
    this.npcName = npcName;
    
    if(cameraPosition !== undefined){
      this.position = createVector(cameraPosition.x - width/2, cameraPosition.y - height/2);
    }
    else{
      this.position = createVector(0, 0);
    }
    
    //set bg tint       
    image(dImages.shade, this.position.x, this.position.y, width, height);

    
    //display idle sprites
    this.numSpeaking = 2;
    if(npcName === undefined){
      this.numSpeaking = 1;
    }
    else{
      this.displayNPCSprite(this.npcName, "IDLE");
    }
    //player display
    this.displayPlayerSprite("IDLE");
    
    //setup dialogue box
    this.continue();
  },

  leaveEncounter: function(){
    this.isTalking = false;
    loop();
  },
  continue: function(){  //displays encounter at messageIndex
    if(this.messageIndex === this.currentSet.length){
      this.leaveEncounter();
      return false;
    }
    else{      
      let message = this.currentSet[this.messageIndex][0];
      //skip empty message
      if(message === ""){
        this.messageIndex++;
        message = this.currentSet[this.messageIndex][0];
      }
      
      //set expression, if any
      if(this.currentSet[this.messageIndex].length >1){
        let e = this.currentSet[this.messageIndex][1];
        
        if(this.messageIndex %this.numSpeaking === 0){
          this.displayPlayerSprite(e);
        }
        else{
          this.displayNPCSprite(this.npcName, e);
        }
      }
      
      
      this.setDialogueName();
      dialogueBox.setTextBlock(message);
      
      if(this.isFirst){
        this.isFirst = false;
        dialogueBox.displayFirst(this.position);
      } else {
        dialogueBox.display(this.position);
      }   
      
      this.messageIndex++;
    } 

    return true;
  },
  
  //PRIVATE METHODS
  displayPlayerSprite: function(expression){
    let img = dImages.getPlayerImage(expression);
    this.graphic.image(img, 30, 70);
    image(this.graphic, this.position.x, this.position.y);
  },
  displayNPCSprite: function(npcName, expression){
    let img = dImages.getNPCImage(npcName, expression);
    this.graphic.image(img, width - img.width - 80, 0); 
    image(this.graphic, this.position.x, this.position.y);
  },
  
  setDialogueName: function(){
    let n;
    if(this.messageIndex %this.numSpeaking === 0){
      dialogueBox.bgColor=dColors.PLAYER;
      n= this.playerName;
    }else{
      dialogueBox.bgColor=dColors[this.npcName];
      n= this.npcName;
    }
    dialogueBox.setCharacterName(n);
  },
}

let dialogueBox = { 
  height: 126,
  textSize: 14, //px tall
  topMargin: 50,
  leftMargin: 40,
  padding: 4,
  borderWidth: 7,
  textColor: "BLACK",
  defaultBgColor: "#d9cfe8",
  bgColor: "#d9cfe8",
  font: "Lucida Console",
  maxLines: 4,
  maxLineCharacters: 74,  //number of characters in a line
  
  graphic: undefined,
  
  setup: function(){
    this.graphic = createGraphics(width, this.height);  
    
    this.graphic.background(this.textColor);  //set border
    this.graphic.textSize(this.textSize);
    this.graphic.textFont(this.font);
    this.graphic.fill(this.textColor);
    //Modes
    this.graphic.noStroke();
  },
  displayFirst: function(position){    
    image(this.graphic, position.x, position.y + height - this.height);
  },
  
  display: function(position){
    image(this.graphic, 0, (height-this.height));
  },
  
  // TEXT METHODS
  setCharacterName: function(characterName){
    this.clear();
    
    this.graphic.push();
    this.graphic.fill(this.textColor);
    this.graphic.textStyle(BOLDITALIC);
    
    //set text
    this.graphic.text(characterName, this.leftMargin -15, 2*this.borderWidth + this.textSize);
    this.graphic.pop();
  },
  setTextBlock: function(message){  //array of strings
    this.clearContents();
    let messages = this.formatMessage(message);
    let length = messages.length;
    
    for(let i = 0; i <length; i++){
      this.setTextLine(messages[i], i);
    }    
  },
  setTextLine: function(message, lineNumber){  //linenumber starts from 0  
    this.graphic.fill(this.textColor);
    this.graphic.text(message, this.leftMargin, this.getLineY(lineNumber));
  },
  
  getLineY: function(lineNumber){  //returns lineY from line number
    return this.topMargin + lineNumber*(this.padding + this.textSize);
  },
  formatMessage(message){  //returns array of strings
    let messages = message.split("\n");
    
    for(let i = 0; i < messages.length; i++){
      if(messages[i].length >this.maxLineCharacters){
        let original = messages[i];
        
        //find space to break text
        let sliceIndex = this.maxLineCharacters;
        while(original.charAt(sliceIndex -1) !== ' '){
          sliceIndex--;
        }
        
        let m1 = original.slice(0, sliceIndex);
        let m2 = original.slice(sliceIndex);  //+1 to skip the space
        messages[i] = m1;
        messages.splice(i+1, 0, m2);
      }
    } 
    return messages;
  },
  
  clear: function(){       
    this.graphic.fill(this.bgColor);
    this.graphic.rect(this.borderWidth, this.borderWidth, width - 2*this.borderWidth, this.height- 2*this.borderWidth);
  },
  clearContents: function(){//doesn't clear header
    this.graphic.fill(this.bgColor);
    this.graphic.rect(this.borderWidth, this.topMargin - this.textSize, 
                      width - 2*this.borderWidth, this.height-this.topMargin-this.borderWidth);
  }
}

let dialogueData = {  //stores all dialogue; serialization methods
  fileName: "levelDialogue",
  extension: "json",
  interlocutors: undefined,  //array of level dialogue

  //mutables
  
  //DATA METHODS
  deserialize: function(string){   
    let obj = JSON.parse(string);
    this.interlocutors = obj.allInterlocutors;
  },  
  // serialize: function(obj){
  //   let jsonString;
  //   jsonString = JSON.stringify(obj, null, '\t');
  //   console.log(jsonString);
  //   saveStrings([jsonString], this.fileName, this.extension);
  // },
  
  getSetsForLevel(interlocutorName, levelIndex){  //get sets of dialogue
    //find interlocutor
    let length = d.allInterlocutors.length;  
    for(let i = 0; i < length; i++){
      let currName = d.allInterlocutors[i].interlocutor;
      
      if(currName === interlocutorName.toUpperCase()){
        return d.allInterlocutors[i].levels[levelIndex];
      }
    }
    
    console.log("ERROR: couldn't find dialogue for ${interlocutorName}");
    return false;
    
  },  
}











// nothing to see here





let d = {
  allInterlocutors: [
    {
      interlocutor: "DESKIE",
      levels: [      
        [ //LEVEL 0 SETS
          [
            [""],
            ["Are you the new hire??"],
            ["Yeah."],
            ["Alright, I've unlocked the door."],
            [""],
            ["Make sure you kill all the viruses, okay?"],
            ["Okay."],
            ["Really, kill all the viruses. I don't want anyone to get sick."],
          ],
          [
            [""],
            ["Just head out the door to go to the next level."],
          ],
          [
            ["Um, sorry, where's the door?"],
            ["It's the door you just entered through."],
          ],
          [
            ["What does the door look like?", "HM"],
            ["The door is red."],
            ["And where is it?"],
            ["To your left. Can't miss it."],
            ["Alright, thanks.", "IDLE"],
          ],
          [
            ["Door?"],
            ["The door is literally right there.", "SQUINT"],
            ["Ok, sorry I forgot."],
          ],
          [
            ["Wait what am I supposed to be doing?"],
            ["Go through the door."],
          ],
          [
            ["How do I open the door?"],
            ["It's unlocked."],
            ["No, like how do I open it.", "ARMCROSS"],
            ["The handle's on the right side of the door."],
          ],
          [
            ["Which door do I open?"],
            ["There's only one door in this room."],
          ],
          [
            ["Can I open the door?"],
            ["Yes, you can open the door."],
            ["Which is..."],
            ["What?"],
            ["A door is..."],
            [""],
            ["...is?"],
            ["...", "BLINK"],
            [""],
            ["What you use to enter rooms.", "IDLE"],
          ],
          [
            [""],
            ["Go through the door."],
          ],
        ],
        // LEVEL 1 SETS
        [
          [
            [""],
            ["Nice job out there. I've unlocked the next level."],
            ["Thanks."],
            ["And put on a mask."],
            ["I am wearing a mask."],
            ["Oh."],
          ],
          [
            [""],
            ["You're back?"],
            ["Yep, what's up?"],
            ["Not much."],
          ],
          [
            ["...", "ARMCROSS"],
            [""],
            ["Hey what's your name, anyways?"],
            ["To you, I am but a lowly desk jockey."],
            ["But what should I call you?", "IDLE"],
            ["Maybe you should ask 'when should I call you?'"],
            ["Ok, what's the answer?"],
            ["Call me when you need to unlock the door."],
            ["Hm.", "HM"],
          ],
          [
            ["Hey."],
            ["Does the door need unlocking?"],
            ["No."],
            ["I didn't think so."],
          ],
          [
            [""],
            ["...", "BLINK"],
          ],
          [
            [""],
            ["... ...", "BLINK"],
          ],
          [
            [""],
            ["*snore*", "BLINK"],
          ],
          [
            ["BAH!"],
            ["What!!"],
          ], 
          [
            ["WHY DON'T YOU HAVE EARS."],
            ["You notice the ears."],
            [""],
            ["But not the arms."],
          ],
          [
            ["How does your mask stay on without ears?", "ARMCROSS"],
            ["How do birds wear glasses?"],
            ["Tape?"],
            ["Tape."],
          ],
          [
            ["Well if you don't have ears, can you hear me?"],
            ["No."],
            ["Wait...", "ARMCROSS"],
            [""],
            ["(They're telepathic?!)"],
            [""],
            ["You're telepathic?", "IDLE"],
            ["Don't tell my boss. He already visits too often.", "SQUINT"],
            ["(I will tell him.)", "ARMCROSS"],
            ["I know you're thinking about telling him."],
            ["(No I'm not.)"],
            ["Just go throught the door.", "IDLE"],
          ],
          [
            ["Alright, I'll bite.", "ARMCROSS"],
            [""],
            ["Why don't you have arms?"],
            ["Don't you think it's rude to ask?"],
            ["Aren't you telepathic?"],
          ],
          [
            ["Could you hand me a piece of paper?"],
            ["I physically can't."],
          ],
          [
            ["Do you have legs?", "HM"],
            ["Yeah."],
            ["Can I see them?"],
            ["..."],
            [""],
            ["I don't see why not."],
            ["*Looks over desk*", "IDLE"],
            [""],
            ["Nice."],
            [""],
            ["(They're wearing blue hotpants.)"],
          ],
          [
            ["How are you getting home?"],
            ["What do you need?"],
            ["I was going to ask for a ride."],
            ["From me?"],
            ["Right."],
            ["In the car I drove here?", "SQUINT"],
            ["Yeah?"],
            ["Well I don't drive."],
          ],
          [
            ["Do you walk?"],
            ["No."],
            ["How do you get here?"],
            ["Amazon's one-day delivery has been getting so fast I just order a package from my address and crawl inside."],
            ["Oh."],
            ["I used to take the bus, though."],
          ],
          [
            ["Could you order a package for me to get back?"], 
            ["Sure."],
            [""],
            ["And where do I send the package?"],
            ["The gas station on 74th is fine."],
          ],   
          [
            ["(They're ordering the package.)"],
          ],
          [
            ["(They're ordering the package.)"],
          ],
          [
            ["(They're ordering the package...?)"],
          ],
          [
            [""],
            ["*snore*", "BLINK"],
            ["(They're sleeping.)"],           
          ],
        ],       
        // LEVEL 2 SETS
        [
          [ 
            [""],
            ["Back already?"],
            ["Yep, bring it on."],
            ["Sorry I've got some bad news."],
            ["What is it?"],
            ["I'm not sure how I should say this.", "BLINK"],
            ["What's going on?"],
            ["I'm sorry.","IDLE"],
            [""],
            ["You've just been laid off."],
            ["In the short time I was gone?"],
            ["Yeah."],
            [""],
            ["Head out the door when you're done packing your stuff."],
          ],
          [
            ["What happened?", "ARMCROSS"], 
            ["Downsizing. Corporate decided our branch wasn't profitable enough."],
          ],
          [
            ["Is this the last time I'll see you?"],
            ["I guess it is."],
            ["Could you at least tell me your name?", "ARMCROSS"],
            ["It's Purello Lysol. Nice to meet you."],
          ],
          [
            ["(The phone is ringing.)"],
            ["Hold on, let me get this."],
            [""],
            ["Hello?", "TURN"],
            [""],
            ["Mhm...", "BACK"],
            [""],
            ["Ok..."],
            [""],
            ["Ok?"],
            [""],
            ["Oh."],
            [""],
            ["Alright, thanks for letting me know."],
            [""],
            ["Mhm, you too.", "TURN"],
            [""],
            ["Sorry about that.", "IDLE"],
          ],
          [
            ["Who was that?"],
            ["No one important."],
            [""],
            ["What did you want?"],
            ["I was just going to say goodbye."],
            ["Bye! Hope things turn well for you."],
          ],
          [
            ["Bye, Mr. Lysol."],
            ["Goodbye."],
          ],
        ],
        //LEVEL 3 SETS
      ]//levels end       
    },  //Deskie end
    { 
      interlocutor: "DOOR",
      levels: [      
        [ //LEVEL 0 SETS
          [
            ["Hello?"],
            ["..."],
          ],
        ],
        [ //LEVEL 1 SETS
          [
            ["(It's a door.)"],
          ],
          [
            ["(Upon closer inspection, it's a door-like LED display)"],
          ],
          [
            ["(That must be how it changes colors.)"],
          ],
          [
            ["(Seems like a waste of money.)"],
          ],
          [
            ["(Seems like a waste of time, too.)"],
          ],
          [
            ["(Seems like a waste of energy.)"],
          ],
          [
            ["(LEDs are pretty efficient nowadays, so maybe not.)"],
          ],
          [
            ["(The bottom of the door has a lot of scuff marks.)"],
          ],
          [
            ["(Looks like someone was kicking the door or something.)"],
          ],
          [
            ["(Upon closer inspection, it's still a door-like LED display.)"],
          ],
          [
            ["(It's a door-like LED display.)"],
          ],
        ],
        [// level 2 sets
          [
            ["(The door seems oddly quiet.)"],
          ],
          [
            ["(It knows something you don't.)"],
          ],
          [
            ["(Tell me your secrets, door.)"],
          ],
          [
            ["(The door remains silent.)"],
          ],
        ],
      ]//levels end        
    },  //door end
    { 
      interlocutor: "D00R",
      levels: [      
        [ //LEVEL 0 SETS
          [
            ["Hello?"],
            ["..."],
          ],
          [
            [("There are scuffling noises on the other side of the door.")],
          ],
          [
            ["Deskie?"],
            ["What?"],
            ["Just making sure."],
          ],
          [
            ["(Once a door, always a door.)", "ARMCROSS"],
          ],
        ],
        [ //LEVEL 1 SETS
          [
            ["Deskie?"],
            ["..."],
          ],
        ],
        [
          [
            ["(It's a door.)"],
          ],
          [
            ["(I'm going to miss this door)"],
          ],
          [
            ["(Goodbye, door.)"],
          ],
        ],
      ]//levels end        
    },  //d00r end
    { 
      interlocutor: "BOX",
      levels: [      
        [ //LEVEL 0 SETS (game end)
          [
            ["(It's a very large box.)"],
          ],
          [
            ["(This box is so big, it could probably fit a person.)"],
          ],
          [
            ["(The box is addressed to this building.)"],
          ],
          [
            ["(Looks like there's a sticker under the address sticker.)"],
          ],
          [
            ["(Let me try to peel off the sticker.)"],
            ["...rrriPP."],
            ["(Shoot, I peeled too fast.)"],
          ],
          [
            ["(Looks like there's another sticker under this sticker.)"],
            [""],
            ["(I'll peel it slower this time.)"],
            ["..."],
            ["(This sticker is addressed to this building again.)"],
          ],
          [
            ["(There's another sticker under this sticker.)"],
          ],
          [
            ["(Should I peel it again?)"],            
          ],
          [
            ["(I will peel it again.)"],  
            ["..."],
            ["(The sticker is addressed to an apartment complex a few blocks down the street.)"],
          ],
          [
            ["(I kind of like peeling stickers.)"], 
            ["..."],
            ["(This sticker's addressed to this building again.)"],
          ],
          [
            ["(It's pretty hard to get a clean peel.)"], 
            ["..."],
            ["(This sticker's addressed to the apartment.)"],
          ],
          [
            ["(Shoot, I messed up the peel.)"], 
            ["..."],
            ["(But I can tell the sticker's addressed to this building.)"],
          ],
          [
            ["(I wonder what the next sticker is.)"], 
            ["..."],
            ["(This sticker's addressed to the apartment.)"],
          ],
          [
            ["(I'll peel another. I have nothing better to do.)"], 
            ["..."],
            ["(This sticker's addressed to this building.)"],
          ],
          [
            ["(I guess I'll peel another sticker.)"], 
          ],
        ],
      ]//levels end        
    },  //box end
    { 
      interlocutor: "PURELLO",
      levels: [      
        [ //LEVEL 0 SETS (true end)
          [
            ["Deskie?"],
            ["Call me Purello."],
            ["What are you doing here?"],
            ["I just got laid off too."],
            ["I'm sorry."],
            ["What kind of person does that thing over the phone?", "SQUINT"],
            ["You're too good for them anyways.", "ARMCROSS"], 
            ["Haha, alright.", "HAPPY"],
            ["Let's walk out together."],
          ],
          [
            ["(Purello is breathing hard.)"],
            [""],
            ["You wanted to leave that badly?"],
            ["No, I ran out to catch you."],
            ["Oh?"],
            ["You want to fight the virus, right?"],
            ["Yes, my work is far from over.", "HM"],
            ["And you look like you might need some help.", "IDLE"],
            [""],
            ["Can I fight the virus by your side?"],
            ["I'd love that.", "IDLE"],
            ["Really?", "HAPPY"],
          ],
          [
            ["How'd you open the door, anyways?", "HM"],
            ["I caught it with my foot before it closed."],
            ["Then how'd you enter the door this morning?"],
            ["Same thing."],
            ["You do this every time you enter and leave the building?", "IDLE"],
            ["Yep.", "HAPPY"],
            [""],
            ["Sometimes I have to wait for a while before someone shows up.", "IDLE"],
          ],
          [
            ["You'd think they'd make the building more accessible.", "ARMCROSS"],
            ["The door doesn't bother me too much.", "HAPPY"],
          ],
          [
            ["How long have you been working here?"],
            ["Since the pandemic started."],
            ["With your telepathy, I'm sure you'll be able to get a better job somewhere else."],
            ["I actually quit my job to work here."],
            ["Why?"],
            ["Telepathy isn't going to help this pandemic."],
            [""],
            ["Isn't that why you're here, too?", "HAPPY"],
          ],
          [
            [""],
            ["I actually have a lot of trouble finding work, though."],
            ["That can't be true."],
            ["No one hires an armless secretary."],
          ],
          [
            ["Where are we headed?"],
            ["Let's get some lunch. You can't fight viruses on an empty stomach.", "HAPPY"],
          ],
          [
            [""],
            ["Let's head out the door."],
          ],
          [
            [""],
            ["I'm ready to leave when you are."],
          ],
          [
            [""],
            ["Ready to go?"],
          ],
        ],
      ]//levels end        
    },  //purello end
  ]
}


            //telepathy isn't going to help this pandemic //tape on back of head