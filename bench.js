
import FlatQueue from './index.js';

const N = 1000000;
const K = 1000;
const WARMUP = 3;
const RUNS = 10;

const data = [];
for (let i = 0; i < N; i++) data[i] = Math.round(1000 * Math.random());

// Set to `() => new FlatQueue()` to compare against regular arrays.
const create = () => new FlatQueue(N, Uint16Array);

// Runs `fn` WARMUP + RUNS times, printing the best and median wall-clock time.
// `setup` (if given) runs before each iteration and is not timed.
function bench(name, fn, setup) {
    const times = [];
    for (let run = 0; run < WARMUP + RUNS; run++) {
        const arg = setup && setup();
        const start = performance.now();
        fn(arg);
        const elapsed = performance.now() - start;
        if (run >= WARMUP) times.push(elapsed);
    }
    times.sort((a, b) => a - b);
    const best = times[0];
    const median = times[times.length >> 1];
    console.log(`${name}: ${best.toFixed(2)}ms best, ${median.toFixed(2)}ms median`);
}

bench(`push ${N}`, (f) => {
    for (let i = 0; i < N; i++) f.push(i, data[i]);
}, create);

bench(`pop ${N}`, (f) => {
    for (let i = 0; i < N; i++) f.pop();
}, () => {
    const f = create();
    for (let i = 0; i < N; i++) f.push(i, data[i]);
    return f;
});

bench(`push/pop ${N} (K=${K})`, (f) => {
    for (let i = 0; i < N; i += K) {
        for (let j = 0; j < K; j++) f.push(i, data[i + j]);
        for (let j = 0; j < K; j++) f.pop();
    }
}, create);
