function partition(s: string): string[][] {
    const p = new Partition(s);
	return p.find();
}

type Pair = [number, number];

class Partition {
	private readonly chains: string[][] = [];

	constructor(private readonly text: string) {
	}

	public find() {
		this.next(0, []);
		return this.chains;
	}

	private next(index: number, chain: Pair[]) {
		if (index >= this.text.length) {
			this.chains.push(chain.map(pair => this.text.substring(pair[0], pair[1])));
		}
		for (let i = index; i < this.text.length; ++i) {
			if (this.check(index, i)) {
				chain.push([index, i + 1]);
				this.next(i + 1, chain);
				chain.pop();
			}
		}
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


export const partitionEx = partition;

if (import.meta.main) {
	const s = 'aab';
	console.log(partition(s));
}
