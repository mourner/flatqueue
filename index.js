
export default class FlatQueue {

    constructor() {
        this.ids = [];
        this.values = [];
        this.length = 0;
    }

    clear() {
        this.length = 0;
    }

    push(id, value) {
        let pos = this.length++;

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const parentValue = this.values[parent];
            if (value >= parentValue) break;
            this.ids[pos] = this.ids[parent];
            this.values[pos] = parentValue;
            pos = parent;
        }

        this.ids[pos] = id;
        this.values[pos] = value;
    }

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

    peek() {
        if (this.length === 0) return undefined;
        return this.ids[0];
    }

    peekValue() {
        if (this.length === 0) return undefined;
        return this.values[0];
    }

    shrink() {
        this.ids.length = this.values.length = this.length;
    }
}
