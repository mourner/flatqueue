## flatqueue

A very fast binary heap priority queue in JavaScript.
Similar to [tinyqueue](https://github.com/mourner/tinyqueue/),
but stores the queue as two flat arrays of item ids and their numeric priority values respectively
(without a way to specify a comparator function).
This makes the queue more limited, but several times faster.

```js
const q = new FlatQueue();

for (let i = 0; i < items.length; i++) {
    q.push(i, items[i].value); // push an item by passing its id and value
}

q.peekValue(); // top item value
q.peek(); // top item index
q.pop(); // remove and return the top item index
```
