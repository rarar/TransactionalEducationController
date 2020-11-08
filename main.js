// const {
//   Board,
//   Led
// } = require("johnny-five");
// const board = new Board();

//Import the necessary libraries/declare the necessary objects
const express = require("express");
const parser = require("body-parser");
const app = express();
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/tty.usbmodem142201', {
  baudRate: 9600
});
const arduinoParser = port.pipe(new Readline({
  delimiter: '\n'
}));
// Read the port data
port.on("open", function() {
  console.log("port opened");
  setTimeout(function() {
    port.write("hi!\n");
  }, 5000);
});
arduinoParser.on('data', data => {
  console.log('got word from arduino:', data);
});


// board.on("ready", () => {
//
//   // Create a standard `led` component instance
//   const led = new Led(13);
//
//   // "blink" the led in 500ms
//   // on-off phase periods
//   led.blink(2000);
// });

app.use(parser.urlencoded({
  extended: true
}));
app.post("/", function(request, response) {
  //console.log(request.body.data);
  // console.log(request.body.data.endingFpmLevel);
  // console.log(request.body.data.masteryLevelChange);
  // console.log(request.body.data.numAttempted);
  // console.log(request.body.data.numCorrect);
  // console.log(request.body.data.pointsEarned);
  // console.log(request.body.data.startingFpmLevel);

  port.write(request.body.data.endingFpmLevel + '\n', (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });

  port.write(request.body.data.masteryLevelChange + '\n', (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });

  port.write(request.body.data.numAttempted + '\n', (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });

  port.write(request.body.data.numCorrect + '\n', (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });

  port.write(request.body.data.pointsEarned + '\n', (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });

  port.write(request.body.data.startingFpmLevel + '\n', (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });


});

//Start the server and make it listen for connections on port 8080

app.listen(8080);
