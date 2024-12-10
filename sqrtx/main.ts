function mySqrt(x: number): number {
	if (x === 0 || x === 1)
		return x;
	let previous = 1;
	for (let i = 1; i < x; ++i) {
		if (i * i > x)
			break;
		previous = i;
	}
	return previous;
}

if (import.meta.main) {
	console.log(mySqrt(	0));
}
