function minCut(s: string): number {
	const p = new Partition(s);
	return p.find();	
}

type Pair = [number, number];

class Partition {
	private readonly chains: string[][] = [];

	constructor(private readonly text: string) {
	}

	public find(): number {
		return this.next(0, []);
	}

	private next(index: number, chain: Pair[]): number {
		if (index >= this.text.length) {
			return chain.length - 1;
		}
		let min = -1;
		for (let i = index; i < this.text.length; ++i) {
			if (this.check(index, i)) {
				chain.push([index, i + 1]);
				const length =  this.next(i + 1, chain);
				if (-1 === min || length < min)
					min = length;
				chain.pop();
			}
		}
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
