# Cocos2d-HTML5 2.2 Tiled Map & Armature Animation Sample

### Desclaimer
See [LICENSE.md]() for license terms and conditions.

This sample is used to show the usage of Tiled Map & Armature Animation in Cocos2d-HTML5 2.2 engine with 
Intel(R) XDK. The assets and code are created from [SeasonsRun](https://github.com/jucimarjr/html5games/tree/master/cocos2d/SeasonsRun) by Jucimar Junior.

### Application Files
* asset/
* lib/
* src/
  * auxFunctions.js
  * Credits.js
  * game.js
  * HighScores.js
  * Menu.js
  * player.js
  * resource.js
  * SplashGame.js
  * SplashLudus.js
* cocos2d.js
* index.html
* main.js

### Overview

`www/cocos2d.js` bootstraps the Cocos2d engine, and `www/main.js` is the entrance of the game which loads the resources and switch to the start scene.

### Game Asset Manager
Game Asset Manager (GAM) is a tool for previewing and creating code snippets for various assets commonly used in game projects. By creating or importing a game project in XDK, you will find GAM panel on the left side of "DEVELOP" tab.
With Game Asset Manager, you can generate code snippet to preload and use tiled map and armature animations in Cocos2d-HTML5.

### Preload Tiled Map and Armature Animation
In Cocos2d, all resources should be loaded by `cc.LoaderScene.preload(resources, callback)` or `cc.Loader.preload(resources, callback)` if you don't need to create a loader scene. Tiled Map file, Armature Animation file and corresponding spritesheets and images should be loaded before using them.

In this sample, all resources are listed in `src/resource.js` and loaded in `www/main.js`. See these files for detailed usage of resource loading.

### Usage of Tiled Map
The TMX (Tile Map XML) map format used by Tiled is a flexible way to describe a tile based map. It can describe maps with any tile size, any amount of layers, any number of tile sets and it allows custom properties to be set on most elements. Beside tile layers, it can also contain groups of objects that can be placed freely. For detailed format specification, please refer to [official documentation](https://github.com/bjorn/tiled/wiki/TMX-Map-Format). And [Tiled Map Editor](http://www.mapeditor.org/) is a common tool to generate TMX file.

To add tiled map in Cocos2d, you can use `cc.TMXTiledMap.create(tmxFile)` to create a [`cc.TMXTiledMap`](http://www.cocos2d-x.org/reference/html5-js/V2.2.3/symbols/cc.TMXTiledMap.html). And then add it to a layer. For example to add `www/asset/Maps/map0.tmx`, Game Asset Manager will generate following code:

```
//
// The Intel XDK generated this code snippet for you
//
// To use it in your project, follow the
//   instructions in comments below
//

// Make sure you had preloaded the assets
//   Call this preload function when loading the game
//   TODO: merge the preload array with your existing one
cc.LoaderScene.preload([
    'asset/Maps/map0.tmx',
    'asset/Maps/tilesSummer.png',
    ]);
// End of preloading assets

// This function demonstrates how to load tiled map
function demoTiledMapFontUsage (parentCocosLayer) {
    var tiledMap = cc.TMXTiledMap.create("asset/Maps/map0.tmx");
    var TAG_TILED_MAP = 1;
    parentCocosLayer.addChild(tiledMap, 0, TAG_TILED_MAP);

    // TODO: tiled map is loaded, write your own code below

}

```

Just paste them into your project and make changes according to your needs. See `www/src/game.js` for detailed usage of Tiled Map.

### Usage of Armature Animation
Armature Animation is created by [CocoStudio](http://www.cocos2d-x.org/products#cocos-studio) in JSON format. Armature animation is usually used for presenting moving objects, like a running person etc.

To enable CocoStudio Armature support, make sure to set "loadExtension" to true in the configuration, for example `www/cocos2d.js` in this sample.

Before rendering an armature animation, use `ccs.ArmatureDataManager.getInstance().addArmatureFileInfo(armature_json, spritesheet_plist, spritesheet_png)` to add the definition. And then use `ccs.Armature.create(armatureName)` to create an armature node. To render specific animation defined in the armature, use `armature.getAnimation().play(animationName)`.

For example, to render a running person defined in `asset/RunnerFinal.ExportJson` in this sample, Game Asset Manager will help to generate following code:

```
//
// The Intel XDK generated this code snippet for you
//
// To use it in your project, follow the
//   instructions in comments below
//

// Make sure you had preloaded the assets
//   Call this preload function when loading the game
//   TODO: merge the preload array with your existing one
cc.LoaderScene.preload([
    'asset/RunnerFinal/RunnerFinal.ExportJson',
    'asset/RunnerFinal/RunnerFinal0.plist',
    'asset/RunnerFinal/RunnerFinal0.png',
    ]);
// End of preloading assets

// This function demonstrates how to load an armature animation
function play_armature_movie_run (parentCocosLayer, offsetX, offsetY) {
    var armatureDataManager = ccs.ArmatureDataManager.getInstance();
    armatureDataManager.addArmatureFileInfo(
        'asset/RunnerFinal/RunnerFinal0.png',
        'asset/RunnerFinal/RunnerFinal0.plist',
        'asset/RunnerFinal/RunnerFinal.ExportJson');
    var armature = ccs.Armature.create('RunnerFinal');
    armature.getAnimation().play('run');

    // TODO: change speed of the animation
    armature.getAnimation().setSpeedScale(1);
    // TODO: change size of the animation
    armature.setScale(1);
    // TODO: change position of the animation
    armature.setPosition(cc.VisibleRect.center().x - offsetX,
        cc.VisibleRect.center().y - offsetY);

    // Add to parent layer to make visible
    parentCocosLayer.addChild(armature);
}

```

Just copy and paste the code snippet into your project and make changes according to your needs. See `www/src/game.js` and `www/src/player.js` for detailed usage.

# Intel(R) XDK
This sample is part of the Intel(R) XDK. 
Download the Intel XDK at http://software.intel.com/en-us/html5.
