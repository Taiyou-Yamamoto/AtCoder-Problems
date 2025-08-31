const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const numbers = lines[1].split(' ').map(Number);

const stack = [];

for (const num of numbers) {
  if (stack.length === 0) {
    stack.push(num);
    continue;
  }
  stack.push(num);
  if (stack[stack.length - 1] !== stack[stack.length - 2]) {
    continue;
  } else {
    while (stack[stack.length - 1] === stack[stack.length - 2]) {
      const a = stack[stack.length - 1];
      stack.splice(-2);

      stack.push(a + 1);
    }
  }
}

console.log(stack.length);
