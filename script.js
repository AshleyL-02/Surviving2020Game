// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global TrueEnd, Level1, pImages, masterVolume, soundManager, getAudioContext, dialogueBox, dImages, loadStrings, dialogueData, Level0, LevelSelect, GameEnd, textFont, Menu, SceneManager, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

// p5.play documentation: http://molleindustria.github.io/p5.play/docs/index.html

//p5 scene manager: https://github.com/mveteanu/p5.SceneManager
// cross-scene communication https://github.com/mveteanu/p5.SceneManager/blob/master/gamejs/gameover.js


//remove sprites from scene before entering next scene; sprites are instantiated every enter(), fix capslock issue
const PLAYER_NAME = "MARIO-PANTS";
const DIALOGUE_URL = 
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FlevelDialogue.json?v=1596002253449";
const FONT_SIZE = 20;
const FONT = "Lucida Console";

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 700;

let myCanvas;
let deserializedDialogue;

//let sky;

let sceneManager;

function preload() {
  //setup scene manager
  sceneManager = new SceneManager();
  sceneManager.wire();
  
  //load dialogue file and data
  //deserializedDialogue = loadStrings(DIALOGUE_URL);
  dImages.loadAll();
  
  //load player images
  pImages.loadAll();
  
  //sound
  soundManager.loadFiles();
  
  //add scenes (also calls preload in each scene)
  sceneManager.addScene(TrueEnd);
  sceneManager.addScene(GameEnd);
  sceneManager.addScene(Level0);
  sceneManager.addScene(Level1);
  sceneManager.addScene(LevelSelect);
  sceneManager.addScene(Menu);
  
  
}

function setup() {
  //createCanvas(windowWidth - 20, windowHeight - 30);
  myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); // avoid changing
  //sky = color(108,201,235)
  setupText();
  
  //deserializing dialogueData
  //dialogueData.deserialize(deserializedDialogue.join(""));
  dialogueBox.setup();
  
  //
  getAudioContext().suspend();
  
  sceneManager.showScene(Menu);
  masterVolume(0.1);
}


//Other methods
function setupText() {
  textSize(FONT_SIZE);
  textFont(FONT);
}

/*Intro,middle and ending 
Purello: Hello, how may I help you?
Mario: I'd like to enter Warzone 2020
P: You will have to start at level zero. Be careful, there is a deadly virus around
M: How do I get there?
P: Go through the red door
M: Thank you. I am Mario-Pants. What is your name?
P: Purello Lysol. Good luck Mario-Pants. Be sure to sanitize after touching the door
M: Yes. I will put an end to this deadly virus.
P: Let me know if you need any help

OPTIONAL---After Level 0---
M: I defeated the first level. It was a close call. How do I get to the second level?....I should call Purello.
*calls Purello*
P: Hello? Purello Lysol speaking
M: Its Mario-Pants. I defeated level 0, how do I get to the next level?
P: Warzone 2020 is very magical. Keep walking and you will be taken there- oh no! The virus is here! 
*call ends*
M: Purello? PURELLO?! Oh no! I better hurry and save him. 
-----End----- 

 P: Thank you for saving me. You did it, you beat the virus!
 M: Yes, but my work is far from over. 
 P: You look like you might need some help
 M: Definitely. Let's defeat the virus together on other warzones. Here’s a vaccine.
 P: *takes it* Onward to the rest of Warzone 2020!
 
 Mario-Pants together with Purello Lysol will defeat the virus and save all of humanity.
*/


