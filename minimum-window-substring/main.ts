function minWindow(s: string, t: string): string {
	const targetMap: Record<string, number> = {};
	for (const character of t)
		targetMap[character] = (targetMap[character] || 0) + 1;
	const currentMap: Record<string, number> = {};
	let startBest: number | undefined;
	let endBest = s.length;
	let startIndex = 0;
	let endIndex = 0;
	while (startIndex < s.length && endIndex <= s.length) {
		const isIncluded = checkIncludes(currentMap, targetMap);
		if (isIncluded) {
			if (startBest === undefined || endIndex - startIndex < endBest - startBest) {
				startBest = startIndex;
				endBest = endIndex;
			}
			--currentMap[s[startIndex]];
			++startIndex;
		} else {
			currentMap[s[endIndex]] = (currentMap[s[endIndex]] || 0) + 1;
			++endIndex;
		}
		while (endIndex < startIndex) {
			currentMap[s[endIndex]] = (currentMap[s[endIndex]] || 0) + 1;
			++endIndex;
		}
	}
	return startBest !== undefined ? s.substring(startBest, endBest) : '';
}

function checkIncludes(map: Record<string, number>, targetMap: Record<string, number>): boolean {
	for (const key in targetMap) {
		const isIncluded = targetMap[key] <= (map[key] || 0);
		if (!isIncluded)
			return false;
	}
	return true;
}

export const minWindowEx = minWindow;

if (import.meta.main) {
	const s = "ADOBECODEBANC", t = "ABC";
	console.log(minWindow(s, t));
}
