function isScramble(s1: string, s2: string): boolean {
	const sequence = new Uint8Array(s1.length);
	for (let i = 0; i < sequence.length; ++i)
		sequence[i] = i;
	const scrambler = new Scrambler(
		sequence,
		convertStringToArray(s1),
		convertStringToArray(s2)
	);
	return scrambler.run();
}

function convertStringToArray(s: string): Uint8Array {
	const result: number[] = [];
	for (const character of s)
		result.push(character.charCodeAt(0));
	return new Uint8Array(result);
}

function compareOrdered(source: Uint8Array, order: Uint8Array, target: Uint8Array): boolean {
	for (let i = 0; i < order.length; ++i)
		if (source[order[i]] !== target[i])
			return false;
	return true;
}

class Scrambler {
	private bufferSequence: Uint8Array;
	public readonly visitedSequences: Set<number> = new Set();

	constructor(
		public sequence: Uint8Array,
		public readonly sourceText: Uint8Array,
		public readonly desiredText: Uint8Array,
	) {
		this.bufferSequence = new Uint8Array(sequence.length).fill(0);
	}

	run(): boolean {
		return this.next(0, this.sequence.length, 0);
	}

	private next(start: number, end: number, depth: number): boolean {
		if (this.check())
			return true;
		for (let i = start + 1; i < end; ++i) {
			let middle = i;
			if (this.next(start, middle, depth + 1))
				return true;
			if (this.next(middle, end, depth + 1))
				return true;

			middle = this.swap(start, middle, end);
			if (this.next(start, middle, depth + 1))
				return true;
			if (this.next(middle, end, depth + 1))
				return true;
			this.swap(start, middle, end);
		}
		return false;
	}

	private check() {
		return compareOrdered(this.sourceText, this.sequence, this.desiredText);
	}

	private swap(start: number, middle: number, end: number): number {
		const segmentLength = end - start;
		const offset = middle - start;
		for (let i = 0; i < this.sequence.length; ++i) {
			if (start <= i && i < end) {
				const index = start + (i - start - offset + segmentLength) % segmentLength;
				this.bufferSequence[index] = this.sequence[i];
			} else
				this.bufferSequence[i] = this.sequence[i];
		}
		const buffer = this.bufferSequence;
		this.bufferSequence = this.sequence;
		this.sequence = buffer;
		return start + segmentLength - offset;
	}
}

function getHash(array: Uint8Array) {
	let multiplier = 1;
	let sum = 0;
	for (const item of array) {
		multiplier *= array.length;
		sum += item * multiplier;
	}
	return sum;
}

export const isScrambleEx = isScramble;

if (import.meta.main) {
	//console.log(isScramble('great', 'rgeat'));
	//console.log(isScramble('abcde', 'caebd'));
	//console.log(isScramble('abcdbdacbdac', 'bdacabcdbdac'));
	console.log(isScramble('abcd', 'badc'));
}
