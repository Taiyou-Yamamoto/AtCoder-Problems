const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const [H, W] = lines[0].split(' ').map(Number);
const grid = lines.slice(1, 1 + H).map((row) => row.split(''));

const rowStep = [1, -1, 0, 0]; // 下, 上, 動かない, 動かない
const columnStep = [0, 0, 1, -1]; // 動かない, 動かない, 右, 左

// 範囲内かどうか
const inRange = (vertical, horizontal) => 0 <= vertical && vertical < H && 0 <= horizontal && horizontal < W;
// 危険なマスの管理
const isDanger = Array.from({ length: H }, () => Array(W).fill(false));

// 盤面を探索
for (let row = 0; row < H; row++) {
  for (let column = 0; column < W; column++) {
    if (grid[row][column] !== '.') continue;
    //４方向を調べる
    for (let direction = 0; direction < 4; direction++) {
      const nextRow = row + rowStep[direction]; // 行、縦方向
      const nextColumn = column + columnStep[direction]; //列、横方向

      if (inRange(nextRow, nextColumn) && grid[nextRow][nextColumn] === '#') {
        isDanger[row][column] = true;
        break; // 上下左右1つのマスが磁石なら調べるのをやめる
      }
    }
  }
}

// 各マスの答え（-1 は未確定）
const answerPerCell = Array.from({ length: H }, () => Array(W).fill(-1));
let maxAnswer = 0;
let hasDot = false;

for (let startRow = 0; startRow < H; startRow++) {
  for (let startCol = 0; startCol < W; startCol++) {
    if (grid[startRow][startCol] === '.') hasDot = true;

    // 危険なマスでなく、まだ調べていないマスを見つけたら、そこからBFSで探索開始
    if (!isDanger[startRow][startCol] && answerPerCell[startRow][startCol] === -1) {
      // ---- ここから “動画のやり方” のBFS本体 ----
      const queue = [[startRow, startCol]];
      let qIndex = 0;

      const seen = new Set([startRow * W + startCol]); // 訪問管理（同じ安全マスを二度入れない）
      const component = []; // この安全成分に含まれるマス（後で答えを配るため）
      const borderDanger = new Set(); // この成分に接する危険マス集合（重複しないように Set）

      while (qIndex < queue.length) {
        const [row, column] = queue[qIndex++];
        component.push([row, column]);

        for (let direction = 0; direction < 4; direction++) {
          const nextRow = row + rowStep[direction];
          const nextColumn = column + columnStep[direction];

          if (!inRange(nextRow, nextColumn)) continue;
          if (grid[nextRow][nextColumn] === '#') continue;

          if (isDanger[nextRow][nextColumn]) {
            // 危険マスは「種類」としてカウント（重複はSetで防ぐ）
            borderDanger.add(nextRow * W + nextColumn);
          } else {
            const key = nextRow * W + nextColumn;

            if (!seen.has(key)) {
              seen.add(key);
              queue.push([nextRow, nextColumn]);
            }
          }
        }
      }

      // 成分の答え = 安全マス数 + 境界の危険マス「種類数」
      const value = component.length + borderDanger.size;

      for (const [r, c] of component) {
        answerPerCell[r][c] = value;
      }

      if (value > maxAnswer) maxAnswer = value;
    }
  }
}

if (maxAnswer === 0 && hasDot) maxAnswer = 1;

console.log(String(maxAnswer));
