'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(el) {
        const heap = this.heap;
        heap.push(el);

        // 新しく追加したノードの位置
        let childIndex = heap.length - 1;
        while (childIndex > 0) {
            const parentIndex = Math.floor((childIndex - 1) / 2);

            if (heap[parentIndex][0] <= heap[childIndex][0]) break;

            [heap[parentIndex], heap[childIndex]] = [heap[childIndex], heap[parentIndex]];
            childIndex = parentIndex;
        }
    }

    pop() {
        const heap = this.heap;
        if (heap.length === 0) return null;

        const top = heap[0];
        const last = heap.pop();

        if (heap.length) {
            heap[0] = last;

            let parentIndex = 0;
            while (true) {
                let leftChildIndex = parentIndex * 2 + 1;
                let rightChildIndex = leftChildIndex + 1;
                let minIndex = parentIndex;

                if (leftChildIndex < heap.length && heap[leftChildIndex][0] < heap[minIndex][0]) {
                    minIndex = leftChildIndex;
                }
                if (rightChildIndex < heap.length && heap[rightChildIndex][0] < heap[minIndex][0]) {
                    minIndex = rightChildIndex;
                }
                if (minIndex === parentIndex) break;

                [heap[parentIndex], heap[minIndex]] = [heap[minIndex], heap[parentIndex]];
                parentIndex = minIndex;
            }
        }
        return top;
    }

    get size() {
        return this.heap.length;
    }
}

let idx = 0;
const N = input[idx++];
const M = input[idx++];

const A = Array(N + 1);

// 頂点をループ、重みを格納
for (let i = 1; i <= N; i++) A[i] = input[idx++];

const graph = Array.from({ length: N + 1 }, () => []);

// 辺をループ、costが辺の重み
for (let j = 0; j < M; j++) {
    const from = input[idx++]; // 繋ぎ初めの頂点
    const to = input[idx++]; //　繋ぎ終わりの頂点
    const cost = input[idx++]; // その辺の重み

    // 各頂点が繋がっている頂点とその辺の重みを格納
    graph[from].push([to, cost]);
    graph[to].push([from, cost]);
}

// 各頂点への最短距離を格納する配列
const distCosts = Array(N + 1).fill(Infinity);

distCosts[1] = A[1];

// 優先度付きキュー（ priority queue ）
const pq = new MinHeap();

// [コスト, 頂点]
pq.push([distCosts[1], 1]);

// ダイクストラ法  スタートから近い順に探索していく
while (pq.size) {
    const [currentCost, currentNode] = pq.pop();

    // 今取り出した経路が、すでに更新された最短経路じゃない（＝古い）」場合はスルー
    if (currentCost !== distCosts[currentNode]) continue;

    for (const [nextNode, edgeCost] of graph[currentNode]) {
        
        const nextCost = currentCost + edgeCost + A[nextNode];
        if (nextCost < distCosts[nextNode]) {
            distCosts[nextNode] = nextCost;
            pq.push([nextCost, nextNode]);
        }
    }
}

let out = [];
for (let i = 2; i <= N; i++) out.push(String(distCosts[i]));
console.log(out.join(' '));

// [ '4', '9' ]なら
//「頂点2までの最短コスト＝4」「頂点3までの最短コスト＝9」
