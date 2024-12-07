enum Direction {
	RIGHT,
	DOWN,
	LEFT,
	UP,
}

function generateMatrix(n: number): number[][] {
	const matrix: number[][] = new Array(n).fill([]).map(_ => new Array(n));
	const limit = n * n;
	let x = 0;
	let y = 0;
	let direction = Direction.RIGHT;
	for (let i = 0; i < limit; ++i) {
		matrix[y][x] = i + 1;
		switch (direction) {
			case Direction.RIGHT:
				if (x < n - 1 && matrix[y][x + 1] === undefined)
					++x;
				else {
					direction = Direction.DOWN;
					++y;
				}
				break;
			case Direction.DOWN:
				if (y < n - 1 && matrix[y + 1][x] === undefined)
					++y;
				else {
					direction = Direction.LEFT;
					--x;
				}
				break;
			case Direction.LEFT:
				if (x > 0 && matrix[y][x - 1] === undefined)
					--x;
				else {
					direction = Direction.UP;
					--y;
				}
				break;
			case Direction.UP:
				if (y > 0 && matrix[y - 1][x] === undefined)
					--y;
				else {
					direction = Direction.RIGHT;
					++x;
				}
				break;
		}
	}
	return matrix;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(generateMatrix(3));
}
