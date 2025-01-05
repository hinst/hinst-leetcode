function isScramble(s1: string, s2: string): boolean {
	const scrambler = new Scrambler(convertStringToArray(s2));
	return scrambler.run(convertStringToArray(s1));
}

class Slice {
	public flip: boolean = false;
	public matched?: boolean;

	constructor(
		public readonly start: number,
		public middle: number,
		public readonly end: number,
	) {}

	clone(): Slice {
		return new Slice(this.start, this.middle, this.end);
	}

	get size() {
		return this.end - this.start;
	}
}

class Scrambler {
	iterationCount = 0;

	constructor(
		public readonly desiredText: number[],
	) {}

	run(sequence: number[]): boolean {
		return this.next(sequence, [new Slice(0, 1, sequence.length)], 0);
	}

	private next(sequence: number[], slices: Slice[], depth: number): boolean {
		const matched = this.check(sequence, slices);
		if (++this.iterationCount % 100_000 === 0) {
			console.timeEnd('' + (this.iterationCount - 100_000));
			console.log('-'.repeat(depth), this.getText(sequence, slices), matched, this.iterationCount);
			console.time('' + this.iterationCount);
		}
		if (matched)
			return true;
		if (false === matched)
			return false;
		const liveSlices = slices.filter(slice => slice.size > 1);
		do {
			do {
				// console.log('-'.repeat(depth), liveSlices.map(slice => slice.flip ? 1 : 0).join(''));
				const newSequence = sequence.slice(0);
				const newSlices: Slice[] = [];
				for (const slice of slices) {
					if (slice.size > 1)
						if (slice.flip) {
							// console.log('s'.repeat(depth), sequence);
							const middle = swap(newSequence.slice(0), newSequence,
								slice.start, slice.middle, slice.end);
							// console.log('w'.repeat(depth), newSequence);
							newSlices.push(
								new Slice(slice.start, slice.start + 1, middle),
								new Slice(middle, middle + 1, slice.end),
							);
						} else
							newSlices.push(
								new Slice(slice.start, slice.start + 1, slice.middle),
								new Slice(slice.middle, slice.middle + 1, slice.end),
							);
					else
						newSlices.push(slice);
				}
				if (this.next(newSequence, newSlices, depth + 1))
					return true;
			} while (advanceFlip(liveSlices));
		} while (advanceLimited(liveSlices));
		return false;
	}

	private check(sequence: number[], slices: Slice[]) {
		return compareSliced(sequence, this.desiredText, slices);
	}

	private getText(sequence: number[], slices: Slice[]) {
		let text = '';
		for (const slice of slices) {
			text += '[';
			for (let i = slice.start; i < slice.end; ++i)
				text += String.fromCharCode(sequence[i]);
			text += ']';
		}
		return text;
	}
}

function swap(sequence: number[], result: number[], start: number, middle: number, end: number): number {
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

function convertStringToArray(s: string): number[] {
	const result: number[] = [];
	for (const character of s)
		result.push(character.charCodeAt(0));
	return result;
}

/** @returns true if further advancement is possible */
function advanceLimited(slices: Slice[]) {
	let sum = 1;
	for (let i = 0; i < slices.length; ++i) {
		if (slices[i].size <= 1)
			throw new Error('why');
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
		if (slices[i].size <= 1)
			throw new Error('why');
		if (slices[i].flip)
			slices[i].flip = false;
		else {
			slices[i].flip = true;
			return true;
		}
	}
	return false;
}

function compareArrays(source: number[], target: number[]): boolean {
	for (let i = 0; i < target.length; ++i)
		if (source[i] !== target[i])
			return false;
	return true;
}

function compareSliced(source: number[], target: number[], slices: Slice[]): boolean | undefined {
	let exactMatch = true;
	for (const slice of slices) {
		if (slice.matched === false)
			return false;
		if (slice.matched === true)
			continue;
		if (slice.size > 1) {
			const sourcePart = source.slice(slice.start, slice.end);
			const targetPart = target.slice(slice.start, slice.end);
			if (exactMatch)
				exactMatch = compareArrays(sourcePart, targetPart);
			sourcePart.sort();
			targetPart.sort();
			slice.matched = compareArrays(sourcePart, targetPart);
		} else
			slice.matched = source[slice.start] === target[slice.start];
		if (!slice.matched)
			return false;
	}
	return exactMatch || undefined;
}

function getHash(array: number[]) {
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
	console.time('time');
	isScramble('eebaacbcbcadaaedceaaacadccd', 'eadcaacabaddaceacbceaabeccd');
	console.timeEnd('time');
}
