const fs = require('fs');

const it = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = it[p++];
const cards = [];

for (let i = 0; i < N; i++) {
    const A = it[p++];
    const C = it[p++];

    cards.push({ A, C, idx: i + 1 });
}
