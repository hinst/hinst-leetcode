function largestRectangleArea(heights: number[]): number {
	let largestArea = 0;
	for (let i = 0; i < heights.length; ++i) {
		const height = heights[i];
		let width = 1;
		for (let w = i + 1; w < heights.length; ++w)
			if (height <= heights[w])
				++width;
			else
				break;
		for (let w = i - 1; w >= 0; --w)
			if (height <= heights[w])
				++width;
			else
				break;
		const area = height * width;
		if (largestArea < area)
			largestArea = area;
	}
	return largestArea;
}

if (import.meta.main) {
	const heights = [2,1,5,6,2,3];
	console.log(largestRectangleArea(heights));
}
