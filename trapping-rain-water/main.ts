function trap(heights: number[]): number {
	let maxHeight = 0;
	const availableHeightSet = new Set<number>();
	for (const height of heights) {
		availableHeightSet.add(height);
		if (maxHeight < height)
			maxHeight = height;
	}
	const availableHeights = Array.from(availableHeightSet).sort((a, b) => a - b);
	let totalWaterVolume = 0;
	for (let heightIndex = availableHeights.length - 1; heightIndex >= 0; --heightIndex) {
		const currentHeight = availableHeights[heightIndex];
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
		const nextHeight = availableHeights[heightIndex - 1] || 0;
		const multiplier = currentHeight - nextHeight;
		waterVolume *= multiplier;
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
	for (let y = maxHeight; y >= 1; --y) {
		let text = '';
		for (let x = 0; x < heights.length; ++x) {
			text += heights[x] < y ? '.' : 'o';
		}
		console.log(text);
	}
}

if (import.meta.main) {
	printHeights([4,2,0,3,2,5]);
	console.log(trap([4,2,0,3,2,5]));
}
