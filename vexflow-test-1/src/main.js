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

let cleff = 'bass';
let time_signature = '4/4';

// Create a stave of width 400 at position 
const stave = generateStave(50, 50, 400, cleff, time_signature)

// Connect it to the rendering context and draw
stave.setContext(context).draw();

let { answers, staveNotes, voice } = renderStaveNotes(cleff, time_signature, context, stave);
console.log(answers)
let currentIndex = 0;
window.addEventListener('keydown', function(event) {
    const userInput = event.key.toLowerCase();

    // Only process if it's a valid note key (a-g)
    if (!'abcdefg'.includes(userInput)) return;

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

    if (currentIndex >= answers.length) {
        console.log('All notes answered.');
        currentIndex = 0;
            
        context.clear()
    }
});
