class Permutations {
	constructor(
		public readonly array: Uint8Array,
		public readonly limit: number,
	) {
	}

	private counter: number = 0;

	public next(index: number) {
		if (index === this.array.length) {
			this.counter++;
			console.log(this.counter, this.array.join(''));
			return;
		}
		for (let i = index; i < this.array.length; ++i) {
			this.swap(index, i);
			this.next(index + 1);
			if (this.counter >= this.limit)
				return;
			this.swap(index, i);
		}
	}

	private swap(a: number, b: number) {
		if (a === b)
			return;
		const buffer = this.array[a];
		this.array[a] = this.array[b];
		this.array[b] = buffer;
	}
}

function getPermutation(n: number, k: number): string {
	const array = new Uint8Array(n);
	for (let i = 0; i < n; ++i)
		array[i] = i + 1;
	const permutations = new Permutations(array, k);
	permutations.next(0);
	return permutations.array.join('');
}

if (import.meta.main) {
	console.log(getPermutation(5, 10));
}
