// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  // Gets the select tag with the id horn-select
  var selectedHorn = document.getElementById('horn-select');

  // Gets the first image in expose.html, which is the image of the horns
  var hornImg = document.getElementsByTagName('img')[0];

  // Gets the input tag that controls the volume slider
  var volume = document.getElementById('volume');

  // Gets the Play Sound button
  var playBtn = document.getElementsByTagName('button')[0];

  // Gets the audio tag
  var sound = document.getElementsByTagName('audio')[0];

  // Initializes an instance of the confetti class
  const jsConfetti = new JSConfetti();
  
  // Adds a listener that listens for changes with the volume slider
  volume.addEventListener('change', (event) => {
    // Change the icon and volume of the sound based on the value of the volume slider
    if (volume.value == 0) {
      document.getElementsByTagName('img')[1].src = "assets/icons/volume-level-0.svg";
      sound.volume = 0;
    } else if (volume.value >= 1 && volume.value < 33) {
      document.getElementsByTagName('img')[1].src = "assets/icons/volume-level-1.svg";
      sound.volume = volume.value * 0.01;
    } else if (volume.value >= 33 && volume.value < 67) {
      document.getElementsByTagName('img')[1].src = "assets/icons/volume-level-2.svg";
      sound.volume = volume.value * 0.01;
    } else if (volume.value >= 67) {
      document.getElementsByTagName('img')[1].src = "assets/icons/volume-level-3.svg";
      sound.volume = volume.value * 0.01;
    }
  });

  // Listen for a change in selectedHorn
  selectedHorn.addEventListener('change', (event) => {

    // Depending on the new value of selectedHorn, change the image and audio source
    if (selectedHorn.value == 'air-horn') {
      hornImg.src = "assets/images/air-horn.svg";
      sound.src = "assets/audio/air-horn.mp3";
    } else if (selectedHorn.value == 'car-horn') {
      hornImg.src = "assets/images/car-horn.svg";
      sound.src = "assets/audio/car-horn.mp3";
    } else if (selectedHorn.value == 'party-horn') {
      hornImg.src = "assets/images/party-horn.svg";
      sound.src = "assets/audio/party-horn.mp3";
    }

    // Play the sound when the button is clicked
    playBtn.addEventListener('click', () => {
      sound.play();

      // If the party horn is selected, shoot out the confetti
      if (selectedHorn.value == 'party-horn') {
        jsConfetti.addConfetti();
      }
    });
  });
}