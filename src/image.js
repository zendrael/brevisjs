/**
 * BrevisJS
 * @id image.js
 *     Simple image class
 * @author Zendrael
 * @date 19/07/2017
 */

/**
 * common Image object
 *
 * @class Image
 * @param {Object} args - Object properties
 * @return {null}
 */
SimpleImage = function(args) {
  args = args || {};

  //properties
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.image = $.imageAssets[args.image] || new Image();

  this.width = this.image.width;
  this.height = this.image.height;

  //this.behaviors = [];

  this.anchor = {
    x: $.anchor.LEFT,
    y: $.anchor.TOP
  };

  this.draw = function() {
    $.offContext.drawImage(this.image, this.x - (this.image.width * this.anchor.x), this.y - (this.image.height * this.anchor.y));
  };

  this.update = function() {
    // if (this.behaviors.length == 0) return;
    //
    // for (var i = 0; i < this.behaviors.length; i++) {
    //   this.behaviors[i].update(this);
    // }
  };

};
//eof
