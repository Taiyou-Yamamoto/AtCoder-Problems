const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;
const islands = input[idx++];
const seaRoutes = input[idx++];

const graph = Array.from({ length: islands }, () => []);

for (let i = 0; i < seaRoutes; ++i) {
    const a = input[idx++];
    const b = input[idx++];

    graph[a - 1].push(b);
    graph[b - 1].push(a);
}

const start = new Set(graph[0]);
const isPossible = graph[islands - 1].some((v) => start.has(v));

console.log(isPossible ? 'POSSIBLE' : 'IMPOSSIBLE');
