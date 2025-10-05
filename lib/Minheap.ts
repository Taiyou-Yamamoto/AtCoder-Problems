class MinHeap {
    private heap: any[];

    constructor() {
        this.heap = [];
    }

    push(el) {
        const heap = this.heap;
        heap.push(el);

        // 新しく追加したノードの位置
        let childIndex = heap.length - 1;
        while (childIndex > 0) {
            const parentIndex = Math.floor((childIndex - 1) / 2);

            if (heap[parentIndex][0] <= heap[childIndex][0]) break;

            [heap[parentIndex], heap[childIndex]] = [heap[childIndex], heap[parentIndex]];
            childIndex = parentIndex;
        }
    }

    pop() {
        const heap = this.heap;
        if (heap.length === 0) return null;

        const top = heap[0];
        const last = heap.pop();

        if (heap.length) {
            heap[0] = last;

            let parentIndex = 0;
            while (true) {
                let leftChildIndex = parentIndex * 2 + 1;
                let rightChildIndex = leftChildIndex + 1;
                let minIndex = parentIndex;

                if (leftChildIndex < heap.length && heap[leftChildIndex][0] < heap[minIndex][0]) {
                    minIndex = leftChildIndex;
                }
                if (rightChildIndex < heap.length && heap[rightChildIndex][0] < heap[minIndex][0]) {
                    minIndex = rightChildIndex;
                }
                if (minIndex === parentIndex) break;

                [heap[parentIndex], heap[minIndex]] = [heap[minIndex], heap[parentIndex]];
                parentIndex = minIndex;
            }
        }
        return top;
    }

    get size() {
        return this.heap.length;
    }
}
