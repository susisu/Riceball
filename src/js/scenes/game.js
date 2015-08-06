/*
 * Riceball : scenes/game.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "GameScene": GameScene
    });
}

var pixi = require("pixi");

function GameScene() {
    pixi.Container.call(this);
}

GameScene.prototype = Object.create(pixi.Container.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": pixi.Container
    }
});

end_module();
