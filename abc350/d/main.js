const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');
const [n, m] = lines[0].split(' ').map(Number);

class UnionFind {
  constructor(n) {
    // 0,1,2,3,...,n-1 の各要素がそれぞれの親を指す
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.size[rootX] < this.size[rootY]) {
        [rootX, rootY] = [rootY, rootX];
      }
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    }
  }

  leader(x) {
    return this.find(x);
  }

  getSize(x) {
    return this.size[this.find(x)];
  }
}

const uf = new UnionFind(n);

// union 操作（C++と同じく 0-indexed）
for (let i = 1; i <= m; i++) {
  let [a, b] = lines[i].split(' ').map(Number);
  a--;
  b--; // 0-indexed
  uf.union(a, b);
}

// 各代表について sC2 を合計
let ans = 0;
for (let i = 0; i < n; i++) {
  if (uf.leader(i) === i) {
    const s = uf.getSize(i);
    ans += (s * (s - 1)) / 2;
  }
}
// 「すでに友達な関係を除く」
ans -= m;
console.log(ans);
