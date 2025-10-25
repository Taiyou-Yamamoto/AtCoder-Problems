const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

/**
 * ビット全探索で解く
 *  1. 鍵の真偽（正しいかダミーか）の2^N通りを全探索
 *  2. 各鍵パターンに対して、全てのテスト結果と矛盾しないかチェック
 *    - 鍵の本数が K 以上 → 'o' ならOK, 'x' ならNG
 *    - 鍵の本数が K 未満 → 'x' ならOK, 'o' ならNG
 *  3. 矛盾しなかったパターンをカウント
 *  4. 最終的にその数を出力
 * */

const [N, M, K] = lines[0].split(' ').map(Number);

const testCase = [];
for (let i = 1; i <= M; i++) {
    const line = lines[i].split(' ');
    const numberOfKeysUsed = Number(line[0]);
    const keys = line.slice(1, 1 + numberOfKeysUsed).map((x) => Number(x) - 1);
    const result = line[numberOfKeysUsed + 1];
    testCase.push({ keys, result });
}

let ans = 0;

// bitは「N本の鍵のうち、どの鍵が本物か」を表す2進数のフラグ（組み合わせ）
// つまり、鍵1,2,4が本物なら 0b00010110 のようになる
for (let bit = 0; bit < 1 << N; bit++) {
    // bitが示す鍵の組み合わせがテストに矛盾しないかを判定するためのフラグ
    let valid = true;

    // 各テストケースを1つずつ取り出してチェック
    for (const { keys, result } of testCase) {
        // このテストで挿した鍵のうち、何本が「本物」だったかを数える
        let count = 0;

        for (const key of keys) {
            // bit の中で 鍵kが本物かどうかを調べる
            // 1 << key は、k番目のビットだけが1のマスク
            // bit & (1 << key) が非0なら本物
            // &&ではなく&
            if (bit & (1 << key)) count++;
        }

        if (result === 'o' && count < K) {
            valid = false;
            break;
        }
        if (result === 'x' && count >= K) {
            valid = false;
            break;
        }
    }

    if (valid) ans++;
}

console.log(testCase);

// 例
// 本物の鍵は [1, 3, 5] （K=3）
// 検査①で使われた鍵は [1, 2, 3, 4]
// 本物が2本しか含まれていない → もし結果が 'o' なら矛盾