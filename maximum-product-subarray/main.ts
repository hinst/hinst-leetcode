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
				if (start < i)
					updateMaxProduct(this.findFragment(start, i));
				start = i + 1;
			}
		}
		if (start < i) {
			updateMaxProduct(this.findFragment(start, i));
		}
		return maxProduct;
	}

	findFragment(fromStart: number, toEnd: number) {
		let maxProduct = this.items[fromStart];
		for (let start = fromStart; start < toEnd; ++start) {
			let product = 1;
			for (let i = start; i < toEnd; ++i) {
				product *= this.items[i];
				if (maxProduct === undefined || maxProduct < product)
					maxProduct = product;
			}
		}
		return maxProduct;
	}
}


export const maxProductEx = maxProduct;

if (import.meta.main) {
	console.log(maxProduct([0,2]));
}
