function minCut(s: string): number {
	const p = new Partition(s);
	return p.find() - 1;
}

type Pair = [number, number];

class Partition {
	constructor(private readonly text: string) {
	}

	public find(): number {
		return this.next(0);
	}

	private next(index: number): number {
		if (index >= this.text.length) {
			return 0;
		}
		let min = -1;
		for (let i = index; i < this.text.length; ++i) {
			if (this.check(index, i)) {
				const length =  this.next(i + 1);
				if (-1 === min || length < min)
					min = length;
			}
		}
		return 1 + min;
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
