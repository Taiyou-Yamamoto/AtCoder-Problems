const fs = require('fs');

// ここで一次元の配列にしてしまった方が処理が軽くなる。flatten方式
const it = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = it[p++];
const cards = [];

for (let i = 0; i < N; i++) {
  const A = it[p++];
  const C = it[p++];

  // 配列ではなくオブジェクトで持つ
  // 配列 [A, C, i+1] でも持てるが、cards[j][0]やcards[j][1]といった形でアクセスすることになるので、可読性が落ちるため
  cards.push({ A, C, idx: i + 1 });
}

// まずAで比べ、同点ならCで比べる
cards.sort((a, b) => b.A - a.A || a.C - b.C);

let res = [];
let minConst = Infinity;

for (let i = 0; i < N; i++) {
  if (cards[i].C > minConst) {
    continue;
  } else {
    res.push(cards[i].idx);
    if (cards[i].C < minConst) minConst = cards[i].C;
  }
}
res.sort((a, b) => a - b);

console.log(res.length);
console.log(res.join(' '));
