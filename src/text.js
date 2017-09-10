/**
 * BrevisJS
 * @id text.js
 *     pixel font class
 *     based upon: https://github.com/PaulBGD/PixelFont
 * @author Zendrael
 * @date 19/07/2017
 */

/**
 * Text object
 *
 * @class Image
 * @param {Object} args - Object properties
 * @return {null}
 */
Text = function(args) {
  args = args || {};

  //properties
  this.text = args.text || '';
  this.x = args.x || 0;
  this.y = args.y || 0;
  this.size = args.size || 1;
  //prepare size
  //this.size = 100 / (this.text.length * 4.8);
  //this.size -= this.size % 4;
  //draw(input.value, Math.min(24, size));
  //end prepare size
  this.color = args.color || '#000000';

  this.letters = {
    'A': [
      [, 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1]
    ],
    'B': [
      [1, 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1],
      [1, 1]
    ],
    'C': [
      [1, 1, 1],
      [1],
      [1],
      [1],
      [1, 1, 1]
    ],
    'D': [
      [1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1]
    ],
    'E': [
      [1, 1, 1],
      [1],
      [1, 1, 1],
      [1],
      [1, 1, 1]
    ],
    'F': [
      [1, 1, 1],
      [1],
      [1, 1],
      [1],
      [1]
    ],
    'G': [
      [, 1, 1],
      [1],
      [1, , 1, 1],
      [1, , , 1],
      [, 1, 1]
    ],
    'H': [
      [1, , 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1],
      [1, , 1]
    ],
    'I': [
      [1, 1, 1],
      [, 1],
      [, 1],
      [, 1],
      [1, 1, 1]
    ],
    'J': [
      [1, 1, 1],
      [, , 1],
      [, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    'K': [
      [1, , , 1],
      [1, , 1],
      [1, 1],
      [1, , 1],
      [1, , , 1]
    ],
    'L': [
      [1],
      [1],
      [1],
      [1],
      [1, 1, 1]
    ],
    'M': [
      [1, 1, 1, 1, 1],
      [1, , 1, , 1],
      [1, , 1, , 1],
      [1, , , , 1],
      [1, , , , 1]
    ],
    'N': [
      [1, , , 1],
      [1, 1, , 1],
      [1, , 1, 1],
      [1, , , 1],
      [1, , , 1]
    ],
    'O': [
      [1, 1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    'P': [
      [1, 1, 1],
      [1, , 1],
      [1, 1, 1],
      [1],
      [1]
    ],
    'Q': [
      [0, 1, 1],
      [1, , , 1],
      [1, , , 1],
      [1, , 1, 1],
      [1, 1, 1, 1]
    ],
    'R': [
      [1, 1],
      [1, , 1],
      [1, , 1],
      [1, 1],
      [1, , 1]
    ],
    'S': [
      [1, 1, 1],
      [1],
      [1, 1, 1],
      [, , 1],
      [1, 1, 1]
    ],
    'T': [
      [1, 1, 1],
      [, 1],
      [, 1],
      [, 1],
      [, 1]
    ],
    'U': [
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    'V': [
      [1, , , , 1],
      [1, , , , 1],
      [, 1, , 1],
      [, 1, , 1],
      [, , 1]
    ],
    'W': [
      [1, , , , 1],
      [1, , , , 1],
      [1, , , , 1],
      [1, , 1, , 1],
      [1, 1, 1, 1, 1]
    ],
    'X': [
      [1, , , , 1],
      [, 1, , 1],
      [, , 1],
      [, 1, , 1],
      [1, , , , 1]
    ],
    'Y': [
      [1, , 1],
      [1, , 1],
      [, 1],
      [, 1],
      [, 1]
    ],
    'Z': [
      [1, 1, 1, 1, 1],
      [, , , 1],
      [, , 1],
      [, 1],
      [1, 1, 1, 1, 1]
    ],
    '0': [
      [1, 1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    '1': [
      [, 1],
      [, 1],
      [, 1],
      [, 1],
      [, 1]
    ],
    '2': [
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1]
    ],
    '3': [
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1]
    ],
    '4': [
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1]
    ],
    '5': [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1]
    ],
    '6': [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ],
    '7': [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1]
    ],
    '8': [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ],
    '9': [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1]
    ],
    ' ': [
      [, , ],
      [, , ],
      [, , ],
      [, , ],
      [, , ]
    ],
    '?': [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 0],
      [0, 0, 0],
      [0, 1, 0]
    ]
  };

  /*this.anchor = {
    x: $.anchor.LEFT,
    y: $.anchor.TOP
  };*/

  this.draw = function() {
    var needed = [];
    string = this.text.toUpperCase(); // because I only did uppercase letters
    for (var i = 0; i < string.length; i++) {
      var letter = this.letters[string.charAt(i)];
      if (letter) { // because there's letters I didn't do
        needed.push(letter);
      }
    }

    $.offContext.fillStyle = this.color;
    var currX = this.x;
    for (i = 0; i < needed.length; i++) {
      letter = needed[i];
      var currY = this.y;
      var addX = 0;
      for (var y = 0; y < letter.length; y++) {
        var row = letter[y];
        for (var x = 0; x < row.length; x++) {
          if (row[x]) {
            $.offContext.fillRect(currX + x * this.size, currY, this.size, this.size);
          }
        }
        addX = Math.max(addX, row.length * this.size);
        currY += this.size;
      }
      currX += this.size + addX;
    }
  };

  this.update = function() {
    //...
  };

};
//eof
