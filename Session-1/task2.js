//Task1
function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}
console.log(isSorted([1, 2, 3, 4])); // true
console.log(isSorted([1, 5, 3]));    // false


//Task2
function greaterThan(arr, value) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > value) {
            result.push(arr[i]);
        }
    }

    return result;
}
console.log(greaterThan([3, 8, 2, 10, 6], 5)); // [8, 10, 6]


//Task3
function plusOne(digits) {
    let number = digits.join("")
    number = Number(number);
    number = number + 1;
    number = String(number);
    let result = number.split("");
    for (let i = 0; i < result.length; i++) {
        result[i] = Number(result[i]);
    }
    return result;
}
console.log(plusOne([1, 2, 3])); // [1,2,4]
console.log(plusOne([9]));       // [1,0]
console.log(plusOne([9,9,9]));   // [1,0,0,0]


//Task4
function removeDuplicates(nums) {
    return nums.filter((value, index) => {
        return index === 0 || value !== nums[index - 1];
    });
}
let nums = [1, 1, 2, 2, 3, 4, 4];
console.log(removeDuplicates(nums)); // [1, 2, 3, 4]