function isScramble(s1: string, s2: string): boolean {
	const sequence = new Uint8Array(s1.length);
	for (let i = 0; i < sequence.length; ++i)
		sequence[i] = i;
	const desiredSequence = findSequence(s1, s2);
	if (!desiredSequence)
		return false;
	const scrambler = new Scrambler(sequence, desiredSequence);
	return scrambler.run();
}

function findSequence(s1: string, s2: string): Uint8Array | undefined {
	if (s1.length !== s2.length)
		return;
	const availableCharacters = new Map<string, number[]>();

	let characterIndex = 0;
	for (const character of s1) {
		const positions = availableCharacters.get(character) || [];
		positions.push(characterIndex);
		availableCharacters.set(character, positions);
		++characterIndex;
	}

	characterIndex = 0;
	const sequence = new Uint8Array(s1.length);
	for (const character of s2) {
		const positions = availableCharacters.get(character);
		if (!positions?.length)
			return;
		const position = positions.shift();
		sequence[characterIndex] = position ?? -1;
		++characterIndex;
	}
	return sequence;
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

class Scrambler {
	private bufferSequence: Uint8Array;
	public readonly visitedSequences: Set<number> = new Set();

	constructor(public sequence: Uint8Array, public readonly desiredSequence: Uint8Array) {
		this.bufferSequence = new Uint8Array(sequence.length).fill(0);
	}

	run(): boolean {
		return this.next(0, this.sequence.length, 0);
	}

	private next(start: number, end: number, depth: number): boolean {
		if (this.check())
			return true;
		for (let i = start + 1; i < end; ++i) {
			const hashInitial = getHash(this.sequence);

			let middle = i;
			if (this.next(start, middle, depth + 1))
				return true;
			if (this.next(middle, end, depth + 1))
				return true;

			const hashBefore = getHash(this.sequence);
			if (hashInitial !== hashBefore)
				throw new Error('initial hash error');
			middle = this.swap(start, middle, end);
			if (depth === 0)
				console.log(this.sequence.join());
			if (this.next(start, middle, depth + 1))
				return true;
			if (this.next(middle, end, depth + 1))
				return true;
			this.swap(start, middle, end);
			const hashAfter = getHash(this.sequence);

			if (hashBefore !== hashAfter)
				throw new Error('hash error');
		}
		return false;
	}

	check() {
		let found = true;
		for (let i = 0; i < this.desiredSequence.length; ++i)
			if (this.desiredSequence[i] !== this.sequence[i]) {
				found = false;
				break;
			}
		if (found)
			console.log('found', this.sequence);
		return found;
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

export const isScrambleEx = isScramble;

if (import.meta.main) {
	//console.log(isScramble('great', 'rgeat'));
	//console.log(isScramble('abcde', 'caebd'));
	console.log(isScramble('abcdbdacbdac', 'bdacabcdbdac'));
}
