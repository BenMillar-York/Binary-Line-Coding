
function fizzBuzzValue(num) {

    const FIZZ_BUZZ = [
        {
            word: "Fizz",
            value: 3
        },
        {
            word: "Buzz",
            value: 5
        }
    ]

    output = "";

    FIZZ_BUZZ.forEach(element => {
        if (num % element.value == 0) {
            output.append(element.word);
        }
    })

    if (output == "") {
        output = num;
    }

}