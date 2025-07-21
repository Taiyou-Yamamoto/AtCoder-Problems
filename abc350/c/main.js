const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

// console.log(lines[0]);
// console.log(lines[1]);
const array = lines[1].split(' ').map(Number);

const result = [];

for (let i = 0; i < Number(lines[0]); i++) {
  while (array[i] !== i + 1) {
    const prev = array[i] - 1;

    [array[prev], array[i]] = [array[i], array[prev]];
    result.push([i + 1, prev + 1]);
  }
}

console.log(result.length);

for (const number of result) {
  console.log(number.join(' '));
}
