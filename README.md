# flatqueue [![Build Status](https://github.com/mourner/flatqueue/workflows/Node/badge.svg?branch=master)](https://github.com/mourner/flatqueue/actions)

A very fast binary heap priority queue in JavaScript.
Similar to [tinyqueue](https://github.com/mourner/tinyqueue/),
but stores the queue as two flat arrays of items and their numeric priority values respectively
(without a way to specify a comparator function).
This makes the queue more limited, but several times faster.

```js
import FlatQueue from 'flatqueue';

const q = new FlatQueue();

for (let i = 0; i < items.length; i++) {
    // Push an item index and its priority value. You can push other values as well,
    // but storing only integers is much faster due to JavaScript engine optimizations.
    q.push(i, items[i].value);
}

q.peekValue(); // Read top item priority value
q.peek(); // Read top item index
q.pop(); // Remove and return the top item index
```

## API

### `new FlatQueue()`

Creates an empty queue object with the following methods and properties:

### `push(item, priority)`

Adds `item` to the queue with the specified `priority`.

`priority` must be a number. Items are sorted and returned from low to high priority.
Multiple items with the same priority value can be added to the queue, but the queue is not stable
(items with the same priority are not guaranteed to be popped in iteration order).

### `pop()`

Removes and returns the item from the head of this queue, which is one of the items with the lowest priority.
If this queue is empty, returns `undefined`.

### `peek()`

Returns the item from the head of this queue without removing it.
If this queue is empty, returns `undefined`.

### `peekValue()`

Returns the priority value of the item at the head of this queue without removing it.
If this queue is empty, returns `undefined`.

### `clear()`

Removes all items from the queue.

### `shrink()`

Shrinks the internal arrays to `this.length`.

`pop()` and `clear()` calls don't free memory automatically to avoid unnecessary resize operations.
This also means that items that have been added to the queue can't be garbage collected
until a new item is pushed in their place, or this method is called.

### `length`

Number of items in the queue. Read-only.
