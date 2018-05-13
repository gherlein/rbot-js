# rbot-js.js
 
Reads from an XBox360(tm) via an MQTT queue provided by 
[goxb_mqtt](https://github.com/gherlein/goxb_mqtt) and sends MQTT messages to a queue on
a Raspberry Pi that feeds [pi-blaster-mqtt](see https://github.com/gherlein/pi-blaster-mqtt) 
running on the Pi.

## Early Days

Eventually will be a library and then exaples and will use a config file to map XBox controller
events to motors/action 

## Dependencies

You need to be running goxb_mqtt on the computer that has the XBox360 controller
plugged in:

```
sudo ./goxb_mqtt --deadzone=512 --broker="tcp://localhost:1883"
```
If you are working from the go source folder you can make this easy and use the 
Makefile:

```
make run
```

It should look something like this when you mess with the controller:

```
sudo ./goxb_mqtt --deadzone=512 --broker="tcp://localhost:1883"
RJOYX - x: 0   y: 0
LJOYY - x: 0   y: 0
LJOYY - x: 0   y: -32768
LJOYX - x: -1792   y: -32768
LJOYY - x: -1792   y: -2048
LJOYY - x: -1792   y: 768
LJOYY - x: -1792   y: 0
PADU_DOWN
PADU_UP
GUIDE_DOWN
GUIDE_UP
Y_DOWN
Y_UP
B_DOWN
B_UP
```

This test code is only using the left joystick and only the Y axis.

You also need to be running pi-blaster-mqtt on a Raspberry Pi.


##

Run this tool like this:

```
 node ./rbot-js.js
```

## Expected Behavior

```
node ./rbot-js.js 
4=0.12265625
4=0.09999999999999999
4=0.15
4=0.173046875
4=0.19999847412109376
4=0.15
^C
```

You can end the program with a Ctrl-C



