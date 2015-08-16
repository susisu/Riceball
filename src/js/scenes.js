/*
 * Riceball : scenes.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function end_module() {
    module.exports = Object.freeze({
        "game": require("./scenes/game.js"),
        
        "events": require("./scenes/events.js");
    });
}

end_module();
