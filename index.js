const FileOpener = require('./src/fileOpener');
const MidiParser = require('./src/midiParser');
const Transformer = require('./src/transformer');
const ScaleManager = require('./src/scaleManager');

// Initialize the classes
const fileOpener = new FileOpener();
const midiParser = new MidiParser();
const transformer = new Transformer();
const scaleManager = new ScaleManager();

// Step 1: Open and read the MIDI file
const rawMidiData = fileOpener.openFile('input.mid');

// Step 2: Parse the MIDI file to get note events
const noteEvents = midiParser.parseMidi(rawMidiData);

// Step 3: Set up the scales in ScaleManager
const sourceScale = [60, 62, 64, 65, 67, 69, 71]; // C, D, E, F, G, A, B (C Major)
const targetScale = [60, 62, 63, 65, 67, 68, 71]; // C, D, Eb, F, G, Ab, B (C Harmonic Minor)

scaleManager.setSourceScale(sourceScale);
scaleManager.setTargetScale(targetScale);

// Step 4: Get the transformation matrix from ScaleManager
const transformationMatrix = scaleManager.getTransformationMatrix();

// Step 5: Transform the note events using the matrix
const transformedNotes = transformer.transformNotes(noteEvents, transformationMatrix);

// Step 6: Convert transformed note data back into MIDI format
const finalMidiData = midiParser.generateMidi(transformedNotes, rawMidiData);

// Step 7: Write the transformed MIDI data to a new file
fileOpener.writeFile('output.mid', finalMidiData);

