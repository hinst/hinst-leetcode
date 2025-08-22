function canCompleteCircuit(gas: number[], cost: number[]): number {
	const limit = gas.length * 2;
	for (let i = 0; i < gas.length; ++i) {
		let sum = 0;
		let step: number;
		for (step = i; step < limit; ++step) {
			const limitedStep = step % gas.length;
			sum += gas[limitedStep];
			sum -= cost[limitedStep];
			if (sum < 0) {
				break;
			}
			if (limitedStep !== step && limitedStep == i)
				return i;
		}
		i = step;
	}
	return -1;
}

if (import.meta.main) {
	const gas = [1,2,3,4,5], cost = [3,4,5,1,2];
	console.log(canCompleteCircuit(gas, cost));
}
