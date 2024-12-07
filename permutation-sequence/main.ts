function getPermutation(n: number, k: number): string {
	const array = new Uint8Array(n);
	for (let i = 0; i < n; ++i)
		array[i] = i + 1;
	return array.join('');
}

if (import.meta.main) {
	console.log(getPermutation(3, 3));
}
