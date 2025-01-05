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

class Scrambler {
	public readonly visitedSequences: Set<number> = new Set();

	constructor(
		public readonly sourceText: Uint8Array,
		public readonly desiredText: Uint8Array,
	) {}

	run(sequence: Uint8Array): boolean {
		return this.next(sequence, [new Slice(0, 1, sequence.length)], 0);
	}

	private next(sequence: Uint8Array, slices: Slice[], depth: number): boolean {
		const matched = this.check(sequence, slices);
		console.log('-'.repeat(depth), this.getText(sequence, slices), matched);
		if (matched)
			return true;
		if (false === matched)
			return false;
		do {
			do {
				const newSequence = sequence.slice(0);
				const newSlices: Slice[] = [];
				for (const slice of slices) {
					if (slice.flip) {
						const middle = swap(sequence, newSequence,
							slice.start, slice.middle, slice.end);
						newSlices.push(
							new Slice(slice.start, slice.start + 1, middle),
							new Slice(middle, middle + 1, slice.end),
						);
					} else
						newSlices.push(
							new Slice(slice.start, slice.start + 1, slice.middle),
							new Slice(slice.middle, slice.middle + 1, slice.end),
						);
				}
				if (this.next(newSequence, newSlices, depth + 1))
					return true;
			} while (advanceFlip(slices));
		} while (advanceLimited(slices));
		return false;
	}

	private check(sequence: Uint8Array, slices: Slice[]) {
		const source = sequence.map(index => this.sourceText[index]);
		if (compareArrays(source, this.desiredText))
			return true;
		if (compareSliced(source, this.desiredText, slices))
			return undefined;
		return false;
	}

	private getText(sequence: Uint8Array, slices: Slice[]) {
		let text = '';
		for (const slice of slices) {
			text += '[';
			for (let i = slice.start; i < slice.end; ++i) {
				text += String.fromCharCode(this.sourceText[sequence[i]]);
			}
			text += ']';
		}
		return text;
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
			slices[i].middle = slices[i].start + 1;
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

function compareArrays(source: Uint8Array, target: Uint8Array): boolean {
	for (let i = 0; i < target.length; ++i)
		if (source[i] !== target[i])
			return false;
	return true;
}

function compareSliced(source: Uint8Array, target: Uint8Array, slices: Slice[]): boolean {
	for (const slice of slices) {
		const sourcePart = source.slice(slice.start, slice.end).sort();
		const targetPart = target.slice(slice.start, slice.end).sort();
		if (!compareArrays(sourcePart, targetPart))
			return false;
	}
	return true;
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
	// console.log(isScramble('great', 'rgeat'));
	// console.log(isScramble('abcde', 'caebd'));
	// console.log(isScramble('abcdbdacbdac', 'bdacabcdbdac'));
	console.log(isScramble('abcd', 'badc'));
}
