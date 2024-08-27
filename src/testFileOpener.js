const path = require('path');
const FileOpener = require('./fileOpener');

// Initialize the FileOpener
const fileOpener = new FileOpener();

// Define the paths to the input and output MIDI files
const inputFilePath = path.join(__dirname, 'midi', 'ave_maria.mid');
const outputFilePath = path.join(__dirname, 'midi', 'output_test.mid');

// Test opening a MIDI file
const midiData = fileOpener.openFile(inputFilePath);
if (midiData) {
    console.log('MIDI file opened successfully.');
    
    // Iterate through tracks and events to display readable information
    midiData.tracks.forEach((track, trackIndex) => {
        console.log(`\nTrack ${trackIndex + 1}:`);
        track.forEach((event, eventIndex) => {
            if (event.type === 'noteOn' || event.type === 'noteOff') {
                console.log(`  Event ${eventIndex + 1}: ${event.type} - Note: ${event.noteNumber}, Velocity: ${event.velocity}, Delta Time: ${event.deltaTime}`);
            } else if (event.type === 'meta' && event.subtype === 'trackName') {
                console.log(`  Event ${eventIndex + 1}: Track Name - ${String.fromCharCode(...event.data)}`);
            } else if (event.type === 'meta' && event.subtype === 'setTempo') {
                const bpm = 60000000 / event.microsecondsPerBeat;
                console.log(`  Event ${eventIndex + 1}: Set Tempo - ${bpm.toFixed(2)} BPM`);
            } else {
                console.log(`  Event ${eventIndex + 1}: ${event.type}`);
            }
        });
    });

    // Test writing the MIDI data to a new file
    fileOpener.writeFile(outputFilePath, midiData);
} else {
    console.log('Failed to open MIDI file.');
}
