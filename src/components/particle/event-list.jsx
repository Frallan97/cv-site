class EventList {
	constructor(id, eventQueue) {
		this.id = id;
		this.events = [];
		this.priority = Infinity;
		this.heapIndex = null;
		this.eventQueue = eventQueue;

    eventQueue.push(this);
	}

	get() {
		return this.events[0];
	}

	add(event) {

		if (this.events.length === 0) {
			this.events.push(event);
			this.updatePriority();
			return;
		}

		// TODO Add a check for if this event already exists in the list
		// For example, the following events are equivalent
		// { ball1: 'A', ball2: 'B' }
		// { ball1: 'B', ball2: 'A' }

		const eventAdded = this.events.some(({ priority }, i) => {
			if (priority <= event.priority) return false;

			this.events.splice(i, 0, event);
			this.updatePriority();
			return true;
		});

		if (!eventAdded) this.events.push(event);
	}

	remove(id) {
		this.events.forEach((event, i) => {
			const { ball1, ball2 } = event;
			if (ball1 && ball1.id === id ||
					ball2 && ball2.id === id) {

				this.events.splice(i, 1);
				if (i === 0) this.updatePriority();
			}
		});
	}

	clear() {
		this.events.forEach(event => {
			const { ball1, ball2 } = event;
			if (ball1 && ball1.id !== this.id) ball1.eventList.remove(this.id);
			if (ball2 && ball2.id !== this.id) ball2.eventList.remove(this.id);
		});

		this.events.length = 0;
		this.updatePriority();
	}

	updatePriority() {
		const oldPriority = this.priority;

		this.priority = this.events.length !== 0 ? this.events[0].priority : Infinity;

		// Update heap
		if (this.priority > oldPriority) {
			// console.log("heap index before siftdown", this.heapIndex);
			this.eventQueue._siftDown(this.heapIndex);
		} else if (this.priority < oldPriority) {
			// console.log("heap index before siftup", this.heapIndex, ", queue size:", this.eventQueue.size());
			this.eventQueue._siftUp(this.heapIndex);
		}

		return this.priority;
	}
}
