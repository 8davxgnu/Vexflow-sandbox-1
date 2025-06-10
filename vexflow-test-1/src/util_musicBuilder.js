import { Formatter, Stave, StaveNote, Voice } from 'vexflow'

/**
 * Generates an array of random notes from A–G.
 * @param {string} count - Number of notes to generate.
 * @returns {string[]} Array of note letters.
 */
export function getNotes(count = 4) {  // These will be the answer choices
    const possibleNotes = ["A", "B", "C", "D", "E", "F", "G"]
    const notes = []
    for (let i = 0; i < count; i++){
        const randomNum = Math.floor((Math.random() * 7));
        notes.push(possibleNotes[randomNum])
    }
    return notes;
}

/**
 * 
 * @param {number} min - Min Octave Range
 * @param {number} max - Max Octave Range
 * @param {number} count - Number of notes being used
 * @returns {string[]} - Array of note octaves
 */
export function getOctaves(min, max, count = 4) {
    const octaveArray = [];

    for (let i = 0; i < count; i++){
        octaveArray.push(min + Math.floor(Math.random() * (max - min + 1)));
    }
    
    return octaveArray;
}

/**
 * 
 * @param {string[]} notes - Array of note letters
 * @param {string[]} octaves - Array of note octaves
 * @returns {string[]} - Array of vexflow-formattted Notes
 */
export function formatNotes(notes, octaves) {
    if (notes.length !== octaves.length) {
        throw new Error("Notes and octaves must have the same length")
    }
    return notes.map((item,index) => item + "/" + octaves[index]);
}

/**
 * 
 * @param {string} cleff - Cleff of notes
 * @param {string[]} formattedNotes - Array of vexflow-formattted Notes
 * @returns 
 */
export function buildStaveNotes(cleff, formattedNotes) {
    const staveNotes = []
    for (const noteKey of formattedNotes) {
        const staveNote = new StaveNote({ keys: [noteKey], duration: 'q', clef: cleff });
        staveNotes.push(staveNote);
    }
    return staveNotes;
}

export function generateStave(posX = 50, posY = 50, width = 400, cleff, time_signature = '4/4') {
    const stave = new Stave(posX, posY, width);
    stave.addClef(cleff).addTimeSignature(time_signature)
    return stave
}

export function changeStaveNoteColor(staveNotes, index, color = 'black') {
    staveNotes[index].setStyle({
        fillStyle: color,
        strokeStyle: color
    });
}

export function renderStaveNotes(cleff, time_signature, context, stave, octaveRange) {
    let notes   = getNotes(); 
    let octaves = getOctaves(octaveRange[0],octaveRange[1]); // Default Octaves C3-C5 
    let formattedNotes = formatNotes(notes, octaves);  // output: ["A/1", "B/4", "G/1", "C/4"]
    let staveNotes = buildStaveNotes(cleff, formattedNotes)

    // Create a voice in 4/4 and add above notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(staveNotes);

    // Format and justify the notes to 350 pixels.
    new Formatter().joinVoices([voice]).format([voice], 350);

    // Render voice
    voice.draw(context, stave);

    return {
        answers: notes.map((note) => note.toLocaleLowerCase()), 
        staveNotes, 
        voice
    };
}

export function generateCleff(enabledClefs = ['treble']) {
    const index = Math.floor((Math.random) * enabledClefs.length);
    return enabledClefs[index];
}

