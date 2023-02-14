
/**
 * Computes the DFT of array of real values
 * @param {Array} data - An array of Y Coordinates.
 * @returns {Array} freqArray, an array of Complex numbers
 */
function discreteFourierTransform(data) {
    // Computes the Fourier Transform in O(N^2) rather than O(N logN)
    const numDataPoints = data.length;
    let freqArray = Array(data.length).fill(0);

    for (let frequency = 0; frequency < numDataPoints; frequency++) {

        let frequencySignal = new Complex(0, 0);

        for (let n = 0; n < numDataPoints; n++) {

            let amplitude = data[n];

            let exponent = -2 * pi * frequency * (n/numDataPoints);

            /* As cos x = Re (e^jx)
                & sin x = Im (e^jx)*/
            let contribution = new Complex(amplitude * Math.cos(exponent), amplitude * Math.sin(exponent));

            frequencySignal = addComplex(frequencySignal, contribution);

        }
        frequencySignal = divideComplex(frequencySignal, numDataPoints);

        freqArray[frequency] = frequencySignal;
    }
    return freqArray;
}


/**
 * Computes the IDFT of array of Complex numbers
 * @param {Array} data - An array of Y Coordinates.
 * @returns {Array} freqArray, an array of Complex numbers
 */
function inverseFourierTransform(freqArray) {
    const N = freqArray.length;
    let timeArray = Array(N).fill(0);
  
    for (let k = 0; k < N; k++) {

        let timeSignal = new Complex(0, 0);

        for (let n = 0; n < N; n++) {

            let realAmplitude = freqArray[n].real;
            let imagAmplitude = freqArray[n].imag;
            let exponent = 2 * pi * k * (n/N);

            /* As cos x = Re (e^jx)
            & sin x = Im (e^jx)*/
            let contribution = new Complex(realAmplitude * Math.cos(exponent), imagAmplitude * Math.sin(exponent));

            timeSignal = addComplex(timeSignal, contribution)
        }
        timeArray[k] = divideComplex(timeSignal, N);
        //timeArray[k] = timeSignal;
    }
  
    return timeArray;
}
    