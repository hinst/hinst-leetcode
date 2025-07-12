function numDistinct(s: string, t: string): number {
	const finder = new Finder(s, t);
	finder.find(0, 0);
	return finder.count;
}

class Finder {
	count = 0;

	constructor(
		private readonly source: string,
		private readonly target: string
	) {}

	find(sourcePosition: number, targetPosition: number) {
		if (this.target.length <= targetPosition) {
			++this.count;
			return;
		}
		const desiredCharacter = this.target[targetPosition];
		++targetPosition;
		while (true) {
			const nextSourcePosition = this.source.indexOf(desiredCharacter, sourcePosition);
			if (nextSourcePosition < 0)
				break;
			sourcePosition = nextSourcePosition + 1;
			this.find(sourcePosition, targetPosition);
		}
	}
}


export const numDistinctEx = numDistinct;

if (import.meta.main) {
	const s = "rabbbit", t = "rabbit";
	console.log(numDistinct(s, t));
}
