#BREVIS.js

##What is it?

Brevis.js is a small, almost micro, JavaScript / HTML5 game framework for mobile devices. The main focus is to write less code as possible to create mobile games with already pre-made objects and behaviors.

Current version is **1.0** from **2017-07-19**.

##Why another JS game framework?

It started as an experience to build my own games and to make it faster on mobile platforms, in a way that I could write short codes and get full games as fast as possible.

##How to get started?

First create a simple HTML file as follows:
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<script src="brevis.min.js"></script>
		<script src="mygame.js"></script>
	</head>
	<body>
		<!-- nothing here - API will do the magic! -->
	</body>
</html>
```

Then download __brevis.min.js__ from the __dist__ direcory and put it in the same directory that you created the HTML file above.

Now create in the same directory the __mygame.js__ file with the content:
```
//Main
$.onReady(function() {

  //configure environment
  $.setup({
    title: "Game Title",
    author: "BrevisJS",
    description: "Description of your game",
    width: 160,
    height: 240,
    orientation: 'portrait',
    fps: 60,
    pixelart: true, //default false
    bgColor: '#000000' //default transparent
    /*assets: {
      sounds: ['snd/kill', 'snd/hit', 'snd/room'], //sounds without extension
      images: ['img/b.png', 'img/e.png', 'img/p.png', 'img/t.png']
    }*/
  });

  //first scene to start
  $.goTo(load);
});
```

Test in your server and see if it outputs a message and shows Brevis version on console.

You can also check out the examples directory for more ways on how to use Brevis. 

Happy coding!


##Games built with Brevis.js:

Made a game using Brevis? Send a link to show up here!



