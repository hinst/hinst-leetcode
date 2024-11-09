function groupAnagrams(strings: string[]): string[][] {
	const groups = new Map<string, string[]>();
	for (const word of strings) {
		const key = Array.from(word).sort().join();
		const group = groups.get(key);
		if (!group)
			groups.set(key, [word]);
		else
			group.push(word);
	}
	return Array.from(groups.values());
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
}
