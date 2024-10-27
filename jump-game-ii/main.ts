class JumpGame {
	private readonly cache = new Map<number, number>();

	constructor(private readonly numbers: number[]) {
	}

	private jumpCached(index: number): number {
		let result = this.cache.get(index);
		if (result !== undefined)
			return result;
		result = this.jumpAt(index);
		this.cache.set(index, result);
		return result;
	}

	jumpAt(index: number): number {
		if (index === this.numbers.length - 1)
			return 0;
		if (index >= this.numbers.length)
			return -1;
		let min = -1;
		for (let i = this.numbers[index]; i > 0 ; --i) {
			const count = this.jumpCached(index + i);
			if (count !== -1) {
				if (min === -1 || count < min)
					min = count;
				if (min === 0)
					break;
			}
		}
		return min === -1 ? -1 : min + 1;
	}
}

function jump(numbers: number[]): number {
	return new JumpGame(numbers).jumpAt(0);
}

export const jumpExported = jump;

if (import.meta.main) {
	console.log(jump([2,3,1,1,4]));
}
