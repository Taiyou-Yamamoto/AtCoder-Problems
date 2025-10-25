const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const num = Number(lines[0]);

const obj = new Object();

for (let i = 1; i <= num; i++) {
    const key = lines[i];
    //     if (obj[key]) {
    //         obj[key] = 0;
    //     }
    //     if (obj[key] === 0) {
    //         obj[key] = 1;
    //     } else {
    //         obj[key] = 0;
    //     }
    obj[key] = obj[key] ? 0 : 1;
}

console.log(Object.values(obj).filter(v => v).length);

/**
 *  `Object.values`
 *  valueを配列で返す
 * 
 * `filter(v => v)`
 *  v が trueっぽければ残す、falseっぽければ捨てる。
 */
