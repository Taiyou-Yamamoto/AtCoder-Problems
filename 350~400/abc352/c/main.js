const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const number = Number(lines[0]);

let total = 0;
let maxDiff = 0;

for (let i = 1; i <= number; i++) {
  const [a, b] = lines[i].split(' ').map(Number);

  total += a;
  const diff = b - a;
  if (diff > maxDiff) {
    maxDiff = diff;
  }
}

console.log(total + maxDiff);
