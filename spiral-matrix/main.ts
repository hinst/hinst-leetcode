enum Direction {
	RIGHT = 0,
	BOTTOM = 1,
	LEFT = 2,
	UP = 3
}

function turn(direction: Direction): Direction {
	return (direction + 1) % 4;
}

function spiralOrder(matrix: number[][]): number[] {
	const width = matrix[0].length;
	const height = matrix.length;
	const visited = new Set<number>();
	function checkVisited(x: number, y: number) {
		return visited.has(x + y * width);
	}
	const result: number[] = [];
	let x = 0;
	let y = 0;
	let canMove = true;
	let direction = Direction.RIGHT;
	do {
		result.push(matrix[y][x]);
		visited.add(x + y * width);
		switch (direction) {
			case Direction.RIGHT:
				if (width - 1 <= x)
					direction = turn(direction);
				break;
			case Direction.BOTTOM:
				if (height - 1 <= y)
					direction = turn(direction);
				break;
			case Direction.LEFT:
				if (x <= 0)
					direction = turn(direction);
				break;
			case Direction.UP:
				if (y <= 0)
					direction = turn(direction);
				break;
		}
		switch (direction) {
			case Direction.RIGHT:
				if (checkVisited(x + 1, y))
					direction = turn(direction);
				break;
			case Direction.BOTTOM:
				if (checkVisited(x, y + 1))
					direction = turn(direction);
				break;
			case Direction.LEFT:
				if (checkVisited(x - 1, y))
					direction = turn(direction);
				break;
			case Direction.UP:
				if (checkVisited(x, y - 1))
					direction = turn(direction);
				break;
		}
		switch (direction) {
			case Direction.RIGHT:
				x += 1;
				break;
			case Direction.BOTTOM:
				y += 1;
				break;
			case Direction.LEFT:
				x -= 1;
				break;
			case Direction.UP:
				y -= 1;
				break;
		}
		canMove = !checkVisited(x, y);
	} while (canMove);
	return result;
}

export const spiralOrderEx = spiralOrder;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));
}
