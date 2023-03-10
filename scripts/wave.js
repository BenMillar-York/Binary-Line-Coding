const pi = Math.PI;

function ceiling(value){
    if (value < 0){
        return 0;
    }
    if (value > 1){
        return 1;
    }
    return Math.ceil(value)
}

class Wave {
    constructor(amplitude, frequency, phase, colour) {
        this.amplitude = amplitude;
        this.frequency = frequency; // Hz
        this.phase = phase; // Radians
        this.colour = colour;
    }

    getPositionAtTime(time) {
        return 1;
    }
}

class SineWave extends Wave {
    constructor(amplitude, frequency, phase, velocity, colour){
        super(amplitude, frequency, phase, colour);
        this.amplitude = amplitude;
        this.frequency = frequency; // Hz
        this.phase = phase; // Radians
        this.velocity = velocity;
    }

    getPositionAtTime(time){
        let amplitude = this.amplitude;
        let omega = 2*Math.PI*this.frequency;
        let phase = this.phase;
        return  amplitude * Math.cos(omega*time-(position*this.velocity)-phase);
    }
}

class SquareWave extends Wave {
    constructor(amplitude, frequency, phase, velocity, colour){
        super(amplitude, frequency, phase, colour);
        this.amplitude = amplitude;
        this.frequency = frequency; // Hz
        this.phase = phase; // Radians
        this.velocity = velocity;
    }

    getPositionAtTime(time) {
        let amplitude = this.amplitude;
        let omega = 2*Math.PI*this.frequency;
        let phase = this.phase;
        return amplitude * ceiling(Math.cos(omega*time-(position*this.velocity)-phase));
    }
}

class DataWave {
    constructor(timePeriod) {
        this.timePeriod = timePeriod;
        this.probability1 = 0.5;
        this.data = [];
        this.returnToZeroData = [];
        this.manchesterData = [];
        this.nrzmData = [];
        this.bipolarData = [];
        this.fourierData = [];
        this.codingScheme = null;
        this.currentCodingSchemeData = this.nrzmData;
    }

    generateData() {
        let dataPoint = 0;
        let i;
        dataPoint = Math.random() < roundedProbability;

        for (i = 0; i < this.timePeriod; i++) {
            this.data.push(dataPoint == true)
        }
        this.generateCodingData();
    }

    generateCodingData() {
        this.returnToZeroData = returnToZero(this);
        this.manchesterData = manchester(this);
        this.nrzmData = nrzm(this);
        this.bipolarData = bipolar(this);
        this.mltData = MLT3(this);
        this.generateFourierData();
    }

    generateFourierData() {
        if (this.codingScheme == null) { this.currentCodingSchemeData = this.data;}
        if (this.codingScheme == "rtz") { this.currentCodingSchemeData = this.returnToZeroData;}
        if (this.codingScheme == "manchester") { this.currentCodingSchemeData = this.manchesterData;}
        if (this.codingScheme == "nrzm") { this.currentCodingSchemeData = this.nrzmData;}
        if (this.codingScheme == "bipolar") { this.currentCodingSchemeData = this.bipolarData;}
        if (this.codingScheme == "mlt3") { this.currentCodingSchemeData = this.mltData;}
        this.fourierData = discreteFourierTransform(this.currentCodingSchemeData);
        this.inverseFourierData = inverseFourierTransform(this.fourierData);
    }

    regenerateDataWithNewTimePeriod(newTimePeriod) {
        let resampleData = [];
        let i, j;
        for (i = 0; i < this.data.length && i < window.innerWidth; i = i + this.timePeriod) {
            for (j = 0; j < newTimePeriod; j++) {
                resampleData.push(this.data[i])
            }
        }
        this.data = resampleData;
        this.timePeriod = newTimePeriod;
        this.generateCodingData();
    }

    recreateData() {
        this.data = [];
    }

    getPositionAtTime(time, coding=null) {
        if (time > this.data.length) {
            this.generateData();
        }

        if (coding == null) { return this.data[time];}
        if (coding == "rtz") { return this.returnToZeroData[time];}
        if (coding == "manchester") { return this.manchesterData[time];}
        if (coding == "nrzm") { return this.nrzmData[time];}
        if (coding == "bipolar") { return this.bipolarData[time];}
        if (coding == "mlt3") { return this.mltData[time];}
        if (coding == "fourier") { return this.fourierData[time].magnitude;}
        if (coding == "inverseFourier") { return this.inverseFourierData[time].magnitude * 800 + 1;}
        
    }

    onclick (event) {
        console.log(event);
    }

    calculateProbabilityOf1 () {
        let total = 0;
        let i;

        for (i = 0; i < dataWave.data.length; i++) {
            if (dataWave.data[i]) {
                total++;
            }
        }
        return total / dataWave.data.length
    }
}

class SumWave {
    constructor(waves) {
        this.waves = waves; 
    }

    getPositionAtTime(time) {
        let sum = 0;
        this.waves.forEach(wave => {
            sum += wave.getPositionAtTime(time);
        });
        return sum;
    }
}

function updateProbabilitySlider(value) {
    dataWave.probability1 = value;
    probabilityLabel = document.getElementById('p1Label');
    probabilityLabel.innerText = String.raw`\[P(1) = ${value}\]`;
    MathJax.typeset();
    dataWave.recreateData();
}