let fibArray = [1, 1];
let args = process.argv;

function fibonacci(num, memo) {
  memo = memo || {};

  if (memo[num]) return memo[num];
  if (num <= 1) return 1;
  
  return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
}

console.log(fibonacci(50));
console.log(fibonacci(100));
console.log(fibonacci(200));
console.log(fibonacci(300));
console.log(fibonacci(400));

// (function (num) {
//   for (let i = 1; i <= num; i++) {
//     fibArray.push(fibArray[fibArray.length - 1] + fibArray[fibArray.length - 2]);
//   }
// console.log("SEQUENCE: " + fibArray);
// console.log("Desired number is " + fibArray[num]);
// }(args[2]));
// console.log("THIS IS THE 1st ", fibonacci(process.argv[2]));
