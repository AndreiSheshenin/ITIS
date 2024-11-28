const fs = require('fs');
const args = process.argv;
let inText = fs.readFileSync(args[2]).toString();

function encodeRLE(input) {
    let encodedString = '';
    let i = 0;

    while (i < input.length) {
        let count = 1;

        while (i + 1 < input.length && input[i] == input[i + 1]) {
            count++;
            i++;
        }

        if (count >= 4) {
            encodedString += `#${count}${input[i]}`;
        } else {
            encodedString += input[i].repeat(count);
        }

        i++;
    }

    return encodedString;
}

console.log(encodeRLE(inText));