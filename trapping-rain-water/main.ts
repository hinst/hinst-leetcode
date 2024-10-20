function trap(heights: number[]): number {
	let maxHeight = 0;
	const availableHeightSet = new Set<number>();
	for (const height of heights) {
		availableHeightSet.add(height);
		if (maxHeight < height)
			maxHeight = height;
	}
	const availableHeights = Array.from(availableHeightSet);
	availableHeights.sort((a, b) => a - b);
	let totalWaterVolume = 0;
	for (let heightIndex = availableHeights.length - 1; heightIndex >= 0; --heightIndex) {
		const currentHeight = Math.max(1, availableHeights[heightIndex]);
		let isInside = false;
		let lastInside = 0;
		let waterVolume = 0;
		for (let x = 0; x < heights.length; ++x) {
			if (heights[x] < currentHeight) {
				if (isInside)
					++waterVolume;
			} else {
				isInside = true;
				lastInside = x;
			}
		}
		waterVolume -= (heights.length - 1 - lastInside);
		const previousHeight = availableHeights[heightIndex + 1];
		if (previousHeight) {
			const multiplier = previousHeight - currentHeight;
			waterVolume *= multiplier;
		}
		totalWaterVolume += waterVolume;
	}
	return totalWaterVolume;
}

export const trapExported = trap;

function printHeights(heights: number[]) {
	let maxHeight = 0;
	for (const height of heights) {
		if (maxHeight < height)
			maxHeight = height;
	}
	for (let y = maxHeight; y >=1; --y) {
		let text = '';
		for (let x = 0; x < heights.length; ++x) {
			text += heights[x] < y ? '.' : 'o';
		}
		console.log(text);
	}
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	printHeights([4,2,0,3,2,5]);
	console.log(trap([4,2,0,3,2,5]));
}
