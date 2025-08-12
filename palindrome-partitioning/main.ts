function partition(s: string): string[][] {
    const p = new Partition(s);
}

class Partition {
	readonly chains: string[][] = [];

	constructor(private readonly text: string) {
	}

	next(index: number = 0) {

	}
}


export const partitionEx = partition;

if (import.meta.main) {
}
