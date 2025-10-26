const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const [peakNum, loads] = lines[0].split(' ').map(Number);

const arr = lines[1].split(' ').map(Number);

let peaks = Array(peakNum).fill(true);

// それぞれ辺が与えられるタイミングで低い方を判定するだけ
for (i = 1; i <= loads; i++) {
    const [A, B] = lines[i + 1].split(' ').map(Number);

    // 同点なら対象外 → 必要なし
    // if (arr[A] === arr[B]) {
    //     peaks[A - 1] = false;
    //     peaks[B - 1] = false;
    // }

    // 低い方がfalseになる
    // if (arr[A] > arr[B]) {
    //     peaks[B - 1] = false;
    // } else {
    //     peaks[A - 1] = false;
    // }
    if (arr[A - 1] <= arr[B - 1]) peaks[A - 1] = false;
    if (arr[B - 1] <= arr[A - 1]) peaks[B - 1] = false;
}

console.log(peaks.filter((v) => v).length);
