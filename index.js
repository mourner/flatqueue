
/**
 * @typedef {Float64ArrayConstructor | Float32ArrayConstructor |
 *   Uint32ArrayConstructor | Int32ArrayConstructor | Uint16ArrayConstructor |
 *   Int16ArrayConstructor | Uint8ArrayConstructor | Int8ArrayConstructor} TypedArrayConstructor
 */

/** @template [T=number] */
export default class FlatQueue {

    /**
     * Creates an empty queue. If `capacity` is provided, the queue is backed by fixed-size typed
     * arrays for better performance and memory use, but can't grow beyond `capacity`. `values` uses
     * `ValuesArray` (default `Float64Array`) and `ids` uses `IdsArray` (default `Uint32Array`); pass
     * narrower constructors like `Uint16Array` if your values or ids are known to fit them.
     *
     * @param {number} [capacity]
     * @param {TypedArrayConstructor} [ValuesArray]
     * @param {TypedArrayConstructor} [IdsArray]
     */
    constructor(capacity = Infinity, ValuesArray = Float64Array, IdsArray = Uint32Array) {
        const fixed = capacity !== Infinity;

        /** @type {T[]} */
        this.ids = fixed ? /** @type {T[]} */ (/** @type {unknown} */ (new IdsArray(capacity))) : [];

        /** @type {number[]} */
        this.values = fixed ? /** @type {number[]} */ (/** @type {unknown} */ (new ValuesArray(capacity))) : [];

        /** Maximum number of items the queue can hold; `Infinity` for regular-array queues, which grow on demand. */
        this.capacity = capacity;

        /** Number of items in the queue. */
        this.length = 0;
    }

    /** Removes all items from the queue. */
    clear() {
        this.length = 0;
    }

    /**
     * Adds `item` to the queue with the specified `priority`.
     *
     * `priority` must be a number. Items are sorted and returned from low to high priority. Multiple items
     * with the same priority value can be added to the queue, but there is no guaranteed order between these items.
     *
     * For fixed-capacity queues, throws a `RangeError` if the queue is already full.
     *
     * @param {T} item
     * @param {number} priority
     */
    push(item, priority) {
        if (this.length === this.capacity) throw new RangeError('Queue is at capacity.');

        let pos = this.length++;

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const parentValue = this.values[parent];
            if (priority >= parentValue) break;
            this.ids[pos] = this.ids[parent];
            this.values[pos] = parentValue;
            pos = parent;
        }

        this.ids[pos] = item;
        this.values[pos] = priority;
    }

    /**
     * Removes and returns the item from the head of this queue, which is one of
     * the items with the lowest priority. If this queue is empty, returns `undefined`.
     */
    pop() {
        if (this.length === 0) return undefined;

        const ids = this.ids,
            values = this.values,
            top = ids[0],
            last = --this.length;

        if (last > 0) {
            const id = ids[last];
            const value = values[last];
            let pos = 0;
            const halfLen = last >> 1;

            while (pos < halfLen) {
                const left = (pos << 1) + 1;
                const right = left + 1;
                const child = left + (+(right < last) & +(values[right] < values[left]));
                if (values[child] >= value) break;
                ids[pos] = ids[child];
                values[pos] = values[child];
                pos = child;
            }

            ids[pos] = id;
            values[pos] = value;
        }

        return top;
    }

    /** Returns the item from the head of this queue without removing it. If this queue is empty, returns `undefined`. */
    peek() {
        return this.length > 0 ? this.ids[0] : undefined;
    }

    /**
     * Returns the priority value of the item at the head of this queue without
     * removing it. If this queue is empty, returns `undefined`.
     */
    peekValue() {
        return this.length > 0 ? this.values[0] : undefined;
    }

    /**
     * Shrinks the internal arrays to `this.length`. No-op for queues with fixed capacity.
     *
     * `pop()` and `clear()` calls don't free memory automatically to avoid unnecessary resize operations.
     * This also means that items that have been added to the queue can't be garbage collected until
     * a new item is pushed in their place, or this method is called.
     */
    shrink() {
        if (Array.isArray(this.ids)) this.ids.length = this.length;
        if (Array.isArray(this.values)) this.values.length = this.length;
    }
}
