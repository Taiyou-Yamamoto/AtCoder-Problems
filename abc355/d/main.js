const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split(/\s+/).map(Number);

let p = 0;
const num = lines[p++];

// 方針
// 交わらないペア数を効率的に数えるために：
// 	lを全部昇順にソート
// 	rを全部昇順にソート
// 	各r_iに対して「r_i < l_j なる j の個数」を二分探索で求める

const L = new Array(num);
const R = new Array(num);

for (let i = 0; i < num; i++) {
  const l = lines[p++];
  const r = lines[p++];
  L[i] = l;
  R[i] = r;
}

L.sort((a, b) => a - b);
R.sort((a, b) => a - b);

let disjoint = 0; //交わらないペア数
let counted = 0; //Lをどこまで数えたか

for (let i = 0; i < num; i++) {
  const r = R[i];

  while (counted < num && L[counted] <= r) {
    counted++;
  }

  disjoint += num - counted;
}

const total = (num * (num - 1)) / 2;
console.log(total - disjoint);

// 交わるペア数 = 全ペア数 - 交わらないペア数
// 交わるペア数 = nC2 - 交わらないペア数
// 交わるペア数 = n(n-1)/2 - 交わらないペア数
// 交わるペア数 = num * (num - 1) / 2 - disjoint
