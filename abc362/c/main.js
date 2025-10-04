const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split(/\s+/).map(Number);

let p = 0;
const num = lines[p++];

let sumL = 0;
let sumR = 0;

for (let i = 0; i < num; i++) {
    sumL += lines[p++];
    sumR += lines[p++];
}

if (sumL > 0 || sumR < 0) {
    console.log('No');
    return;
}

console.log('Yes');
// L,Rを再度読み直すためにポインタを戻す
p = 1; // numの次から再スタート（lines[1]が最初のL）
const X = []; // 結果を入れる配列
let need = -sumL;

for (let i = 0; i < num; i++) {
    const L = lines[p++];
    const R = lines[p++];
    let add = Math.min(R - L, need);
    X.push(L + add);
    need -= add;
}

console.log(X.join(' '));
