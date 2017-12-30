/**
 * BrevisJS
 * @id tween.js
 *     linear movent class
 * @author Zendrael
 * @date 25/08/2017
 */

/**
 * Tween for linear movement
 *
 * @class Tween
 * @param {Object} target
 * @param {JSON} args - Object properties
 * @param {Object} context
 * @return {null}
 */
Tween = function(target, args, context) {
  args = args || {};

  //properties
  this.target = target || null;
  this.newx = args.x || null;
  this.newy = args.y || null;
  this.context = context || null;

  this.startTime = (new Date()).getTime();
  this.started = false;
  this.finished = false;

  this.onDone = null;

  this.draw = function() {
    //$.offContext.drawImage(this.image, this.x - (this.image.width * this.anchor.x), this.y - (this.image.height * this.anchor.y));
  };

  this.update = function() {
    if (this.finished) return;

    var time = (new Date()).getTime() - this.startTime;

    if (this.newx != null) {
      var linearSpeed = this.newx / this.target.x; // pixels / second
      var newx = linearSpeed * time / 1000;

      if (this.newx > this.target.x) {
        this.target.x += Math.ceil(newx);
        //console.log(this.target.x +' : '+ newx);
      } else if (this.target.x == Math.ceil(this.newx)) {
        //this.target.x = this.newx;
        this.finished = true;
        this.newx = null;
      }

      if (this.newx < this.target.x) {
        this.target.x -= Math.ceil(newx);
        //console.log(this.target.x +' : '+ newx);
      } else if (this.target.x == Math.ceil(this.newx)) {
        //this.target.x = this.newx;
        this.finished = true;
        this.newx = null;
      }
    }

    if (this.newy != null) {
      var linearSpeed = this.newy / this.target.y; // pixels / second
      var newy = linearSpeed * time / 1000;

      if (this.newy > this.target.y) {
        this.target.y += Math.ceil(newy);
      } else if (this.target.y == Math.ceil(this.newy)) {
        this.finished = true;
        this.newy = null;
      }

      if (this.newy < this.target.y) {
        this.target.y -= Math.ceil(newy);
      } else if (this.target.y == Math.ceil(this.newy)) {
        this.finished = true;
        this.newy = null;
      }
    }

    if (this.finished && this.onDone != null) {
      //callback
      this.onDone.call($.currentScene);
    }

  };

};
//eof
