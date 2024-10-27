function isMatch(s: string, pattern: string): boolean {

}

export const isMatchExported = isMatch;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(isMatch('aa', 'a'));
}
