class UnionFind {
  parent: number[];
  size: number[];
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): void {
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
}
