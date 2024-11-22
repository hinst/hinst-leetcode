function canJump(numbers: number[]): boolean {
	function jump(index: number): boolean {
		if (index >= numbers.length - 1)
			return true;
		const limit = numbers[index];
		for (let i = 1; i <= limit; ++i)
			if (jump(index + i))
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
