function isScramble(s1: string, s2: string): boolean {
	const sequence = new Uint8Array(s1.length);
	for (let i = 0; i < sequence.length; ++i)
		sequence[i] = i;
	const scrambler = new Scrambler(
		convertStringToArray(s1),
		convertStringToArray(s2)
	);
	return scrambler.run(sequence);
}

class Slice {
	public flip: boolean = false;

	constructor(
		public readonly start: number,
		public middle: number,
		public readonly end: number,
	) {}

	clone(): Slice {
		return new Slice(this.start, this.middle, this.end);
	}
}

function compareOrdered(source: Uint8Array, order: Uint8Array, target: Uint8Array): boolean {
	for (let i = 0; i < order.length; ++i)
		if (source[order[i]] !== target[i])
			return false;
	return true;
}

class Scrambler {
	public readonly visitedSequences: Set<number> = new Set();

	constructor(
		public readonly sourceText: Uint8Array,
		public readonly desiredText: Uint8Array,
	) {}

	run(sequence: Uint8Array): boolean {
		return this.next(sequence, [new Slice(0, 0, sequence.length)], 0);
	}

	private next(sequence: Uint8Array, slices: Slice[], depth: number): boolean {
		if (this.check(sequence))
			return true;
		while (advanceLimited(slices)) {
			do {
				const newSequence = sequence.slice(0);
				const newSlices: Slice[] = [];
				for (const slice of slices) {
					if (slice.flip) {
						const middle = swap(sequence, newSequence,
							slice.start, slice.middle, slice.end);
						newSlices.push(
							new Slice(slice.start, slice.start, middle),
							new Slice(middle, middle, slice.end),
						);
					} else
						newSlices.push(
							new Slice(slice.start, slice.start, slice.middle),
							new Slice(slice.middle, slice.middle, slice.end),
						);
				}
				if (this.next(newSequence, newSlices, depth + 1))
					return true;
			} while (advanceFlip(slices));
		}
		return false;
	}

	private check(sequence: Uint8Array) {
		return compareOrdered(this.sourceText, sequence, this.desiredText);
	}
}

function swap(sequence: Uint8Array, result: Uint8Array, start: number, middle: number, end: number): number {
	const segmentLength = end - start;
	const offset = middle - start;
	for (let i = 0; i < sequence.length; ++i) {
		if (start <= i && i < end) {
			const index = start + (i - start - offset + segmentLength) % segmentLength;
			result[index] = sequence[i];
		} else
			result[i] = sequence[i];
	}
	return start + segmentLength - offset;
}

function convertStringToArray(s: string): Uint8Array {
	const result: number[] = [];
	for (const character of s)
		result.push(character.charCodeAt(0));
	return new Uint8Array(result);
}

/** @returns true if further advancement is possible */
function advanceLimited(slices: Slice[]) {
	let sum = 1;
	for (let i = 0; i < slices.length; ++i) {
		slices[i].middle += sum;
		if (slices[i].middle >= slices[i].end)
			slices[i].middle = slices[i].start;
		else
			sum = 0;
	}
	return !sum;
}

/** @returns true if further advancement is possible */
function advanceFlip(slices: Slice[]) {
	for (let i = 0; i < slices.length; ++i) {
		if (slices[i].flip)
			slices[i].flip = false;
		else {
			slices[i].flip = true;
			return true;
		}
	}
	return false;
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
	console.log(isScramble('abcdbdacbdac', 'bdacabcdbdac'));
}
