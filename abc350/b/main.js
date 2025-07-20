const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const [n] = lines[0].split(' ').map(Number);
const teeth = Array(n).fill(true);

const order = lines[1].split(' ').map(Number);

for (const tooth of order) {
  teeth[tooth - 1] = !teeth[tooth - 1];
}

let count = 0;
for (const tooth of teeth) {
  if (tooth) count++;
}

console.log(count);