'use strict';
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = lines[p++];
const A = lines.slice(p, p + N);
const MOD = 100000000; // 1e8

A.sort((a, b) => a - b);

// 素の和 = (N-1) * sum(A)  ※合計は BigInt
let sumA = 0n;
for (const x of A) sumA += BigInt(x);
let base = BigInt(N - 1) * sumA;

// A[i]+A[j] >= 1e8 のペア数を two pointers で数える（i<j）
let cnt = 0n;
let j = N - 1; // ← const ではなく let
for (let i = 0; i < N; i++) {
  while (j > i && A[i] + A[j] >= MOD) j--; // ← 和で判定
  const firstOK = Math.max(j + 1, i + 1); // ← ここから右は全部 >=MOD かつ i<k
  if (firstOK < N) cnt += BigInt(N - firstOK);
}

// 答え = 素の和 - 1e8 * (はみ出しペア数)
const ans = base - BigInt(MOD) * cnt;
console.log(ans.toString());
