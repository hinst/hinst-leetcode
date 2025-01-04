function isScramble(s1: string, s2: string): boolean {
	const sequence = new Uint8Array(s1.length);
	for (let i = 0; i < sequence.length; ++i)
		sequence[i] = i;
	const scrambler = new Scrambler(sequence);
	scrambler.run();
}

class Scrambler {
	private bufferSequence: Uint8Array;
	constructor(public sequence: Uint8Array) {
		this.bufferSequence = new Uint8Array(sequence.length).fill(0);
	}

	run() {
		this.next(1, this.sequence.length);
	}

	next(start: number, end: number) {
		const segmentLength = end - start;
		for (let i = start + 1; i < end; ++i) {
			let middle = i;
			this.check();
			middle = this.swap(start, middle, end);
			this.check();
			//this.next(start, middle);
			//this.next(middle, end);
			this.swap(start, middle, end);
			this.check();
			console.log('---');
		}
	}

	check() {
		console.log(this.sequence);
	}

	private swap(start: number, middle: number, end: number): number {
		const segmentLength = end - start;
		const offset = middle - start;
		console.log({start, middle, offset, end});
		for (let i = 0; i < this.sequence.length; ++i) {
			if (start <= i && i < end) {
				const index = start + (i - start + offset) % segmentLength;
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

if (import.meta.main) {
	console.log(isScramble("great", "rgeat"));
}
