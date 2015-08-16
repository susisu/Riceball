/*
 * Riceball : scenes/events.js
 * copyright (c) 2015 Susisu
 */

function end_module() {
    module.exports = Object.freeze({});
}

var ev = require("electronvolt");

function SceneEvent(type, bubbles, cancelable) {
    ev.Event.call(this, type, bubbles, cancelable);
}

SceneEvent.prototype = Object.create(ev.Event.prototype, {
    "constructor": {
        "writable"    : true,
        "configurable": true,
        "value": SceneEvent
    },
    "toString": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            return this.formatToString("SceneEvent", ["type", "bubbles", "cancelable"]);
        }
    }
    "clone": {
        "writable"    : true,
        "configurable": true,
        "value": function () {
            return new SceneEvent(this.type, this.bubbles, this.cancelable);
        }
    }
});

Object.defineProperties(SceneEvent, {
    "ENDED": {
        "value": "ended"
    }
});

end_module();
