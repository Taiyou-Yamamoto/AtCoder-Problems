const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const num = Number(lines[0]);


const size = 3 ** num;

const isDot = (i, j) => {
    while (i > 0 || j > 0) {
        if (i % 3 === 1 && j % 3 === 1) return true;
        i = Math.floor(i / 3);
        j = Math.floor(j / 3);
    }
    return false;
};

let out = [];

for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < size; j++) {
        row += isDot(i, j) ? '.' : '#';
    }
    out.push(row);
}
console.log(out.join('\n'));
