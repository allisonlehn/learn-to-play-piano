# Pre-work - *Memory Game*

**learn to play piano** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Allison Lehn**

Time spent: **5** hours spent in total

Link to project: <https://learn-to-play-piano.glitch.me>

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [X] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [ ] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (emodified shape and position
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:


- [X] Create entire piano with buttons corresponding to actual frequences, stretching two octaves
- [X] Install actual melodies to play
- [X] Make easy, medium, and hard modes based on length of melodies
- [X] Have an infinite run mode that runs like classic version, picking random notes until user fails

## Video Walkthrough

Here's a walkthrough of implemented user stories:
[Test GIF](https://imgur.com/qhympGN)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
 - I refereneced [this](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio) documentation to figure out how to get the AudioContext to load when I opened the game in a new tab.  
- I used [coolers](https://coolors.co/4c9f70-e8d7ff-1c5d99-267dcf-ffd166-ffc233-62bfed) to create the color scheme and reference hex codes.  
- I referenced [this](https://cssreference.io/) for modifying CSS (box and text style, positioning).  
- I used [this sheet music](https://youtu.be/8UJAol7ndfM) to write the pattern for one of the patterns.  
- I referenced piano frequencies from an image on [this page](https://amath.colorado.edu/pub/matlab/music/).  
- I referenced the mechanism for getting a random number from [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).
- I learned how to write with `innerHTML` from [here](https://stackoverflow.com/questions/9689109/how-to-display-javascript-variables-in-a-html-page-without-document-write/9689182)

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

  It took me a bit of time to learn how positioning worked in CSS. 
  For about an hour, I couldn't figure out how to get the black keys to align with the white ones to actually look like a piano. 
  I couldn't, for the life of me, get their top edges to align with the top edges of the white ones (they would only align with the bottom).
  Then, I had issues with getting the spacing to work. I was trying to decide if I should individually code the position of each key,
  when I realized that all of the properties that would move the buttons relied on the position property being set to relative. 
  From here, I could then manipulate the spacing and positioning to where I wanted it.

  A second challenge came up at the end, right when I thought I had everything working and looking nice.
  I opened the webpage in another tab, and no sound came out. I went back to the side-by-side preview and it worked there.
  Then, I refreshed the page, and neither worked. After banging my head on the table once, I then looked at the console log, which
  told me that the AudioContext was unable to load, and sent me to the directory. It mentioned that you need to resume or restart the 
  AudioContext when a page opens. Experimentally, I added a line of code to resume the AudioContext whenever the startGame() method is called,
  and it worked.


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

This was a pretty basic intro to web development, and I learned a lot about how it's simultaneously easier and more complicated than I thought.
I'm curious about how wireframes can be integrated into this. I've designed them before, but didn't get to see how they were actually implemented in code.
I would like to know how they can help create more complex and visually engaging interfaces.

I would also like to know if there are ways to streamline the writing of HTML. It seems like individually coding each button for the piano could have been done in a more concise way,
but it seems like they each need to be separate elements based on the provided code. Is there a way so that they can be algorithmically defined?

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I had more time to work on this, I would try to make it so that the keys must be played according to the correct rhythm as well as correct note. 
The two defined songs ("Hedwig's Theme" from *Harry Potter* and "Fur Elise") don't need to sound like the actual songs, since the notes can be played for an unspecified length.
I would define lists with the lengths of each note, each corresponding to a certain play time. In the play sequence, it would play the correct rhythm. For the user, we would have to
sutract the time that they started pressing the key from the time they started in order to determine how long they played the note for. So long as it is within a certain range
(we can't expect them to press for the exact millisecond amount of time with computer precision), their guess would be correct; otherwise, they would lose a life and repeat the sequence.



## License

    Copyright Allison Lehn

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.X
