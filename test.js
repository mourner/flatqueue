
import FlatQueue from './index.js';
import test from 'tape';

const data = [];
for (let i = 0; i < 100; i++) {
    data.push(Math.floor(100 * Math.random()));
}

const sorted = data.slice().sort((a, b) => a - b);

test('maintains a priority queue', (t) => {
    const queue = new FlatQueue();
    for (let i = 0; i < data.length; i++) queue.push(i, data[i]);

    t.equal(queue.peekValue(), sorted[0]);
    t.equal(data[queue.peek()], sorted[0]);

    const result = [];
    while (queue.length) result.push(data[queue.pop()]);

    t.same(result, sorted);

    t.end();
});

test('handles edge cases with few elements', (t) => {
    const queue = new FlatQueue();

    queue.push(0, 2);
    queue.push(1, 1);
    queue.pop();
    queue.pop();
    queue.pop();
    queue.push(2, 2);
    queue.push(3, 1);
    t.equal(queue.pop(), 3);
    t.equal(queue.pop(), 2);
    t.equal(queue.pop(), undefined);
    t.equal(queue.peek(), undefined);
    t.equal(queue.peekValue(), undefined);

    t.end();
});

test('shrinks internal arrays when calling shrink', (t) => {
    const queue = new FlatQueue();

    for (let i = 0; i < 10; i++) queue.push(i, i);

    while (queue.length) queue.pop();

    t.equal(queue.ids.length, 10);
    t.equal(queue.values.length, 10);

    queue.shrink();

    t.equal(queue.ids.length, 0);
    t.equal(queue.values.length, 0);

    t.end();
});
