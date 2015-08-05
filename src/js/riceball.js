/*
 * Riceball : riceball.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    window.addEventListener("load", main);
    module.exports = Object.freeze({});
}

var window = require("window"),
    pixi   = require("pixi");

var width  = 800,
    height = 450;

function main() {
    var canvas = window.document.createElement("canvas");
    canvas.width  = width;
    canvas.height = height;
    window.document.getElementById("game").appendChild(canvas);
    var renderer =
        pixi.autoDetectRenderer(width, height, {
            "view"       : canvas,
            "antialias"  : true,
            "autoResize" : true,
            "resolution" : window.devicePixelRatio,
            "transparent": false
        });
    var stage = new pixi.Container();

    function animate() {
        window.requestAnimationFrame(animate);
        renderer.render(stage);
    }

    window.requestAnimationFrame(animate);
}

end_module();
