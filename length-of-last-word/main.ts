function lengthOfLastWord(s: string): number {
	let counter = 0;
	let savedCounter = 0;
	for (const character of s) {
		if (character === ' ') {
			counter = 0;
		} else {
			++counter;
			savedCounter = counter;
		}
	}
	return savedCounter;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(lengthOfLastWord("Hello World   "));
}
