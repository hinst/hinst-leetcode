function numDistinct(s: string, t: string): number {
	const finder = new Finder(s, t);
	return finder.find(0, 0);
}

/** Input string length limit */
const LIMIT = 1000;

function getKey(sourcePosition: number, targetPosition: number): number {
	return sourcePosition + targetPosition * LIMIT;
}

class Finder {
	private readonly cache = new Map<number, number>();

	constructor(
		private readonly source: string,
		private readonly target: string
	) {}

	find(sourcePosition: number, targetPosition: number): number {
		const remainingSourceLength = this.source.length - sourcePosition;
		const remainingTargetLength = this.target.length - targetPosition;
		if (remainingSourceLength < remainingTargetLength)
			return 0;

		const cacheKey = getKey(sourcePosition, targetPosition);
		const cachedCount = this.cache.get(cacheKey);
		if (cachedCount !== undefined)
			return cachedCount;

		if (this.target.length <= targetPosition)
			return 1;
		const desiredCharacter = this.target[targetPosition];
		++targetPosition;
		let count = 0;
		while (true) {
			const nextSourcePosition = this.source.indexOf(desiredCharacter, sourcePosition);
			if (nextSourcePosition < 0)
				break;
			sourcePosition = nextSourcePosition + 1;
			count += this.find(sourcePosition, targetPosition);
		}
		this.cache.set(cacheKey, count);

		return count;
	}
}


export const numDistinctEx = numDistinct;

if (import.meta.main) {
	const s = "rabbbit", t = "rabbit";
	console.log(numDistinct(s, t));
}
