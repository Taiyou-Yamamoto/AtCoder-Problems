const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const [takahashi, aoki] = lines;

const scoreTakahashi = takahashi.split(' ').reduce((a, b) => a + Number(b), 0);
const scoreAoki = aoki.split(' ').reduce((a, b) => a + Number(b), 0);

const need = scoreTakahashi - scoreAoki + 1;

console.log(need);
