const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;

const N = input[idx++];
const M = input[idx++];

const array = Array(N).fill(undefined);

for (let i = 0; i < M; i++) {
    const digit = input[idx++] - 1; // 0-index化
    const num = input[idx++];

    /**
     * これは私が最初に書いたコード
     * しかし、これだと同じ桁に対して同じ数字が指定された場合に対応できない
     * 例: N=3, M=2, (1, 1), (1, 1) の場合、array[0]に1を入れた後、2回目の(1, 1)で矛盾と判定されてしまう
     */
    // if (array[digit] === undefined) {
    //     array[digit] = num;
    // } else {
    //     console.log(-1);
    //     process.exit();
    // }

    if (array[digit] !== undefined && array[digit] !== num) {
        // すでに違う値が入っていたら矛盾、同じ値なら上書きは問題ない
        console.log(-1);
        process.exit();
    }
    array[digit] = num;
}

if (N > 1 && array[0] === 0) {
    console.log(-1);
    process.exit();
}

for (let i = 0; i < N; i++) {
    if (array[i] === undefined) {
        if (i === 0) {
            /**
             * N=1のときは0も許されるので下記のように修正
             */
            // array[i] = 1;
            array[i] = N === 1 ? 0 : 1;
        } else {
            array[i] = 0;
        }
    }
}

console.log(array.join(''));
