#!/bin/bash

# Build minified version of Brevis.js on the dist directory

echo "Joining source files..."
#get all classes
cat ../src/sound.js <(echo) \
	../src/image.js <(echo) \
	../src/sprite.js <(echo) \
	../src/button.js <(echo) \
	../src/text.js <(echo) \
	../src/tween.js <(echo) \
	../src/brevis.js <(echo) \
	> ../src/brevis.full.js

echo "Compressing JS..."
###sudo npm install uglify-js -g
#uglifyjs --compress --mangle --output ../dist/brevis.min.js ../src/brevis.full.js
#uglifyjs --compress --output ../dist/brevis.min.js ../src/brevis.full.js
uglifyjs ../src/brevis.full.js --compress toplevel,sequences,dead_code,drop_debugger,conditionals,booleans,loops,unused,if_return,inline,join_vars,cascade,reduce_vars,drop_console \
	-o ../dist/brevis.min.js
rm ../src/brevis.full.js

echo "Done!"
#eof
