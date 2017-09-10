/**
 * BrevisJS
 * @id brevis.js
 *     Small game framework for simple games
 * @author Zendrael
 * @date 19/07/2017
 */

function Brevis() {
  //API details
  this.version = '0.1b';

  /**
   * title of application
   *
   * @property title
   * @type {String}
   * @default ''
   */
  this.title = '';

  /**
   * canvas of application
   *
   * @property area
   * @type {Object}
   * @default 'canvas'
   */
  this.canvas = document.createElement('canvas');

  /**
   * context of application canvas
   *
   * @property context
   * @type {Object}
   * @default 'context'
   */
  this.context = this.canvas.getContext('2d');

  /**
   * off canvas of application
   *
   * @property area
   * @type {Object}
   * @default 'canvas'
   */
  this.offCanvas = document.createElement('canvas');

  /**
   * off context of application off canvas
   *
   * @property context
   * @type {Object}
   * @default 'context'
   */
  this.offContext = this.offCanvas.getContext('2d');

  /**
   * defaultHeight
   * used to calc resizeScreen
   *
   * @property defaultHeight
   * @type {Int}
   * @default '600'
   */
  this.defaultHeight = 0;

  /**
   * defaultWidth
   * used to calc resizeScreen
   *
   * @property defaultWidth
   * @type {Int}
   * @default '600'
   */
  this.defaultWidth = 0;

  /**
   * centerX
   * used to calc screen Width center point
   *
   * @property defaultHeight
   * @type {Int}
   * @default '0'
   */
  this.centerX = 0;

  /**
   * centerY
   * used to calc screen Height center point
   *
   * @property defaultWidth
   * @type {Int}
   * @default '0'
   */
  this.centerY = 0;

  /**
   * background color of application
   *
   * @property bgColor
   * @type {String}
   * @default 'null'
   */
  this.bgColor = null;

  /**
   * orientation
   * used to check desired orientation for resize
   *
   * @property orientation
   * @type {String}
   * @default 'portrait'
   */
  this.orientation = 'portrait';

  /**
   * time object of application
   *
   * @property time
   * @type {Object}
   * @default '{now,delta,then,interval,fps}'
   */
  this.time = {
    now: Date.now(),
    delta: Date.now(),
    then: Date.now(),
    interval: 1000 / 60,
    fps: 60
  };

  /**
   * store assets names to load
   *
   * @property assets
   * @type {Object}
   * @default "0"
   */
  this.assets = {
    files: [],
    sounds: [],
    images: []
  };

  /**
   * has the number of assets to load
   *
   * @property assetsToLoad
   * @type {Int}
   * @default "0"
   */
  this.assetsToLoad = 0;

  /**
   * has the number of assets already loaded
   *
   * @property assetsLoaded
   * @type {Int}
   * @default "0"
   */
  this.assetsLoaded = 0;

  /**
   * check if loading assets is complete
   *
   * @property loadComplete
   * @type {Boolean}
   * @default false
   */
  this.loadComplete = false;

  /**
   * file assets of application
   *
   * @property fileAssets
   * @type {Array}
   * @default "[]"
   */
  this.fileAssets = [];

  /**
   * image assets of application
   *
   * @property imageAssets
   * @type {Array}
   * @default "[]"
   */
  this.imageAssets = [];

  /**
   * sound assets of application
   *
   * @property soundAssets
   * @type {Array}
   * @default "[]"
   */
  this.soundAssets = [];

  /**
   * control current $ scene
   *
   * @property currentScene
   * @type {Object}
   * @default null
   */
  this.currentScene = null;

  /**
   * control current $ scene objects
   *
   * @property currentSceneObjects
   * @type {Array}
   * @default []
   */
  this.currentSceneObjects = [];

  /**
   * control current $ scene animations
   *
   * @property currentSceneAnimations
   * @type {Array}
   * @default []
   */
  this.currentSceneAnimations = [];

  /**
   * control current $ scene events
   *
   * @property currentSceneEvents
   * @type {Array}
   * @default []
   */
  this.currentSceneEvents = [];

  /**
   * control current $ scene objects
   *
   * @property currentSceneObjects
   * @type {Array}
   * @default []
   */
  /*this.behavior = {
    PLATFORM: 0,
    SOLID: 1,
    CAR: 2
  };*/

  /**
   * control object anchors
   *
   * @property currentSceneObjects
   * @type {Array}
   * @default []
   */
  this.anchor = {
    LEFT: 0.0,
    TOP: 0.0,
    CENTER: 0.5,
    RIGHT: 1.0,
    BOTTOM: 1.0
  };

  /**
   * do something when DOM is ready
   *
   * @method onReady
   * @param {Function} value - function to be executed
   * @return {Null}
   */
  this.onReady = function(args) {
    console.log('Brevis.js version ' + this.version);
    //prepare cross browser requestAnimationFrame
    window.requestAnimationFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
          window.setTimeout(callback, 1000 / 10);
        };
    })();

    //prepare for user code
    if (this.isFunction(args)) {
      window.onload = args;
    } else {
      console.log('API ERROR: onReady must receive a function as argument.');
    }

  }; //end onReady

  /**
   * set the environment
   *
   * @method setup
   * @param {JSON} args - JSON to setup application
   * @return {Null}
   */
  this.setup = function(args) {

    //console = console || {};

    //load language
    //this.loadLanguage( navigator.language );

    //setup styles
    var appStyles = document.createElement('style');
    appStyles.innerHTML = '*{margin:0px; padding:0px; border:0px; overflow: hidden;} canvas{padding:0px; margin:0px; border: 0px;}';

    this.title = args.title || 'API';
    this.author = args.author || 'API_NAME';
    this.description = args.description || 'API DESCRIPTION';
    this.canvas.width = args.width || 320;
    this.canvas.height = args.height || 480;
    this.offCanvas.width = this.canvas.width;
    this.offCanvas.height = this.canvas.height;
    this.defaultWidth = this.canvas.width;
    this.defaultHeight = this.canvas.height;
    this.centerX = Math.round(this.canvas.width / 2);
    this.centerY = Math.round(this.canvas.height / 2);
    this.orientation = args.orientation || 'portrait';
    this.time.fps = args.fps || 60;

    if (args.pixelart) {
      //set css for the canvas to render pixelart
      appStyles.innerHTML += ' canvas { image-rendering: optimizeSpeed; image-rendering: -moz-crisp-edges; image-rendering: -o-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: optimize-contrast; image-rendering: crisp-edges; image-rendering: pixelated; -ms-interpolation-mode: nearest-neighbor;}';
    }

    this.bgColor = args.bgColor || null;

    //splash
    //this.splashImage = args.splash || '_api/img/splash.png';
    //this.splashTime = args.splashTime || 3000;

    this.assets.files = args.assets.files || [];
    this.assets.sounds = args.assets.sounds || [];
    this.assets.images = args.assets.images || [];

    if (this.assets.sounds == undefined && this.assets.images == undefined) {
      console.log('API ERROR: you must provide images or sounds to be loaded as assets.');
      //return;
    }

    //set app title
    var appTitle = document.createElement('title');
    appTitle.innerHTML = this.title;

    var metaAuthor = document.createElement('meta');
    metaAuthor.setAttribute('author', this.author);

    var metaDescription = document.createElement('meta');
    metaDescription.setAttribute('description', this.description);

    //set default meta tags
    var metaCache = document.createElement('meta');
    metaCache.setAttribute('http-equiv', 'Cache-Control');
    metaCache.setAttribute('content', 'no-cache, no-store, must-revalidate');

    var metaPragma = document.createElement('meta');
    metaPragma.setAttribute('http-equiv', 'Pragma');
    metaPragma.setAttribute('content', 'no-cache');

    var metaExpires = document.createElement('meta');
    metaExpires.setAttribute('http-equiv', 'Expires');
    metaExpires.setAttribute('content', '0');

    var metaView = document.createElement('meta');
    metaView.setAttribute('name', 'viewport');
    metaView.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');

    //add elements to the DOM
    document.head.appendChild(appStyles);
    document.head.appendChild(appTitle);
    document.head.appendChild(metaAuthor);
    document.head.appendChild(metaDescription);
    document.head.appendChild(metaCache);
    document.head.appendChild(metaPragma);
    document.head.appendChild(metaExpires);
    document.head.appendChild(metaView);

    //add screen to the body
    document.body.appendChild(this.canvas);

    //add default events
    //resize event
    window.addEventListener('resize', this.resizeScreen.bind(this), false);

    //touch events
    this.canvas.addEventListener('touchstart', function(event) {
      //event.preventDefault();
      for (var i = 0; i < $.currentSceneEvents.length; i++) {
        if ($.currentSceneEvents[i][1] == 'touchstart' && $.currentSceneEvents[i][0].isInside(event)) {
          //console.log('TOUCHSTART');
          $.currentSceneEvents[i][2].call($.currentSceneEvents[i][3], $.currentSceneEvents[i][0]);
        }
      }
    }, false);

    this.canvas.addEventListener('touchend', function(event) {
      //event.preventDefault();
      for (var i = 0; i < $.currentSceneEvents.length; i++) {
        if ($.currentSceneEvents[i][1] == 'touchend' && $.currentSceneEvents[i][0].isInside(event)) {
          //console.log('TOUCHEND');
          $.currentSceneEvents[i][2].call($.currentSceneEvents[i][3], $.currentSceneEvents[i][0]);
        }
      }
    }, false);

    //click events
    this.canvas.addEventListener('mousedown', function(event) {
      //event.preventDefault();
      for (var i = 0; i < $.currentSceneEvents.length; i++) {
        if ($.currentSceneEvents[i][1] == 'mousedown' && $.currentSceneEvents[i][0].isInside(event)) {
          //console.log('MOUSEDOWN');
          $.currentSceneEvents[i][2].call($.currentSceneEvents[i][3], $.currentSceneEvents[i][0]);
        }
      }
    }, false); //this.defaultClickEvent.bind(this), false);

    this.canvas.addEventListener('mouseup', function(event) {
      //event.preventDefault();
      for (var i = 0; i < $.currentSceneEvents.length; i++) {
        if ($.currentSceneEvents[i][1] == 'mouseup' && $.currentSceneEvents[i][0].isInside(event)) {
          //console.log('MOUSEUP');
          $.currentSceneEvents[i][2].call($.currentSceneEvents[i][3], $.currentSceneEvents[i][0]);
        }
      }
    }, false);

    this.canvas.addEventListener('click', function(event) {
      //event.preventDefault();
      for (var i = 0; i < $.currentSceneEvents.length; i++) {
        if ($.currentSceneEvents[i][1] == 'click' && $.currentSceneEvents[i][0].isInside(event)) {
          //console.log('CLICK'+$.currentSceneEvents[i][3]);
          $.currentSceneEvents[i][2].call($.currentSceneEvents[i][3], $.currentSceneEvents[i][0]);
        }
      }
    }, false);

    //keyboard events
    /*window.addEventListener('keydown', function(e) {

    	KEYSDOWN[e.keyCode] = true;

    }, false);

    window.addEventListener('keyup', function(e) {
    	delete KEYSDOWN[e.keyCode];

    }, false);*/

    //call default events
    this.resizeScreen();

    this.loadAssets();

    this.main();
  }; //end setup

  /**
   * application main loop
   *
   * @method main
   * @param {Null}
   * @return {Null}
   */
  this.main = function() {

    this.time.now = Date.now();
    this.time.delta = this.time.now - this.time.then;

    if (this.time.delta > this.time.interval) {

      this.time.then = this.time.now - (this.time.delta % this.time.interval);

      this.update();
      this.draw();
    }

    //requestAnimationFrame
    requestAnimationFrame(this.main.bind(this));
  }; //end main

  /**
   * update data while application is running
   *
   * @method update
   * @param {Function} fncName - function to be executed
   * @return {Null}
   */
  this.update = function() {
    //console.log('update');
    if (this.currentScene) {
      //update objects and behaviors
      for (var i = 0; i < this.currentSceneObjects.length; i++) {
        //this.currentSceneObjects[i].update();
      }

      //update animations like tweens
      for (var i = 0; i < this.currentSceneAnimations.length; i++) {
        if (!this.currentSceneAnimations[i].finished) {
          this.currentSceneAnimations[i].update();
        } else {
          this.currentSceneAnimations.splice(i, 1);
        }
      }
      //remove animations (tweens) if they are finished
      for (var i = 0; i < this.currentSceneAnimations.length; i++) {
        if (this.currentSceneAnimations[i].finished) {
          this.currentSceneAnimations.splice(i, 1);
        }
      }

      //update scene logic
      this.currentScene.update();
    }
  }; //end update

  /**
   * draw graphics for application
   *
   * @method draw
   * @param {Function} fncName - function to be executed
   * @return {Null}
   */
  this.draw = function() {
    //console.log('draw');
    if (this.bgColor) {
      this.offContext.fillStyle = this.bgColor;
      this.offContext.fillRect(0, 0, this.offCanvas.width, this.offCanvas.height);
    } else {
      this.offContext.clearRect(0, 0, this.offCanvas.width, this.offCanvas.height);
    }

    //draw all on offCanvas
    for (var i = 0; i < this.currentSceneObjects.length; i++) {
      this.currentSceneObjects[i].draw();
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //draw offCanvas on real canvas
    this.context.drawImage(this.offCanvas, 0, 0);
  }; //end render


  /**
   * load sound and image assets
   *
   * @method loadAssets
   * @param {Function} callback - callback function on complete
   * @return {Null}
   */
  this.loadAssets = function(callback) {
    //calc total assets to load
    this.assetsToLoad = (this.assets.files.length || 0) + (this.assets.sounds.length || 0) + (this.assets.images.length || 0);

    //files
    for (var i = 0; i < this.assets.files.length; i++) {
      //all loaded with AJAX
    }

    //sounds
    for (var i = 0; i < this.assets.sounds.length; i++) {
      /*audio = new Audio();

      //check which type is supported
      //For firefox and others who do not support .mp3
      if ( audio.canPlayType('audio/ogg') === true) {
      	audioType = 'ogg';
      } else {
      	audioType = 'mp3';
      }

      audio.setAttribute("type", "audio/" + audioType);
      audio.setAttribute("src", this.assets.sounds[i] + "." + audioType);

      audio.addEventListener('canplaythrough', this.assetLoaded.bind(this), false);

      console.log(this.assets.sounds[i] + "." + audioType);
      //this.soundAssets.push(audio);
      */
      //index by sound name WITHOUT extension
      this.soundAssets[this.assets.sounds[i].split('/').pop().replace(/\.[^/.]+$/, "")] = new Sound(this.assets.sounds[i]);
      //console.log('Loading sound: '+this.assets.sounds[i].split('/').pop().replace(/\.[^/.]+$/, ""));
    }

    //images
    for (var i = 0; i < this.assets.images.length; i++) {
      /*is it base64 string?
      try {
      	window.atob(this.assets.images[i]);

      } catch(e) {
      	// something failed

      	// if you want to be specific and only catch the error which means
      	// the base 64 was invalid, then check for 'e.code === 5'.
      	// (because 'DOMException.INVALID_CHARACTER_ERR === 5')
      }*/

      var img = new Image();
      img.addEventListener("load", this.assetLoaded.bind(this));
      img.src = this.assets.images[i];
      //index by image name WITHOUT extension
      var key = this.assets.images[i].split('/').pop();
      this.imageAssets[key.replace(/\.[^/.]+$/, "")] = img;
      //console.log(key.replace(/\.[^/.]+$/, ""));
    }

  }; //end loadAssets

  /**
   * called after asset loaded
   *
   * @method assetLoaded
   * @param {Null}
   * @return {Null}
   */
  this.assetLoaded = function() {
    //console.log(this.assetsLoaded + ' of ' + this.assetsToLoad);
    this.assetsLoaded++;
    if (this.assetsLoaded >= this.assetsToLoad) {
      this.loadComplete = true;
      //start the app...
      //this.main();
    }
  };

  /**
   * change game scene
   *
   * @method goTo
   * @param {Object} value function to be given
   * @param {JSON} args arguments to be passed to the next scene
   * @return {Null}
   */
  this.goTo = function(value, args) {
    this.currentSceneObjects = [];
    this.currentSceneEvents = [];

    this.currentScene = null;
    this.currentScene = value;
    this.currentScene.init(args);
  };

  /**
   * resize the screen to fit contents
   *
   * @method resizeScreen
   * @param {Null}
   * @return {Null}
   */
  this.resizeScreen = function() {
    var actualWidth = window.innerWidth;
    var actualHeight = window.innerHeight;

    if (this.orientation == 'portrait') {
      //portrait always expands height
      this.canvas.height = Math.ceil((actualHeight * this.defaultWidth) / actualWidth);

      var heightToWidth = this.canvas.height / this.canvas.width;
      var newWidth = window.innerWidth;
      var newHeight = window.innerHeight;
      var newHeightToWidth = newHeight / newWidth;

      if (newHeightToWidth > heightToWidth) {
        newheight = newWidth * heightToWidth;
        this.canvas.style.height = newHeight + 'px';
        this.canvas.style.width = newWidth + 'px';
      } else {
        newWidth = newHeight / heightToWidth;
        this.canvas.style.width = newWidth + 'px';
        this.canvas.style.height = newHeight + 'px';
      }

      //atribui o tamanho final
      this.canvas.style.height = newHeight;
    } else {
      //landscape always expands width
      this.canvas.width = Math.ceil((actualWidth * this.defaultHeight) / actualHeight);

      var widthToHeight = this.canvas.width / this.canvas.height;
      var newWidth = window.innerWidth;
      var newHeight = window.innerHeight;
      var newWidthToHeight = newWidth / newHeight;

      if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        this.canvas.style.height = newHeight + 'px';
        this.canvas.style.width = newWidth + 'px';
      } else {
        newHeight = newWidth / widthToHeight;
        this.canvas.style.width = newWidth + 'px';
        this.canvas.style.height = newHeight + 'px';
      }

      //atribui o tamanho final
      this.canvas.style.width = newWidth;
    }

    //prepare the rest
    this.offCanvas.width = this.canvas.width;
    this.offCanvas.height = this.canvas.height;
    this.canvas.width = this.canvas.width;
    this.canvas.height = this.canvas.height;
    this.canvas.style.width = this.canvas.style.width;
    this.canvas.style.height = this.canvas.style.height;

    this.canvasRatio = parseInt(this.canvas.style.width) / this.defaultWidth;
    //configura a câmera
    /*
     CAMERA.height = CANVAS.height;
     CAMERA.width = CANVAS.width;
     ratio = parseInt( CANVAS.style.width ) / CANVAS.width;
     dif =  CANVAS.width / 16 ; //numero de tiles que cabem na tela
     dif = dif - 15; //subtrai a quantidade maxima para centralizar
     CAMERA.offsetX = Math.floor( (dif*16)/2 );
     */

    //recalc $ center points
    this.centerX = Math.round(this.canvas.width / 2);
    this.centerY = Math.round(this.canvas.height / 2);
  }; //end resizeGame

  /**
   * verify if two shapes are colliding
   *
   * @method isColliding
   * @param {Object} shapeA - moving object with position and dimension
   * @param {Object} shapeB - static object with position and dimension
   * @param {String} returnType - 'side' or 'value'
   * @return {Mixed} a side top, left, bottom, right OR true or false
   */
  this.isColliding = function(shapeA, shapeB, callback) {
    /*if (returnType == null) {
      console.log('API ERROR: you must tell isColliding if the return type is \'side\' or \'value\'.');
      return;
    }*/

    if (shapeA.x < shapeB.x + shapeB.width && shapeA.x + shapeA.width > shapeB.x &&
      shapeA.y < shapeB.y + shapeB.height && shapeA.y + shapeA.height > shapeB.y) {
      // The objects are touching
      callback(shapeA, shapeB);
    }

    /*
        // get the vectors to check against
        // var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        //   vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        //   // add the half widths and half heights of the objects
        //   hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        //   hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
          vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
          // add the half widths and half heights of the objects
          hWidths = (shapeA.width / 2) + (shapeB.width / 2),
          hHeights = (shapeA.height / 2) + (shapeB.height / 2),
          colDir = null;

        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
          // figures out on which side we are colliding (top, bottom, left, or right)
          var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);

          if (oX >= oY) {
            if (vY > 0) {
              colDir = 'top';
              //shapeA.y -= oY;
            } else {
              colDir = 'bottom';
              //shapeA.y += oY;
            }
          } else {
            if (vX > 0) {
              colDir = 'left';
              //shapeA.x -= oX;
            } else {
              colDir = 'right';
              //shapeA.x += oX;
            }
          }
        } //end if

        /*if (returnType == 'side') {
          return colDir;
        } else {
          return ((colDir != null) ? true : false);
        }* /
        if(colDir != null) callback(shapeA, shapeB);
        */
  }; //end isColliding

  /**
   * attach a function to an event
   *
   * @method on
   * @param {String} strEvent - event name
   * @param {Object} obj - Object do add the event listener
   * @param {Function} fncName - function to be called
   * @return {null}
   */
  this.on = function(strEvent, obj, fncName) {
    if (typeof(strEvent) == 'string' && this.isFunction(fncName)) {
      obj.addEventListener(strEvent, fncName);
    } else {
      console.log('API ERROR: on() must receive a string, an object and a function as argument.');
    }
  }; //end on

  /**
   * the default click event
   *
   * @method defaultClickEvent
   * @param {String} event - event handled
   * @return {null}
   */
  this.defaultClickEvent = function(event) {
    //avoid problems
    event.preventDefault();

    //set size ratio to adjust position
    this.screenRatio = parseInt(this.canvas.style.width) / this.canvas.width;

    if (event.type == 'touchstart') { //touchstart or click/mousedown
      //get X and Y from ONE targetTouches
      this.input.x = event.targetTouches[0].pageX - parseInt(this.canvas.offsetLeft);
      this.input.y = event.targetTouches[0].pageY - parseInt(this.canvas.offsetTop);
    } else {
      //get X and Y from Mouse pointer
      this.input.x = event.pageX - parseInt(this.canvas.offsetLeft);
      this.input.y = event.pageY - parseInt(this.canvas.offsetTop);
    }

  }; //end defaultClickEvent

  //#############################################################################
  // utils
  //#############################################################################

  /**
   * verify if $ is been loaded on mobile platform
   *
   * @method isMobile
   * @param {Null}
   * @return {Boolean}
   */
  /*
  this.isMobile = function() {
    //
  }; //end isMobile
  */
  /**
   * verify if $ is been loaded on desktop platform
   *
   * @method isDesktop
   * @param {Null}
   * @return {Boolean}
   */
  /*
  this.isDesktop = function() {
    return !this.isMobile();
  }; //end isDesktop
  */

  /**
   * get a random number in a range
   *
   * @method rand
   * @param {Int} min - minimum number
   * @param {Int} max - maximum number
   * @return {Int}
   */
  this.rand = function(min, max) {
    var val = Math.floor(Math.random() * (max - min + 1)) + min;
    val = Math.floor(Math.random() * (max - min + 1)) + min;
    val = Math.floor(Math.random() * (max - min + 1)) + min;
    return val;
  }; //end rand

  /**
   * verify if a given variable is a function
   *
   * @method isFunction
   * @param {Function} value - function to be given
   * @return {Boolean} returns true or false
   */
  this.isFunction = function(value) {
    if (typeof(value) == 'function') {
      return (true);
    } else {
      return (false);
    }
  }; //end isFunction

  /**
   * put application in fullScreen mode
   *
   * @method fullScreen
   * @param {Null}
   * @return {Null}
   */
  /*
  this.fullScreen = function() {
    var pfx = ['webkit', 'moz', 'ms', 'o', ''];
    //verifica se o navegador permite fullscreen
    this.RunPrefixMethod = function(obj, method) {
      //verifica se o objeto responde a algum dos métodos de acordo com o navegador
      var p = 0,
        m, t;
      while (p < pfx.length && !obj[m]) {
        m = method;
        if (pfx[p] == '') {
          m = m.substr(0, 1).toLowerCase() + m.substr(1);
        }
        m = pfx[p] + m;
        t = typeof obj[m];
        if (t != 'undefined') {
          pfx = [pfx[p]];
          return (t == 'function' ? obj[m]() : obj[m]);
        }
        p++;
      }
    };
    //se já estiver em tela cheia, cancela
    if (this.RunPrefixMethod(document, 'FullScreen') || this.RunPrefixMethod(document, 'IsFullScreen')) {
      this.RunPrefixMethod(document, 'CancelFullScreen');
    } else {
      //vai para tela cheia
      this.RunPrefixMethod(document.body, 'RequestFullScreen');
    }
  }; //end fullScreen
  */
  /**
   * verify which browser is being used
   *
   * @method isBrowser
   * @param {String} strName - browser name to verify
   * @return {Boolean} True or False for the given name
   */
  /*
  this.isBrowser = function(strName) {
    val = false;
    switch (strName) {
      case 'firefox':
        val = (typeof InstallTrigger !== 'undefined');
        // Firefox 1.0+
        break;

      case 'chrome':
        // Chrome 1+
        val = (!!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0));
        break;

      case 'opera':
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        val = (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);
        break;

      case 'safari':
        // At least Safari 3+: '[object HTMLElementConstructor]'
        val = (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0);
        break;

      case 'ie':
        // At least IE6
        val = ( /-----*@cc_on!@*-------/ false || !!document.documentMode);
        break;
    } //end switch
    return val;
  }; //end isBrowser
  */
  /**
   * verify if app is online
   *
   * @method isOnline
   * @param {Null}
   * @return {Boolean} - is or isn't online
   */
  /*
  this.isOnline = function() {
    //if navigator supports onLine attribute
    if ('onLine' in navigator) {
      return (navigator.onLine);
    } else {
      //let's check with XHR
      var xhr = new XMLHttpRequest();
      var file = 'http://www.yoursite.com/somefile.png';
      var randomNum = Math.round(Math.random() * 10000);
      xhr.open('HEAD', file + '?rand=' + randomNum, false);
      try {
        xhr.send();
        if (xhr.status >= 200 && xhr.status < 304) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } //end else
  }; //end isOnline
  */
  //#############################################################################
  // objects creation
  //#############################################################################

  /**
   * add image to the scene
   *
   * @method image
   * @param {String} event - event handled
   * @return {null}
   */
  this.image = function(posX, posY, imgName) {
    var temp = this.currentSceneObjects.length;
    //console.log(temp);

    this.currentSceneObjects.push(new SimpleImage({
      x: posX,
      y: posY,
      image: imgName
    }, this));

    return this.currentSceneObjects[temp];
  };

  /**
   * add sprite to the scene
   *
   * @method sprite
   * @param {String} event - event handled
   * @return {null}
   */
  this.sprite = function(posX, posY, sprName, frameWidth, frameHeight) {
    var temp = this.currentSceneObjects.length;
    //console.log(temp);

    this.currentSceneObjects.push(new Sprite({
      x: posX,
      y: posY,
      spriteSheet: sprName,
      frameWidth: frameWidth,
      frameHeight: frameHeight
    }, this));

    return this.currentSceneObjects[temp];
  };

  /**
   * add button to the scene
   *
   * @method button
   * @param {String} event - event handled
   * @return {null}
   */
  this.button = function(posX, posY, imgName) {
    var temp = this.currentSceneObjects.length;
    //console.log(temp);

    this.currentSceneObjects.push(new Button({
      x: posX,
      y: posY,
      image: imgName
    }, this));

    return this.currentSceneObjects[temp];
  };

  /**
   * add text to the scene
   *
   * @method text
   * @param {String} ...
   * @return {null}
   */
  this.text = function(posX, posY, string, size, color) {
    var temp = this.currentSceneObjects.length;
    //console.log(temp);

    this.currentSceneObjects.push(new Text({
      x: posX,
      y: posY,
      text: string,
      size: size,
      color: color
    }, this));

    return this.currentSceneObjects[temp];
  };

  /**
   * add a tween animation to the scene
   *
   * @method tween
   * @param {String} event - event handled
   * @return {null}
   */
  this.tween = function(target, args) {
    var temp = this.currentSceneAnimations.length;
    //console.log(temp);

    this.currentSceneAnimations.push(new Tween(target, args, this));

    return this.currentSceneAnimations[temp];
  };
};

//start global $ object
$ = new Brevis();
//eof
