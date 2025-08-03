class Sequence {
	beginning: number = 0;
	ending: number = 0;
	duplicateCount: number = 0;
	get length() {
		return this.ending - this.beginning + 1;
	}
}

const map: Map<number, Sequence> = new Map();

function longestConsecutive(numbers: number[]): number {
	map.clear();
	let max = 0;
	function updateMax(sequence: Sequence) {
		if (max < sequence.length)
			max = sequence.length;
	}
	for (const value of numbers) {
		const centralSequence = map.get(value);
		if (centralSequence) {
			++centralSequence.duplicateCount;
			updateMax(centralSequence);
			continue;
		}
		const leftSequence = map.get(value - 1);
		const rightSequence = map.get(value + 1);
		if (leftSequence && !rightSequence) {
			leftSequence.ending = value;
			map.set(value, leftSequence);
			updateMax(leftSequence);
			continue;
		}
		if (!leftSequence && rightSequence) {
			rightSequence.beginning = value;
			map.set(value, rightSequence);
			updateMax(rightSequence);
			continue;
		}
		if (leftSequence && rightSequence) {
			map.set(value, leftSequence);
			leftSequence.ending = rightSequence.ending;
			for (let i = rightSequence.beginning; i <= rightSequence.ending; ++i)
				map.set(i, leftSequence);
			updateMax(leftSequence);
			continue;
		}
		if (!leftSequence && !rightSequence) {
			const sequence = new Sequence();
			sequence.beginning = sequence.ending = value;
			map.set(value, sequence);
			updateMax(sequence);
			continue;
		}
	}
	return max;
}

if (import.meta.main) {
	const nums = [1,0,1,2];
	console.log(nums.sort());
	console.log(longestConsecutive(nums));
}
