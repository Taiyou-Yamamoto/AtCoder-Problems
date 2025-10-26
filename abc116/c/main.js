const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

/**
 * https://drken1215.hatenablog.com/entry/2019/03/03/150200
 * こちらを参考
 */

const num = lines[0];
const arr = lines[1].split(' ').map(Number);
const max = Math.max(...arr);
let anc = 0;

for (let i = 1; i <= max; i++) {
    const levelMap = Array(arr.length).fill(0);
    // levelMap[i] = Array(arr.length).fill(0);　//いらない
    arr.forEach((num, idx) => {
        if (num >= i) {
            // levelMap[num] += 1;
            levelMap[idx] = 1; // 正しくはこちら
        }
    });

    levelMap.forEach((num, idx) => {
        if (!levelMap[idx - 1] && num === 1) {
            anc++;
        }
        prev = num;
    });
}
console.log(anc);
