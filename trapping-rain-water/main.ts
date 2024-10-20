function trap(heights: number[]): number {
	let maxHeight = 0;
	for (const height of heights)
		if (maxHeight < height)
			maxHeight = height;
	let waterVolume = 0;
	for (let y = maxHeight; y >= 1; --y) {
		let isInside = false;
		for (let x = 0; x < heights.length; ++x) {
			if (heights[x] < y) {
				if (isInside)
					++waterVolume;
			} else
				isInside = true;
		}
		for (let x = heights.length - 1; x >= 0; --x)
			if (heights[x] < y)
				waterVolume--;
			else
				break;
	}
	return waterVolume;
}

export const trapExported = trap;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));
}
