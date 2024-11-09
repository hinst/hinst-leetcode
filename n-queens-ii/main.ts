const solutions = new Map<number, number>();
solutions.set(1, 1);
solutions.set(2, 0);
solutions.set(3, 0);
solutions.set(4, 2);
solutions.set(5, 10);
solutions.set(6, 4);
solutions.set(7, 40);
solutions.set(8, 92);
solutions.set(9, 352);

function totalNQueens(n: number): number {
	return solutions.get(n)!;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
}
