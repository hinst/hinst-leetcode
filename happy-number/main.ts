function convert(n: number): number {
	let result = 0;
	while (n > 0) {
		const digit = n % 10;
		result += digit * digit;
		n = Math.trunc(n / 10);
	}
	return result;
}

function isHappy(n: number): boolean {
	const steps = new Set<number>();
	while (n !== 1) {
		if (steps.has(n))
			return false;
		steps.add(n);
		n = convert(n);
	}
	return true;
}

if (import.meta.main) {
	console.log(isHappy(19));
	console.log(isHappy(2));
}
