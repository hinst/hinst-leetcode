class Item {
	constructor(readonly key: number, readonly value: number, readonly time: number) {
	}
}

class LRUCache {
	private time: number = 0;
	readonly items: Item[] = [];

	constructor(readonly capacity: number) {
		
	}
	
	get(key: number): number {
		for (const item of this.items) {
			if (item.key === key)
				return item.value;
		}
		return -1;
	}
	
	put(key: number, value: number): void {
		const item = new Item(key, value, this.time++);
		if (this.items.length < this.capacity) {
			this.items.push(item);
		} else {
			const index = this.findOldest();
			this.items[index] = item;
		}
	}

	private findOldest(): number {
		let minTime = 0, index = -1;
		for (let i = 0; i < this.items.length; ++i) {
			if (index === -1 || this.items[i].time < minTime) {
				index = i;
				minTime = this.items[i].time;
			}
		}
		return index;
	}
}


/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

if (import.meta.main) {
}
