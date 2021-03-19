// global constants
const clueHoldTime = 333; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 333; //how long to wait before starting playback of the clue sequence

//Global Variables
var notes = ["c","cS","d","dS","e","f","fS","g","gS","a","aS","b","C","CS","D","DS","E","F","FS","G","GS","A","AS","B"]
var easy = [[1,6,9,8,6,13,11,8],
            [17,16,17,16,17,12,15,13,10]];
var med = [[1,6,9,8,6,13,11,8,6,9,8,4,6,1],
           [17,16,17,16,17,12,15,13,10,1,5,10,12,5,9,12,13]];
var hard = [[1,6,9,8,6,13,11,8,6,9,8,4,6,1,1,6,9,8,6,13,16,15,13,8,13,11,10,1,9,6],
            [17,16,17,16,17,12,15,13,10,1,5,10,12,5,9,12,13,5,17,16,17,16,17,12,15,13,10,1,5,10,12,5,13,12,10]];
var pattern;
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; // must be between 0.0 and 1.0
var guessCounter = 0;
var infinite = false;
var lives;



function startGame(difficulty){
  context.resume()
  //swap start and stop buttons and instructions
  document.getElementById("instruct1").classList.add("hidden");
  document.getElementById("easyStart").classList.add("hidden");
  document.getElementById("medStart").classList.add("hidden");
  document.getElementById("hardStart").classList.add("hidden");
  document.getElementById("infinity").classList.add("hidden");
  // button for testing notes: 
  // document.getElementById("test").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("instruct2").classList.remove("hidden");
  progress = 0;
  gamePlaying = true;
  lives = 3;
  if(difficulty == 'inf'){
    infinite = true;
    pattern = [];
  }
  // condition for testing whole songs to make sure the notes are correct
  // else if(difficulty=="test"){
  //   pattern = med[0];
  //   progress = pattern.length;
  // }
  else{
    document.getElementById("lives").classList.remove("hidden");
    document.getElementById("lives").innerHTML = "Lives: "+lives;
    var songSelect = Math.floor(Math.random() * Math.floor(difficulty.length));
    pattern=difficulty[songSelect];
  }
  playClueSequence();
}

function stopGame(){
  //reset game variables
  gamePlaying = false;
  infinite=false;
  // swap the Start and Stop buttons and instructions
  document.getElementById("easyStart").classList.remove("hidden");
  document.getElementById("medStart").classList.remove("hidden");
  document.getElementById("hardStart").classList.remove("hidden");
  document.getElementById("infinity").classList.remove("hidden");
  document.getElementById("instruct1").classList.remove("hidden");
  // remove test button:
  // document.getElementById("test").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("instruct2").classList.add("hidden");
  if(!infinite){
    document.getElementById("lives").classList.add("hidden");
  }
}

// Sound Synthesis Functions
//frequencies from middle C to B
const freqMap = {
  1: 261.6, //c
  2: 277.2, //c#
  3: 293.7, //d
  4: 311.1, //d#
  5: 329.6, //e
  6: 349.2, //f
  7: 370, //f#
  8: 392, //g
  9: 415.3, //g#
  10: 440, //a
  11: 466.2, //a#
  12: 493.9, //b
  13: 523.3, //C
  14: 554.4, //C#
  15: 587.3, //D
  16: 622.3, //D#
  17: 659.3, //E
  18: 698.5, //F
  19: 740, //F#
  20: 784, //G
  21: 830.6, //G#
  22: 880, //A
  23: 932.2, //A#
  24: 987.8 //B
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
  console.log("played "+ btn + " for " + len + " hehe");
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

function lightButton(btn){
  document.getElementById(notes[btn-1]).classList.add("lit")
}
function clearButton(btn){
  document.getElementById(notes[btn-1]).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  if(infinite){
    pattern.push(Math.floor(Math.random() * Math.floor(notes.length))); //add a random note to pattern list
  }
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}


function loseGame(){
  stopGame();
  if(infinite){
    alert("Game Over. You got to Level " + (progress+1)+".");
  }
  else{
    alert("Game Over. You lost.");
  }
}

function winGame(){
  stopGame();
  alert("Congratulations!! You won!!!")
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){ // game mode off
    return;
  }
  // wrong guess
  if(btn!=pattern[guessCounter]){
    if(!infinite && lives > 1){ //for non-infinite games, lose a life on a mistake
      lives--;
      document.getElementById("lives").innerHTML = "Lives: "+lives;
      playClueSequence();
    }
    else{
      loseGame(); // out of lives or a mistake on infinite game
    }
  }
  //correct guess, still guessing
  else if(guessCounter != progress){
    guessCounter++;
  }
  // correct guess for sequence, play next clue
  else if(progress != pattern.length - 1 || infinite){
    progress++;
    playClueSequence();
  }
  // all sequences correct, win game

  else if(!infinite){
    winGame();
  }
  
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

