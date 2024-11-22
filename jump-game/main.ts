function canJump(numbers: number[]): boolean {
	return false;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(canJump([2,3,1,1,4]));
}
