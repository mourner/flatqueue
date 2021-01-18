
import {test} from 'uvu';
import * as assert from 'uvu/assert';

import FlatQueue from './index.js';

const data = [];
for (let i = 0; i < 100; i++) {
    data.push(Math.floor(100 * Math.random()));
}

const sorted = data.slice().sort((a, b) => a - b);

test('maintains a priority queue', () => {
    const queue = new FlatQueue();
    for (let i = 0; i < data.length; i++) queue.push(i, data[i]);

    assert.is(queue.peekValue(), sorted[0]);
    assert.is(data[queue.peek()], sorted[0]);

    const result = [];
    while (queue.length) result.push(data[queue.pop()]);

    assert.equal(result, sorted);
});

test('handles edge cases with few elements', () => {
    const queue = new FlatQueue();

    queue.push(0, 2);
    queue.push(1, 1);
    queue.pop();
    queue.pop();
    queue.pop();
    queue.push(2, 2);
    queue.push(3, 1);
    assert.is(queue.pop(), 3);
    assert.is(queue.pop(), 2);
    assert.is(queue.pop(), undefined);
    assert.is(queue.peek(), undefined);
    assert.is(queue.peekValue(), undefined);
});

test('shrinks internal arrays when calling shrink', () => {
    const queue = new FlatQueue();

    for (let i = 0; i < 10; i++) queue.push(i, i);

    while (queue.length) queue.pop();

    assert.is(queue.ids.length, 10);
    assert.is(queue.values.length, 10);

    queue.shrink();

    assert.is(queue.ids.length, 0);
    assert.is(queue.values.length, 0);
});

test.run();
