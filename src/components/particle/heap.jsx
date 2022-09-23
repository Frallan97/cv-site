// started with code by gyre
// https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

const topOfHeap = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class Heap {

	constructor(comparator = (a, b) => a > b, isEventQueue=false) {
		this._heap = [];
		this._comparator = isEventQueue ? this.eventComparator : comparator;
		this.isEventQueue = isEventQueue;
	}

	eventComparator(a, b) {
		return a.priority < b.priority;
	}

	heapify() {
		const elements = this._heap;
		this._heap = [];
		this.push(...elements);
	}

	peek() {
		return this.size() > 0 ? this._heap[topOfHeap] : undefined;
	}

	size() {
		return this._heap.length;
	}

	isEmpty() {
		return this.size() == 0;
	}

	push(...values) {
		values.forEach(value => {
			this._heap.push(value);
			if (this.isEventQueue) value.heapIndex = this._heap.length-1;
			
			this._siftUp();
		});
		return this.size();
	}

	pop() {
		const poppedValue = this.peek();
		const bottom = this.size() - 1;
		if (bottom > topOfHeap) {
			this._swap(topOfHeap, bottom);
		}
		this._heap.pop();
		this._siftDown();
		return poppedValue;
	}

	replace(value) {
		const replacedValue = this.peek();
		this._heap[topOfHeap] = value;
		this._siftDown();
		return replacedValue;
	}

	_greater(i, j) {
		return this._comparator(this._heap[i], this._heap[j]);
	}

	_swap(i, j) {
		[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];

		if (this.isEventQueue) {
			this._heap[i].heapIndex = i;
			this._heap[j].heapIndex = j;
		}
	}

	_siftUp(node=null) {
		node = node ? node : this.size() - 1;
		while (node > topOfHeap && this._greater(node, parent(node))) {
			this._swap(node, parent(node));
			node = parent(node);
		}
	}

	_siftDown(node=null) {
		node = node ? node : topOfHeap;
		while (
			(left(node) < this.size() && this._greater(left(node), node)) ||
			(right(node) < this.size() && this._greater(right(node), node))
		) {
			const maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
			this._swap(node, maxChild);
			node = maxChild;
		}
	}

	print() {
		this.isEventQueue ? console.log(this._heap.map(obj => obj.priority)) : console.log(this._heap);
	}

	popAll() {
		while (!this.isEmpty()) {
			this.isEventQueue ? console.log(this.pop().priority) : console.log(this.pop());
		}
	}

	assertHeapCondition() {
		for (let node = topOfHeap; node < this.size(); node++) {
			if (left(node) < this.size()) {
				if (this._greater(left(node), node)) {
					console.log(node, "has less priority than its child", left(node));
					return false;
				}
			}

			if (right(node) < this.size()) {
				if (this._greater(right(node), node)) {
					console.log(node, "has less priority than its child", right(node));
					return false;
				}
			}
		}
		console.log("HeapCondition is true.");
		return true;
	}

}

function testHeap() {
	console.log("Testing Heap.");
	const q = new Heap((a, b) => a < b);
	
	const sizeOfTest = 50;
	for (let i = 0; i < sizeOfTest; i++) {
		q.push(sizeOfTest * Math.random());
	}

	console.log("HeapCondition", q.assertHeapCondition());	
}

// testHeap();