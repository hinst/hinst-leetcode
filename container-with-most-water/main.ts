function maxArea(height: number[]): number {
    const heights = height.map((height, index) => [index, height]);
    heights.sort((a, b) => b[1] - a[1]);
    let max = 0;
    const n = heights.length;
    for (let i = 0; i < n; ++i)
        for (let j = i + 1; j < n; ++j) {
            const area = Math.min(heights[i][1], heights[j][1]) * Math.abs(heights[i][0] - heights[j][0]);
            if (max < area)
                max = area;
        }
    return max;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]));
