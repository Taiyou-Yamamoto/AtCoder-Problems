const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const num = Number(lines[0]);

// 連想配列で出現回数をカウント
const obj = new Object();

for (let i = 1; i <= num; i++) {
    const key = lines[i];
    obj[key] = (obj[key] || 0) + 1;
}

const sortedKeys = Object.keys(obj).sort();

const max = Math.max(...Object.values(obj));
const result = sortedKeys.filter((key) => obj[key] === max);

result.forEach((key) => console.log(key));
