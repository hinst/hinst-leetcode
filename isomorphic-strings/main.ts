function isIsomorphic(source: string, target: string): boolean {
	const forwardMap = new Map<string, string>();
	const backwardMap = new Map<string, string>();
	const sourceArray = Array.from(source);
	const targetArray = Array.from(target);
	for (let i = 0; i < sourceArray.length; ++i) {
		const sourceItem = sourceArray[i];
		const targetItem = targetArray[i];
		const targetMapped = forwardMap.get(sourceItem);
		const sourceMapped = backwardMap.get(targetItem);
		if (targetMapped) {
			if (targetItem !== targetMapped)
				return false;
		} else {
			forwardMap.set(sourceItem, targetItem);
			backwardMap.set(targetItem, sourceItem);
		}
		if (sourceMapped && sourceMapped !== sourceItem)
			return false;
	}
	return true;
}

if (import.meta.main) {
	let s = "egg", t = "add";
	console.log(s, t, isIsomorphic(s, t));
	s = "f11", t = "b23";
	console.log(s, t, isIsomorphic(s, t));
	s = "badc", t = "baba";
	console.log(s, t, isIsomorphic(s, t));
}
