import { getOctaves, getNotes, getStaveNotes } from './musicBuilder.js'


let notes   = getNotes();
let octaves = getOctaves(3,5); // Default Octaves C3-C5 

let staveNotes = getStaveNotes(notes, octaves);

// console.log(notes)
console.log(staveNotes)







// should output array of 4 notes; e.g. ["A1,"C4", "G1", "B2"]