/**
 * BrevisJS
 * @id behavior.js
 *     Common behaviors class
 * @author Zendrael
 * @date 19/07/2017
 */

/**
 * common Behavior object
 *
 * @class Behavior
 * @param {Object} args - Object properties
 * @return {null}
 */
Behavior = function(bhvType) {
  this.type = bhvType;

  this.update = function(targetObject) {
    switch (this.type) {
      case $.behavior.PLATFORM:
        this.bhvPlatform(targetObject);
        break;

      case $.behavior.SOLID:
        //
        break;

      case $.behavior.BUTTON:
        //
        break;

      case $.behavior.CAR:
        //
        break;
    }
  };

  //
  this.bhvPlatform = function(target) {
    //
  };
};
//eof
