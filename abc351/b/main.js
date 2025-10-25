const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const n = Number(lines[0]);
const gridA = [];
const gridB = [];

for (let i = 1; i <= n; i++) {
  gridA.push(lines[i].split(''));
}
for (let i = n + 1; i <= 2 * n; i++) {
  gridB.push(lines[i].split(''));
}

for (i = 0; i < n; i++) {
  for (j = 0; j < n; j++) {
    if (gridA[i][j] !== gridB[i][j]) {
      console.log(i + 1, j + 1);
      break;
    }
  }
}
