
export default class FlatQueue {

    constructor() {
        this.ids = [];
        this.values = [];
        this.length = 0;
    }

    clear() {
        this.length = this.ids.length = this.values.length = 0;
    }

    push(id, value) {
        this.ids.push(id);
        this.values.push(value);
        this.length++;
        this._up(this.length - 1);
    }

    pop() {
        if (this.length === 0) return undefined;

        const top = this.ids[0];
        this.length--;

        if (this.length > 0) {
            this.ids[0] = this.ids[this.length];
            this.values[0] = this.values[this.length];
            this._down(0);
        }
        this.ids.pop();
        this.values.pop();

        return top;
    }

    peek() {
        return this.ids[0];
    }

    peekValue() {
        return this.values[0];
    }

    _up(pos) {
        const index = this.ids[pos];
        const value = this.values[pos];

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const parentValue = this.values[parent];
            if (value >= parentValue) break;
            this.ids[pos] = this.ids[parent];
            this.values[pos] = parentValue;
            pos = parent;
        }

        this.ids[pos] = index;
        this.values[pos] = value;
    }

    _down(pos) {
        const halfLength = this.length >> 1;
        const index = this.ids[pos];
        const value = this.values[pos];

        while (pos < halfLength) {
            let left = (pos << 1) + 1;
            const right = left + 1;
            let bestIndex = this.ids[left];
            let bestValue = this.values[left];
            const rightValue = this.values[right];

            if (right < this.length && rightValue < bestValue) {
                left = right;
                bestIndex = this.ids[right];
                bestValue = rightValue;
            }
            if (bestValue >= value) break;

            this.ids[pos] = bestIndex;
            this.values[pos] = bestValue;
            pos = left;
        }

        this.ids[pos] = index;
        this.values[pos] = value;
    }
}
