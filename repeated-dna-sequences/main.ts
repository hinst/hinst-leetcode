const SEQUENCE_LENGTH = 10;

function findRepeatedDnaSequences(s: string): string[] {
	const sequences = new Set<string>();
	for (let i = 0; i < s.length - SEQUENCE_LENGTH; ++i) {
		const sequence = s.substring(i, i + SEQUENCE_LENGTH);
		if (sequences.has(sequence))
			continue;
		const index = s.indexOf(sequence, i + 1);
		if (index !== -1)
			sequences.add(sequence);
	}
	return Array.from(sequences);
}

if (import.meta.main) {
	const s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT";
	console.log(findRepeatedDnaSequences(s));
}