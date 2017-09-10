/**
 * BrevisJS
 * @id sprite.js
 *     Minimal sprite class
 * @author Zendrael
 * @date 19/07/2017
 */

/**
 * common Sprite object
 *
 * @class Sprite
 * @param {Object} args - Object properties
 * @return {null}
 */
Sprite = function(args) {
  args = args || {};

  //properties
  this.x = args.x || 0;
  this.y = args.y || 0;
  //this.width = args.width || 0;
  //this.height = args.height || 0;
  this.spriteSheet = $.imageAssets[args.spriteSheet] || new Image();
  this.frameW = args.frameWidth;
  this.frameH = args.frameHeight;
  //this.width = this.frameW;
  //this.height = this.frameH;
  //this.framesTotal = (this.width/this.frameW) * (this.height/this.frameH);
  //this.frameSpeed = args.frameSpeed || 150; //more = slower
  this.frame = 0;

  this.moving = false;

  //this.behaviors = [];

  this.anchor = {
    x: $.anchor.LEFT,
    y: $.anchor.TOP
  };

  //this.offsetX = args.offsetX || 0;
  //this.offsetY = args.offsetY || 0;
  //timming
  //this.loop = true;

  //this.frameX = 0;
  //this.frameY = 0;
  //this.delta = null;
  //this.speed = 0; //movement speed

  this.frameQX = this.spriteSheet.width / this.frameW;
  this.frameQY = this.spriteSheet.height / this.frameH;

  //methods
  this.draw = function() {
    this.offsetX = Math.floor(this.frame % this.frameQX) * this.frameW; //(this.frame % this.frameQX)*this.frameW;
    this.offsetY = Math.floor(this.frame / this.frameQX) * this.frameH;


    //console.log('drawing sprite:'+this.spriteSheet.src);
    //if (this.moving === false) {
    $.offContext.drawImage(this.spriteSheet,
      this.offsetX, this.offsetY,
      this.frameW, this.frameH,
      this.x - (this.frameW * this.anchor.x), this.y - (this.frameH * this.anchor.y),
      this.frameW, this.frameH);
    /*} else {
      if (this.delta > this.frameSpeed) {
        //control frame change
        //if( this.moving == true ){
        this.delta = 0;
        this.frameX++;
        if (this.frameX >= this.frames)
          this.frameX = 0;
        //}
      } else {
        this.delta += $.time.delta;
      }
      $.offContext.drawImage(this.spriteSheet,
        this.offsetX, this.offsetY,
        this.spriteSheet.width, this.spriteSheet.height,
        this.x - (this.spriteSheet.width * this.anchor.x), this.y - (this.spriteSheet.height * this.anchor.y),
        this.spriteSheet.width, this.spriteSheet.height);
    }*/
  }; //draw

  this.update = function() {
    /*if (this.behaviors.length == 0) return;

    for (var i = 0; i < this.behaviors.length; i++) {
      this.behaviors[i].update(this);
    }*/
  };

  this.kill = function() {
    $.currentSceneObjects.splice($.currentSceneObjects.indexOf(this), 1);
  };

  /*this.addAnimation = function(strName, arrFrames, intVelocity) {
    //
  };*/

  /*this.play = function(strName) {
    //
  };*/

  /*this.addBehavior = function(behaviorType) {
    this.behaviors.push(new Behavior(behaviorType));
  };*/

}; //end Sprite
//eof
