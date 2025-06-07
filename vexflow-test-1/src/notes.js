import { getOctaves, getNotes, formatNotes, buildStaveNotes } from './util_musicBuilder.js'
import { Formatter, Renderer, Stave, Voice } from 'vexflow'

let notes   = getNotes();
let octaves = getOctaves(4,4); // Default Octaves C3-C5 

let formattedNotes = formatNotes(notes, octaves);  // output: ["A/1", "B/4", "G/1", "C/4"]

let staveNotes = buildStaveNotes("treble", formattedNotes)

const NOTE_COUNT = 4;
const BEATS = 4;
// ---------------------------------------------------------------------------------------------
// Create an SVG renderer and attach it to the DIV element with id="output".
const div = document.getElementById('output');
const renderer = new Renderer(div, Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(500, 300);
const context = renderer.getContext();
context.setFont('Arial', 10);

// Create a stave of width 400 at position 
const stave = new Stave(50, 50, 400);

// Add a clef and time signature.
stave.addClef('treble').addTimeSignature('4/4');

// Connect it to the rendering context and draw!
stave.setContext(context).draw();
// ---------------------------------------------------------------------------------------------
// Create a voice in 4/4 and add above notes
const voice = new Voice({ num_beats: BEATS, beat_value: BEATS });
voice.addTickables(staveNotes);

// Format and justify the notes to 350 pixels.
new Formatter().joinVoices([voice]).format([voice], 350);

// Render voice
voice.draw(context, stave);