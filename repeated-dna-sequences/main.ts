const SEQUENCE_LENGTH = 10;

function findRepeatedDnaSequences(s: string): string[] {
	const sequences = new Set<string>();
	const duplicatedSequences = new Set<string>();
	const threshold = s.length - SEQUENCE_LENGTH + 1;
	for (let i = 0; i < threshold; ++i) {
		const sequence = s.substring(i, i + SEQUENCE_LENGTH);
		if (sequences.has(sequence))
			duplicatedSequences.add(sequence);
		sequences.add(sequence);
	}
	return Array.from(duplicatedSequences);
}

if (import.meta.main) {
	const s = "AAAAAAAAAAA";
	console.log(findRepeatedDnaSequences(s));
}