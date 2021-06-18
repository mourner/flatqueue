# flatqueue [![Build Status](https://travis-ci.com/mourner/flatqueue.svg?branch=master)](https://travis-ci.com/mourner/flatqueue)

A very fast binary heap priority queue in JavaScript.
Similar to [tinyqueue](https://github.com/mourner/tinyqueue/),
but stores the queue as two flat arrays of items and their numeric priority values respectively
(without a way to specify a comparator function).
This makes the queue more limited, but several times faster.

```js
const queue = new FlatQueue();

const data = "Lorem ipsum dolor sit amet consetetur sadipscing elitr".split(" ");
for (const word of data) {
  const priority = word.length;
  queue.push(word, priority);
}

// Iterate through words from shortest to longest.
while (queue.length !== 0) {
  console.log(queue.pop());
}
```

## API

### `FlatQueue.push(item, priority)`

Adds `item` to the queue with the specified `priority`.

`priority` must be a number. Items are sorted and returned from low to high priority.
Multiple items with the same priority value can be added to the queue, but there is no guaranteed order between these items.

### `FlatQueue.pop()`

Removes and returns the item from the head of this queue, which is one of the items with the lowest priority.
If this queue is empty, returns `undefined`.

### `FlatQueue.peek()`

Returns the item from the head of this queue without removing it.
If this queue is empty, returns `undefined`.

### `FlatQueue.peekValue()`

Returns the priority value of the item at the head of this queue without removing it.
If this queue is empty, returns `undefined`.

### `FlatQueue.clear()`

Removes all items from the queue.

### `FlatQueue.shrink()`

Shrinks the internal arrays to `this.length`.

### `FlatQueue.length`

Number of items in the queue. Readonly.
