class Complex {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    get argument () {
        return Math.atan(this.imag, this.real);
    }

    get magnitude () {
        return Math.sqrt(this.real**2 + this.imag**2);
    }

}

function multiplyComplex(Complex1, Number2) {
    if (typeof Number2 == Complex){
        // (a + bi)(c + di) = ((ac + bd) + (ad+bc)j)
        let real1 = Complex1.real * Number2.real;
        let imag1 = Complex1.real * Number2.imag;
        let imag2 = Complex1.imag * Number2.real;
        let real2 = Complex1.imag * Number2.imag;

        let real = real1 + real2;
        let imag = imag1 + imag2;
        return new Complex(real, imag)
    } else {
        let real = Complex1.real * Number2;
        let imag = Complex1.imag * Number2;
        return new Complex(real, imag);
    }
}

function divideComplex(Complex1, Number2) {
    if (typeof Number2 == Complex){
        // (a + bi)/(c + di) = (((ac + bd)/(c^2 + d^2)) + ((bc - ad)/(c^2 + d^2))j)
        // Maybe turning this into polar form would have been easier
        let real1 = Complex1.real * Number2.real;
        let imag1 = Complex1.real * Number2.imag;
        let imag2 = Complex1.imag * Number2.real;
        let real2 = Complex1.imag * Number2.imag;
    
        let real = (real1 + real2) / (Number2.real ** 2 + Number2.imag);
        let imag = (imag2 - imag1) / (Number2.real ** 2 + Number2.imag);
        return new Complex(real, imag)
    } else {
        let real = Complex1.real / Number2;
        let imag = Complex1.imag / Number2;
        return new Complex(real, imag);
    }

}

function addComplex(Complex1, Complex2) {
    let real = Complex1.real + Complex2.real;
    let imag = Complex1.imag + Complex2.imag;

    return new Complex(real, imag);
}