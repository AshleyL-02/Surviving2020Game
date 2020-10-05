// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global Level0, bgm, userStartAudio, loop, PLAYER_NAME, dialogueEncounterManager, sceneManager, LevelSelect, push, pop, noLoop, Game, SceneManager, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

// idea- menu is a pixel waiting room and player asks attendant to enter game
// dynamic/ animated menu

function Menu() {
  const FONT_COLOR = 'BLACK';
  const FONT_SIZE = 17;
  
  const selectKey = 69;  //keyCode of E key... , make sure it's the code 
  const spaceKey = 32;
  const cKey = 67;
  const zeroKey = 48;
  const oneKey = 49;
  
  let isTalking = false;
  let isShowingCredits = false;
  
  let introDialogueSet = [
    ["(Press 'E' to advance dialogue.)"],
    ["! DANGER: 2020 APPROACHING !"],
    ["Life as we knew it had changed forever.", "ARMCROSS"],
    ["On January 20th, 2020 the first US Covid-19 case was confirmed in Washington State."],
    ["Things started to spiral form there."],
    ["All the toilet paper vanished, online sales were blooming and violence was at an all-time high.", "IDLE"],
    ["As the months passed, I though the second wave would be the aliens but 2020 isn’t over yet."],
    ["There was no order anywhere."],
    ["No one to save us from the year that just seemed to never end."],
    ["After the schools closed and we were all forced to use Zoom to interact, I decided than enough was enough.", "ARMCROSS"],
    ["I put on my Target mask, grabbed a roll of toilet paper, refilled my hand sanitizer, slipped on my Yeezy Clog and decided that I would stop the virus and save all of humanity."],
  ];
  
  let creditsText = 'Credits:\n\nThis game is dedicated to all those who have lost their lives in 2020 battling\nCovid-19. ' + 
          'You will forever be missed and your memories cherished in the hearts\nof your loved ones.Rest In Peace <3' +
          '\n\nPRODUCTION COMPANY      Brown Bananas'+
          '\nGAME TITLE              Surviving 2020'+
          '\nLEAD CAST               Mario-Pants'+
          '\nSUPPORTING CAST         Mr. Lysol'+
          '\nPRODUCTION AND SET      Kevin Granados'+
          '\nCASTING DIRECTOR        Ashley Luty'+
          '\nWRITER                  Aqueena Alexander'+
          '\n\nSpecial thanks to Google and the CSSI team for giving us this amazing\nopportunity. We could not have done it without you. '+
          '\n\nShoutout to Cohort-25 and all our Googlers: Logan, Thomas, Mark, Lauren, Andy,\nDean. '+
          'Thank you to the behind-the-scene workers Thiney and Kelsey.'+
          '\n\nThis game is made for entertainment purposes only and is not meant to undermine\nthe severity of Covid-19 in any way. '+
          'It promotes the superheroes of 2020: the\nfront-line workers, teachers, medical staff and everyone else who has risked\ntheir lives so that others can be safe. '+
          'We are forever grateful.' + 
          '\n\nMusic and art asset credits are listed info.txt.';


  this.preload = function(){ //called before canvas is created

  }
  this.setup = function() { //called during first draw()
  };
  this.enter = function(){  //called once every time this scene is opened 
    fill(FONT_COLOR);
    textSize(FONT_SIZE);  
    displayBackground();
    
    bgm.menu.play(); 
    
    let isTalking = false;
    let isShowingCredits = false;
  }
  
  this.draw = function() {
    
  };

  this.keyPressed = function(){
    if(keyCode === selectKey){
      if(isTalking){
        let dialogueOver = dialogueEncounterManager.continue();
        if(dialogueOver === false){
          isTalking = false;
          displayBackground();
        }
      }
      else{
        //enter dialogue encounter
        isTalking = true;
        background(150);
        fill(FONT_COLOR);
        textSize(FONT_SIZE); 
        //text("(Press spacebar to skip intro.)", 180, 30);
        dialogueEncounterManager.enterEncounter(PLAYER_NAME, undefined, introDialogueSet);
      }
    }
    else if(!isTalking && keyCode === spaceKey){
      leaveMenu(LevelSelect);
    }    
    if(!isTalking){
      if(keyCode === cKey){
        if(isShowingCredits){
          isShowingCredits = false;
          displayBackground();
        }else{
          isShowingCredits = true;
          displayCredits();
        }     
      }
      else if(keyCode === zeroKey){
        currentLevel = 1;
        leaveMenu(Level0);
      }
      else if(keyCode === oneKey){
        currentLevel = 2;
        leaveMenu(Level1);
      }
      else if (keyCode === 50){
        leaveMenu(GameEnd);
      }
    }   
    
    userStartAudio();
  }
  
  function leaveMenu(scene){
    bgm.menu.stop();
    sceneManager.showScene(scene);
  }
  
  function displayCredits(){
    background(240); 
    fill(FONT_COLOR);
    textSize(13); 
    text(creditsText + "\n\nPress 'C' to return.", 40, 35);
  }
  
  function displayBackground() {
    background(240); 
    fill(FONT_COLOR);
    textSize(FONT_SIZE); 
    text("► Game has audio.\n\n\n\nControls:\n\WASD to move.\n'E' to interact or talk.\n'Spacebar' to shoot.\n\n\nPress 'E' to play intro.\nPress 'Spacebar' to continue to game.\n\n\n\n\nOther Controls:\n(Press 'C' for credits.)\n(Press level number to skip to level.)", 60, 65);

  }
}
