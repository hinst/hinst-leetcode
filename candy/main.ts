function candy(ratings: number[]): number {
	const array = new Array(ratings.length).fill(1);
	for (let haveChange = true; haveChange;) {
		haveChange = false;
		for (let i = 0; i < ratings.length; ++i) {
			if (i > 0) {
				if (ratings[i - 1] < ratings[i] && !(array[i - 1] < array[i])) {
					++array[i];
					haveChange = true;
				}
			}
			if (i < ratings.length - 1) {
				if (ratings[i] > ratings[i + 1] && !(array[i] > array[i + 1])) {
					++array[i];
					haveChange = true;
				}
			}
		}
	}
	return array.reduce((a, b) => a + b, 0);
}

export const candyEx = candy;

if (import.meta.main) {
	const ratings = [1,0,2];
	console.log(candy(ratings));
}
