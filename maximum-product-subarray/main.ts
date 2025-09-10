function maxProduct(nums: number[]): number {
	return new MaxProduct(nums).find() || 0;
}

class MaxProduct {
	constructor(private readonly items: number[]) {
	}

	find() {
		let product = this.items.reduce((a, b) => a * b, 1);
		let maxProduct = product;
		for (let start = 0; start < this.items.length - 1; ++start) {
			let subProduct = product;
			for (let end = this.items.length - 1; start < end ; --end) {
				subProduct = subProduct / this.items[end];
				if (maxProduct < subProduct)
					maxProduct = subProduct;
			}
			product = product / this.items[start];
			if (maxProduct < product)
				maxProduct = product;
		}
		return maxProduct;
	}
}


if (import.meta.main) {
	console.log(maxProduct([2,3,-2,4]));
	console.log(maxProduct([-2,0,-1]));
}
