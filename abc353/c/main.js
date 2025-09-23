const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split(/\s+/).map(Number);

let p = 0;
const first = it[p++];
const array = it.slice(p, p + N);
const MOD = 100000000;

array.sort((a, b) => a - b);

const pref = new Array(N + 1).fill(0n);
for (let i = 0; i < first; ++i) {
    pref[i + 1] = pref[i] + BigInt(array[i]);
}

let base = 0n;
for(let )
