class Item {
	constructor(public value: number, public time: number) {
	}
}

class LRUCache {
	private time: number = 0;
	readonly items = new Map<number, Item>;

	constructor(readonly capacity: number) {
	}
	
	get(key: number): number {
		const item = this.items.get(key);
		if (item) {
			item.time = this.time++;
			return item.value;
		}
		return -1;
	}
	
	put(key: number, value: number): void {
		let item = this.items.get(key);
		if (item) {
			item.value = value;
			item.time = this.time++;
			return;
		}
		item = new Item(value, this.time++);
		if (this.items.size >= this.capacity) {
			const deletedKey = this.findNewest();
			this.items.delete(deletedKey);
		}
		this.items.set(key, item);
	}

	private findNewest(): number {
		let minTime = 0, key = -1;
		const entries = this.items.entries();
		for (const entry of entries) {
			const time = entry[1].time;
			if (key === -1 || time < minTime) {
				key = entry[0];
				minTime = time;
			}
		}
		return key;
	}
}


/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

if (import.meta.main) {
	const lRUCache = new LRUCache(2);
	lRUCache.put(1, 1); // cache is {1=1}
	lRUCache.put(2, 2); // cache is {1=1, 2=2}
	lRUCache.get(1);    // return 1
	console.log(lRUCache)
	console.log('---');
	lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
	console.log(lRUCache)
	// lRUCache.get(2);    // returns -1 (not found)
	// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
	// lRUCache.get(1);    // return -1 (not found)
	// lRUCache.get(3);    // return 3
	// lRUCache.get(4);    // return 4
}
