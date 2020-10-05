/* global loadSound, loop, PLAYER_NAME, dialogueEncounterManager, sceneManager, LevelSelect, push, pop, noLoop, Game, SceneManager, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

//sfx from: https://kenney.nl/assets/rpg-audio
//bgm from: https://patrickdearteaga.com/arcade-music/,
//https://www.bensound.com/royalty-free-music/track/the-elevator-bossa-nova
//https://www.dl-sounds.com/royalty-free/defense-line/
//https://www.dl-sounds.com/royalty-free/power-bots-loop/

//start and stop music here, setTimeout()
let sfx = {
  jump:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FBouncyBounce.mp3?v=1596154715369",
  fall:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FMario%20pants%20fall%20(1).mp3?v=1596149324284",
  shoot:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FShooting%20sound%20(1).mp3?v=1596149277731",
  virusdie:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FVirus-die-1%20(5).mp3?v=1596219724359",
  knock:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FDoor%20knocks%20(1).mp3?v=1596149333976",
  door:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FdoorOpen_1.mp3?v=1596006375791",

  loadAll: function() {
    sfx.jump = loadSound(sfx.jump);
    sfx.fall = loadSound(sfx.fall);
    sfx.shoot = loadSound(sfx.shoot);
    sfx.virusdie = loadSound(sfx.virusdie);
    sfx.knock = loadSound(sfx.knock);
    sfx.door = loadSound(sfx.door);
  }
};

let bgm = {
  menu:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FLooking-for-a-new-beginning%20(1).mp3?v=1596009634666",
  levelSelect:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fbensound-theelevatorbossanova-1.mp3?v=1596011128352", //'/assets/bossanova.mp3',
  level0:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FDefense-Line-1-AudioTrimmercom.mp3?v=1596052151319",
  level1:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FPower%20Bots%20Loop%20(online-audio-converter.com).mp3?v=1596052410796",
  roomTone:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FRoom-Tone.mp3?v=1596173706770",
  purello:
    "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FEnnio-Mano-Arrow.mp3?v=1596173710907",

  loadAll: function() {
    bgm.menu = loadSound(bgm.menu, k => {
      bgm.menu.setVolume(0.8);
      bgm.menu.setLoop(true);
      bgm.menu.playMode("sustain");
    });
    bgm.levelSelect = loadSound(bgm.levelSelect, k => {
      bgm.levelSelect.setVolume(0.8);
      bgm.levelSelect.setLoop(true);
      bgm.levelSelect.playMode("sustain");
    });

    bgm.purello = loadSound(bgm.purello, k => {
      bgm.purello.setVolume(0.8);
      bgm.purello.setLoop(true);
      bgm.purello.playMode("sustain");
    });
  },
  playLevel0: function() {
    this.level0 = loadSound(bgm.level0, k => {
      bgm.level0.setVolume(0.8);
      bgm.level0.setLoop(true);
      bgm.level0.playMode("sustain");
      bgm.level0.play();
    });
  },
  playLevel1: function() {
    this.level1 = loadSound(bgm.level1, k => {
      bgm.level1.setVolume(0.8);
      bgm.level1.setLoop(true);
      bgm.level1.playMode("sustain");
      bgm.level1.play();
    });
  },
  playRoomTone: function() {
    this.roomTone = loadSound(bgm.roomTone, k => {
      bgm.roomTone.setVolume(0.8);
      bgm.roomTone.setLoop(true);
      bgm.roomTone.playMode("sustain");
      bgm.roomTone.play();
    });
  }
  // playPurello: function(){
  //   this.purello = loadSound(bgm.purello,
  //                         k => {bgm.purello.setVolume(0.8);bgm.purello.setLoop(true);bgm.purello.playMode('sustain');bgm.purello.play()});
  // },
};

let soundManager = {
  loadFiles: function() {
    sfx.loadAll();
    bgm.loadAll();
  }
};
