import { 
    getOctaves,
    getNotes,
    formatNotes,
    buildStaveNotes,
    generateStave,
    changeStaveNoteColor,
    renderStaveNotes,
    generateClef,
    getEnabledClefs
} from './util_musicBuilder.js'
import { Formatter, Renderer, Stave, Voice } from 'vexflow'
// ---------------------------------------------------------------------------------------------
/*
setContext(context).draw()  : context provides note and cleff information and draw draws the notes and cleff
*/
// ---------------------------------------------------------------------------------------------
// Create an SVG renderer and attach it to the DIV element with id="output".
const div = document.getElementById('output');
const renderer = new Renderer(div, Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(500, 300);
const context = renderer.getContext();
context.setFont('Arial', 10);
// ---------------------------------------------------------------------------------------------
let currentIndex = 0;
const time_signature = '4/4';
let answers;
let staveNotes;
let voice;
let stave;
let game_running;
let coolDown = 1000;
const CLEF_OCTAVE_RANGE = {  // Default octave ranges
    treble: [4, 6],
    bass: [2, 4],
    alto: [3, 5]
};

// Initial Stave Render
stave = new Stave(50, 50, 400);
stave.addTimeSignature(time_signature);
stave.setContext(context).draw();

function startNewRound() { 
    const enabledClefs = getEnabledClefs();
    console.log(enabledClefs);

    if ((enabledClefs.length > 0) && (!game_running)) {
        game_running = true;
        context.clear();
        runGameLogic(enabledClefs);
    } else if ((enabledClefs == 0) && (game_running)){
        return;
    } else {
        // No clefs selected
        game_running = false;
        context.clear();
        stave = new Stave(50, 50, 400);
        stave.addTimeSignature(time_signature);
        stave.setContext(context).draw();
        console.log("No clefs selected");
    } 
}

function runGameLogic(enabledClefs) {
    context.clear()
    let cleff = generateClef(enabledClefs);
    let octaveRange = [4,5]

    // Create a stave of width 400 at position 
    stave = generateStave(50, 50, 400, cleff, time_signature)

    // Connect it to the rendering context and draw
    stave.setContext(context).draw();

    ({ answers, staveNotes, voice } = renderStaveNotes(cleff, time_signature, context, stave, octaveRange));
    console.log(answers)
    
}

document.getElementById('startGameButton').addEventListener('click', startNewRound);

window.addEventListener('keydown', function(event) {
    const userInput = event.key.toLowerCase();

    // Only process if it's a valid note key (a-g)
    if (!'abcdefg'.includes(userInput)) return;
    if (game_running) {
        if (userInput === answers[currentIndex]) {
            changeStaveNoteColor(staveNotes, currentIndex, 'green');
            voice.draw(context, stave);
        } else {
            changeStaveNoteColor(staveNotes, currentIndex, 'red');
            voice.draw(context, stave);
        }

        // Move to next note
        currentIndex++;

        // Check if all notes answered
        if (currentIndex >= answers.length) {
            console.log('All notes answered.');
            currentIndex = 0;
            game_running = false
            setTimeout(() => {  
                context.clear();    
                startNewRound();
            }, coolDown);
        
        }
    }
    else {
        console.log("Game Paused")
    }

});
