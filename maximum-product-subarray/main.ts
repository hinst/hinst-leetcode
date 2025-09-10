function maxProduct(nums: number[]): number {
	return new MaxProduct(nums).find() || 0;
}

class MaxProduct {
	constructor(private readonly items: number[]) {
	}

	find() {
		let maxProduct: number | undefined = undefined;
		function updateMaxProduct(n: number) {
			if (maxProduct === undefined || maxProduct < n)
				maxProduct = n;
		}
		let start = 0;
		let i: number;
		for (i = 0; i < this.items.length; ++i) {
			if (this.items[i] === 0) {
				updateMaxProduct(0);
				if (start < i) {
					updateMaxProduct(this.findFragment(start, i));
					start = i + 1;
				}
			}
		}
		if (start < i) {
			updateMaxProduct(this.findFragment(start, i));
		}
		return maxProduct;
	}

	findFragment(fromStart: number, toEnd: number) {
		let product = this.items.reduce((a, b) => a * b, 1);
		let maxProduct = product;
		for (let start = fromStart; start < toEnd; ++start) {
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


export const maxProductEx = maxProduct;

if (import.meta.main) {
	console.log(maxProduct([2,3,-2,4]));
}
