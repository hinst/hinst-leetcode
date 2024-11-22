function canJump(numbers: number[]): boolean {
	const cache = new Map<number, boolean>();
	function jumpCached(index: number) {
		const cached = cache.get(index);
		if (cached !== undefined)
			return cached;
		const result = jump(index);
		cache.set(index, result);
		return result;
	}
	function jump(index: number): boolean {
		if (index >= numbers.length - 1)
			return true;
		const limit = numbers[index];
		for (let i = limit; 0 < i; --i)
			if (jumpCached(index + i))
				return true;
		return false;
	}
	return jump(0);
}

export const canJumpEx = canJump;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(canJump([2,3,1,1,4]));
}
