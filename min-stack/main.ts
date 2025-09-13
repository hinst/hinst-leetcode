class Item {
	constructor(
		public readonly value: number,
		public readonly previous?: Item
	) {}
}

class BaseStack {
	protected item?: Item;

	constructor() {
	}

	push(value: number): void {
		this.item = new Item(value, this.item);
	}

	pop(): void {
		if (this.item)
			this.item = this.item.previous;
	}

	top(): number {
		return this.item?.value ?? Infinity;
	}
}

class MinStack extends BaseStack {
	min = new BaseStack();

	override push(value: number): void {
		super.push(value);
		const min = this.min.top();
		if (Infinity === min || value <= min)
			this.min.push(value);
	}

	override pop(): void {
		const value = super.top();
	  	super.pop();
		if (this.min.top() === value)
			this.min.pop();
	}

	getMin(): number {
		return this.min.top();
	}
}


/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

if (import.meta.main) {
	const stack = new MinStack();
	stack.push(-2);
	stack.push(0);
	stack.push(-3);
	console.log(stack.getMin());
	stack.pop();
	console.log(stack.top());
}