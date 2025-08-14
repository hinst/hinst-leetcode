function minCut(s: string): number {
	const p = new Partition(s);
	return p.find() - 1;
}

class Partition {
	cache = new Map<number, number>();

	constructor(private readonly text: string) {
	}

	public find(): number {
		return this.next(0);
	}

	private next(index: number): number {
		if (index >= this.text.length) {
			return 0;
		}
		let min = this.cache.get(index);
		if (min !== undefined)
			return min;
		min = -1;
		for (let i = index; i < this.text.length; ++i) {
			if (this.check(index, i)) {
				const length = this.next(i + 1);
				if (-1 === min || length < min)
					min = length;
			}
		}
		++min;
		this.cache.set(index, min);
		return min;
	}

	check(a: number, b: number) {
		while (a < b) {
			if (this.text[a] !== this.text[b])
				return false;
			++a;
			--b;
		}
		return true;
	}
}


if (import.meta.main) {
	const s = 'aab';
	console.log(minCut(s));
}
