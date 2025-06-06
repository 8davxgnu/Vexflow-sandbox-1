export function getNotes() {
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
    
    // console.log(octaveArray);
    return octaveArray;
}

export function getStaveNotes(notes, octaves) {
    const staveNotes = notes.map((item,index) => item + octaves[index]);
    return staveNotes;
}

