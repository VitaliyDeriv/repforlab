function task1() {
    let sum = 0;
    let num = 1;
    while (num <= 50) {
        sum += num;
        num++;
    }
    console.log(`Task 1: \n${sum}`);
}

function task2() {
    let num = 4
    let factorial = 1;
    if (num < 0) {
        factorial = -1;
    }
    else if (num == 0) {
        factorial = 1;
    }
    else {
        for (let i = 2; i <= num; i++) {
            factorial *= i;
        }
    }
    console.log(`Task 2: \nnum = ${num}\nfactorial = ${factorial}`);
}

function task3() {
    let num = 5;
    let month = '';
    switch (Number(num)) {
        case 1:
            month = 'January';
            break;
        case 2:
            month = 'February';
            break;
        case 3:
            month = 'March';
            break;
        case 4:
            month = 'April';
            break;
        case 5:
            month = 'May';
            break;
        case 6:
            month = 'June';
            break;
        case 7:
            month = 'July';
            break;
        case 8:
            month = 'August';
            break;
        case 9:
            month = 'September';
            break;
        case 10:
            month = 'October';
            break;
        case 11:
            month = 'November';
            break;
        case 12:
            month = 'December';
            break;
        default:
            month = 'Error';
    }
    console.log(`Task 3: \nMonth num = ${num}\nMonth = ${month}`);
}

function sumEven(array) {
    let sum = 0;
    for (let i of array) {
        sum += i%2===0 ? i : 0;
    }
    return sum;
}
function task4() {
    let array = [1, 2, 3, 4, 6, 11];
    let sum = sumEven(array);
    console.log(`Task 4: \nArray = ${array}\nEven sum = ${sum}`)
}

function task5() {
    let countVowel = (text) => {
        let vowel = ["a", "e", "i", "o", "u"];
        text.toLowerCase();
        let count = 0;
        for (let i = 0; i < text.length; i++) {
            if (vowel.includes(text[i])) { count++; }
        }
        return count;
    }

    const text = "o i i a :) poink poink"
    let result = countVowel(text);
    console.log(`Task 5: \nText = "${text}"\nResult = ${result}`);
}

function pow(base, exponent) {
    let result = 1;
    if (exponent < 0) {
        for (let i = 1; i <= (-1*exponent); i++) {
            result *= 1/base;
        }
    } else {
        for (let i = 1; i <= exponent; i++) {
            result *= base;
        }
    }
    return result;
}
function task6() {
    let base = 5;
    let exponent = 2;
    let result = pow(base, exponent);
    console.log(`Task 6: \nBase = ${base}\nExponent = ${exponent}\nResult = ${result}`);
}


task1();
task2();
task3();
task4();
task5();
task6();