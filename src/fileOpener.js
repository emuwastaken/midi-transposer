const fs = require('fs');
const midiFile = require('midi-file');

class FileOpener {
    // Method to open and read a MIDI file
    openFile(filePath) {
        try {
            const input = fs.readFileSync(filePath); // Read the MIDI file from the file system
            const parsedMidi = midiFile.parseMidi(input); // Parse the MIDI file into a structured format
            return parsedMidi;
        } catch (error) {
            console.error(`Error reading MIDI file: ${error.message}`);
            return null;
        }
    }

    // Method to write the transformed MIDI data to a new file
    writeFile(filePath, midiData) {
        try {
            const output = midiFile.writeMidi(midiData); // Convert the structured MIDI data back to binary format
            fs.writeFileSync(filePath, Buffer.from(output)); // Write the binary data to a file
            console.log(`MIDI file written to ${filePath}`);
        } catch (error) {
            console.error(`Error writing MIDI file: ${error.message}`);
        }
    }
}

module.exports = FileOpener;
