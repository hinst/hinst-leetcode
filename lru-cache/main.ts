class Item {
	constructor(readonly key: number, public value: number, public time: number) {
	}
}

class LRUCache {
	private time: number = 0;
	readonly items: Item[] = [];

	constructor(readonly capacity: number) {
	}
	
	get(key: number): number {
		for (const item of this.items) {
			if (item.key === key) {
				item.time = this.time++;
				return item.value;
			}
		}
		return -1;
	}
	
	put(key: number, value: number): void {
		for (const item of this.items) {
			if (item.key === key) {
				item.value = value;
				item.time = this.time++;
				return;
			}
		}
		const item = new Item(key, value, this.time++);
		if (this.items.length < this.capacity) {
			this.items.push(item);
		} else {
			const index = this.findNewest();
			this.items[index] = item;
		}
	}

	private findNewest(): number {
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
