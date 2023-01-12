let fourierData = [];

// Param: data - An array of Y Coordinates.
// Return: freqArray - An array of Complex Numbers
function discreteFourierTransform(data) {
    // Computes the Fourier Transform in O(N^2) rather than O(N logN)
    const numDataPoints = data.length;
    let freqArray = Array(data.length)

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
    