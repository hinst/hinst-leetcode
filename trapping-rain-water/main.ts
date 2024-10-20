function trap(heights: number[]): number {
	let maxHeight = 0;
	for (const height of heights)
		if (maxHeight < height)
			maxHeight = height;
	let waterVolume = 0;
	for (let y = maxHeight; y >= 1; --y) {
		let isInside = false;
		let lastInside = 0;
		for (let x = 0; x < heights.length; ++x) {
			if (heights[x] < y) {
				if (isInside)
					++waterVolume;
			} else {
				isInside = true;
				lastInside = x;
			}
		}
		waterVolume -= (heights.length - 1 - lastInside);
	}
	return waterVolume;
}

export const trapExported = trap;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));
}
