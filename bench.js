
import FlatQueue from './index.js';

const N = 1000000;
const K = 1000;

const data = [];
for (let i = 0; i < N; i++) data[i] = Math.round(1000 * Math.random());

const f = new FlatQueue();

console.time(`flatqueue push ${N}`);
for (let i = 0; i < N; i++) f.push(i, data[i]);
console.timeEnd(`flatqueue push ${N}`);

console.time(`flatqueue pop ${N}`);
for (let i = 0; i < N; i++) f.pop();
console.timeEnd(`flatqueue pop ${N}`);

console.time(`flatqueue push/pop ${N}`);
for (let i = 0; i < N; i += K) {
    for (let j = 0; j < K; j++) f.push(i, data[i + j]);
    for (let j = 0; j < K; j++) f.pop();
}
console.timeEnd(`flatqueue push/pop ${N}`);
