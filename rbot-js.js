// rbot-js.js
//
// Reads from an XBox360(tm) via an MQTT queue provided by goxb_mqtt
// (see https://github.com/gherlein/goxb_mqtt) and sends MQTT messages to a queue on
// a Raspberry Pi that feeds pi-blaster-mqtt running on the Pi
// (see https://github.com/gherlein/pi-blaster-mqtt).
//
// early days - eventually will be a library and then exaples
// will use a config file to map XBox events to motors/action

var mqtt = require("mqtt");
var joy = mqtt.connect("mqtt://localhost");
var rbot = mqtt.connect("mqtt://rpisoarw");

var debug = 1;

var joytopic = "xb/1/joysticks";
var joytopicLY = "xb/1/joysticks/L/Y";
var trigtipic = "xb/1/triggers";
var buttopic = "xb/1/buttons";
var pitopic = "pi-blaster-mqtt/text";

var LF_motor_pin = "4";

joy.on("connect", function() {
  joy.subscribe(joytopic);
});
joy.on("connect", function() {
  joy.subscribe(joytopicLY);
});
joy.on("connect", function() {
  joy.subscribe(trigtipic);
});
joy.on("connect", function() {
  joy.subscribe(buttopic);
});

joy.on("message", function(topic, message) {
  if (topic === joytopic) {
    var m = message.toString().split("|");
    if (m[0] == "L" && m[1] == "Y") {
      var n = int16ToPWM(m[3]);
      var o = LF_motor_pin + "=" + n;
      rbot.publish(pitopic, o);
      if (debug == 1) {
        console.log(m);
      }
    }
  }

  if (topic === joytopicLY) {
    var m = message.toString();
    var n = int16ToPWM(m);
    var o = LF_motor_pin + "=" + n;
    rbot.publish(pitopic, o);
    if (debug == 1) {
      console.log(m);
    }
  }
});

function int16ToPWM(x) {
  var v;
  if (typeof x === "string") {
    v = parseFloat(x, 10);
  } else if (typeof x === "number") {
    v = val;
  } else {
    return NaN;
  }
  var y = v / 32768;
  var o = 0.05 * y;
  var n = 0.15 + o;
  return n.toString();
}
