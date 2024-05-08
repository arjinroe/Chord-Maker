const MusicTools = {
    standardPitch: 440,
    /**
     * Converts MIDI Pitch to the corresponding Frequency in Hertz (A440)
     * @param {number} midiPitch Pitch in MIDI Number
     * @returns {number} Frequency in Hertz
     * @example
     * midiPitchToFrequency (60)
     * //returns 261.3 Hz
     */
    midiPitchToFrequency: function (midiPitch) {
        return this.standardPitch * Math.pow(2, (midiPitch - 69) / 12);
      },
    
    /**
     * Converts a frequency in Hz to the corresponding MIDI pitch number.
     * @param {number} frequency - The frequency in Hz.
     * @returns {number} The MIDI pitch number.
     */
    frequencyToMidiPitch: function(frequency) {
        return 69 + 12 * Math.log2(frequency / this.standardPitch);
        //to get the previous parameter, use this.whateverYourParameter
    },

    /**
     * Convert Linear Amplitude to Decibels (Full Scale)
     * @param {number} linAmp 
     * @returns {number} dBFS
     */
    aToDB: function (linAmp) {
        return 20 * Math.log10(linAmp);
    },

    /**
     * 
     * @param {number} dbFS 
     * @returns {number} linear amplitude
     */
    dbToA: function (dBFS) {
        return Math.pow(10, dBFS / 20);
    },

    /**
     * Converts a note name and octave into a MIDI value
     * @param {string} noteName 
     * @param {number} octave 
     * @param {boolean} choose frequency or midi calculation
     * //true = MIDI
     * //false = frequency
     * @returns 
     * //MIDI Note Number
     */
    noteToMIDIVal: function (noteName, octave, freqOrMIDI) {
        //matches up note input to MIDI value
        let initNoteValue;
        if (noteName == "C") {
            initNoteValue = 60;
        }
        else if (noteName == "C#") {
            initNoteValue = 61;
        }
        else if (noteName == "D") {
            initNoteValue = 62;
            
        }
        else if (noteName == "D#") {
            initNoteValue = 63;
            
        }
        else if (noteName == "E") {
            initNoteValue = 64;
            
        }
        else if (noteName == "F") {
            initNoteValue = 65;
           
        }
        else if (noteName == "F#") {
            initNoteValue = 66;
            
        }
        else if (noteName == "G") {
            initNoteValue = 67;
            
        }
        else if (noteName == "G#") {
            initNoteValue = 68;
            
        }
        else if (noteName == "A") {
            initNoteValue = 69;
            
        }
        else if (noteName == "A#") {
            initNoteValue = 70;
            
        }
        else if (noteName == "B") {
            initNoteValue = 71;
            
        }
        
        //takes in the init MIDI value and adds octave to it to create final
        //MIDI value
        let finalNoteValue = initNoteValue + (12 * octave);
        
        //determines whether to convert note name to MIDI or frequency
        
        if (freqOrMIDI == "MIDI") {
            return finalNoteValue;
        }

        else if (freqOrMIDI == "FREQ") {
            return this.standardPitch * Math.pow(2, (finalNoteValue - 69) / 12);
        }
        else {
            let error = "Error, please only insert a MIDI or FREQ value"
            return error;
        }
        
    },
    
    

};

export default MusicTools; //use when you only export one object