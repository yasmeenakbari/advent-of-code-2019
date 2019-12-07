
let rangeMin = 234208;
let rangeMax = 765869;


function hasSameAdjacentDigitsPart1(digits){
    for(let i = 0; i < (digits.length - 1); i++){
        if (digits[i] == digits[i+1]){
            return true;
        }
    }

    return false;
}

function hasSameAdjacentDigitsPart2(digits){
    let largerGroupDigit = null;

    for(let i = 0; i < (digits.length - 1); i++){
        if (digits[i] == digits[i+1] && digits[i] == digits[i+2]){
           largerGroupDigit = digits[i];
        }
        else if ((digits[i] == digits[i+1]) && (largerGroupDigit == null)){
            return true;
        }
        else {
            largerGroupDigit = null;
        }
    }

    return false;
}

function checkNeverDecreasingDigits(digits){
    for(let i = 0; i < (digits.length - 1); i++){
        if (digits[i] > digits[i+1]){
            return false;
        }
    }

    return true;
}

// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
let validPasswords = 0;
for (let i = rangeMin; i <= rangeMax; i++){
    let digits = i.toString().split('').map(Number);
    if (hasSameAdjacentDigitsPart2(digits) && checkNeverDecreasingDigits(digits)){
        validPasswords++;
    }
}

console.log("validPasswords : ", validPasswords);