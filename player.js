// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global camera, keyWentDown, keyIsDown, Group, drawSprites, createSprite, dImages, loadStrings, dialogueData, Level0, LevelSelect, GameWon, GameLost, textFont, Menu, SceneManager, frameRate, resizeCanvas, green, blue, red, createImage, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode,sfx, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, CENTER,createVector, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let pImages = {
  player: undefined,
  shot: undefined,
  enemy: undefined,
  purello: undefined,

  loadAll: function() {
    this.player = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FdocMario2.png?v=1596136141897",
      k => {
        this.player.resize(0, 60);
      }
    );
    this.purello = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2FdocPurello.png?v=1596179853076",
      k => {
        this.purello.resize(100, 0);
      }
    );
    this.enemy = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fred.png?v=1596077903358",
      k => {
        this.enemy.resize(40, 0);
      }
    );
    this.shot = loadImage(
      "https://cdn.glitch.com/c5ebde1b-35ac-4394-a7a6-37aa00c29c3f%2Fsyringe.png?v=1596080700198",
      k => {
        this.shot.resize(40, 0);
      }
    );
  }
};

let eManager = {
  enemySprites: undefined,
  shotSprites: undefined,
  score: 0,

  createGroups() {
    this.enemySprites = Group();
    this.shotSprites = Group();
    this.score = 0;
  },
  removeSprites() {
    this.enemySprites.removeSprites();
    this.shotSprites.removeSprites();
  },
  checkCollisions: function(bgSprites) {
    //every frame; check collisions
    let s = this.shotSprites.toArray();
    let e = this.enemySprites.toArray();

    // check if each shot got each enemy aka check collision
    let sLength = s.length;
    let eLength = e.length;
    for (let i = 0; i < sLength; i++) {
      //check if shot hit bg
      if (s[i].collide(bgSprites)) {
        s[i].life = 0;
        this.shotSprites.remove(s[i]);
        //i--;
      } else {
        for (let a = 0; a < eLength; a++) {
          //if collision
          if (s[i].collide(e[a])) {
            //if first element in s collides with first element in e then
            sfx.virusdie.play();
            //increment score
            this.score = this.score + 1;
            //destory both aka life=0
            s[i].life = 0;
            e[a].life = 0;
            this.shotSprites.remove(s[i]);
            this.enemySprites.remove(e[a]);
          }
        }
      }
    }
  }
};

class Shot {
  constructor(x, y, mirrorDir, shotSpriteGroup) {
    //moveRight is a boolean
    this.sprite = createSprite(x, y);
    this.sprite.addImage(pImages.shot);

    this.sprite.life = 100; //makes it disappear after 100
    //this.sprite.setCollider( "rectangle", 0, 0, pImages.shot.width - 50, pImages.shot.height - 50 );
    eManager.shotSprites.add(this.sprite);

    if (mirrorDir === 1) {
      this.sprite.mirrorX(mirrorDir);
      this.sprite.setVelocity(4.4, 0);
    } else {
      this.sprite.mirrorX(mirrorDir);
      this.sprite.setVelocity(-4.4, 0);
    }

    //this.sprite.debug = true;
  } //checks the collision of the sprite to enemy
}

class Player {
  constructor(x, y, canShoot = true) {
    this.sprite = createSprite(x, y);
    this.sprite.addImage(pImages.player);
    this.sprite.setCollider("rectangle", 0, 3, 30, 55);
    this.sprite.maxSpeed = 15;

    //this.sprite.debug = true;
    //constants
    this.speed = 4;
    this.gravity = 0.6; //velocity loss per frame
    this.jumpStrength = 10;
    this.healthIncrement = 1;
    this.canShoot = canShoot; //shooting is enabled

    //keycodes
    this.w = 87;
    this.a = 65;
    this.d = 68;
    this.space = 32;

    //key variables
    this.moveLeft = false;
    this.moveRight = false;

    //mutables
    this.willRespawn = false;
    this.timingRespawn = false;
    this.respawnPoint = createVector(x, y);
    this.deaths = 0;
    this.score = 0;
  }

  update() {
    //called in draw every frame
    this.checkControls();
    this.setVelocity();
    this.setGravity();
    if (this.canShoot) {
      this.checkEnemyCollision();
      this.checkRespawn();
    }
    //this.displayLives(); // lwc
  }
  keyPressed(keyCode) {
    //called in keyPressed
    if (this.canShoot && keyCode === this.space) {
      sfx.shoot.play();
      let s = new Shot(
        this.sprite.position.x + 10 * this.sprite.mirrorX(),
        this.sprite.position.y + 8,
        this.sprite.mirrorX()
      );
    }
  }
  checkBGCollision(bgSpriteGroup) {
    this.sprite.collide(bgSpriteGroup);
  }

  //PRIVATE METHODS
  checkControls() {
    if (keyIsDown(this.w)) {
      if (this.sprite.touching.bottom) {
        //jump
        sfx.jump.play();
        this.sprite.setVelocity(this.sprite.velocity.x, -this.jumpStrength);
      }
    }
    this.moveRight = keyIsDown(this.d);
    this.moveLeft = keyIsDown(this.a);
  }
  setVelocity() {
    if (this.moveLeft && !this.moveRight) {
      this.sprite.velocity.x = -this.speed;
      this.sprite.mirrorX(-1);
    } else if (this.moveRight && !this.moveLeft) {
      this.sprite.velocity.x = this.speed;
      this.sprite.mirrorX(1);
    } else {
      this.sprite.velocity.x = 0;
    }
  }
  setGravity() {
    if (!this.sprite.touching.bottom) {
      this.sprite.velocity.y += this.gravity;
    } else if (this.sprite.velocity.y > 0) {
      this.sprite.velocity.y = 0;
    }
  }
  checkRespawn() {
    // if(this.willRespawn){
    //   this.respawn();
    // }
    if (this.willRespawn && !this.timingRespawn) {
      this.timingRespawn = true;
      sfx.fall.play();
      window.setTimeout(k => {
        this.sprite.position.x = this.respawnPoint.x;
        this.sprite.position.y = this.respawnPoint.y;
        this.sprite.velocity.y = 0;
        this.deaths++;
        this.timingRespawn = false;
        this.willRespawn = false;
      }, 1500);
    }
  }
  respawn() {
    this.sprite.position.x = this.respawnPoint.x;
    this.sprite.position.y = this.respawnPoint.y;
    this.sprite.velocity.y = 0;
    this.deaths++;
    this.timingRespawn = false;
    this.willRespawn = false;
  }
  setRespawnPoint(x, y) {
    this.respawnPoint = createVector(x, y);
  }
  checkEnemyCollision() {
    if (this.sprite.collide(eManager.enemySprites)) {
      this.respawn();
    }
  }

  // function to track score
  displayScore() {
    //console.log(`Score: ${eManager.score}`);
    textSize(200);
    //give it a full and stroke
    //increase score of player
    //     // Display Lives
    
    //text(`Score: ${this.sprite.score}`, 10, 30);
    camera.off();
    text(`Score: ${eManager.score}`, 10, 30);
    camera.on();
  }

 /* displayLives() {
    textSize(200);
    
    //   // Display Lives

    //     // lwc
    //text(`Deaths: ${this.sprite.deaths}`, 600, 30);
    camera.off();
    fill(255, 255, 255);
    stroke(0)
    strokeWeight(5)
    text(`Deaths: ${this.deaths}`, 570, 30);
    camera.on();
  }*/
}

class Enemy {
  constructor(baseX, baseY) {
    this.baseX = baseX;
    this.baseY = baseY; //adding variables
    this.sprite = createSprite(baseX, baseY, 20, 20); //base x and base y are the "center" position the enemy moves around
    this.sprite.addImage(pImages.enemy);

    //sets circular collider
    this.sprite.setCollider("circle", 0, 0, pImages.enemy.width / 2 - 5);
    eManager.enemySprites.add(this.sprite);
    //this.sprite.setVelocity(2, 0);
    //this.sprite.life = 5000;
    //this.speed = 1.5;

    //this.sprite.debug = true;
  }

  update() {
    //called every frame
    //this.sprite.position.y = this.baseY;

    if (this.sprite.position.x < this.baseX - 20) {
      this.sprite.setVelocity(this.speed, 0);
    } else if (this.sprite.position.x > this.baseX + 20) {
      this.sprite.setVelocity(-this.speed, 0);
    }
    //  else if (this.sprite.velocity.x === 0) {
    //   this.sprite.setVelocity(this.speed, 0);
    //   console.log("stop move");
    // }
  }
}
