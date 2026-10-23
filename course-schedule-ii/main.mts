function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	/** If links[L][R] is true, then R unlocks L */
	const links: boolean[][] = [];
	for (let i = 0; i < numCourses; ++i)
		links.push(new Array(numCourses));
	for (const item of prerequisites) {
		const left = item[0] !!;
		const right = item[1] !!;
		const row = links[left] !!;
		row[right] = true;
	}
	const roots: number[] = [];
	for (let i = 0; i < numCourses; ++i) {
		const row = links[i]!!;
		if (row.every(item => !item))
			roots.push(i);
	}
	console.log(roots);
}

// const numCourses = 2, prerequisites = [[1,0]];
const numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]];
findOrder(numCourses, prerequisites);