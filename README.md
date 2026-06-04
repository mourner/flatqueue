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

For legacy environments requiring CommonJS or a UMD bundle, use `flatqueue` v2.

## API

### `new FlatQueue([capacity[, ValuesArray[, IdsArray]]])`

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

### `capacity`

Maximum number of items the queue can hold, or `Infinity` for a regular-array queue (created without a `capacity`). Read-only.

### `ids`

An underlying array of items. Note that it can be bigger than the `length` as it's not eagerly cleared.

### `values`

An underlying array of priority values. Note that it can be bigger than the `length` as it's not eagerly cleared.

### Using typed arrays

If `capacity` is provided, the queue is backed by fixed-size typed arrays instead of regular arrays, which is faster
and uses less memory, matching the performance of the popular [heapify](https://github.com/luciopaiva/heapify) library,
but the queue can't grow past `capacity`, throwing a `RangeError`. This is ideal when the maximum size is known upfront.

`values` uses `ValuesArray` (default `Float64Array`) and `ids` uses `IdsArray` (default `Uint32Array`);
pass narrower constructors like `Uint16Array` if your priorities or ids are known to fit them.

```js
// a queue up to 10000 nodes, with Uint32 priorities and Uint16 ids
const q = new FlatQueue(64, Uint32Array, Uint16Array);
```
