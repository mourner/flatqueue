# flatqueue

A very fast and tiny binary heap priority queue in JavaScript.

Similar to [tinyqueue](https://github.com/mourner/tinyqueue/),
but stores the queue as two flat arrays of items and their numeric priority values respectively
(without a way to specify a comparator function).
This makes the queue more limited, but several times faster.

[![Build Status](https://github.com/mourner/flatqueue/actions/workflows/node.yml/badge.svg)](https://github.com/mourner/flatqueue/actions/workflows/node.yml)
[![Simply Awesome](https://img.shields.io/badge/simply-awesome-brightgreen.svg)](https://github.com/mourner/projects)

## Usage

```js
const q = new FlatQueue();

for (let i = 0; i < items.length; i++) {
    // Push an item index and its priority value. You can push other values as well,
    // but storing only integers is much faster due to JavaScript engine optimizations.
    q.push(i, items[i].priority);
}

q.peekValue(); // Read the top item's priority value
q.peek(); // Read the top item
q.pop(); // Remove and return the top item
```

## Install

Install with `npm install flatqueue`, then use as a module:

```js
import FlatQueue from 'flatqueue';
```

Alternatively, use as a module in a browser directly:

```html
<script type="module">
    import FlatQueue from 'https://cdn.jsdelivr.net/npm/flatqueue/+esm';
```

There's also a UMD bundle that exposes a global `FlatQueue` global variable:

```html
<script src="https://cdn.jsdelivr.net/npm/flatqueue"></script>
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

### `ids`

An underlying array of items. Note that it can be bigger than the `length` as it's not eagerly cleared.

### `values`

An underlying array of priority values. Note that it can be bigger than the `length` as it's not eagerly cleared.

### Using typed arrays

If you know the maximum queue size beforehand, you can override the queue to use typed arrays for better performance and memory footprint. This makes it match the performance of the popular [heapify](https://github.com/luciopaiva/heapify) library.

```js
const q = new FlatQueue();
q.ids = new Uint16Array(32);
q.values = new Uint32Array(32);
```
