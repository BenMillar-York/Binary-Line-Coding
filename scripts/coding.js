
/**
 * Takes in a wave and returns the Return To Zero Coding of the wave.
 * When a 1 data point is encountered the wave will remain at 1 then return to 0
 * @param {DataWave} wave 
 */
function returnToZero(wave) {
    let i, j;
    let returnToZeroData = new Array(wave.data.length).fill(0);

    for (i=0; i < wave.data.length; i=i+wave.timePeriod) {
        if (wave.getPositionAtTime(i)) {
            for (j=0; j < wave.timePeriod/2; j++) {
                returnToZeroData[i+j] = true;
            }
        }
    }
    return returnToZeroData;
}

/**
 * Takes in a wave and returns the Mancher Coding of the wave
 * This follows the IEEE 802.3 ethernet standards where a logic high is a low- high signal sequence and a logic low is a high- low signal sequence
 * @param {DataWave} wave 
 */
function manchester(wave) {
    let manchesterData = new Array(wave.data.length).fill(0);

    for (i=0; i < wave.data.length; i=i+wave.timePeriod) {
        if (wave.getPositionAtTime(i)) {
            for (j=0; j < wave.timePeriod/2; j++) {
                manchesterData[i+j] = true;
            }
            for (j=Math.floor(wave.timePeriod/2); j < wave.timePeriod; j++) {
                manchesterData[i+j] = false;
            }
        } else {
            for (j=0; j < wave.timePeriod/2; j++) {
                manchesterData[i+j] = false;
            }
            for (j=Math.floor(wave.timePeriod/2); j < wave.timePeriod; j++) {
                manchesterData[i+j] = true;
            }
        }
    }
    return manchesterData;
}

/**
 * Takes in a wave and returns the NRZ - M Coding of the wave
 * A logic high forces a transistion and a logic low keeps the signal the same
 * @param {DataWave} wave 
 */
function nrzm(wave) {
    let nrzmData = new Array(wave.data.length).fill(false);

    let i, j;

    nrzmData[0] = 0

    for (i=1; i < wave.data.length; i=i+wave.timePeriod) {
        if (wave.getPositionAtTime(i)) {
            if (nrzmData[i-1]) {
                for (j=0; j < wave.timePeriod; j++) {
                    nrzmData[i+j] = false;
                }
            } else {
                for (j=0; j < wave.timePeriod; j++) {
                    nrzmData[i+j] = true;
                }
            }
        } else {
            let oldData = nrzmData[i-1];
            for (j=0; j < wave.timePeriod; j++) {
                nrzmData[i+j] = oldData;
            }
        }
    }
    return nrzmData;

}

/**
 * Takes in a wave and returns the Bipolar Coding of the wave
 * A logic high forces an alternating high- zero/ low-zero transisition and a logic low sets the signal to zero
 * @param {DataWave} wave 
 */
function bipolar(wave) {
    let bipolarData = new Array(wave.data.length).fill(0);

    let alternator = true;

    for (i=0; i < wave.data.length; i=i+wave.timePeriod) {
        if (wave.getPositionAtTime(i)) {
            for (j=0; j < wave.timePeriod/2; j++) {
                if (alternator) {
                    bipolarData[i+j] = 1;
                } else {
                    bipolarData[i+j] = 0;
                }
            }
            alternator = !alternator;
            for (j=Math.floor(wave.timePeriod/2); j < wave.timePeriod; j++) {
                bipolarData[i+j] = 0.5;
            }
        } else {
            for (j=0; j < wave.timePeriod; j++) {
                bipolarData[i+j] = 0.5;
            }
        }
    }
    return bipolarData;
}