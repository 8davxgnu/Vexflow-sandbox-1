import { StaveNote } from 'vexflow'

/**
 * Generates an array of random notes from A–G.
 * @param {number} count - Number of notes to generate.
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

export function getOctaves(min, max, count = 4) {
    const octaveArray = [];

    for (let i = 0; i < count; i++){
        octaveArray.push(min + Math.floor(Math.random() * (max - min + 1)));
    }
    
    return octaveArray;
}

export function formatNotes(notes, octaves) {
    if (notes.length !== octaves.length) {
        throw new Error("Notes and octaves must have the same length")
    }
    return notes.map((item,index) => item + "/" + octaves[index]);
}

export function buildStaveNotes(cleff, formattedNotes) {
    const staveNotes = []
    for (const noteKey of formattedNotes) {
        const staveNote = new StaveNote({ keys: [noteKey], duration: "q", clef: cleff});
        staveNotes.push(staveNote);
    }
    return staveNotes;
}