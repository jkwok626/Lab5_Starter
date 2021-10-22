// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  // Gets the input tag for choosing a voice
  var voiceSelector = document.getElementById('voice-select');

  // Initializes the SpeechSynthesis
  var synth = window.speechSynthesis;

  // An array for storing the voices that will be retrived by SpeechSynthesis
  var voices = [];

  // Gets the image of the smiling face
  var face = document.getElementsByTagName('img')[0];

  // Gets the 'Press to Talk' button
  var talkBtn = document.getElementsByTagName('button')[0];

  // Gets the textarea where the user enters their text
  var inputField = document.getElementById('text-to-speak');

  // Referenced SpeechSynthesis documentation at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

  // Function for filling up the list of voices
  function fillList() {

    // Gets the different voices available and store them in the voices array
    voices = synth.getVoices();

    // Loop through the voices array
    for (var i = 0; i < voices.length; i++) {

      // For each voice in the voices array, create an option tag and set its text content
      var newVoice = document.createElement('option');
      newVoice.textContent = voices[i].name + ' (' +voices[i].lang + ')';

      // Set the name and language for each new voice
      newVoice.setAttribute('data-name', voices[i].name);
      newVoice.setAttribute('data-lang', voices[i].lang);

      // Append each voice to the voice selector so that the user can choose them
      voiceSelector.append(newVoice);
    }
  }

  // Call fillList when the list of available voices has changed
  fillList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = fillList;
  }

  talkBtn.addEventListener('click', () => {

    // Returns the option that the user selected. 
    // selectedOptions returns a list of the options that have been selected, so we need to use an index to get the user's option. 
    var userOption = voiceSelector.selectedOptions[0];

    // If the userOption has a value of "select" (the user hasn't selected a voice), the smiling face shouldn't speak
    if (userOption.value == "select") {
      return;
    }

    // Once we have the option that the user chose, get the option's name
    var nameOfOption = userOption.getAttribute('data-name');
    
    // When the user clicks the button, change the image src so that it has an open mouth
    face.src = "assets/images/smiling-open.png";

    // Create a new instance of SpeechSynthesusUtterance with the user's inputted text
    var speechLine = new SpeechSynthesisUtterance(inputField.value);

    // Loop through the voices until we find the voice with the name that matches the voice that the user selected.
    // Once we find the right voice, asign that voice to speechLine
    for(var i = 0; i < voices.length ; i++) {
      if(voices[i].name === nameOfOption) {
        speechLine.voice = voices[i];
      }
    }
      
    // Speak the user's text
    synth.speak(speechLine);

    // When the speech has ended, call a function that changes the smiling face back to closed. 
    speechLine.onend = (event) => {
      face.src = "assets/images/smiling.png";
    }
  });
}