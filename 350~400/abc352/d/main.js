const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const [length, pick] = lines[0].split(' ').map(Number);

const arr = lines[1].split(' ').map(Number);

const subscripts = new Array(arr.length + 1);

for (const [i, value] of arr.entries()) {
  subscripts[value] = i + 1;
}

const trimmed = subscripts.slice(1);

let ans = Infinity;
let maxQ = [];
let minQ = [];
let maxHead = 0;
let minHead = 0;

for (let i = 0; i < length; i++) {
  while (maxQ.length > maxHead && trimmed[maxQ[maxQ.length - 1]] <= trimmed[i]) {
    maxQ.pop();
  }
  maxQ.push(i);

  while (minQ.length > minHead && trimmed[minQ[minQ.length - 1]] >= trimmed[i]) {
    minQ.pop();
  }
  minQ.push(i);

  if (i >= pick - 1) {
    const l = i - (pick - 1);

    // 窓の外（lより左）を先頭ポインタを進めて捨てる（shiftしない）
    while (maxHead < maxQ.length && maxQ[maxHead] < l) maxHead++;
    while (minHead < minQ.length && minQ[minHead] < l) minHead++;

    const width = trimmed[maxQ[maxHead]] - trimmed[minQ[minHead]];
    if (width < ans) ans = width;
  }
}

console.log(ans);
