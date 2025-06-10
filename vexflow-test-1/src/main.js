import { 
    getOctaves, 
    getNotes, 
    formatNotes, 
    buildStaveNotes, 
    generateStave, 
    changeStaveNoteColor, 
    renderStaveNotes 
} from './util_musicBuilder.js'
import { Formatter, Renderer, Stave, Voice } from 'vexflow'

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
let answers;
let staveNotes;
let voice;
let stave;
let game_running;
startGame()
function startGame() {
    game_running = true;
    let cleff = 'treble';
    // let enabledClefs =  
    const time_signature = '4/4';
    let octaveRange = [4,5]

    // Create a stave of width 400 at position 
    stave = generateStave(50, 50, 400, cleff, time_signature)

    // Connect it to the rendering context and draw
    stave.setContext(context).draw();

    ({ answers, staveNotes, voice } = renderStaveNotes(cleff, time_signature, context, stave, octaveRange));
    console.log(answers)
    
}

window.addEventListener('keydown', function(event) {
    const userInput = event.key.toLowerCase();

    // Only process if it's a valid note key (a-g)
    if (!'abcdefg'.includes(userInput)) return;
    if (game_running) {
        if (userInput === answers[currentIndex]) {
            console.log("YESS");
            // Correct
            changeStaveNoteColor(staveNotes, currentIndex, 'green');
            voice.draw(context, stave);
        } else {
            console.log("NO")
            // Incorrect
            changeStaveNoteColor(staveNotes, currentIndex, 'red');
            voice.draw(context, stave);
        }
        
        // Move to next note
        currentIndex++;
    }
    else {
        console.log("Game Paused")
    }

    if (currentIndex >= answers.length) {
        console.log('All notes answered.');
        currentIndex = 0;
        game_running = false
        setTimeout(() => {    
            context.clear();
            stave.setContext(context).draw()
            startGame();
        }, 1000);
        
    }
});
