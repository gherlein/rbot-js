// rbot-js.js
// 
// Reads from an XBox360(tm) via an MQTT queue provided by goxb_mqtt
// (see https://github.com/gherlein/goxb_mqtt) and sends MQTT messages to a queue on
// a Raspberry Pi that feeds pi-blaster-mqtt running on the Pi 
// (see https://github.com/gherlein/pi-blaster-mqtt).
//
// early days - eventually will be a library and then exaples
// will use a config file to map XBox events to motors/action 

var mqtt = require('mqtt')
var joy   = mqtt.connect('mqtt://localhost')
var rbot  = mqtt.connect('mqtt://rpisoarw')

var debug = 1

var joytopic = 'xb/1/joysticks'
var trigtipic = 'xb/1/triggers'
var buttopic = 'xb/1/buttons'
var pitopic = 'pi-blaster-mqtt/text'

joy.on('connect', function () {
    joy.subscribe(joytopic)
})
joy.on('connect', function () {
    joy.subscribe(trigtipic)
})
joy.on('connect', function () {
    joy.subscribe(buttopic)
})


joy.on('message', function (topic, message) {
    var m = message.toString().split("|");
    if ( (m[0]=="L") && (m[1]=="Y"))  {
	var y=parseFloat(m[3],10)/32768;
	var o=0.05*y;
	var n=0.15+o;
	var p=n.toString();
	var m='4='+p;
	rbot.publish(pitopic,m)
	if (debug==1) {
	    console.log(m)
	}

   }
})

  
