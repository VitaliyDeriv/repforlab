function getMaxMin(array) {
    let min = array[0];
    let max = array[0];
    for (let i of array) {
        if (i < min) min = i;
        if (i > max) max = i;
    }
    return [min, max];
}
function task1_1() {
    let numArray = [-5, 2, 0, -1, 10, 9, 5];

    let maxMin = getMaxMin(numArray);
    let minElement = maxMin[0];
    let maxElement = maxMin[1];
    console.log("Task 1");
    console.log(numArray);
    console.log(`min: ${minElement}, max: ${maxElement}`);
}

function compareObjects(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    for (let i in a) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
function task1_2() {
    let obj1 = {"char":'b', "num":6};
    let obj2 = {"num":6, "char":'b'};

    let compared = compareObjects(obj1, obj2);
    console.log("Object #1:");
    console.log(obj1);
    console.log("Object #2:");
    console.log(obj2);
    console.log(`Result: ${compared}`);
}


function isInRange(range, num) {
    return num >= range[0] && num <= range[1];
}
function task2_1() {
    let num = 69;
    let range = [42, 116];
    console.log(`Task 2`);
    console.log(`Number: ${num}\nRange: from ${range[0]} to ${range[1]}\nResult: ${isInRange(range, num)}`);
}


function task2_2() {
    let bool = true;
    console.log(`Start value (bool): ${bool}`);
    console.log(`Reverse value (not bool): ${!bool}`);
}


function stringifyScore(score) {
    if (score < 0 || score > 100) { return 'Error'; }
    else if (score < 50) { return 'Fail.'; }
    else if (score < 70) { return 'Satisfactory!'; }
    else if (score < 90) { return 'Good!'; }
    else {return 'Excellent!'}
}
function task3_1() {
    let score = 74;
    console.log("Task 3");
    console.log(`Score: ${score}`);
    let result = stringifyScore(score);
    console.log(`Result: ${result}`);
}


function getSeason(month) {
    let months = [
        "december", "january", "february",
        "march", "april", "may",
        "june", "july", "august",
        "september", "october", "november"
    ];
    month = month.toLowerCase();
    let isValid = months.includes(month) ? true : false;
    console.log(`Month is valid? – ${isValid}`);

    if (isValid) {
        if (month === months[0]
            || month === months[1]
            || month === months[2]) {
            return 'Winter';
        }
        else if (month === months[3]
                || month === months[4]
                || month === months[5]) {
            return 'Spring';
        }
        else if (month === months[6]
                || month === months[7]
                || month === months[8]) {
            return 'Summer. IT\'S BEACH TIME';
        }
        else {
            return 'Fall';
        }
    }
    return 'Error'
}
function task3_2() {
    let month = "december";
    console.log(`Month: ${month}`);
    let result = getSeason(month);
    console.log(`Result: ${result}`);
}

task1_1();
task1_2();
task2_1();
task2_2();
task3_1();
task3_2()