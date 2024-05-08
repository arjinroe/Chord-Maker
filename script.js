import MusicTools from "./MusicTools.js";
// Enable WebMidi API and handle any errors if it fails to enable.
// This is necessary to work with MIDI devices in the web browser.
await WebMidi.enable();

let transposition = 0;
let myPitch = 60;

// Initialize variables to store the first MIDI input and output devices detected.
// These devices can be used to send or receive MIDI messages.
let myInputs = WebMidi.inputs[0];
let myOutputs = WebMidi.outputs[0].channels[1];



// Get the dropdown elements from the HTML document by their IDs.
// These dropdowns will be used to display the MIDI input and output devices available.
let dropIns = document.getElementById("dropdown-ins");
let dropOuts = document.getElementById("dropdown-outs");
let slider = document.getElementById("slide");









slider.addEventListener("change", function(){
  document.getElementById("transpoAmt").innerText = `${slider.value} semitones`;
});

let chordDrop = document.getElementById("chordSelect");



// document.getElementById()

let myChord = [];





// For each MIDI input device detected, add an option to the input devices dropdown.
// This loop iterates over all detected input devices, adding them to the dropdown.
WebMidi.inputs.forEach(function (input, num) {
  dropIns.innerHTML += `<option value=${num}>${input.name}</option>`;
});


// Similarly, for each MIDI output device detected, add an option to the output devices dropdown.
// This loop iterates over all detected output devices, adding them to the dropdown.
WebMidi.outputs.forEach(function (output, num) {
  dropOuts.innerHTML += `<option value=${num}>${output.name}</option>`;
});

    

//define MIDI processing function
// let rootNote = myPitch;

// const midiProcess = function(someMIDI) {
//   let myPitch = someMIDI.note.number;
//   let velocity = someMIDI.note.rawAttack;
//   console.log(myPitch);
//   console.log(velocity);
// };

myChord = [60, 64, 67] //this is just a way to test the following function

const playChord = function (someMIDI) {
  let myPitch = someMIDI.note.number;
  let velocity = someMIDI.note.rawAttack;
  myChord.forEach(function (myPitch) {
    let midiNoteOutput = new Note (myPitch, { rawAttack: velocity });
    myOutputs[0].channels[1].playNote(myNote);
  });
};

// Add an event listener for the 'change' event on the input devices dropdown.
// This allows the script to react when the user selects a different MIDI input device.
dropIns.addEventListener("change", function () {
  // Before changing the input device, remove any existing event listeners
  // to prevent them from being called after the device has been changed.
  if (myInputs.hasListener("noteon")) {
    myInputs.removeListener("noteon");
  }
  if (myInputs.hasListener("noteoff")) {
    myInputs.removeListener("noteoff");
  }

  // Change the input device based on the user's selection in the dropdown.
  myInputs = WebMidi.inputs[dropIns.value];

  
  // After changing the input device, add new listeners for 'noteon' and 'noteoff' events.
  // These listeners will handle MIDI note on (key press) and note off (key release) messages.
  myInputs.addListener("noteon", function (someMIDI) {
    // When a note on event is received, send a note on message to the output device.
    // This can trigger a sound or action on the MIDI output device.
    
    console.log(`I played ${someMIDI.note.identifier}: 
    Pitch is ${someMIDI.note.number}, 
    Velocity is ${someMIDI.note.rawAttack}`);

    

    myOutputs.sendNoteOn(midiProcess(someMIDI));
  });

  myInputs.addListener("noteoff", function (someMIDI) {
    // Similarly, when a note off event is received, send a note off message to the output device.
    // This signals the end of a note being played.

    myOutputs.sendNoteOff(midiProcess(someMIDI));
  });
});

// Add an event listener for the 'change' event on the output devices dropdown.
// This allows the script to react when the user selects a different MIDI output device.
dropOuts.addEventListener("change", function () {
  // Change the output device based on the user's selection in the dropdown.
  // The '.channels[1]' specifies that the script should use the first channel of the selected output device.
  // MIDI channels are often used to separate messages for different instruments or sounds.
  myOutputs = WebMidi.outputs[dropOuts.value].channels[1];
});

// chordSelect.addEventListener("change", function (){
//   let s = chordSelect.value;
//   console.log(s);
//   return s;
// });



