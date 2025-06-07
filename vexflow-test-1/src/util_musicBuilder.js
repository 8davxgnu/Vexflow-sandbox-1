import { Formatter, Renderer, Stave, StaveNote, Voice } from 'vexflow'

export function getNotes() {  // These will be the answer choices
    const possibleNotes = ["A", "B", "C", "D", "E", "F", "G"]
    const notes = []
    for (let i = 0; i < 4; i++){
        const randomNum = Math.floor((Math.random() * 7));
        notes.push(possibleNotes[randomNum])
    }
    return notes;
}

export function getOctaves(min, max) {
    const octaveArray = [];

    for (let i = 0; i < 4; i++){
        octaveArray.push(min + Math.floor(Math.random() * (max - min + 1)));
    }
    
    return octaveArray;
}

export function formatNote(notes, octaves) {
    const noteWithOctave = notes.map((item,index) => item + "/" + octaves[index]);
    // console.log(noteWithOctave)
    return noteWithOctave;
}

export function buildStaveNotes(cleff, formattedNotes) {
    const staveNotes = []
    for (const noteKey of formattedNotes) {
        const staveNote = new StaveNote({ keys: [noteKey], duration: "q", clef: cleff});
        staveNotes.push(staveNote);
    }
    return staveNotes;
}