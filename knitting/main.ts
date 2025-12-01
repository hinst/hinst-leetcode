const base = 168;
const goal = 204;
const delta = goal - base;
const incrementPerStep = delta / base;
console.log({base, goal, delta, incrementPerStep});

let sum = base;
let previousSum = base;
let previousStep = 0;
for (let i = 1; i <= base; ++i) {
	sum += incrementPerStep;
	if (Math.trunc(sum) !== Math.trunc(previousSum)) {
		console.log(i, '•', i - previousStep);
		previousStep = i;
	}
	previousSum = sum;
}

console.log({sum});